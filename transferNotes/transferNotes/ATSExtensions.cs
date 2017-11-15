using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Metadata;
using Microsoft.Xrm.Sdk.Query;

namespace ATSExtensions
{
    public class transferNotes : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var pluginContext = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var service = factory.CreateOrganizationService(pluginContext.UserId);
            int i;
            for (i = 0; i < pluginContext.InputParameters.Count; i++)
            {
            }
            if (pluginContext.InputParameters.Contains("Target") && pluginContext.InputParameters["Target"] is Entity)
            {
                Entity myEntity = (Entity)pluginContext.InputParameters["Target"];//this is the note itself
                var tempEntityRef = myEntity.Attributes["objectid"]; //entity reference to regarding
                if (tempEntityRef.GetType() == typeof(EntityReference))
                {
                    EntityReference tempER = (EntityReference)tempEntityRef;
                    if (tempER.LogicalName == "sabre_submission")
                    { //IF regarding is a submission, then proceed
                        Entity theSubmission = service.Retrieve(tempER.LogicalName, tempER.Id, new ColumnSet("sabre_positionno", "sabre_candidate"));
                        var tempEref = new Object();
                        var tempJob = new EntityReference();
                        var tempCand = new EntityReference();
                        theSubmission.Attributes.TryGetValue("sabre_positionno", out tempEref);
                        if (tempEref.GetType() == typeof(EntityReference))
                        {
                            tempJob = (EntityReference)tempEref;
                            theSubmission.Attributes.TryGetValue("sabre_candidate", out tempEref);
                            if (tempEref.GetType() == typeof(EntityReference))
                            {
                                tempCand = (EntityReference)tempEref;
                                var query = new QueryExpression("sabre_placement");
                                query.Criteria.AddCondition("sabre_posistion", ConditionOperator.Equal, tempJob.Id);
                                query.Criteria.AddCondition("sabre_candidate", ConditionOperator.Equal, tempCand.Id); //not sure if I should also filter on submission
                                query.ColumnSet = new ColumnSet("sabre_placementid", "sabre_name");
                                if (service.RetrieveMultiple(query).Entities.Count > 0)
                                {

                                    EntityCollection results = service.RetrieveMultiple(query); //retrieved Placement
                                    Entity copyMyEntity = new Entity();

                                    for (i = 0; i < results.Entities.Count(); i++)
                                    {
                                        results[i].Attributes.TryGetValue("sabre_placementid", out tempEref);

                                        if (tempEref.GetType() == typeof(System.Guid))
                                        {
                                            Guid tempGuid = (Guid)tempEref;
                                            var tempRec = new Object();
                                            copyMyEntity.LogicalName = myEntity.LogicalName;
                                            myEntity.Attributes.TryGetValue("documentbody", out tempRec);
                                            copyMyEntity.Attributes["documentbody"] = tempRec;
                                            myEntity.Attributes.TryGetValue("notetext", out tempRec);
                                            copyMyEntity.Attributes["notetext"] = tempRec;
                                            myEntity.Attributes.TryGetValue("subject", out tempRec);
                                            copyMyEntity.Attributes["subject"] = tempRec;
                                            myEntity.Attributes.TryGetValue("filesize", out tempRec);
                                            copyMyEntity.Attributes["filesize"] = tempRec;
                                            myEntity.Attributes.TryGetValue("filename", out tempRec);
                                            copyMyEntity.Attributes["filename"] = tempRec;
                                            copyMyEntity.Attributes["objectid"] = new EntityReference("sabre_placement", tempGuid);
                                            service.Create(copyMyEntity);//debugging time
                                            //throw new InvalidPluginExecutionException("created");
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }
        }
    }

    public class updateRecordsTrigger : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var pluginContext = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var service = factory.CreateOrganizationService(pluginContext.UserId);

            getCandidatesToTest(service);

            Entity myEntity = new Entity();
            myEntity.LogicalName = "sabre_dailyupdatetrigger";
            myEntity.Attributes["sabre_name"] = System.DateTime.Now.ToString();
            service.Create(myEntity);

        }

        public void getCandidatesToTest(IOrganizationService service)
        {
            var candidateQuery = new QueryExpression("sabre_candidate");
            candidateQuery.Criteria.AddCondition("sabre_workingstatus", ConditionOperator.Equal, 837770002);
            candidateQuery.ColumnSet = new ColumnSet("sabre_candidateid", "sabre_firstsname");
            if (service.RetrieveMultiple(candidateQuery).Entities.Count > 0)
            {
                EntityCollection results = service.RetrieveMultiple(candidateQuery);
                for (var i = 0; i < results.Entities.Count(); i++)
                {
                    var candRef = new System.Guid();
                    var tempObj = new Object();
                    var tempName = new Object();
                    var candidateAvailable = true;
                    results[i].Attributes.TryGetValue("sabre_firstsname", out tempName);
                    results[i].Attributes.TryGetValue("sabre_candidateid", out tempObj);
                    if (tempObj.GetType() == typeof(System.Guid))
                    {
                        candRef = (System.Guid)tempObj;
                        var placementQuery = new QueryExpression("sabre_placement");
                        placementQuery.Criteria.AddCondition("sabre_candidate", ConditionOperator.Equal, candRef);
                        placementQuery.ColumnSet = new ColumnSet("sabre_actualstartdate", "sabre_enddate", "statecode");
                        //throw new InvalidPluginExecutionException(service.RetrieveMultiple(placementQuery).Entities.Count.ToString()); 
                        if (service.RetrieveMultiple(placementQuery).Entities.Count > 0)
                        {

                            EntityCollection placements = service.RetrieveMultiple(placementQuery);
                            candidateAvailable = true;
                            //throw new InvalidPluginExecutionException("test2"); //got to here
                            for (var j = 0; j < placements.Entities.Count(); j++)
                            {

                                var placementEndDate = placements[j].Contains("sabre_enddate") ? Convert.ToDateTime(placements[j]["sabre_enddate"]) : default(DateTime);
                                var placementStartDate = placements[j].Contains("sabre_actualstartdate") ? Convert.ToDateTime(placements[j]["sabre_actualstartdate"]) : default(DateTime);

                                placements[j].Attributes.TryGetValue("sabre_enddate", out tempObj);
                                var tempObj2 = new Object();
                                placements[j].Attributes.TryGetValue("statecode", out tempObj2);

                                //throw new InvalidPluginExecutionException(tempObj.GetType().ToString());
                                if (tempObj2 != null && tempObj2.GetType() == typeof(OptionSetValue))
                                {
                                    OptionSetValue tempState = (OptionSetValue)tempObj2;
                                    if (tempState.Value == 0)
                                    {
                                        /*  if (tempObj != null && tempObj.GetType() == typeof(DateTime))
                                          {
                                              //throw new InvalidPluginExecutionException("test");
                                              DateTime tempEndDate = (DateTime)tempObj;
                                              if (tempEndDate > System.DateTime.Now)
                                              {
                                                  candidateAvailable = false;
                                                  //throw new InvalidPluginExecutionException((string)tempName + tempEndDate);
                                              }
                                          }
                                          else if (tempObj == null)
                                          {
                                              candidateAvailable = false;
                                          }*/
                                        if (placementStartDate < DateTime.Now && (placementEndDate > DateTime.Now || placementEndDate.Year < 1800)) {
                                            candidateAvailable = false;
                                        }
                                    }
                                }

                            }
                            if (candidateAvailable == true)
                            {
                                var myEntity = new Entity("sabre_candidate");
                                myEntity.Attributes["sabre_workingstatus"] = new OptionSetValue(837770001);
                                myEntity.LogicalName = "sabre_candidate";
                                myEntity.Id = candRef;
                                var candidateQueryTemp = new QueryExpression("sabre_candidate");
                                candidateQueryTemp.Criteria.AddCondition("sabre_candidateid", ConditionOperator.Equal, myEntity.Id);
                                if (service.RetrieveMultiple(candidateQueryTemp).Entities.Count > 0)
                                {
                                    service.Update(myEntity);
                                }
                                //throw new InvalidPluginExecutionException("Updating" + candRef + "xxx");

                            }
                        }
                        else
                        {
                            var myEntity = new Entity("sabre_candidate");
                            myEntity.Attributes["sabre_workingstatus"] = new OptionSetValue(837770001);
                            myEntity.LogicalName = "sabre_candidate";
                            myEntity.Id = candRef;
                            var candidateQueryTemp = new QueryExpression("sabre_candidate");
                            candidateQueryTemp.Criteria.AddCondition("sabre_candidateid", ConditionOperator.Equal, myEntity.Id);
                            if (service.RetrieveMultiple(candidateQueryTemp).Entities.Count > 0)
                            {
                                service.Update(myEntity);
                            }
                            //throw new InvalidPluginExecutionException("Updating" + candRef + "xxx");


                        }
                    }
                }
            }
        }

    }

    public class onUpdatePlacement : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var pluginContext = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var service = factory.CreateOrganizationService(pluginContext.UserId);

            var preImage = (Entity)pluginContext.PreEntityImages["PreUpdateImage"];
            var entity = (Entity)pluginContext.InputParameters["Target"];

            var preEndDate = preImage.Contains("sabre_enddate") ? Convert.ToDateTime(preImage["sabre_enddate"]) : default(DateTime);
            var entityEndDate = entity.Contains("sabre_enddate") ? Convert.ToDateTime(entity["sabre_enddate"]) : default(DateTime);
            //if date is postdue, consider making candidate available
            if (preEndDate != entityEndDate && entityEndDate < DateTime.Now && entityEndDate.Year > 2000 && !entity.Contains("sabre_candidate")) {
                updateRelatedCandidates(service, preImage);
            } else if (preEndDate != entityEndDate && entityEndDate < DateTime.Now && entityEndDate.Year > 2000 && entity.Contains("sabre_candidate")) {
                updateRelatedCandidates(service, entity);
            }
        }

        public void updateRelatedCandidates(IOrganizationService service, Entity entity) {
            var tempField = new Object();

            entity.Attributes.TryGetValue("sabre_candidate", out tempField);
            if (tempField != null && tempField.GetType() == typeof(EntityReference))
            {
                EntityReference candidateRef = (EntityReference)tempField;
                var candidateQuery = new QueryExpression("sabre_candidate");
                candidateQuery.Criteria.AddCondition("sabre_candidateid", ConditionOperator.Equal, candidateRef.Id);
                candidateQuery.ColumnSet = new ColumnSet("sabre_candidateid", "sabre_firstsname", "sabre_workingstatus");
                if (service.RetrieveMultiple(candidateQuery).Entities.Count > 0)
                {
                    EntityCollection results = service.RetrieveMultiple(candidateQuery);
                    for (var i = 0; i < results.Entities.Count(); i++)
                    {
                        if (results[i].Contains("sabre_workingstatus")) {
                            results[i].Attributes.TryGetValue("sabre_workingstatus", out tempField);
                            var statusOptions = (OptionSetValue)tempField;
                            var workingStatus = statusOptions.Value;
                            if (workingStatus == 837770002 || workingStatus == 837770003) {
                                //check for other placements, verify if they have ended, else do nothing
                                var placementQuery = new QueryExpression("sabre_placement");
                                placementQuery.ColumnSet = new ColumnSet("sabre_actualstartdate", "sabre_enddate", "sabre_placementid");
                                if (results[i].Contains("sabre_candidateid"))
                                {
                                    results[i].Attributes.TryGetValue("sabre_candidateid", out tempField);
                                    var candidateId = (Guid)tempField;
                                    placementQuery.Criteria.AddCondition("sabre_candidate", ConditionOperator.Equal, candidateId);
                                    if (service.RetrieveMultiple(placementQuery).Entities.Count() > 0) {
                                        EntityCollection placementResults = service.RetrieveMultiple(placementQuery);
                                        var makeAvailable = true;
                                        for (var j = 0; j < placementResults.Entities.Count(); j++) {
                                            var placementEndDate = placementResults[j].Contains("sabre_enddate") ? Convert.ToDateTime(placementResults[j]["sabre_enddate"]) : default(DateTime);
                                            var placementStartDate = placementResults[j].Contains("sabre_actualstartdate") ? Convert.ToDateTime(placementResults[j]["sabre_actualstartdate"]) : default(DateTime);
                                            if (placementEndDate >= DateTime.Now || placementEndDate.Year < 1900) { //&& placementEndDate.Year > 2000
                                                if (placementStartDate < DateTime.Now) {
                                                    makeAvailable = false;
                                                }
                                            }
                                        }
                                        if (makeAvailable == true) {
                                            var myEntity = new Entity("sabre_candidate");
                                            myEntity.Attributes["sabre_workingstatus"] = new OptionSetValue(837770001);
                                            myEntity.LogicalName = "sabre_candidate";
                                            myEntity.Id = candidateId;
                                            var candidateQueryTemp = new QueryExpression("sabre_candidate");
                                            candidateQueryTemp.Criteria.AddCondition("sabre_candidateid", ConditionOperator.Equal, myEntity.Id);
                                            if (service.RetrieveMultiple(candidateQueryTemp).Entities.Count > 0)
                                            {
                                                service.Update(myEntity);
                                            }
                                        }
                                    }
                                }
                                else {
                                    throw new InvalidPluginExecutionException("HOW DID WE GET THIS?");
                                }
                            }
                        }
                    }

                }
            }
            else
            {
                throw new InvalidPluginExecutionException("xxx" + tempField.GetType() + "xxx");
            }

        }
    }

    public class onCreateAccount : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var pluginContext = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var service = factory.CreateOrganizationService(pluginContext.UserId);

            var entity = (Entity)pluginContext.PostEntityImages["PostUpdateImage"];
            if (entity.Contains("sabre_clientstatus")) {
                var clientStatus = (OptionSetValue)entity["sabre_clientstatus"];
                if (clientStatus.Value == 837770001 || clientStatus.Value == 837770002) {
                    if (entity.Contains("owningbusinessunit")) {
                        var owningBU = (EntityReference)entity["owningbusinessunit"];
                        var accountName = "";
                        //Retrieve Payroll 1 from Business Unit
                        var payrollID1 = "";
                        var BUQuery = new QueryExpression("businessunit");
                        BUQuery.ColumnSet = new ColumnSet("sabre_payroll", "businessunitid");
                        BUQuery.Criteria.AddCondition("businessunitid", ConditionOperator.Equal, owningBU.Id);
                        var BURecord = service.Retrieve("businessunit", owningBU.Id, BUQuery.ColumnSet);
                        if (BURecord != null) {
                            payrollID1 = BURecord.Contains("sabre_payroll") ? Convert.ToString(BURecord["sabre_payroll"]) : default(string);
                        }

                        //End Retrieve Payroll 1 from Business Unit
                        //generate potential account name
                        if (entity.Contains("name"))
                        {
                            accountName = Convert.ToString(entity["name"]);
                            if (accountName.Length >= 7)
                            {
                                accountName = payrollID1 + accountName.Substring(0, 7);
                            }
                            else {
                                accountName = payrollID1 + accountName.Substring(0, accountName.Length);
                            }
                        }
                        //end generate potential account name
                
                        if (accountName != null && accountName != "") {
                            //Check if possible Customer Name is in use
                            var accountQuery = new QueryExpression("account");
                            accountQuery.ColumnSet = new ColumnSet("name", "accountid");
                            accountQuery.Criteria.AddCondition("accountnumber", ConditionOperator.Equal, accountName);
                            if (entity.Contains("accountid")) {
                                accountQuery.Criteria.AddCondition("accountid", ConditionOperator.NotEqual, (Guid)entity["accountid"]);
                            }

                                EntityCollection results = service.RetrieveMultiple(accountQuery);
                                if (results.Entities.Count() > 0)
                                {
                                    //if yes then set editableName to true
                                    var myEntity = new Entity("account");
                                    myEntity.Attributes["sabre_editablename"] = true;
                                    myEntity.LogicalName = "account";
                                    myEntity.Attributes["accountnumber"] = "";
                                    if (entity.Contains("accountid"))
                                    {
                                        myEntity.Id = (Guid)entity["accountid"];
                                        service.Update(myEntity);
                                    }
                                }
                                else
                                {
                                    var myEntity = new Entity("account");
                                    myEntity.Attributes["accountnumber"] = accountName;
                                    myEntity.Attributes["sabre_editablename"] = false;
                                    myEntity.LogicalName = "account";
                                    if (entity.Contains("accountid"))
                                    {
                                        myEntity.Id = (Guid)entity["accountid"];
                                        service.Update(myEntity);
                                    }
                                }
                    
                    
                                //End Check if possible Customer Name is in use
                        }

                    }

            //Check if possible Customer Name is in use

            //Retrieve Acocunt names from system
            //Payroll1.Val + first7charsCustomerName = possibleCustomerName
            //if yes then set editableName to true
            //if no then set Customer Name
                }
            }
        }
    }

    public class onUpdateAccount : IPlugin
    {
        public Dictionary<string, string> setupVariables;

        public void Execute(IServiceProvider serviceProvider)
        {
            var pluginContext = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var service = factory.CreateOrganizationService(pluginContext.UserId);

            initAccountSetupVars();

            var entity = (Entity)pluginContext.PostEntityImages["PostUpdateImage"];
            if (entity.Contains("sabre_clientstatus")) {
                var clientStatus = (OptionSetValue)entity["sabre_clientstatus"];
                if (clientStatus.Value == 837770001 || clientStatus.Value == 837770002) {

                    if (entity.Contains("owningbusinessunit"))
                    {
                        var owningBU = (EntityReference)entity["owningbusinessunit"];
                        var accountName = "";
                        //Retrieve Payroll 1 from Business Unit
                        var payrollID1 = "";
                        var BUQuery = new QueryExpression("businessunit");
                        BUQuery.ColumnSet = new ColumnSet("sabre_payroll", "businessunitid");
                        BUQuery.Criteria.AddCondition("businessunitid", ConditionOperator.Equal, owningBU.Id);
                        var BURecord = service.Retrieve("businessunit", owningBU.Id, BUQuery.ColumnSet);
                        if (BURecord != null)
                        {
                            payrollID1 = BURecord.Contains("sabre_payroll") ? Convert.ToString(BURecord["sabre_payroll"]) : default(string);
                        }
                        //End Retrieve Payroll 1 from Business Unit
                        //generate potential account name
                        if (entity.Contains("accountnumber"))
                        {
                            accountName = Convert.ToString(entity["accountnumber"]);
                        }
                        else if (entity.Contains("name"))
                        {
                            accountName = Convert.ToString(entity["name"]);
                            if (accountName.Length >= 7)
                            {
                                accountName = payrollID1 + accountName.Substring(0, 7);
                            }
                            else
                            {
                                accountName = payrollID1 + accountName.Substring(0, accountName.Length);
                            }
                        }

                        //end generate potential account name
                        if (accountName != null && accountName != "")
                        {
                            //Check if possible Customer Name is in use
                            var accountQuery = new QueryExpression("account");
                            accountQuery.ColumnSet = new ColumnSet("name", "accountid");
                            accountQuery.Criteria.AddCondition("accountnumber", ConditionOperator.Equal, accountName);
                            accountQuery.Criteria.AddCondition("accountnumber", ConditionOperator.NotEqual, "");
                            if (entity.Contains("accountid"))
                            {
                                accountQuery.Criteria.AddCondition("accountid", ConditionOperator.NotEqual, (Guid)entity["accountid"]);
                            }

                            EntityCollection results = service.RetrieveMultiple(accountQuery);
                            if (results.Entities.Count() > 0)
                            {
                                //if yes then set editableName to true
                                var myEntity = new Entity("account");
                                myEntity.Attributes["sabre_editablename"] = true;
                                myEntity.LogicalName = "account";
                                myEntity.Attributes["accountnumber"] = "";
                                if (entity.Contains("accountid"))
                                {
                                    if (pluginContext.Depth <= 1) { 
                                        myEntity.Id = (Guid)entity["accountid"];
                                        service.Update(myEntity);
                                    }
                                }
                            }
                            else
                            {
                                var myEntity = new Entity("account");
                                myEntity.Attributes["accountnumber"] = accountName;
                                myEntity.Attributes["sabre_editablename"] = false;
                                myEntity.LogicalName = "account";
                                if (entity.Contains("accountid"))
                                {
                                    if (pluginContext.Depth <= 1)
                                    {
                                        myEntity.Id = (Guid)entity["accountid"];
                                        service.Update(myEntity);
                                    }
                                }
                            }

                            //End Check if possible Customer Name is in use
                        }

                    }
                }
            }
            //Check if possible Customer Name is in use

            //Retrieve Acocunt names from system
            //Payroll1.Val + first7charsCustomerName = possibleCustomerName
            //if yes then set editableName to true
            //if no then set Customer Name
        }

        public void initAccountSetupVars() {
            setupVariables["type"] = "account";
            setupVariables["mainIdField"] = "accountnumber";
            setupVariables["mainField"] = "name";
        }
    }
}
