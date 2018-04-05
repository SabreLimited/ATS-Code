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
            //var tracer = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var service = factory.CreateOrganizationService(context.UserId);

            try
            {
                var jobOrdersGuids = (string)context.InputParameters["JobOrdersGuids"];
                var candidateGuids = (string)context.InputParameters["CandidateGuids"];
                var startDate = (DateTime)context.InputParameters["StartDate"];
                var endDate = (DateTime)context.InputParameters["EndDate"];

                startDate = GetCurrentUsersDateTime(service, startDate);
                endDate = GetCurrentUsersDateTime(service, endDate);

                var jobOrders = jobOrdersGuids.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                var candidates = candidateGuids.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

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
                    var availableOpenings = service
                        .Retrieve("sabre_position", new Guid(jobOrder), new ColumnSet("sabre_availableopenings"))
                            .GetAttributeValue<int>("sabre_availableopenings");

                    var query = new QueryExpression("sabre_placement");
                    query.Criteria.AddCondition("sabre_posistion", ConditionOperator.Equal, new Guid(jobOrder));

                    var totalPlacementsPerOrder = service.RetrieveMultiple(query).Entities.Count;

                    foreach (var candidate in candidates.Take(availableOpenings - totalPlacementsPerOrder))
                    {
                        var jobOrderRecord = new Entity("sabre_placement")
                        {
                            ["sabre_candidate"] = new EntityReference("sabre_candidate", new Guid(candidate)),
                            ["sabre_posistion"] = new EntityReference("sabre_position", new Guid(jobOrder)),
                            ["sabre_enddate"] = endDate,
                            ["sabre_actualstartdate"] = startDate
                        };

                        if (executeMultiple.Requests.Count > 900)
                        {
                            ExecuteRequest(service, executeMultiple);
                            executeMultiple.Requests.Clear();
                        }

                        executeMultiple.Requests.Add(new CreateRequest
                        {
                            Target = jobOrderRecord
                        });
                    }
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

