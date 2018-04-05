// =====================================================================
//  This file is part of the Microsoft CRM SDK Code Samples.
//
//  Copyright (C) Microsoft Corporation.  All rights reserved.
//
//  This source code is intended only as a supplement to Microsoft
//  Development Tools and/or on-line documentation.  See these other
//  materials for detailed information regarding Microsoft code samples.
//
//  THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY
//  KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
//  IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//  PARTICULAR PURPOSE.
// =====================================================================

//<snippetSharedVariablesPlugin>
using System;

// Microsoft Dynamics CRM namespace(s)
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Crm.Sdk.Messages;
using System.IO;
using System.IO.Compression;
using System.Xml.Serialization;
using System.Xml;
using ParseResume.ResumeService;
using System.Text;
using System.Web.Script.Serialization;
using System.Collections;

namespace Microsoft.Crm.Sdk.Samples
{
    /// <summary>
    /// A plug-in that sends data to another plug-in through the SharedVariables
    /// property of IPluginExecutionContext.
    /// </summary>
    /// <remarks>Register the PreEventPlugin for a pre-operation stage and the 
    /// PostEventPlugin plug-in on a post-operation stage.
    /// </remarks>
    public class PreEventResumePlugin : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {

            var organizationServiceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var pluginContext = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            var orgService = organizationServiceFactory.CreateOrganizationService(pluginContext.UserId);




