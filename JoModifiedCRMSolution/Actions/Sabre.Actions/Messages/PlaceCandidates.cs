using System;
using System.Linq;
using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;

namespace Sabre.Actions.Messages
{
    public class PlaceCandidates : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            //sab-jo 6/7/2017 Removed Requirement for Date/Cost fields
            //var tracer = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var service = factory.CreateOrganizationService(context.UserId);

            try
            {
                var jobOrdersGuids = (string)context.InputParameters["JobOrdersGuids"];
                var candidateGuids = (string)context.InputParameters["CandidateGuids"];
                var startDate = new DateTime();
                var endDate = new DateTime();
                var skipStartDate = false;
                var skipEndDate = false;
                if (context.InputParameters.Contains("StartDate")) {
                    startDate = (DateTime)context.InputParameters["StartDate"];
                    startDate = GetCurrentUsersDateTime(service, startDate);
                }
                else {
                    skipStartDate = true;
                }
                if (context.InputParameters.Contains("EndDate")) {
                    endDate = (DateTime)context.InputParameters["EndDate"];
                    endDate = GetCurrentUsersDateTime(service, endDate);
                } else {
                    skipEndDate = true;
                }
                //var startDate = (DateTime)context.InputParameters["StartDate"];
                //var endDate = (DateTime)context.InputParameters["EndDate"];
                var payRate = "";
                //sab-jo 6/7/2017
                if (context.InputParameters.Contains("PayRate")) {
                    payRate = (string)context.InputParameters["PayRate"];
                }
                var billRate = "";

                if (context.InputParameters.Contains("BillRate"))
                {
                    billRate = (string)context.InputParameters["BillRate"];//SAB-Jo 15/05/2017
                }

                
                var jobOrders = jobOrdersGuids.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                var candidates = candidateGuids.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

                var payRateVal = 0.0;
                var billRateVal = 0.0;

                Double.TryParse(payRate, out payRateVal);
                Double.TryParse(billRate, out billRateVal);

                var executeMultiple = new ExecuteMultipleRequest
                {
                    Requests = new OrganizationRequestCollection(),
                    Settings = new ExecuteMultipleSettings
                    {
                        ContinueOnError = false,
                        ReturnResponses = true
                    }
                };

                foreach (var jobOrder in jobOrders)
                {

                    //SAB-Jo 15/05/2017 //base number of candidates to fill on openigns that are 'Open'
                    //SAB-Jo 26/06/2017 //Base number of candidates to fill on AvailableOpenings field on Job instead
                    var query = new QueryExpression("sabre_position");
                    query.Criteria.AddCondition("sabre_positionid", ConditionOperator.Equal, new Guid(jobOrder));
                    query.ColumnSet = new ColumnSet();
                    query.ColumnSet.Columns.Add("sabre_availableopenings");
                    if (service.RetrieveMultiple(query).Entities.Count > 0) {
                        var availableOpenings = service.RetrieveMultiple(query).Entities[0].GetAttributeValue<int>("sabre_availableopenings");
                        var i = 0;
                        if (availableOpenings > candidates.Length)
                            availableOpenings = candidates.Length;

                        foreach (var candidate in candidates.Take(availableOpenings))
                        {
                            var jobOrderRecord = new Entity("sabre_placement")
                            {
                                ["sabre_candidate"] = new EntityReference("sabre_candidate", new Guid(candidate)),
                                ["sabre_posistion"] = new EntityReference("sabre_position", new Guid(jobOrder)),
                                ["sabre_regularwages"] = new Money(Convert.ToDecimal(payRateVal)),
                                ["sabre_regularchargerate"] = new Money(Convert.ToDecimal(billRateVal))
                            };
                            if (skipEndDate == false)
                            {
                                jobOrderRecord["sabre_enddate"] = endDate;
                            }
                            if (skipStartDate == false)
                            {
                                jobOrderRecord["sabre_actualstartdate"] = startDate;
                            }
                            /*var jobOrderRecord = new Entity("sabre_placement")
                            {
                                ["sabre_candidate"] = new EntityReference("sabre_candidate", new Guid(candidate)),
                                ["sabre_posistion"] = new EntityReference("sabre_position", new Guid(jobOrder)),
                                ["sabre_enddate"] = endDate,
                                ["sabre_actualstartdate"] = startDate,
                                ["sabre_regularwages"] = new Money(Convert.ToDecimal(payRateVal)),
                                ["sabre_regularchargerate"] = new Money(Convert.ToDecimal(billRateVal))
                            };*/
                            i++;
                            //END Sab-Jo 15/05/2017
                            if (executeMultiple.Requests.Count > 900)
                            {
                                ExecuteRequest(service, executeMultiple);
                                executeMultiple.Requests.Clear();
                            }
                            if (context.Depth <= 1)
                            {
                                executeMultiple.Requests.Add(new CreateRequest
                                {
                                    Target = jobOrderRecord
                                });
                            }
                        }
                    }//END Sab-Jo 26/06/2017
                }

                if (executeMultiple.Requests.Count > 0)
                {
                    ExecuteRequest(service, executeMultiple);
                }

            }
            catch (Exception ex)
            {
                context.OutputParameters["Response"] = ex.Message;
                throw new InvalidPluginExecutionException(ex.Message);
            }
        }

        private void ExecuteRequest(IOrganizationService service, ExecuteMultipleRequest request)
        {
            var response = (ExecuteMultipleResponse)service.Execute(request);

            if (response.IsFaulted)
            {
            }
        }

        public static DateTime GetCurrentUsersDateTime(IOrganizationService service, DateTime dateTime)
        {
            try
            {
                var timeZoneCode = 125;

                var request = new LocalTimeFromUtcTimeRequest
                {
                    TimeZoneCode = timeZoneCode,
                    UtcTime = dateTime.ToUniversalTime()
                };

                var response = (LocalTimeFromUtcTimeResponse)service.Execute(request);

                return response.LocalTime;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message + Environment.NewLine + "Error in method GetCurrentUsersDateTime (dateTime: " + dateTime + ");");
            }
        }
    }
}

