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
                                            if (pluginContext.Depth <= 1)
                                            {
                                                service.Create(copyMyEntity);//debugging time
                                            }
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

            getCandidatesToTest(service, pluginContext);

            Entity myEntity = new Entity();
            myEntity.LogicalName = "sabre_dailyupdatetrigger";
            myEntity.Attributes["sabre_name"] = System.DateTime.Now.ToString();
            service.Create(myEntity);

        }

        public void getCandidatesToTest(IOrganizationService service, IPluginExecutionContext pluginContext)
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
                                    if (pluginContext.Depth <= 1)
                                    {
                                        service.Update(myEntity);
                                    }
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
                                if (pluginContext.Depth <= 1)
                                {
                                    service.Update(myEntity);
                                }
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
                updateRelatedCandidates(service, preImage, pluginContext);
            } else if (preEndDate != entityEndDate && entityEndDate < DateTime.Now && entityEndDate.Year > 2000 && entity.Contains("sabre_candidate")) {
                updateRelatedCandidates(service, entity, pluginContext);
            }
        }

        public void updateRelatedCandidates(IOrganizationService service, Entity entity, IPluginExecutionContext pluginContext) {
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
                                                if (pluginContext.Depth <= 1)
                                                {
                                                    service.Update(myEntity);
                                                }
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
        public Dictionary<string, string> setupVariables;

        public void Execute(IServiceProvider serviceProvider)
        {
            var pluginContext = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var service = factory.CreateOrganizationService(pluginContext.UserId);

            var entity = (Entity)pluginContext.PostEntityImages["PostUpdateImage"];
            if (entity.Contains("accountid"))
            {
                initAccountSetupVars();
            }
            else if (entity.Contains("sabre_candidateid")) {
                initCandidateSetupVars();
            }
            else if (entity.Contains("sabre_placementid")) {
                initPlacementSetupVars();
            }
            else if (entity.Contains("sabre_positionid")) {
                initJobOrderSetupVars();
            }
            else
            {
                throw new InvalidPluginExecutionException("ERROR TYPE NOT IDENTIFIED");
            }
            //account-specific verification. If either of these cases are true do not validate
            if (entity.Contains("accountid") && !entity.Contains("sabre_clientstatus"))
            {
                return;
            }
            else if (entity.Contains("accountid") && entity.Contains("sabre_clientstatus"))
            {
                var clientStatus = (OptionSetValue)entity["sabre_clientstatus"];
                if (!(clientStatus.Value == 837770001 || clientStatus.Value == 837770002))
                {
                    return;
                }
            }

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
                if (entity.Contains("accountid")) {
                    if (entity.Contains(setupVariables["mainField"]))
                    {
                        accountName = Convert.ToString(entity[setupVariables["mainField"]]);
                        var containerQuery = new QueryExpression("sabre_idcontainer");
                        containerQuery.ColumnSet = new ColumnSet("sabre_idcontainerid", "sabre_accountfixed", "sabre_accountnextnumber");
                        EntityCollection results = service.RetrieveMultiple(containerQuery);
                        if (results.Entities.Count() > 0)
                        {
                            if (results[0].Contains("sabre_accountfixed")) {
                                int nextNumber = 0;
                                int fixedSize = 0;
                                var myEntity = new Entity("sabre_idcontainer");
                                myEntity.Id = (Guid)results[0]["sabre_idcontainerid"];
                                myEntity.LogicalName = "sabre_idcontainer";
                                nextNumber = Convert.ToInt32(Convert.ToString(results[0]["sabre_accountnextnumber"]));
                                fixedSize = Convert.ToInt32(Convert.ToString(results[0]["sabre_accountfixed"]));
                                myEntity.Attributes["sabre_accountnextnumber"] = (nextNumber + 1).ToString();
                                accountName = payrollID1 + "-" + nextNumber.ToString().PadLeft(fixedSize, '0');
                                //update id counter
                                if (pluginContext.Depth <= 1)
                                {
                                    service.Update(myEntity);
                                }
                            }
                        }
                            /*if (accountName.Length >= 7)//commented out as Rob does not like this style of ID.
                            {
                                var accountNameTemp = accountName.Substring(0, 7);
                                if (accountNameTemp.Contains(" ")) {
                                    accountNameTemp.Replace(" ", String.Empty);
                                    int i = 0;
                                    while (accountNameTemp.Length < 7 && 7 + i + 1 <= accountName.Length)
                                    {
                                        accountNameTemp = accountNameTemp + accountName.Substring(7 + i, 1);
                                        i++;
                                        accountNameTemp.Replace(" ", String.Empty);
                                    }
                                }
                                accountName = payrollID1 + "-" + accountNameTemp;

                            }
                            else {
                                accountName = accountName.Substring(0, accountName.Length);
                                if (accountName.Contains(" "))
                                {
                                    accountName.Replace(" ", String.Empty);
                                }
                                accountName = payrollID1 + "-" + accountName.Substring(0, accountName.Length);
                            }*/
                    }
                }
                else if (entity.Contains("sabre_candidateid") || entity.Contains("sabre_placementid") || entity.Contains("sabre_positionid"))
                {
                    //get sabre_idcontainer
                    var containerQuery = new QueryExpression("sabre_idcontainer");
                    containerQuery.ColumnSet = new ColumnSet("sabre_idcontainerid", "sabre_candidatefixednumbersize", "sabre_candidatenextnumber", "sabre_joborderfixednumbersize", "sabre_jobordernextnumber", "sabre_placementfixednumbersize", "sabre_placementnextnumber");
                    EntityCollection results = service.RetrieveMultiple(containerQuery);
                    if (results.Entities.Count() > 0)
                    {
                        if (results[0].Contains("sabre_candidatefixednumbersize") && results[0].Contains("sabre_placementfixednumbersize") && results[0].Contains("sabre_joborderfixednumbersize") && results[0].Contains("sabre_jobordernextnumber") && results[0].Contains("sabre_candidatenextnumber") && results[0].Contains("sabre_placementnextnumber"))
                        {
                            int nextNumber = 0;
                            int fixedSize = 0;
                            var myEntity = new Entity("sabre_idcontainer");
                            myEntity.Id = (Guid)results[0]["sabre_idcontainerid"];
                            myEntity.LogicalName = "sabre_idcontainer";
                            if (entity.Contains("sabre_placementid"))
                            {
                                nextNumber = Convert.ToInt32(Convert.ToString(results[0]["sabre_placementnextnumber"]));
                                fixedSize = Convert.ToInt32(Convert.ToString(results[0]["sabre_placementfixednumbersize"]));
                                myEntity.Attributes["sabre_placementnextnumber"] = (nextNumber + 1).ToString();
                                //get ATSCONFIG
                                var atsConfigQ = new QueryExpression("sabre_atsconfig");
                                atsConfigQ.ColumnSet = new ColumnSet("sabre_name", "sabre_placementprefix");
                                EntityCollection configResults = service.RetrieveMultiple(atsConfigQ);
                                if (configResults.Entities.Count() > 0)
                                {
                                    if (configResults[0].Contains("sabre_placementprefix"))
                                    {
                                        accountName = (string)configResults[0]["sabre_placementprefix"] + nextNumber.ToString().PadLeft(fixedSize, '0');
                                    }
                                }
                                else
                                {
                                    accountName = payrollID1 + nextNumber.ToString().PadLeft(fixedSize, '0');
                                } 
                            }
                            else if (entity.Contains("sabre_candidateid"))
                            {
                                nextNumber = Convert.ToInt32(Convert.ToString(results[0]["sabre_candidatenextnumber"]));
                                fixedSize = Convert.ToInt32(Convert.ToString(results[0]["sabre_candidatefixednumbersize"]));
                                myEntity.Attributes["sabre_candidatenextnumber"] = (nextNumber + 1).ToString();
                            }
                            else if (entity.Contains("sabre_positionid"))
                            {
                                nextNumber = Convert.ToInt32(Convert.ToString(results[0]["sabre_jobordernextnumber"]));
                                fixedSize = Convert.ToInt32(Convert.ToString(results[0]["sabre_joborderfixednumbersize"]));
                                myEntity.Attributes["sabre_jobordernextnumber"] = (nextNumber + 1).ToString();
                            }
                            else
                            {
                                throw new InvalidPluginExecutionException("Error, unable to retrieve next number and fixed size for record type");
                            }
                            //generate id from there
                            //accountName = payrollID1 + nextNumber.ToString().PadLeft(fixedSize, '0');
                            //update id counter
                            if (pluginContext.Depth <= 1)
                            {
                                service.Update(myEntity);
                            }

                        }
                    }
                }
                //end generate potential account name

                if (accountName != null && accountName != "") {
                    //Check if possible Customer Name is in use
                    var accountQuery = new QueryExpression(setupVariables["type"]);
                    if (setupVariables["mainField"] == "ZZZZZZZZZZZ")
                    {
                        accountQuery.ColumnSet = new ColumnSet(setupVariables["type"] + "id");
                    }
                    else
                    {
                        accountQuery.ColumnSet = new ColumnSet(setupVariables["mainField"], setupVariables["type"] + "id");
                    }
                    accountQuery.Criteria.AddCondition(setupVariables["mainIdField"], ConditionOperator.Equal, accountName);
                    if (entity.Contains(setupVariables["type"] + "id")) {
                        accountQuery.Criteria.AddCondition(setupVariables["type"] + "id", ConditionOperator.NotEqual, (Guid)entity[setupVariables["type"] + "id"]);
                    }

                        EntityCollection results = service.RetrieveMultiple(accountQuery);
                        if (results.Entities.Count() > 0)
                        {
                            //if yes then set editableName to true
                            var myEntity = new Entity(setupVariables["type"]);
                            myEntity.Attributes["sabre_editablename"] = true;
                            myEntity.LogicalName = setupVariables["type"];
                            myEntity.Attributes[setupVariables["mainIdField"]] = "";
                            if (entity.Contains(setupVariables["type"] + "id"))
                            {
                                myEntity.Id = (Guid)entity[setupVariables["type"] + "id"];
                                if (pluginContext.Depth <= 1)
                                {
                                    service.Update(myEntity);
                                }
                            }
                        }
                        else
                        {
                            var myEntity = new Entity(setupVariables["type"]);
                            myEntity.Attributes[setupVariables["mainIdField"]] = accountName;
                            myEntity.Attributes["sabre_editablename"] = false;
                            myEntity.LogicalName = setupVariables["type"];
                            if (entity.Contains(setupVariables["type"] + "id"))
                            {
                                myEntity.Id = (Guid)entity[setupVariables["type"] + "id"];
                                if (pluginContext.Depth <= 1)
                                {

                                    service.Update(myEntity);
                                }
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

        public void initAccountSetupVars()
        {
            setupVariables = new Dictionary<string, string>();
            setupVariables["type"] = "account";
            setupVariables["mainIdField"] = "accountnumber";
            setupVariables["mainField"] = "name";
        }
        //untested
        public void initCandidateSetupVars() {
            setupVariables = new Dictionary<string, string>();
            setupVariables["type"] = "sabre_candidate";
            setupVariables["mainIdField"] = "sabre_candidatenumber";
            setupVariables["mainField"] = "sabre_name";
        }
        //untested
        public void initPlacementSetupVars() {
            setupVariables = new Dictionary<string, string>();
            setupVariables["type"] = "sabre_placement";
            setupVariables["mainIdField"] = "sabre_name";
            setupVariables["mainField"] = "ZZZZZZZZZZZ"; //does not exist
        }
        //untested
        public void initJobOrderSetupVars() {
            setupVariables = new Dictionary<string, string>();
            setupVariables["type"] = "sabre_position";
            setupVariables["mainIdField"] = "sabre_name";
            setupVariables["mainField"] = "sabre_positiontitle";
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


            var entity = (Entity)pluginContext.PostEntityImages["PostUpdateImage"];

            if (entity.Contains("accountid"))
            {
                initAccountSetupVars();
            }
            else if (entity.Contains("sabre_candidateid"))
            {
                initCandidateSetupVars();
            }
            else if (entity.Contains("sabre_placementid"))
            {
                initPlacementSetupVars();
            }
            else if (entity.Contains("sabre_positionid"))
            {
                initJobOrderSetupVars();
            }
            else
            {
                throw new InvalidPluginExecutionException("ERROR TYPE NOT IDENTIFIED");
            }

            if (entity.Contains("accountid") && !entity.Contains("sabre_clientstatus")) {
                return;
            }
            else if (entity.Contains("accountid") && entity.Contains("sabre_clientstatus")) {
                var clientStatus = (OptionSetValue)entity["sabre_clientstatus"];
                if (!(clientStatus.Value == 837770001 || clientStatus.Value == 837770002)){
                    return;
                }
            }

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
                if (entity.Contains("accountid")) {
                    if (entity.Contains(setupVariables["mainIdField"]))
                    {
                        accountName = Convert.ToString(entity[setupVariables["mainIdField"]]);
                    }
                    else if (entity.Contains(setupVariables["mainField"]))
                    {
                        accountName = Convert.ToString(entity[setupVariables["mainField"]]);
                        var containerQuery = new QueryExpression("sabre_idcontainer");
                        containerQuery.ColumnSet = new ColumnSet("sabre_idcontainerid", "sabre_accountfixed", "sabre_accountnextnumber");
                        EntityCollection results = service.RetrieveMultiple(containerQuery);
                        if (results.Entities.Count() > 0)
                        {
                            if (results[0].Contains("sabre_accountfixed"))
                            {
                                int nextNumber = 0;
                                int fixedSize = 0;
                                var myEntity = new Entity("sabre_idcontainer");
                                myEntity.Id = (Guid)results[0]["sabre_idcontainerid"];
                                myEntity.LogicalName = "sabre_idcontainer";
                                nextNumber = Convert.ToInt32(Convert.ToString(results[0]["sabre_accountnextnumber"]));
                                fixedSize = Convert.ToInt32(Convert.ToString(results[0]["sabre_accountfixed"]));
                                myEntity.Attributes["sabre_accountnextnumber"] = (nextNumber + 1).ToString();
                                accountName = payrollID1 + "-" + nextNumber.ToString().PadLeft(fixedSize, '0');
                                //update id counter
                                if (pluginContext.Depth <= 1)
                                {
                                    service.Update(myEntity);
                                }
                            }
                        }
                        
                    }
                }
                else if(entity.Contains("sabre_candidateid") || entity.Contains("sabre_placementid") || entity.Contains("sabre_positionid")) {
                    if (entity.Contains(setupVariables["mainIdField"]) && Convert.ToString(entity[setupVariables["mainIdField"]]) != "" && Convert.ToString(entity[setupVariables["mainIdField"]]) != null)
                    {
                        return;
                    }
                    //get sabre_idcontainer
                    var containerQuery = new QueryExpression("sabre_idcontainer");
                    containerQuery.ColumnSet = new ColumnSet("sabre_idcontainerid", "sabre_candidatefixednumbersize", "sabre_candidatenextnumber", "sabre_joborderfixednumbersize", "sabre_jobordernextnumber", "sabre_placementfixednumbersize", "sabre_placementnextnumber");
                    EntityCollection results = service.RetrieveMultiple(containerQuery);
                    if (results.Entities.Count() > 0) {
                        if (results[0].Contains("sabre_candidatefixednumbersize") && results[0].Contains("sabre_placementfixednumbersize") && results[0].Contains("sabre_joborderfixednumbersize") && results[0].Contains("sabre_jobordernextnumber") && results[0].Contains("sabre_candidatenextnumber") && results[0].Contains("sabre_placementnextnumber"))
                        {
                            int nextNumber = 0;
                            int fixedSize = 0;
                            var myEntity = new Entity("sabre_idcontainer");
                            myEntity.Id = (Guid)results[0]["sabre_idcontainerid"];
                            myEntity.LogicalName = "sabre_idcontainer";
                            if (entity.Contains("sabre_placementid"))
                            {
                                nextNumber = Convert.ToInt32(Convert.ToString(results[0]["sabre_placementnextnumber"]));
                                fixedSize = Convert.ToInt32(Convert.ToString(results[0]["sabre_placementfixednumbersize"]));
                                myEntity.Attributes["sabre_placementnextnumber"] = (nextNumber + 1).ToString();
                                //get ATSCONFIG
                                var atsConfigQ = new QueryExpression("sabre_atsconfig");
                                atsConfigQ.ColumnSet = new ColumnSet("sabre_name", "sabre_placementprefix");
                                EntityCollection configResults = service.RetrieveMultiple(atsConfigQ);
                                if (configResults.Entities.Count() > 0)
                                {
                                    if (configResults[0].Contains("sabre_placementprefix"))
                                    {
                                        accountName = Convert.ToString(configResults[0]["sabre_placementprefix"]) + nextNumber.ToString().PadLeft(fixedSize, '0');
                                    }
                                }
                                else {
                                    accountName = payrollID1 + nextNumber.ToString().PadLeft(fixedSize, '0');
                                }
                            }
                            else if (entity.Contains("sabre_candidateid"))
                            {
                                nextNumber = Convert.ToInt32(Convert.ToString(results[0]["sabre_candidatenextnumber"]));
                                fixedSize = Convert.ToInt32(Convert.ToString(results[0]["sabre_candidatefixednumbersize"]));
                                myEntity.Attributes["sabre_candidatenextnumber"] = (nextNumber + 1).ToString();
                                accountName = payrollID1 + nextNumber.ToString().PadLeft(fixedSize, '0');
                            }
                            else if (entity.Contains("sabre_positionid"))
                            {
                                nextNumber = Convert.ToInt32(Convert.ToString(results[0]["sabre_jobordernextnumber"]));
                                fixedSize = Convert.ToInt32(Convert.ToString(results[0]["sabre_joborderfixednumbersize"]));
                                myEntity.Attributes["sabre_jobordernextnumber"] = (nextNumber + 1).ToString();
                                accountName = payrollID1 + nextNumber.ToString().PadLeft(fixedSize, '0');
                            }
                            else {
                                throw new InvalidPluginExecutionException("Error, unable to retrieve next number and fixed size for record type");
                            }
                            //generate id from there
                            //accountName = payrollID1 + nextNumber.ToString().PadLeft(fixedSize, '0');
                            //update id counter
                            if (pluginContext.Depth <= 1)
                            {
                                service.Update(myEntity);
                            }

                        }
                    }
                }

                //end generate potential account name
                if (accountName != null && accountName != "")
                {
                    //Check if possible Customer Name is in use
                    var accountQuery = new QueryExpression(setupVariables["type"]);
                    if (setupVariables["mainField"] == "ZZZZZZZZZ")
                    {
                        accountQuery.ColumnSet = new ColumnSet(setupVariables["type"] + "id");
                    }
                    else
                    {
                        accountQuery.ColumnSet = new ColumnSet(setupVariables["mainField"], setupVariables["type"] + "id");
                    }
                    accountQuery.Criteria.AddCondition(setupVariables["mainIdField"], ConditionOperator.Equal, accountName);
                    accountQuery.Criteria.AddCondition(setupVariables["mainIdField"], ConditionOperator.NotEqual, "");
                    if (entity.Contains(setupVariables["type"] + "id"))
                    {
                        accountQuery.Criteria.AddCondition(setupVariables["type"] + "id", ConditionOperator.NotEqual, (Guid)entity[setupVariables["type"] + "id"]);
                    }

                    EntityCollection results = service.RetrieveMultiple(accountQuery);
                    if (results.Entities.Count() > 0)
                    {
                        //if yes then set editableName to true
                        var myEntity = new Entity(setupVariables["type"]);
                        myEntity.Attributes["sabre_editablename"] = true;
                        myEntity.LogicalName = setupVariables["type"];
                        myEntity.Attributes[setupVariables["mainIdField"]] = "";
                        if (entity.Contains(setupVariables["type"] + "id"))
                        {
                            if (pluginContext.Depth <= 1) { 
                                myEntity.Id = (Guid)entity[setupVariables["type"] + "id"];
                                service.Update(myEntity);
                            }
                        }
                    }
                    else
                    {
                        var myEntity = new Entity(setupVariables["type"]);
                        myEntity.Attributes[setupVariables["mainIdField"]] = accountName;
                        myEntity.Attributes["sabre_editablename"] = false;
                        myEntity.LogicalName = setupVariables["type"];
                        if (entity.Contains(setupVariables["type"] + "id"))
                        {
                            if (pluginContext.Depth <= 1)
                            {
                                myEntity.Id = (Guid)entity[setupVariables["type"] + "id"];
                                service.Update(myEntity);
                            }
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

        public void initAccountSetupVars() {
            setupVariables = new Dictionary<string, string>();
            setupVariables["type"] = "account";
            setupVariables["mainIdField"] = "accountnumber";
            setupVariables["mainField"] = "name";
        }
        public void initCandidateSetupVars()
        {
            setupVariables = new Dictionary<string, string>();
            setupVariables["type"] = "sabre_candidate";
            setupVariables["mainIdField"] = "sabre_candidatenumber";
            setupVariables["mainField"] = "sabre_name";
        }
        public void initPlacementSetupVars()
        {
            setupVariables = new Dictionary<string, string>();
            setupVariables["type"] = "sabre_placement";
            setupVariables["mainIdField"] = "sabre_name";
            setupVariables["mainField"] = "ZZZZZZZZZ"; //does not exist
        }
        public void initJobOrderSetupVars()
        {
            setupVariables = new Dictionary<string, string>();
            setupVariables["type"] = "sabre_position";
            setupVariables["mainIdField"] = "sabre_name";
            setupVariables["mainField"] = "sabre_positiontitle";
        }
    }

    public class onUpdateCandidateBirthDate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var pluginContext = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var service = factory.CreateOrganizationService(pluginContext.UserId);
            var preImage = (Entity)pluginContext.PreEntityImages["PreUpdateImage"];
            var entity = (Entity)pluginContext.InputParameters["Target"];

            string type = "";

            if (preImage.Contains("sabre_candidateid")) //record is a candidate
            {
                type = "sabre_candidate";
            }
            else if (preImage.Contains("sabre_placementid")) //record is a placement
            {
                type = "sabre_placement";
            }
            if ((entity.Contains("sabre_dateofbirth") || entity.Contains("sabre_startdate")) && type == "sabre_candidate")
            {
                //determine if new dob or new startdate is causing an error
                var myEntity = new Entity("sabre_candidate");
                myEntity.Id = (Guid)preImage["sabre_candidateid"];
                myEntity.LogicalName = "sabre_candidate";
                if (entity.Contains("sabre_dateofbirth") && entity.Contains("sabre_startdate"))
                {
                    var candDOB = entity.Contains("sabre_dateofbirth") ? Convert.ToDateTime(entity["sabre_dateofbirth"]) : default(DateTime);
                    var candStartDate = entity.Contains("sabre_startdate") ? Convert.ToDateTime(entity["sabre_startdate"]) : default(DateTime);
                    if (candDOB.Year < 1900 || candStartDate.Year < 1900)
                    { //clearing Dob or std

                    }
                    else if (candDOB >= candStartDate)
                    { //this would be invalid
                        if (pluginContext.Depth <= 1)
                        {
                            myEntity.Attributes["sabre_startdate"] = null;
                            service.Update(myEntity);
                        }
                    }
                }
                else if (entity.Contains("sabre_dateofbirth"))
                {
                    var candDOB = entity.Contains("sabre_dateofbirth") ? Convert.ToDateTime(entity["sabre_dateofbirth"]) : default(DateTime);
                    var candStartDate = preImage.Contains("sabre_startdate") ? Convert.ToDateTime(preImage["sabre_startdate"]) : default(DateTime);
                    if (candDOB.Year < 1900 || candStartDate.Year < 1900)
                    {
                    }
                    else if (candDOB >= candStartDate)
                    {
                        if (pluginContext.Depth <= 1)
                        {
                            myEntity.Attributes["sabre_dateofbirth"] = null;
                            service.Update(myEntity);
                        }
                    }
                }
                else if (entity.Contains("sabre_startdate"))
                {
                    var candDOB = preImage.Contains("sabre_dateofbirth") ? Convert.ToDateTime(preImage["sabre_dateofbirth"]) : default(DateTime);
                    var candStartDate = entity.Contains("sabre_startdate") ? Convert.ToDateTime(entity["sabre_startdate"]) : default(DateTime);
                    if (candDOB.Year < 1900 || candStartDate.Year < 1900)
                    {
                    }
                    else if (candDOB >= candStartDate)
                    {
                        if (pluginContext.Depth <= 1)
                        {
                            myEntity.Attributes["sabre_startdate"] = null;
                            service.Update(myEntity);
                        }
                    }
                }
            }
            else if ((entity.Contains("sabre_actualstartdate") || entity.Contains("sabre_enddate")) && type == "sabre_placement")
            {
                var myEntity = new Entity("sabre_placement");
                myEntity.Id = (Guid)preImage["sabre_placementid"];
                myEntity.LogicalName = "sabre_placement";
                if (entity.Contains("sabre_actualstartdate") && entity.Contains("sabre_enddate"))
                {
                    var placStartDate = entity.Contains("sabre_actualstartdate") ? Convert.ToDateTime(entity["sabre_actualstartdate"]) : default(DateTime);
                    var placEndDate = entity.Contains("sabre_enddate") ? Convert.ToDateTime(entity["sabre_enddate"]) : default(DateTime);
                    if (placStartDate.Year < 1900 || placEndDate.Year < 1900)
                    { //clearing Dob or std

                    }
                    else if (placStartDate >= placEndDate)
                    { //this would be invalid
                        if (pluginContext.Depth <= 1)
                        {
                            myEntity.Attributes["sabre_enddate"] = null;
                            service.Update(myEntity);
                        }
                    }
                }
                else if (entity.Contains("sabre_actualstartdate"))
                {
                    var placStartDate = entity.Contains("sabre_actualstartdate") ? Convert.ToDateTime(entity["sabre_actualstartdate"]) : default(DateTime);
                    var placEndDate = preImage.Contains("sabre_enddate") ? Convert.ToDateTime(preImage["sabre_enddate"]) : default(DateTime);
                    if (placStartDate.Year < 1900 || placEndDate.Year < 1900)
                    {
                    }
                    else if (placStartDate >= placEndDate)
                    {
                        if (pluginContext.Depth <= 1)
                        {
                            myEntity.Attributes["sabre_actualstartdate"] = null;
                            service.Update(myEntity);
                        }
                    }
                }
                else if (entity.Contains("sabre_enddate"))
                {
                    var placStartDate = preImage.Contains("sabre_actualstartdate") ? Convert.ToDateTime(preImage["sabre_actualstartdate"]) : default(DateTime);
                    var placEndDate = entity.Contains("sabre_enddate") ? Convert.ToDateTime(entity["sabre_enddate"]) : default(DateTime);
                    if (placStartDate.Year < 1900 || placEndDate.Year < 1900)
                    {
                    }
                    else if (placStartDate >= placEndDate)
                    {
                        if (pluginContext.Depth <= 1)
                        {
                            myEntity.Attributes["sabre_enddate"] = null;
                            service.Update(myEntity);
                        }
                    }
                }
            }
        }
    }

    public class onCreateCandidateBirthDate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            ///throw new InvalidPluginExecutionException("WTFXXX");
            var pluginContext = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var service = factory.CreateOrganizationService(pluginContext.UserId);
            var entity = (Entity)pluginContext.PostEntityImages["PostUpdateImage"];

            string type = "";

            if (entity.Contains("sabre_candidateid")) //record is a candidate
            {
                type = "sabre_candidate";
            }
            else if (entity.Contains("sabre_placementid")) //record is a placement
            {
                type = "sabre_placement";
            }

            if ((entity.Contains("sabre_dateofbirth") || entity.Contains("sabre_startdate")) && type == "sabre_candidate")
            {
                //determine if new dob or new startdate is causing an error
                var myEntity = new Entity("sabre_candidate");
                myEntity.Id = (Guid)entity["sabre_candidateid"];
                myEntity.LogicalName = "sabre_candidate";

                if (entity.Contains("sabre_dateofbirth") && entity.Contains("sabre_startdate"))
                {
                    var candDOB = entity.Contains("sabre_dateofbirth") ? Convert.ToDateTime(entity["sabre_dateofbirth"]) : default(DateTime);
                    var candStartDate = entity.Contains("sabre_startdate") ? Convert.ToDateTime(entity["sabre_startdate"]) : default(DateTime);
                    if (candDOB.Year < 1900 || candStartDate.Year < 1900)
                    { //clearing Dob or std

                    }
                    else if (candDOB >= candStartDate)
                    { //this would be invalid
                        if (pluginContext.Depth <= 1)
                        {
                            myEntity.Attributes["sabre_startdate"] = null;
                            service.Update(myEntity);
                        }
                    }
                }
                else if (entity.Contains("sabre_dateofbirth"))
                {
                    var candDOB = entity.Contains("sabre_dateofbirth") ? Convert.ToDateTime(entity["sabre_dateofbirth"]) : default(DateTime);
                    var candStartDate = entity.Contains("sabre_startdate") ? Convert.ToDateTime(entity["sabre_startdate"]) : default(DateTime);
                    if (candDOB.Year < 1900 || candStartDate.Year < 1900)
                    {
                    }
                    else if (candDOB >= candStartDate)
                    {
                        if (pluginContext.Depth <= 1)
                        {
                            myEntity.Attributes["sabre_dateofbirth"] = null;
                            service.Update(myEntity);
                        }
                    }
                }
                else if (entity.Contains("sabre_startdate"))
                {
                    var candDOB = entity.Contains("sabre_dateofbirth") ? Convert.ToDateTime(entity["sabre_dateofbirth"]) : default(DateTime);
                    var candStartDate = entity.Contains("sabre_startdate") ? Convert.ToDateTime(entity["sabre_startdate"]) : default(DateTime);
                    if (candDOB.Year < 1900 || candStartDate.Year < 1900)
                    {
                    }
                    else if (candDOB >= candStartDate)
                    {
                        if (pluginContext.Depth <= 1)
                        {
                            myEntity.Attributes["sabre_startdate"] = null;
                            service.Update(myEntity);
                        }
                    }
                }
            }
            else if ((entity.Contains("sabre_actualstartdate") || entity.Contains("sabre_enddate")) && type == "sabre_placement")
            {
                var myEntity = new Entity("sabre_placement");
                myEntity.Id = (Guid)entity["sabre_placementid"];
                myEntity.LogicalName = "sabre_placement";
                if (entity.Contains("sabre_actualstartdate") && entity.Contains("sabre_enddate"))
                {
                    var placStartDate = entity.Contains("sabre_actualstartdate") ? Convert.ToDateTime(entity["sabre_actualstartdate"]) : default(DateTime);
                    var placEndDate = entity.Contains("sabre_enddate") ? Convert.ToDateTime(entity["sabre_enddate"]) : default(DateTime);
                    if (placStartDate.Year < 1900 || placEndDate.Year < 1900)
                    { //clearing Dob or std

                    }
                    else if (placStartDate >= placEndDate)
                    { //this would be invalid
                        if (pluginContext.Depth <= 1)
                        {
                            myEntity.Attributes["sabre_enddate"] = null;
                            service.Update(myEntity);
                        }
                    }
                }
                else if (entity.Contains("sabre_actualstartdate"))
                {
                    var placStartDate = entity.Contains("sabre_actualstartdate") ? Convert.ToDateTime(entity["sabre_actualstartdate"]) : default(DateTime);
                    var placEndDate = entity.Contains("sabre_enddate") ? Convert.ToDateTime(entity["sabre_enddate"]) : default(DateTime);
                    if (placStartDate.Year < 1900 || placEndDate.Year < 1900)
                    {
                    }
                    else if (placStartDate >= placEndDate)
                    {
                        if (pluginContext.Depth <= 1)
                        {
                            myEntity.Attributes["sabre_actualstartdate"] = null;
                            service.Update(myEntity);
                        }
                    }
                }
                else if (entity.Contains("sabre_enddate"))
                {
                    var placStartDate = entity.Contains("sabre_actualstartdate") ? Convert.ToDateTime(entity["sabre_actualstartdate"]) : default(DateTime);
                    var placEndDate = entity.Contains("sabre_enddate") ? Convert.ToDateTime(entity["sabre_enddate"]) : default(DateTime);
                    if (placStartDate.Year < 1900 || placEndDate.Year < 1900)
                    {
                    }
                    else if (placStartDate >= placEndDate)
                    {
                        if (pluginContext.Depth <= 1)
                        {
                            myEntity.Attributes["sabre_enddate"] = null;
                            service.Update(myEntity);
                        }
                    }
                }
            }
        }
    }

}