            // Obtain the execution context from the service provider.
            /* Microsoft.Xrm.Sdk.IPluginExecutionContext context = (Microsoft.Xrm.Sdk.IPluginExecutionContext)
                 serviceProvider.GetService(typeof(Microsoft.Xrm.Sdk.IPluginExecutionContext));

             // Create or retrieve some data that will be needed by the post event
             // plug-in. You could run a query, create an entity, or perform a calculation.
             //In this sample, the data to be passed to the post plug-in is
             // represented by a GUID.
             Guid contact = new Guid("{74882D5C-381A-4863-A5B9-B8604615C2D0}");

             // Pass the data to the post event plug-in in an execution context shared
             // variable named PrimaryContact.
             context.SharedVariables.Add("PrimaryContact", (Object)contact.ToString());*/
        }
    }

    public class PostEventResumePlugin : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var organizationServiceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var pluginContext = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            var orgService = organizationServiceFactory.CreateOrganizationService(pluginContext.UserId);
            var entityCollection = new EntityCollection();
            var entity = new Entity("sabre_dummy");
            Guid id = new Guid();
            //EntityCollection resultCollection = (EntityCollection)pluginContext.OutputParameters["BusinessEntityCollection"];//convert for create
            Guid result = (Guid)pluginContext.OutputParameters["id"]; //convert for create
            Entity resultEntity = orgService.Retrieve("sabre_dummy", result, new ColumnSet(true) ); //convert for create

            EntityCollection resultCollection = new EntityCollection(); //convert for create
            //entity = new Entity("sabre_dummy");
            //if (resultCollection.Entities.Count > 0)  //convert for create
            //{    //convert for create
                //Entity resultEntity = resultCollection.Entities[0]; //convert for create

                if (resultEntity["sabre_data"] != null)
                {
                    //Note will contain a subject indicating that it is a resume and additionally some content in base 64 form to be sent to the parser service
                    Entity Note = new Entity("annotation");
                    Guid targetGuid = Guid.Parse((string)resultEntity["sabre_data"]);
                    ColumnSet attributes = new ColumnSet(new string[] { "subject", "documentbody", "filename" });
                    Note = orgService.Retrieve("annotation", targetGuid, attributes);
                    //resultEntity["sabre_data"] = Note.Attributes["filename"];/*  ####WORKS FINE*/
                    //public string ParseResume(string filePath, string userKey, string version, string subUserId, string fileName)


                    ///////FAKE, FOR TESTING ONLY
                    /*Resume res = null;
                    string path = "C:\\!Installed Software\\HRxmloutput.xml";
                    XmlSerializer serializer = new XmlSerializer(typeof(Resume));
                    StreamReader reader = new StreamReader(path);
                    res = (Resume)serializer.Deserialize(reader);
                    reader.Close();
                    if (res != null)
                    {
                        resultCollection.Entities.Clear();
                        resultEntity["sabre_name"] = "123456";
                        resultEntity["sabre_data"] = "testing purposes only";
                        resultEntity["sabre_data2"] = new JavaScriptSerializer().Serialize(res);// res.StructuredXMLResume.ContactInfo.PersonName;
                    }*/


                    //////////// ACTUAL PARSING BLOCK COMMENTED OUT FOR TESTING PURPOSES
                    if (Note.Attributes["documentbody"] != null)
                    {
                    var results = ParseResume((String)Note.Attributes["documentbody"]);//PARSE RESUME

                        //File.WriteAllBytes(@"c:\yourfile", Convert.FromBase64String(yourBase64String));
                        if (results != null)
                        {
                            resultCollection.Entities.Clear();

                            resultEntity["sabre_name"] = results.CreditsRemaining.ToString();
                            resultEntity["sabre_data"] = results.Text;

                            //next section taxes the XML output and converts it into a usable object for the client-side Javascript to utilize
                            ////Resume res;
                            ////XmlSerializer serializer = new XmlSerializer(typeof(Resume));
                            //stream setup for xml string
                            //byte[] byteArray = Encoding.UTF8.GetBytes(results.Xml);
                            //MemoryStream stream = new MemoryStream(byteArray);
                            //StreamReader reader = new StreamReader((Stream)stream, System.Text.Encoding.UTF8);
                            ////StringReader reader = new StringReader(results.Xml);

                            ////res = (Resume)serializer.Deserialize(reader);
                            //new shit for results.xml
                            String resultsText = results.Xml;
                            if (results.Xml.Length > 4 && Char.Equals(results.Xml[0], '"'))
                            {
                                resultsText = resultsText.Substring(1, resultsText.Length - 2);
                            }
                            //newshit end

                            //reader.Close();
                            resultEntity["sabre_data2"] = resultsText;////new JavaScriptSerializer().Serialize(res);//////results.Xml;///////res;
                        }
                        else
                        {
                            resultEntity["sabre_name"] = "RESULTS IS NULL.";
                        }
                    }
                    ///////////////END ACTUAL PARSING BLOCK
                }
                else
                {
                    resultEntity["sabre_data"] = "TESTING";
                }
            if (pluginContext.Depth <= 1)
            {
                orgService.Update(resultEntity);//convert for create
            }
                resultCollection.Entities.Add(resultEntity);
            //} //convert for create 


            id = new Guid();
            //entity.Id = id;
            //entity.Attributes.Add("sabre_dummyid", id);

            
            //entity.Attributes.Add("sabre_name", pluginContext.InputParameters.Count);
            //resultCollection.Entities.Add(entity);
            /*entity = new Entity("sabre_dummy");
            id = new Guid();
            entity.Id = id;
            entity.Attributes.Add("sabre_dummyid", id);
            entity.Attributes.Add("sabre_data", "qwerty");
            entity.Attributes.Add("sabre_name", "somethingelse");
            resultCollection.Entities.Add(entity);*/
            //pluginContext.OutputParameters["BusinessEntityCollection"] = resultCollection; //convert for create
            // entity["sabre_name"] = "Hello World";// populate whatever you want to return.
            // entity["sabre_data"] = "somethingelse";
            //entityCollection.Entities.Add(entity);
            //  pluginContext.OutputParameters["BusinessEntityCollection"] = entityCollection;//////////
            // Obtain the execution context from the service provider.
            //  Microsoft.Xrm.Sdk.IPluginExecutionContext context = (Microsoft.Xrm.Sdk.IPluginExecutionContext)
            //      serviceProvider.GetService(typeof(Microsoft.Xrm.Sdk.IPluginExecutionContext));

            // Obtain the contact from the execution context shared variables.
            //  if (context.SharedVariables.Contains("PrimaryContact"))
            //  {
            //      Guid contact =
            //          new Guid((string)context.SharedVariables["PrimaryContact"]);

            // Do something with the contact.
            //  }
        }
        private static ParsingService.ParseResumeResponse ParseResume(string base64String)
        {
            //string thePath = "Resume.txt";
            //File.WriteAllBytes(thePath, Convert.FromBase64String(base64String));
            // Load the resume into a byte array. These bytes could be from a web
            // page file upload, a database, or any other source. It is a file
            // in this example only for the sake of keeping this sample simple.
            // We recommend using the binary data to avoid common character
            // encoding issues when reading the file as a string.
            //ORIGINAL byte[] fileBytes = File.ReadAllBytes("Resume.txt");
            byte[] fileBytes = System.Convert.FromBase64String(base64String);

            // Optionally, compress the bytes to reduce network delays
            //fileBytes = Gzip(fileBytes);

            ParsingService.ParsingService client = new ParsingService.ParsingService();

            ParsingService.ParseResumeRequest request = new ParsingService.ParseResumeRequest
            {
                // Required parameters
                AccountId = "30121877",
                ServiceKey = "3/obWbDBSxhoObqWWBlb7qhlaVEMbFAlNcVBk7Ry",
                FileBytes = fileBytes

                // Optional parameters
                //Configuration = "", // Paste string from Parser Config String Builder.xls spreadsheet
                //OutputHtml = true, // Convert to HTML
                //OutputRtf = true, // Convert to RTF
                //OutputWordXml = true, // Convert to WordXml
                //RevisionDate = "2011-05-15", // Parse assuming a historical date for "current"
            };

            // Perform the parse. The first request will be slow due to WCF initializing
            // the connection and SOAP/XML serialization, but subsequent calls will be fast.
            ParsingService.ParseResumeResponse response = client.ParseResume(request);

            // Display the results
            //Console.OutputEncoding = Encoding.UTF8;
            //Console.WriteLine("Code=" + response.Code);
            //Console.WriteLine("SubCode=" + response.SubCode);
            //Console.WriteLine("Message=" + response.Message);
            //Console.WriteLine("TextCode=" + response.TextCode);
            //Console.WriteLine("CreditsRemaining=" + response.CreditsRemaining);
            //Console.WriteLine("-----");
            //Console.WriteLine(response.Xml);
            return response;
        }
        static byte[] Gzip(byte[] bytes)
        {
            if (bytes == null)
            {
                return new byte[0];
            }
            if (bytes.Length == 0)
            {
                return bytes;
            }
            using (MemoryStream memStream = new MemoryStream(bytes.Length / 2))
            {
                using (GZipStream gzipStream = new GZipStream(memStream, CompressionMode.Compress))
                {
                    gzipStream.Write(bytes, 0, bytes.Length);
                }
                return memStream.ToArray();
            }
        }
    }
}
//</snippetSharedVariablesPlugin>
