﻿using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Metadata;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanupPlacements
{
    public class placementsCleanup : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider) {
            var pluginContext = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var service = factory.CreateOrganizationService(pluginContext.UserId);
            string output = "";
            int i;
            for (i = 0; i < pluginContext.InputParameters.Count; i++) {
                output = output + "#" + i + "#" + pluginContext.InputParameters.ElementAt(i);
            }
            string stateStr = "";
            if (pluginContext.InputParameters.Contains("EntityMoniker") && pluginContext.InputParameters["EntityMoniker"] is EntityReference)
            {
                EntityReference myEntity = (EntityReference)pluginContext.InputParameters["EntityMoniker"];
                OptionSetValue state = (OptionSetValue)pluginContext.InputParameters["State"];
                OptionSetValue status = (OptionSetValue)pluginContext.InputParameters["Status"];
                stateStr = state.Value.ToString();

                if (stateStr == "1") //disabling record = 1
                {
                    //find all associated submissions and placements
                    var query = new QueryExpression("sabre_submission");
                    query.Criteria.AddCondition("sabre_positionno", ConditionOperator.Equal, myEntity.Id);
                    query.ColumnSet = new ColumnSet();
                    query.ColumnSet.Columns.Add("statecode");
                    if (service.RetrieveMultiple(query).Entities.Count > 0)
                    {
                        EntityCollection results = service.RetrieveMultiple(query);
                        output = "";
                        for (i=0; i<results.TotalRecordCount;i++) {
                            var tempState = results.Entities[i].GetAttributeValue<OptionSetValue>("statecode");
                            output = output + tempState.Value.ToString();
                        }
                    }
                        //deactivate them
                }
                else if (stateStr == "0") //enabling record = 0
                {
                }
                throw new InvalidPluginExecutionException(output);
            }
            else {
                output = stateStr;
                throw new InvalidPluginExecutionException(output);
            }

           

        }


    }

    public class placementsOpeningsUpdate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider) {
            var pluginContext = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var service = factory.CreateOrganizationService(pluginContext.UserId);
            string output = "";
            int i;
            for (i = 0; i < pluginContext.InputParameters.Count; i++)
            {
                output = output + "#" + i + "#" + pluginContext.InputParameters.ElementAt(i);
            }
            string stateStr = "";
            if (pluginContext.InputParameters.Contains("EntityMoniker") && pluginContext.InputParameters["EntityMoniker"] is EntityReference)
            {
                EntityReference myEntity = (EntityReference)pluginContext.InputParameters["EntityMoniker"];
                OptionSetValue state = (OptionSetValue)pluginContext.InputParameters["State"];
                OptionSetValue status = (OptionSetValue)pluginContext.InputParameters["Status"];
                stateStr = state.Value.ToString();

                Entity thePlacement = service.Retrieve(myEntity.LogicalName, myEntity.Id, new ColumnSet("sabre_posistion"));
                if (thePlacement != null) {
                    var tempJob = new Object();
                    thePlacement.Attributes.TryGetValue("sabre_posistion", out tempJob);
                    if (tempJob.GetType() == typeof(EntityReference)) {
                        EntityReference tempJob2 = (EntityReference)tempJob;
                        Entity theJob = service.Retrieve(tempJob2.LogicalName, tempJob2.Id, new ColumnSet("sabre_name", "ownerid", "sabre_availableopenings", "sabre_positionid"));
                        int tempAvailableOpenings;
                        var test = new Object();
                        theJob.Attributes.TryGetValue("sabre_availableopenings", out test);
                        if (test.GetType() == typeof(int)) {
                            tempAvailableOpenings = (int)test;
                            if (stateStr == "1") //disabling record = 1
                            {
                                //get Job, increment available openings by 1
                                tempAvailableOpenings = tempAvailableOpenings + 1;
                                theJob.Attributes["sabre_availableopenings"] = tempAvailableOpenings;
                            }
                            else if (stateStr == "0") //enabling record = 0
                            {
                                //get Job, decrement available openings by 1
                                tempAvailableOpenings = tempAvailableOpenings - 1;
                                theJob.Attributes["sabre_availableopenings"] = tempAvailableOpenings;

                            }

                            if (pluginContext.Depth <= 1)
                            {
                                service.Update(theJob);
                            }
                        }
                            // thePlacement.GetAttributeValue<string>("sabre_availableopenings") + "HELLO THERE";


                    }
                }

                
                //throw new InvalidPluginExecutionException(output);
            }
            else
            {
                output = stateStr;
                throw new InvalidPluginExecutionException(output);
            }
        }
        }
}