﻿namespace Microsoft.Crm.Sdk.Samples
{

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "http://ns.hr-xml.org/2006-02-28", IsNullable = false)]
    public partial class Resume
    {

        private ResumeResumeId resumeIdField;

        private ResumeStructuredXMLResume structuredXMLResumeField;

        private ResumeNonXMLResume nonXMLResumeField;

        private ResumeUserArea userAreaField;

        private string langField;

        /// <remarks/>
        public ResumeResumeId ResumeId
        {
            get
            {
                return this.resumeIdField;
            }
            set
            {
                this.resumeIdField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResume StructuredXMLResume
        {
            get
            {
                return this.structuredXMLResumeField;
            }
            set
            {
                this.structuredXMLResumeField = value;
            }
        }

        /// <remarks/>
        public ResumeNonXMLResume NonXMLResume
        {
            get
            {
                return this.nonXMLResumeField;
            }
            set
            {
                this.nonXMLResumeField = value;
            }
        }

        /// <remarks/>
        public ResumeUserArea UserArea
        {
            get
            {
                return this.userAreaField;
            }
            set
            {
                this.userAreaField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute(Form = System.Xml.Schema.XmlSchemaForm.Qualified, Namespace = "http://www.w3.org/XML/1998/namespace")]
        public string lang
        {
            get
            {
                return this.langField;
            }
            set
            {
                this.langField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeResumeId
    {

        private string idValueField;

        /// <remarks/>
        public string IdValue
        {
            get
            {
                return this.idValueField;
            }
            set
            {
                this.idValueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResume
    {

        private ResumeStructuredXMLResumeContactInfo contactInfoField;

        private string executiveSummaryField;

        private string objectiveField;

        private ResumeStructuredXMLResumeEmployerOrg[] employmentHistoryField;

        private ResumeStructuredXMLResumeSchoolOrInstitution[] educationHistoryField;

        private ResumeStructuredXMLResumeLicenseOrCertification[] licensesAndCertificationsField;

        private ResumeStructuredXMLResumeMilitaryHistory militaryHistoryField;

        private ResumeStructuredXMLResumePatent[] patentHistoryField;

        private ResumeStructuredXMLResumePublicationHistory publicationHistoryField;

        private ResumeStructuredXMLResumeSpeakingEvent[] speakingEventsHistoryField;

        private ResumeStructuredXMLResumeQualifications qualificationsField;

        private ResumeStructuredXMLResumeLanguage[] languagesField;

        private ResumeStructuredXMLResumeAchievement[] achievementsField;

        private ResumeStructuredXMLResumeAssociation[] associationsField;

        private ResumeStructuredXMLResumeReference[] referencesField;

        private ResumeStructuredXMLResumeSecurityCredential[] securityCredentialsField;

        private string commentsField;

        private string revisionDateField;

        /// <remarks/>
        public ResumeStructuredXMLResumeContactInfo ContactInfo
        {
            get
            {
                return this.contactInfoField;
            }
            set
            {
                this.contactInfoField = value;
            }
        }

        /// <remarks/>
        public string ExecutiveSummary
        {
            get
            {
                return this.executiveSummaryField;
            }
            set
            {
                this.executiveSummaryField = value;
            }
        }

        /// <remarks/>
        public string Objective
        {
            get
            {
                return this.objectiveField;
            }
            set
            {
                this.objectiveField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("EmployerOrg", IsNullable = false)]
        public ResumeStructuredXMLResumeEmployerOrg[] EmploymentHistory
        {
            get
            {
                return this.employmentHistoryField;
            }
            set
            {
                this.employmentHistoryField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("SchoolOrInstitution", IsNullable = false)]
        public ResumeStructuredXMLResumeSchoolOrInstitution[] EducationHistory
        {
            get
            {
                return this.educationHistoryField;
            }
            set
            {
                this.educationHistoryField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("LicenseOrCertification", IsNullable = false)]
        public ResumeStructuredXMLResumeLicenseOrCertification[] LicensesAndCertifications
        {
            get
            {
                return this.licensesAndCertificationsField;
            }
            set
            {
                this.licensesAndCertificationsField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeMilitaryHistory MilitaryHistory
        {
            get
            {
                return this.militaryHistoryField;
            }
            set
            {
                this.militaryHistoryField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("Patent", IsNullable = false)]
        public ResumeStructuredXMLResumePatent[] PatentHistory
        {
            get
            {
                return this.patentHistoryField;
            }
            set
            {
                this.patentHistoryField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistory PublicationHistory
        {
            get
            {
                return this.publicationHistoryField;
            }
            set
            {
                this.publicationHistoryField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("SpeakingEvent", IsNullable = false)]
        public ResumeStructuredXMLResumeSpeakingEvent[] SpeakingEventsHistory
        {
            get
            {
                return this.speakingEventsHistoryField;
            }
            set
            {
                this.speakingEventsHistoryField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeQualifications Qualifications
        {
            get
            {
                return this.qualificationsField;
            }
            set
            {
                this.qualificationsField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("Language", IsNullable = false)]
        public ResumeStructuredXMLResumeLanguage[] Languages
        {
            get
            {
                return this.languagesField;
            }
            set
            {
                this.languagesField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("Achievement", IsNullable = false)]
        public ResumeStructuredXMLResumeAchievement[] Achievements
        {
            get
            {
                return this.achievementsField;
            }
            set
            {
                this.achievementsField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("Association", IsNullable = false)]
        public ResumeStructuredXMLResumeAssociation[] Associations
        {
            get
            {
                return this.associationsField;
            }
            set
            {
                this.associationsField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("Reference", IsNullable = false)]
        public ResumeStructuredXMLResumeReference[] References
        {
            get
            {
                return this.referencesField;
            }
            set
            {
                this.referencesField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("SecurityCredential", IsNullable = false)]
        public ResumeStructuredXMLResumeSecurityCredential[] SecurityCredentials
        {
            get
            {
                return this.securityCredentialsField;
            }
            set
            {
                this.securityCredentialsField = value;
            }
        }

        /// <remarks/>
        public string Comments
        {
            get
            {
                return this.commentsField;
            }
            set
            {
                this.commentsField = value;
            }
        }

        /// <remarks/>
        public string RevisionDate
        {
            get
            {
                return this.revisionDateField;
            }
            set
            {
                this.revisionDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeContactInfo
    {

        private ResumeStructuredXMLResumeContactInfoPersonName personNameField;

        private ResumeStructuredXMLResumeContactInfoContactMethod[] contactMethodField;

        /// <remarks/>
        public ResumeStructuredXMLResumeContactInfoPersonName PersonName
        {
            get
            {
                return this.personNameField;
            }
            set
            {
                this.personNameField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("ContactMethod")]
        public ResumeStructuredXMLResumeContactInfoContactMethod[] ContactMethod
        {
            get
            {
                return this.contactMethodField;
            }
            set
            {
                this.contactMethodField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeContactInfoPersonName
    {

        private string formattedNameField;

        private string givenNameField;

        private string preferredGivenNameField;

        private string middleNameField;

        private string familyNameField;

        private ResumeStructuredXMLResumeContactInfoPersonNameAffix affixField;

        /// <remarks/>
        public string FormattedName
        {
            get
            {
                return this.formattedNameField;
            }
            set
            {
                this.formattedNameField = value;
            }
        }

        /// <remarks/>
        public string GivenName
        {
            get
            {
                return this.givenNameField;
            }
            set
            {
                this.givenNameField = value;
            }
        }

        /// <remarks/>
        public string PreferredGivenName
        {
            get
            {
                return this.preferredGivenNameField;
            }
            set
            {
                this.preferredGivenNameField = value;
            }
        }

        /// <remarks/>
        public string MiddleName
        {
            get
            {
                return this.middleNameField;
            }
            set
            {
                this.middleNameField = value;
            }
        }

        /// <remarks/>
        public string FamilyName
        {
            get
            {
                return this.familyNameField;
            }
            set
            {
                this.familyNameField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeContactInfoPersonNameAffix Affix
        {
            get
            {
                return this.affixField;
            }
            set
            {
                this.affixField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeContactInfoPersonNameAffix
    {

        private string typeField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeContactInfoContactMethod
    {

        private string useField;

        private string locationField;

        private string whenAvailableField;

        private ResumeStructuredXMLResumeContactInfoContactMethodTelephone telephoneField;

        private ResumeStructuredXMLResumeContactInfoContactMethodMobile mobileField;

        private ResumeStructuredXMLResumeContactInfoContactMethodFax faxField;

        private ResumeStructuredXMLResumeContactInfoContactMethodPager pagerField;

        private ResumeStructuredXMLResumeContactInfoContactMethodTTYTDD tTYTDDField;

        private string internetEmailAddressField;

        private string internetWebAddressField;

        private ResumeStructuredXMLResumeContactInfoContactMethodPostalAddress postalAddressField;

        /// <remarks/>
        public string Use
        {
            get
            {
                return this.useField;
            }
            set
            {
                this.useField = value;
            }
        }

        /// <remarks/>
        public string Location
        {
            get
            {
                return this.locationField;
            }
            set
            {
                this.locationField = value;
            }
        }

        /// <remarks/>
        public string WhenAvailable
        {
            get
            {
                return this.whenAvailableField;
            }
            set
            {
                this.whenAvailableField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeContactInfoContactMethodTelephone Telephone
        {
            get
            {
                return this.telephoneField;
            }
            set
            {
                this.telephoneField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeContactInfoContactMethodMobile Mobile
        {
            get
            {
                return this.mobileField;
            }
            set
            {
                this.mobileField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeContactInfoContactMethodFax Fax
        {
            get
            {
                return this.faxField;
            }
            set
            {
                this.faxField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeContactInfoContactMethodPager Pager
        {
            get
            {
                return this.pagerField;
            }
            set
            {
                this.pagerField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeContactInfoContactMethodTTYTDD TTYTDD
        {
            get
            {
                return this.tTYTDDField;
            }
            set
            {
                this.tTYTDDField = value;
            }
        }

        /// <remarks/>
        public string InternetEmailAddress
        {
            get
            {
                return this.internetEmailAddressField;
            }
            set
            {
                this.internetEmailAddressField = value;
            }
        }

        /// <remarks/>
        public string InternetWebAddress
        {
            get
            {
                return this.internetWebAddressField;
            }
            set
            {
                this.internetWebAddressField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeContactInfoContactMethodPostalAddress PostalAddress
        {
            get
            {
                return this.postalAddressField;
            }
            set
            {
                this.postalAddressField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeContactInfoContactMethodTelephone
    {

        private byte internationalCountryCodeField;

        private bool internationalCountryCodeFieldSpecified;

        private object nationalNumberField;

        private ushort areaCityCodeField;

        private bool areaCityCodeFieldSpecified;

        private string subscriberNumberField;

        private byte extensionField;

        private bool extensionFieldSpecified;

        private string formattedNumberField;

        /// <remarks/>
        public byte InternationalCountryCode
        {
            get
            {
                return this.internationalCountryCodeField;
            }
            set
            {
                this.internationalCountryCodeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool InternationalCountryCodeSpecified
        {
            get
            {
                return this.internationalCountryCodeFieldSpecified;
            }
            set
            {
                this.internationalCountryCodeFieldSpecified = value;
            }
        }

        /// <remarks/>
        public object NationalNumber
        {
            get
            {
                return this.nationalNumberField;
            }
            set
            {
                this.nationalNumberField = value;
            }
        }

        /// <remarks/>
        public ushort AreaCityCode
        {
            get
            {
                return this.areaCityCodeField;
            }
            set
            {
                this.areaCityCodeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool AreaCityCodeSpecified
        {
            get
            {
                return this.areaCityCodeFieldSpecified;
            }
            set
            {
                this.areaCityCodeFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string SubscriberNumber
        {
            get
            {
                return this.subscriberNumberField;
            }
            set
            {
                this.subscriberNumberField = value;
            }
        }

        /// <remarks/>
        public byte Extension
        {
            get
            {
                return this.extensionField;
            }
            set
            {
                this.extensionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ExtensionSpecified
        {
            get
            {
                return this.extensionFieldSpecified;
            }
            set
            {
                this.extensionFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string FormattedNumber
        {
            get
            {
                return this.formattedNumberField;
            }
            set
            {
                this.formattedNumberField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeContactInfoContactMethodMobile
    {

        private string formattedNumberField;

        /// <remarks/>
        public string FormattedNumber
        {
            get
            {
                return this.formattedNumberField;
            }
            set
            {
                this.formattedNumberField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeContactInfoContactMethodFax
    {

        private string formattedNumberField;

        /// <remarks/>
        public string FormattedNumber
        {
            get
            {
                return this.formattedNumberField;
            }
            set
            {
                this.formattedNumberField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeContactInfoContactMethodPager
    {

        private string formattedNumberField;

        /// <remarks/>
        public string FormattedNumber
        {
            get
            {
                return this.formattedNumberField;
            }
            set
            {
                this.formattedNumberField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeContactInfoContactMethodTTYTDD
    {

        private string formattedNumberField;

        /// <remarks/>
        public string FormattedNumber
        {
            get
            {
                return this.formattedNumberField;
            }
            set
            {
                this.formattedNumberField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeContactInfoContactMethodPostalAddress
    {

        private string countryCodeField;

        private string postalCodeField;

        private string regionField;

        private string municipalityField;

        private ResumeStructuredXMLResumeContactInfoContactMethodPostalAddressDeliveryAddress deliveryAddressField;

        /// <remarks/>
        public string CountryCode
        {
            get
            {
                return this.countryCodeField;
            }
            set
            {
                this.countryCodeField = value;
            }
        }

        /// <remarks/>
        public string PostalCode
        {
            get
            {
                return this.postalCodeField;
            }
            set
            {
                this.postalCodeField = value;
            }
        }

        /// <remarks/>
        public string Region
        {
            get
            {
                return this.regionField;
            }
            set
            {
                this.regionField = value;
            }
        }

        /// <remarks/>
        public string Municipality
        {
            get
            {
                return this.municipalityField;
            }
            set
            {
                this.municipalityField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeContactInfoContactMethodPostalAddressDeliveryAddress DeliveryAddress
        {
            get
            {
                return this.deliveryAddressField;
            }
            set
            {
                this.deliveryAddressField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeContactInfoContactMethodPostalAddressDeliveryAddress
    {

        private string addressLineField;

        /// <remarks/>
        public string AddressLine
        {
            get
            {
                return this.addressLineField;
            }
            set
            {
                this.addressLineField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeEmployerOrg
    {

        private string employerOrgNameField;

        private ResumeStructuredXMLResumeEmployerOrgPositionHistory positionHistoryField;

        private object userAreaField;

        /// <remarks/>
        public string EmployerOrgName
        {
            get
            {
                return this.employerOrgNameField;
            }
            set
            {
                this.employerOrgNameField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeEmployerOrgPositionHistory PositionHistory
        {
            get
            {
                return this.positionHistoryField;
            }
            set
            {
                this.positionHistoryField = value;
            }
        }

        /// <remarks/>
        public object UserArea
        {
            get
            {
                return this.userAreaField;
            }
            set
            {
                this.userAreaField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeEmployerOrgPositionHistory
    {

        private string titleField;

        private ResumeStructuredXMLResumeEmployerOrgPositionHistoryOrgName orgNameField;

        private ResumeStructuredXMLResumeEmployerOrgPositionHistoryOrgInfo orgInfoField;

        private string descriptionField;

        private ResumeStructuredXMLResumeEmployerOrgPositionHistoryStartDate startDateField;

        private ResumeStructuredXMLResumeEmployerOrgPositionHistoryEndDate endDateField;

        private string commentsField;

        private ResumeStructuredXMLResumeEmployerOrgPositionHistoryJobCategory jobCategoryField;

        private ResumeStructuredXMLResumeEmployerOrgPositionHistoryUserArea userAreaField;

        /// <remarks/>
        public string Title
        {
            get
            {
                return this.titleField;
            }
            set
            {
                this.titleField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeEmployerOrgPositionHistoryOrgName OrgName
        {
            get
            {
                return this.orgNameField;
            }
            set
            {
                this.orgNameField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeEmployerOrgPositionHistoryOrgInfo OrgInfo
        {
            get
            {
                return this.orgInfoField;
            }
            set
            {
                this.orgInfoField = value;
            }
        }

        /// <remarks/>
        public string Description
        {
            get
            {
                return this.descriptionField;
            }
            set
            {
                this.descriptionField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeEmployerOrgPositionHistoryStartDate StartDate
        {
            get
            {
                return this.startDateField;
            }
            set
            {
                this.startDateField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeEmployerOrgPositionHistoryEndDate EndDate
        {
            get
            {
                return this.endDateField;
            }
            set
            {
                this.endDateField = value;
            }
        }

        /// <remarks/>
        public string Comments
        {
            get
            {
                return this.commentsField;
            }
            set
            {
                this.commentsField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeEmployerOrgPositionHistoryJobCategory JobCategory
        {
            get
            {
                return this.jobCategoryField;
            }
            set
            {
                this.jobCategoryField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeEmployerOrgPositionHistoryUserArea UserArea
        {
            get
            {
                return this.userAreaField;
            }
            set
            {
                this.userAreaField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeEmployerOrgPositionHistoryOrgName
    {

        private string organizationNameField;

        /// <remarks/>
        public string OrganizationName
        {
            get
            {
                return this.organizationNameField;
            }
            set
            {
                this.organizationNameField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeEmployerOrgPositionHistoryOrgInfo
    {

        private ResumeStructuredXMLResumeEmployerOrgPositionHistoryOrgInfoPositionLocation positionLocationField;

        private string webSiteField;

        /// <remarks/>
        public ResumeStructuredXMLResumeEmployerOrgPositionHistoryOrgInfoPositionLocation PositionLocation
        {
            get
            {
                return this.positionLocationField;
            }
            set
            {
                this.positionLocationField = value;
            }
        }

        /// <remarks/>
        public string WebSite
        {
            get
            {
                return this.webSiteField;
            }
            set
            {
                this.webSiteField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeEmployerOrgPositionHistoryOrgInfoPositionLocation
    {

        private string countryCodeField;

        private string postalCodeField;

        private string regionField;

        private string municipalityField;

        private string typeField;

        /// <remarks/>
        public string CountryCode
        {
            get
            {
                return this.countryCodeField;
            }
            set
            {
                this.countryCodeField = value;
            }
        }

        /// <remarks/>
        public string PostalCode
        {
            get
            {
                return this.postalCodeField;
            }
            set
            {
                this.postalCodeField = value;
            }
        }

        /// <remarks/>
        public string Region
        {
            get
            {
                return this.regionField;
            }
            set
            {
                this.regionField = value;
            }
        }

        /// <remarks/>
        public string Municipality
        {
            get
            {
                return this.municipalityField;
            }
            set
            {
                this.municipalityField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeEmployerOrgPositionHistoryStartDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeEmployerOrgPositionHistoryEndDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeEmployerOrgPositionHistoryJobCategory
    {

        private string taxonomyNameField;

        private string categoryCodeField;

        /// <remarks/>
        public string TaxonomyName
        {
            get
            {
                return this.taxonomyNameField;
            }
            set
            {
                this.taxonomyNameField = value;
            }
        }

        /// <remarks/>
        public string CategoryCode
        {
            get
            {
                return this.categoryCodeField;
            }
            set
            {
                this.categoryCodeField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeEmployerOrgPositionHistoryUserArea
    {

        private PositionHistoryUserArea positionHistoryUserAreaField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Namespace = "http://sovren.com/hr-xml/2006-02-28")]
        public PositionHistoryUserArea PositionHistoryUserArea
        {
            get
            {
                return this.positionHistoryUserAreaField;
            }
            set
            {
                this.positionHistoryUserAreaField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "http://sovren.com/hr-xml/2006-02-28", IsNullable = false)]
    public partial class PositionHistoryUserArea
    {

        private string idField;

        private string companyNameProbabilityField;

        private string positionTitleProbabilityField;

        private string offsetOfFarthestDataFoundField;

        private bool isSelfEmployedField;

        private string selfEmploymentPhraseField;

        private string numberOfEmployeesSupervisedField;

        private PositionHistoryUserAreaBullet[] bulletsField;

        /// <remarks/>
        public string Id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        public string CompanyNameProbability
        {
            get
            {
                return this.companyNameProbabilityField;
            }
            set
            {
                this.companyNameProbabilityField = value;
            }
        }

        /// <remarks/>
        public string PositionTitleProbability
        {
            get
            {
                return this.positionTitleProbabilityField;
            }
            set
            {
                this.positionTitleProbabilityField = value;
            }
        }

        /// <remarks/>
        public string OffsetOfFarthestDataFound
        {
            get
            {
                return this.offsetOfFarthestDataFoundField;
            }
            set
            {
                this.offsetOfFarthestDataFoundField = value;
            }
        }

        /// <remarks/>
        public bool IsSelfEmployed
        {
            get
            {
                return this.isSelfEmployedField;
            }
            set
            {
                this.isSelfEmployedField = value;
            }
        }

        /// <remarks/>
        public string SelfEmploymentPhrase
        {
            get
            {
                return this.selfEmploymentPhraseField;
            }
            set
            {
                this.selfEmploymentPhraseField = value;
            }
        }

        /// <remarks/>
        public string NumberOfEmployeesSupervised
        {
            get
            {
                return this.numberOfEmployeesSupervisedField;
            }
            set
            {
                this.numberOfEmployeesSupervisedField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("Bullet", IsNullable = false)]
        public PositionHistoryUserAreaBullet[] Bullets
        {
            get
            {
                return this.bulletsField;
            }
            set
            {
                this.bulletsField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class PositionHistoryUserAreaBullet
    {

        private string typeField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitution
    {

        private ResumeStructuredXMLResumeSchoolOrInstitutionSchool schoolField;

        private ResumeStructuredXMLResumeSchoolOrInstitutionPostalAddress postalAddressField;

        private ResumeStructuredXMLResumeSchoolOrInstitutionDegree degreeField;

        private string commentsField;

        private object userAreaField;

        private string schoolTypeField;

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionSchool School
        {
            get
            {
                return this.schoolField;
            }
            set
            {
                this.schoolField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionPostalAddress PostalAddress
        {
            get
            {
                return this.postalAddressField;
            }
            set
            {
                this.postalAddressField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionDegree Degree
        {
            get
            {
                return this.degreeField;
            }
            set
            {
                this.degreeField = value;
            }
        }

        /// <remarks/>
        public string Comments
        {
            get
            {
                return this.commentsField;
            }
            set
            {
                this.commentsField = value;
            }
        }

        /// <remarks/>
        public object UserArea
        {
            get
            {
                return this.userAreaField;
            }
            set
            {
                this.userAreaField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string schoolType
        {
            get
            {
                return this.schoolTypeField;
            }
            set
            {
                this.schoolTypeField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionSchool
    {

        private string schoolNameField;

        /// <remarks/>
        public string SchoolName
        {
            get
            {
                return this.schoolNameField;
            }
            set
            {
                this.schoolNameField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionPostalAddress
    {

        private string countryCodeField;

        private string postalCodeField;

        private string regionField;

        private string municipalityField;

        private string typeField;

        /// <remarks/>
        public string CountryCode
        {
            get
            {
                return this.countryCodeField;
            }
            set
            {
                this.countryCodeField = value;
            }
        }

        /// <remarks/>
        public string PostalCode
        {
            get
            {
                return this.postalCodeField;
            }
            set
            {
                this.postalCodeField = value;
            }
        }

        /// <remarks/>
        public string Region
        {
            get
            {
                return this.regionField;
            }
            set
            {
                this.regionField = value;
            }
        }

        /// <remarks/>
        public string Municipality
        {
            get
            {
                return this.municipalityField;
            }
            set
            {
                this.municipalityField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionDegree
    {

        private string degreeNameField;

        private ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeDate degreeDateField;

        private string otherHonorsField;

        private ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMajor degreeMajorField;

        private ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMinor degreeMinorField;

        private ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasure degreeMeasureField;

        private ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDatesOfAttendance datesOfAttendanceField;

        private string commentsField;

        private ResumeStructuredXMLResumeSchoolOrInstitutionDegreeUserArea userAreaField;

        private string degreeTypeField;

        /// <remarks/>
        public string DegreeName
        {
            get
            {
                return this.degreeNameField;
            }
            set
            {
                this.degreeNameField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeDate DegreeDate
        {
            get
            {
                return this.degreeDateField;
            }
            set
            {
                this.degreeDateField = value;
            }
        }

        /// <remarks/>
        public string OtherHonors
        {
            get
            {
                return this.otherHonorsField;
            }
            set
            {
                this.otherHonorsField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMajor DegreeMajor
        {
            get
            {
                return this.degreeMajorField;
            }
            set
            {
                this.degreeMajorField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMinor DegreeMinor
        {
            get
            {
                return this.degreeMinorField;
            }
            set
            {
                this.degreeMinorField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasure DegreeMeasure
        {
            get
            {
                return this.degreeMeasureField;
            }
            set
            {
                this.degreeMeasureField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDatesOfAttendance DatesOfAttendance
        {
            get
            {
                return this.datesOfAttendanceField;
            }
            set
            {
                this.datesOfAttendanceField = value;
            }
        }

        /// <remarks/>
        public string Comments
        {
            get
            {
                return this.commentsField;
            }
            set
            {
                this.commentsField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionDegreeUserArea UserArea
        {
            get
            {
                return this.userAreaField;
            }
            set
            {
                this.userAreaField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string degreeType
        {
            get
            {
                return this.degreeTypeField;
            }
            set
            {
                this.degreeTypeField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMajor
    {

        private string nameField;

        /// <remarks/>
        public string Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMinor
    {

        private string nameField;

        /// <remarks/>
        public string Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasure
    {

        private ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasureEducationalMeasure educationalMeasureField;

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasureEducationalMeasure EducationalMeasure
        {
            get
            {
                return this.educationalMeasureField;
            }
            set
            {
                this.educationalMeasureField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasureEducationalMeasure
    {

        private string measureSystemField;

        private ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasureEducationalMeasureMeasureValue measureValueField;

        private ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasureEducationalMeasureLowestPossibleValue lowestPossibleValueField;

        private ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasureEducationalMeasureHighestPossibleValue highestPossibleValueField;

        /// <remarks/>
        public string MeasureSystem
        {
            get
            {
                return this.measureSystemField;
            }
            set
            {
                this.measureSystemField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasureEducationalMeasureMeasureValue MeasureValue
        {
            get
            {
                return this.measureValueField;
            }
            set
            {
                this.measureValueField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasureEducationalMeasureLowestPossibleValue LowestPossibleValue
        {
            get
            {
                return this.lowestPossibleValueField;
            }
            set
            {
                this.lowestPossibleValueField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasureEducationalMeasureHighestPossibleValue HighestPossibleValue
        {
            get
            {
                return this.highestPossibleValueField;
            }
            set
            {
                this.highestPossibleValueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasureEducationalMeasureMeasureValue
    {

        private decimal numericValueField;

        /// <remarks/>
        public decimal NumericValue
        {
            get
            {
                return this.numericValueField;
            }
            set
            {
                this.numericValueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasureEducationalMeasureLowestPossibleValue
    {

        private decimal numericValueField;

        /// <remarks/>
        public decimal NumericValue
        {
            get
            {
                return this.numericValueField;
            }
            set
            {
                this.numericValueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDegreeMeasureEducationalMeasureHighestPossibleValue
    {

        private decimal numericValueField;

        /// <remarks/>
        public decimal NumericValue
        {
            get
            {
                return this.numericValueField;
            }
            set
            {
                this.numericValueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDatesOfAttendance
    {

        private ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDatesOfAttendanceStartDate startDateField;

        private ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDatesOfAttendanceEndDate endDateField;

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDatesOfAttendanceStartDate StartDate
        {
            get
            {
                return this.startDateField;
            }
            set
            {
                this.startDateField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDatesOfAttendanceEndDate EndDate
        {
            get
            {
                return this.endDateField;
            }
            set
            {
                this.endDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDatesOfAttendanceStartDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionDegreeDatesOfAttendanceEndDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSchoolOrInstitutionDegreeUserArea
    {

        private DegreeUserArea degreeUserAreaField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Namespace = "http://sovren.com/hr-xml/2006-02-28")]
        public DegreeUserArea DegreeUserArea
        {
            get
            {
                return this.degreeUserAreaField;
            }
            set
            {
                this.degreeUserAreaField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "http://sovren.com/hr-xml/2006-02-28", IsNullable = false)]
    public partial class DegreeUserArea
    {

        private string idField;

        private bool graduatedField;

        private decimal normalizedGPAField;

        /// <remarks/>
        public string Id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        public bool Graduated
        {
            get
            {
                return this.graduatedField;
            }
            set
            {
                this.graduatedField = value;
            }
        }

        /// <remarks/>
        public decimal NormalizedGPA
        {
            get
            {
                return this.normalizedGPAField;
            }
            set
            {
                this.normalizedGPAField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeLicenseOrCertification
    {

        private string nameField;

        private string idField;

        private string issuingAuthorityField;

        private string descriptionField;

        private ResumeStructuredXMLResumeLicenseOrCertificationEffectiveDate effectiveDateField;

        /// <remarks/>
        public string Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        /// <remarks/>
        public string Id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        public string IssuingAuthority
        {
            get
            {
                return this.issuingAuthorityField;
            }
            set
            {
                this.issuingAuthorityField = value;
            }
        }

        /// <remarks/>
        public string Description
        {
            get
            {
                return this.descriptionField;
            }
            set
            {
                this.descriptionField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeLicenseOrCertificationEffectiveDate EffectiveDate
        {
            get
            {
                return this.effectiveDateField;
            }
            set
            {
                this.effectiveDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeLicenseOrCertificationEffectiveDate
    {

        private ResumeStructuredXMLResumeLicenseOrCertificationEffectiveDateValidFrom validFromField;

        private ResumeStructuredXMLResumeLicenseOrCertificationEffectiveDateValidTo validToField;

        private ResumeStructuredXMLResumeLicenseOrCertificationEffectiveDateFirstIssuedDate firstIssuedDateField;

        /// <remarks/>
        public ResumeStructuredXMLResumeLicenseOrCertificationEffectiveDateValidFrom ValidFrom
        {
            get
            {
                return this.validFromField;
            }
            set
            {
                this.validFromField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeLicenseOrCertificationEffectiveDateValidTo ValidTo
        {
            get
            {
                return this.validToField;
            }
            set
            {
                this.validToField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeLicenseOrCertificationEffectiveDateFirstIssuedDate FirstIssuedDate
        {
            get
            {
                return this.firstIssuedDateField;
            }
            set
            {
                this.firstIssuedDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeLicenseOrCertificationEffectiveDateValidFrom
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeLicenseOrCertificationEffectiveDateValidTo
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeLicenseOrCertificationEffectiveDateFirstIssuedDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeMilitaryHistory
    {

        private string countryServedField;

        private ResumeStructuredXMLResumeMilitaryHistoryServiceDetail[] serviceDetailField;

        private string commentsField;

        /// <remarks/>
        public string CountryServed
        {
            get
            {
                return this.countryServedField;
            }
            set
            {
                this.countryServedField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("ServiceDetail")]
        public ResumeStructuredXMLResumeMilitaryHistoryServiceDetail[] ServiceDetail
        {
            get
            {
                return this.serviceDetailField;
            }
            set
            {
                this.serviceDetailField = value;
            }
        }

        /// <remarks/>
        public string Comments
        {
            get
            {
                return this.commentsField;
            }
            set
            {
                this.commentsField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeMilitaryHistoryServiceDetail
    {

        private string unitOrDivisionField;

        private ResumeStructuredXMLResumeMilitaryHistoryServiceDetailRankAchieved rankAchievedField;

        private ResumeStructuredXMLResumeMilitaryHistoryServiceDetailDatesOfService datesOfServiceField;

        private string campaignField;

        private string areaOfExpertiseField;

        private string recognitionAchievedField;

        private string disciplinaryActionField;

        private string dischargeStatusField;

        private string branchField;

        /// <remarks/>
        public string UnitOrDivision
        {
            get
            {
                return this.unitOrDivisionField;
            }
            set
            {
                this.unitOrDivisionField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeMilitaryHistoryServiceDetailRankAchieved RankAchieved
        {
            get
            {
                return this.rankAchievedField;
            }
            set
            {
                this.rankAchievedField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeMilitaryHistoryServiceDetailDatesOfService DatesOfService
        {
            get
            {
                return this.datesOfServiceField;
            }
            set
            {
                this.datesOfServiceField = value;
            }
        }

        /// <remarks/>
        public string Campaign
        {
            get
            {
                return this.campaignField;
            }
            set
            {
                this.campaignField = value;
            }
        }

        /// <remarks/>
        public string AreaOfExpertise
        {
            get
            {
                return this.areaOfExpertiseField;
            }
            set
            {
                this.areaOfExpertiseField = value;
            }
        }

        /// <remarks/>
        public string RecognitionAchieved
        {
            get
            {
                return this.recognitionAchievedField;
            }
            set
            {
                this.recognitionAchievedField = value;
            }
        }

        /// <remarks/>
        public string DisciplinaryAction
        {
            get
            {
                return this.disciplinaryActionField;
            }
            set
            {
                this.disciplinaryActionField = value;
            }
        }

        /// <remarks/>
        public string DischargeStatus
        {
            get
            {
                return this.dischargeStatusField;
            }
            set
            {
                this.dischargeStatusField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string branch
        {
            get
            {
                return this.branchField;
            }
            set
            {
                this.branchField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeMilitaryHistoryServiceDetailRankAchieved
    {

        private string startRankField;

        private string currentOrEndRankField;

        /// <remarks/>
        public string StartRank
        {
            get
            {
                return this.startRankField;
            }
            set
            {
                this.startRankField = value;
            }
        }

        /// <remarks/>
        public string CurrentOrEndRank
        {
            get
            {
                return this.currentOrEndRankField;
            }
            set
            {
                this.currentOrEndRankField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeMilitaryHistoryServiceDetailDatesOfService
    {

        private ResumeStructuredXMLResumeMilitaryHistoryServiceDetailDatesOfServiceStartDate startDateField;

        private ResumeStructuredXMLResumeMilitaryHistoryServiceDetailDatesOfServiceEndDate endDateField;

        /// <remarks/>
        public ResumeStructuredXMLResumeMilitaryHistoryServiceDetailDatesOfServiceStartDate StartDate
        {
            get
            {
                return this.startDateField;
            }
            set
            {
                this.startDateField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeMilitaryHistoryServiceDetailDatesOfServiceEndDate EndDate
        {
            get
            {
                return this.endDateField;
            }
            set
            {
                this.endDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeMilitaryHistoryServiceDetailDatesOfServiceStartDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeMilitaryHistoryServiceDetailDatesOfServiceEndDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePatent
    {

        private string patentTitleField;

        private string descriptionField;

        private ResumeStructuredXMLResumePatentInventors inventorsField;

        private ResumeStructuredXMLResumePatentPatentDetail patentDetailField;

        /// <remarks/>
        public string PatentTitle
        {
            get
            {
                return this.patentTitleField;
            }
            set
            {
                this.patentTitleField = value;
            }
        }

        /// <remarks/>
        public string Description
        {
            get
            {
                return this.descriptionField;
            }
            set
            {
                this.descriptionField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePatentInventors Inventors
        {
            get
            {
                return this.inventorsField;
            }
            set
            {
                this.inventorsField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePatentPatentDetail PatentDetail
        {
            get
            {
                return this.patentDetailField;
            }
            set
            {
                this.patentDetailField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePatentInventors
    {

        private string inventorNameField;

        /// <remarks/>
        public string InventorName
        {
            get
            {
                return this.inventorNameField;
            }
            set
            {
                this.inventorNameField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePatentPatentDetail
    {

        private string issuingAuthorityField;

        private ResumeStructuredXMLResumePatentPatentDetailPatentMilestone patentMilestoneField;

        /// <remarks/>
        public string IssuingAuthority
        {
            get
            {
                return this.issuingAuthorityField;
            }
            set
            {
                this.issuingAuthorityField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePatentPatentDetailPatentMilestone PatentMilestone
        {
            get
            {
                return this.patentMilestoneField;
            }
            set
            {
                this.patentMilestoneField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePatentPatentDetailPatentMilestone
    {

        private string idField;

        private string statusField;

        private string dateField;

        /// <remarks/>
        public string Id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        public string Status
        {
            get
            {
                return this.statusField;
            }
            set
            {
                this.statusField = value;
            }
        }

        /// <remarks/>
        public string Date
        {
            get
            {
                return this.dateField;
            }
            set
            {
                this.dateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistory
    {

        private string formattedPublicationDescriptionField;

        private ResumeStructuredXMLResumePublicationHistoryArticle[] articleField;

        private ResumeStructuredXMLResumePublicationHistoryBook[] bookField;

        private ResumeStructuredXMLResumePublicationHistoryConferencePaper[] conferencePaperField;

        private ResumeStructuredXMLResumePublicationHistoryOtherPublication[] otherPublicationField;

        /// <remarks/>
        public string FormattedPublicationDescription
        {
            get
            {
                return this.formattedPublicationDescriptionField;
            }
            set
            {
                this.formattedPublicationDescriptionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("Article")]
        public ResumeStructuredXMLResumePublicationHistoryArticle[] Article
        {
            get
            {
                return this.articleField;
            }
            set
            {
                this.articleField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("Book")]
        public ResumeStructuredXMLResumePublicationHistoryBook[] Book
        {
            get
            {
                return this.bookField;
            }
            set
            {
                this.bookField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("ConferencePaper")]
        public ResumeStructuredXMLResumePublicationHistoryConferencePaper[] ConferencePaper
        {
            get
            {
                return this.conferencePaperField;
            }
            set
            {
                this.conferencePaperField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("OtherPublication")]
        public ResumeStructuredXMLResumePublicationHistoryOtherPublication[] OtherPublication
        {
            get
            {
                return this.otherPublicationField;
            }
            set
            {
                this.otherPublicationField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryArticle
    {

        private string titleField;

        private ResumeStructuredXMLResumePublicationHistoryArticleName nameField;

        private ResumeStructuredXMLResumePublicationHistoryArticlePublicationDate publicationDateField;

        private ResumeStructuredXMLResumePublicationHistoryArticleCopyright copyrightField;

        private string commentsField;

        private string journalOrSerialNameField;

        private string volumeField;

        private string issueField;

        private string pageNumberField;

        /// <remarks/>
        public string Title
        {
            get
            {
                return this.titleField;
            }
            set
            {
                this.titleField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryArticleName Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryArticlePublicationDate PublicationDate
        {
            get
            {
                return this.publicationDateField;
            }
            set
            {
                this.publicationDateField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryArticleCopyright Copyright
        {
            get
            {
                return this.copyrightField;
            }
            set
            {
                this.copyrightField = value;
            }
        }

        /// <remarks/>
        public string Comments
        {
            get
            {
                return this.commentsField;
            }
            set
            {
                this.commentsField = value;
            }
        }

        /// <remarks/>
        public string JournalOrSerialName
        {
            get
            {
                return this.journalOrSerialNameField;
            }
            set
            {
                this.journalOrSerialNameField = value;
            }
        }

        /// <remarks/>
        public string Volume
        {
            get
            {
                return this.volumeField;
            }
            set
            {
                this.volumeField = value;
            }
        }

        /// <remarks/>
        public string Issue
        {
            get
            {
                return this.issueField;
            }
            set
            {
                this.issueField = value;
            }
        }

        /// <remarks/>
        public string PageNumber
        {
            get
            {
                return this.pageNumberField;
            }
            set
            {
                this.pageNumberField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryArticleName
    {

        private string formattedNameField;

        private string givenNameField;

        private string preferredGivenNameField;

        private string middleNameField;

        private string familyNameField;

        private ResumeStructuredXMLResumePublicationHistoryArticleNameAffix affixField;

        private string roleField;

        /// <remarks/>
        public string FormattedName
        {
            get
            {
                return this.formattedNameField;
            }
            set
            {
                this.formattedNameField = value;
            }
        }

        /// <remarks/>
        public string GivenName
        {
            get
            {
                return this.givenNameField;
            }
            set
            {
                this.givenNameField = value;
            }
        }

        /// <remarks/>
        public string PreferredGivenName
        {
            get
            {
                return this.preferredGivenNameField;
            }
            set
            {
                this.preferredGivenNameField = value;
            }
        }

        /// <remarks/>
        public string MiddleName
        {
            get
            {
                return this.middleNameField;
            }
            set
            {
                this.middleNameField = value;
            }
        }

        /// <remarks/>
        public string FamilyName
        {
            get
            {
                return this.familyNameField;
            }
            set
            {
                this.familyNameField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryArticleNameAffix Affix
        {
            get
            {
                return this.affixField;
            }
            set
            {
                this.affixField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string role
        {
            get
            {
                return this.roleField;
            }
            set
            {
                this.roleField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryArticleNameAffix
    {

        private string typeField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryArticlePublicationDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryArticleCopyright
    {

        private string copyrightTextField;

        /// <remarks/>
        public string CopyrightText
        {
            get
            {
                return this.copyrightTextField;
            }
            set
            {
                this.copyrightTextField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryBook
    {

        private string titleField;

        private ResumeStructuredXMLResumePublicationHistoryBookName nameField;

        private ResumeStructuredXMLResumePublicationHistoryBookPublicationDate publicationDateField;

        private ResumeStructuredXMLResumePublicationHistoryBookCopyright copyrightField;

        private string commentsField;

        private string iSBNField;

        private string publisherNameField;

        private string publisherLocationField;

        /// <remarks/>
        public string Title
        {
            get
            {
                return this.titleField;
            }
            set
            {
                this.titleField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryBookName Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryBookPublicationDate PublicationDate
        {
            get
            {
                return this.publicationDateField;
            }
            set
            {
                this.publicationDateField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryBookCopyright Copyright
        {
            get
            {
                return this.copyrightField;
            }
            set
            {
                this.copyrightField = value;
            }
        }

        /// <remarks/>
        public string Comments
        {
            get
            {
                return this.commentsField;
            }
            set
            {
                this.commentsField = value;
            }
        }

        /// <remarks/>
        public string ISBN
        {
            get
            {
                return this.iSBNField;
            }
            set
            {
                this.iSBNField = value;
            }
        }

        /// <remarks/>
        public string PublisherName
        {
            get
            {
                return this.publisherNameField;
            }
            set
            {
                this.publisherNameField = value;
            }
        }

        /// <remarks/>
        public string PublisherLocation
        {
            get
            {
                return this.publisherLocationField;
            }
            set
            {
                this.publisherLocationField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryBookName
    {

        private string formattedNameField;

        private string givenNameField;

        private string preferredGivenNameField;

        private string middleNameField;

        private string familyNameField;

        private ResumeStructuredXMLResumePublicationHistoryBookNameAffix affixField;

        private string roleField;

        /// <remarks/>
        public string FormattedName
        {
            get
            {
                return this.formattedNameField;
            }
            set
            {
                this.formattedNameField = value;
            }
        }

        /// <remarks/>
        public string GivenName
        {
            get
            {
                return this.givenNameField;
            }
            set
            {
                this.givenNameField = value;
            }
        }

        /// <remarks/>
        public string PreferredGivenName
        {
            get
            {
                return this.preferredGivenNameField;
            }
            set
            {
                this.preferredGivenNameField = value;
            }
        }

        /// <remarks/>
        public string MiddleName
        {
            get
            {
                return this.middleNameField;
            }
            set
            {
                this.middleNameField = value;
            }
        }

        /// <remarks/>
        public string FamilyName
        {
            get
            {
                return this.familyNameField;
            }
            set
            {
                this.familyNameField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryBookNameAffix Affix
        {
            get
            {
                return this.affixField;
            }
            set
            {
                this.affixField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string role
        {
            get
            {
                return this.roleField;
            }
            set
            {
                this.roleField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryBookNameAffix
    {

        private string typeField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryBookPublicationDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryBookCopyright
    {

        private string copyrightTextField;

        /// <remarks/>
        public string CopyrightText
        {
            get
            {
                return this.copyrightTextField;
            }
            set
            {
                this.copyrightTextField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryConferencePaper
    {

        private string titleField;

        private ResumeStructuredXMLResumePublicationHistoryConferencePaperName nameField;

        private ResumeStructuredXMLResumePublicationHistoryConferencePaperPublicationDate publicationDateField;

        private ResumeStructuredXMLResumePublicationHistoryConferencePaperCopyright copyrightField;

        private string commentsField;

        private string eventNameField;

        private string conferenceLocationField;

        /// <remarks/>
        public string Title
        {
            get
            {
                return this.titleField;
            }
            set
            {
                this.titleField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryConferencePaperName Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryConferencePaperPublicationDate PublicationDate
        {
            get
            {
                return this.publicationDateField;
            }
            set
            {
                this.publicationDateField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryConferencePaperCopyright Copyright
        {
            get
            {
                return this.copyrightField;
            }
            set
            {
                this.copyrightField = value;
            }
        }

        /// <remarks/>
        public string Comments
        {
            get
            {
                return this.commentsField;
            }
            set
            {
                this.commentsField = value;
            }
        }

        /// <remarks/>
        public string EventName
        {
            get
            {
                return this.eventNameField;
            }
            set
            {
                this.eventNameField = value;
            }
        }

        /// <remarks/>
        public string ConferenceLocation
        {
            get
            {
                return this.conferenceLocationField;
            }
            set
            {
                this.conferenceLocationField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryConferencePaperName
    {

        private string formattedNameField;

        private string givenNameField;

        private string preferredGivenNameField;

        private string middleNameField;

        private string familyNameField;

        private ResumeStructuredXMLResumePublicationHistoryConferencePaperNameAffix affixField;

        private string roleField;

        /// <remarks/>
        public string FormattedName
        {
            get
            {
                return this.formattedNameField;
            }
            set
            {
                this.formattedNameField = value;
            }
        }

        /// <remarks/>
        public string GivenName
        {
            get
            {
                return this.givenNameField;
            }
            set
            {
                this.givenNameField = value;
            }
        }

        /// <remarks/>
        public string PreferredGivenName
        {
            get
            {
                return this.preferredGivenNameField;
            }
            set
            {
                this.preferredGivenNameField = value;
            }
        }

        /// <remarks/>
        public string MiddleName
        {
            get
            {
                return this.middleNameField;
            }
            set
            {
                this.middleNameField = value;
            }
        }

        /// <remarks/>
        public string FamilyName
        {
            get
            {
                return this.familyNameField;
            }
            set
            {
                this.familyNameField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryConferencePaperNameAffix Affix
        {
            get
            {
                return this.affixField;
            }
            set
            {
                this.affixField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string role
        {
            get
            {
                return this.roleField;
            }
            set
            {
                this.roleField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryConferencePaperNameAffix
    {

        private string typeField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryConferencePaperPublicationDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryConferencePaperCopyright
    {

        private string copyrightTextField;

        /// <remarks/>
        public string CopyrightText
        {
            get
            {
                return this.copyrightTextField;
            }
            set
            {
                this.copyrightTextField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryOtherPublication
    {

        private string titleField;

        private ResumeStructuredXMLResumePublicationHistoryOtherPublicationName nameField;

        private ResumeStructuredXMLResumePublicationHistoryOtherPublicationPublicationDate publicationDateField;

        private ResumeStructuredXMLResumePublicationHistoryOtherPublicationCopyright copyrightField;

        private string commentsField;

        private string publisherNameField;

        private string publisherLocationField;

        /// <remarks/>
        public string Title
        {
            get
            {
                return this.titleField;
            }
            set
            {
                this.titleField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryOtherPublicationName Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryOtherPublicationPublicationDate PublicationDate
        {
            get
            {
                return this.publicationDateField;
            }
            set
            {
                this.publicationDateField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryOtherPublicationCopyright Copyright
        {
            get
            {
                return this.copyrightField;
            }
            set
            {
                this.copyrightField = value;
            }
        }

        /// <remarks/>
        public string Comments
        {
            get
            {
                return this.commentsField;
            }
            set
            {
                this.commentsField = value;
            }
        }

        /// <remarks/>
        public string PublisherName
        {
            get
            {
                return this.publisherNameField;
            }
            set
            {
                this.publisherNameField = value;
            }
        }

        /// <remarks/>
        public string PublisherLocation
        {
            get
            {
                return this.publisherLocationField;
            }
            set
            {
                this.publisherLocationField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryOtherPublicationName
    {

        private string formattedNameField;

        private string givenNameField;

        private string preferredGivenNameField;

        private string middleNameField;

        private string familyNameField;

        private ResumeStructuredXMLResumePublicationHistoryOtherPublicationNameAffix affixField;

        private string roleField;

        /// <remarks/>
        public string FormattedName
        {
            get
            {
                return this.formattedNameField;
            }
            set
            {
                this.formattedNameField = value;
            }
        }

        /// <remarks/>
        public string GivenName
        {
            get
            {
                return this.givenNameField;
            }
            set
            {
                this.givenNameField = value;
            }
        }

        /// <remarks/>
        public string PreferredGivenName
        {
            get
            {
                return this.preferredGivenNameField;
            }
            set
            {
                this.preferredGivenNameField = value;
            }
        }

        /// <remarks/>
        public string MiddleName
        {
            get
            {
                return this.middleNameField;
            }
            set
            {
                this.middleNameField = value;
            }
        }

        /// <remarks/>
        public string FamilyName
        {
            get
            {
                return this.familyNameField;
            }
            set
            {
                this.familyNameField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumePublicationHistoryOtherPublicationNameAffix Affix
        {
            get
            {
                return this.affixField;
            }
            set
            {
                this.affixField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string role
        {
            get
            {
                return this.roleField;
            }
            set
            {
                this.roleField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryOtherPublicationNameAffix
    {

        private string typeField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryOtherPublicationPublicationDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumePublicationHistoryOtherPublicationCopyright
    {

        private string copyrightTextField;

        /// <remarks/>
        public string CopyrightText
        {
            get
            {
                return this.copyrightTextField;
            }
            set
            {
                this.copyrightTextField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSpeakingEvent
    {

        private string titleField;

        private string roleField;

        private ResumeStructuredXMLResumeSpeakingEventStartDate startDateField;

        private string eventNameField;

        private string eventTypeField;

        private string locationField;

        private string descriptionField;

        /// <remarks/>
        public string Title
        {
            get
            {
                return this.titleField;
            }
            set
            {
                this.titleField = value;
            }
        }

        /// <remarks/>
        public string Role
        {
            get
            {
                return this.roleField;
            }
            set
            {
                this.roleField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSpeakingEventStartDate StartDate
        {
            get
            {
                return this.startDateField;
            }
            set
            {
                this.startDateField = value;
            }
        }

        /// <remarks/>
        public string EventName
        {
            get
            {
                return this.eventNameField;
            }
            set
            {
                this.eventNameField = value;
            }
        }

        /// <remarks/>
        public string EventType
        {
            get
            {
                return this.eventTypeField;
            }
            set
            {
                this.eventTypeField = value;
            }
        }

        /// <remarks/>
        public string Location
        {
            get
            {
                return this.locationField;
            }
            set
            {
                this.locationField = value;
            }
        }

        /// <remarks/>
        public string Description
        {
            get
            {
                return this.descriptionField;
            }
            set
            {
                this.descriptionField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSpeakingEventStartDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeQualifications
    {

        private string qualificationSummaryField;

        private ResumeStructuredXMLResumeQualificationsCompetency[] competencyField;

        /// <remarks/>
        public string QualificationSummary
        {
            get
            {
                return this.qualificationSummaryField;
            }
            set
            {
                this.qualificationSummaryField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("Competency")]
        public ResumeStructuredXMLResumeQualificationsCompetency[] Competency
        {
            get
            {
                return this.competencyField;
            }
            set
            {
                this.competencyField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeQualificationsCompetency
    {

        private ResumeStructuredXMLResumeQualificationsCompetencyCompetencyId competencyIdField;

        private ResumeStructuredXMLResumeQualificationsCompetencyTaxonomyId taxonomyIdField;

        private ResumeStructuredXMLResumeQualificationsCompetencyCompetencyEvidence competencyEvidenceField;

        /// <remarks/>
        public ResumeStructuredXMLResumeQualificationsCompetencyCompetencyId CompetencyId
        {
            get
            {
                return this.competencyIdField;
            }
            set
            {
                this.competencyIdField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeQualificationsCompetencyTaxonomyId TaxonomyId
        {
            get
            {
                return this.taxonomyIdField;
            }
            set
            {
                this.taxonomyIdField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeQualificationsCompetencyCompetencyEvidence CompetencyEvidence
        {
            get
            {
                return this.competencyEvidenceField;
            }
            set
            {
                this.competencyEvidenceField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeQualificationsCompetencyCompetencyId
    {

        private string idField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeQualificationsCompetencyTaxonomyId
    {

        private string idField;

        private string idOwnerField;

        private string descriptionField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string idOwner
        {
            get
            {
                return this.idOwnerField;
            }
            set
            {
                this.idOwnerField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string description
        {
            get
            {
                return this.descriptionField;
            }
            set
            {
                this.descriptionField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeQualificationsCompetencyCompetencyEvidence
    {

        private byte numericValueField;

        private string nameField;

        private string typeDescriptionField;

        private string typeIdField;

        private string lastUsedField;

        /// <remarks/>
        public byte NumericValue
        {
            get
            {
                return this.numericValueField;
            }
            set
            {
                this.numericValueField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string typeDescription
        {
            get
            {
                return this.typeDescriptionField;
            }
            set
            {
                this.typeDescriptionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string typeId
        {
            get
            {
                return this.typeIdField;
            }
            set
            {
                this.typeIdField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string lastUsed
        {
            get
            {
                return this.lastUsedField;
            }
            set
            {
                this.lastUsedField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeLanguage
    {

        private string languageCodeField;

        private bool readField;

        private bool writeField;

        private bool speakField;

        private string commentsField;

        /// <remarks/>
        public string LanguageCode
        {
            get
            {
                return this.languageCodeField;
            }
            set
            {
                this.languageCodeField = value;
            }
        }

        /// <remarks/>
        public bool Read
        {
            get
            {
                return this.readField;
            }
            set
            {
                this.readField = value;
            }
        }

        /// <remarks/>
        public bool Write
        {
            get
            {
                return this.writeField;
            }
            set
            {
                this.writeField = value;
            }
        }

        /// <remarks/>
        public bool Speak
        {
            get
            {
                return this.speakField;
            }
            set
            {
                this.speakField = value;
            }
        }

        /// <remarks/>
        public string Comments
        {
            get
            {
                return this.commentsField;
            }
            set
            {
                this.commentsField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeAchievement
    {

        private ResumeStructuredXMLResumeAchievementDate dateField;

        private string descriptionField;

        private string issuingAuthorityField;

        /// <remarks/>
        public ResumeStructuredXMLResumeAchievementDate Date
        {
            get
            {
                return this.dateField;
            }
            set
            {
                this.dateField = value;
            }
        }

        /// <remarks/>
        public string Description
        {
            get
            {
                return this.descriptionField;
            }
            set
            {
                this.descriptionField = value;
            }
        }

        /// <remarks/>
        public string IssuingAuthority
        {
            get
            {
                return this.issuingAuthorityField;
            }
            set
            {
                this.issuingAuthorityField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeAchievementDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeAssociation
    {

        private string nameField;

        private ResumeStructuredXMLResumeAssociationStartDate startDateField;

        private ResumeStructuredXMLResumeAssociationEndDate endDateField;

        private ResumeStructuredXMLResumeAssociationRole roleField;

        /// <remarks/>
        public string Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeAssociationStartDate StartDate
        {
            get
            {
                return this.startDateField;
            }
            set
            {
                this.startDateField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeAssociationEndDate EndDate
        {
            get
            {
                return this.endDateField;
            }
            set
            {
                this.endDateField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeAssociationRole Role
        {
            get
            {
                return this.roleField;
            }
            set
            {
                this.roleField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeAssociationStartDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeAssociationEndDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeAssociationRole
    {

        private string nameField;

        /// <remarks/>
        public string Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeReference
    {

        private ResumeStructuredXMLResumeReferencePersonName personNameField;

        private string positionTitleField;

        private ResumeStructuredXMLResumeReferenceContactMethod[] contactMethodField;

        private string commentsField;

        /// <remarks/>
        public ResumeStructuredXMLResumeReferencePersonName PersonName
        {
            get
            {
                return this.personNameField;
            }
            set
            {
                this.personNameField = value;
            }
        }

        /// <remarks/>
        public string PositionTitle
        {
            get
            {
                return this.positionTitleField;
            }
            set
            {
                this.positionTitleField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("ContactMethod")]
        public ResumeStructuredXMLResumeReferenceContactMethod[] ContactMethod
        {
            get
            {
                return this.contactMethodField;
            }
            set
            {
                this.contactMethodField = value;
            }
        }

        /// <remarks/>
        public string Comments
        {
            get
            {
                return this.commentsField;
            }
            set
            {
                this.commentsField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeReferencePersonName
    {

        private string formattedNameField;

        private string givenNameField;

        private string preferredGivenNameField;

        private string middleNameField;

        private string familyNameField;

        private ResumeStructuredXMLResumeReferencePersonNameAffix affixField;

        /// <remarks/>
        public string FormattedName
        {
            get
            {
                return this.formattedNameField;
            }
            set
            {
                this.formattedNameField = value;
            }
        }

        /// <remarks/>
        public string GivenName
        {
            get
            {
                return this.givenNameField;
            }
            set
            {
                this.givenNameField = value;
            }
        }

        /// <remarks/>
        public string PreferredGivenName
        {
            get
            {
                return this.preferredGivenNameField;
            }
            set
            {
                this.preferredGivenNameField = value;
            }
        }

        /// <remarks/>
        public string MiddleName
        {
            get
            {
                return this.middleNameField;
            }
            set
            {
                this.middleNameField = value;
            }
        }

        /// <remarks/>
        public string FamilyName
        {
            get
            {
                return this.familyNameField;
            }
            set
            {
                this.familyNameField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeReferencePersonNameAffix Affix
        {
            get
            {
                return this.affixField;
            }
            set
            {
                this.affixField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeReferencePersonNameAffix
    {

        private string typeField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeReferenceContactMethod
    {

        private string useField;

        private string locationField;

        private string whenAvailableField;

        private ResumeStructuredXMLResumeReferenceContactMethodTelephone telephoneField;

        private ResumeStructuredXMLResumeReferenceContactMethodMobile mobileField;

        private ResumeStructuredXMLResumeReferenceContactMethodFax faxField;

        private ResumeStructuredXMLResumeReferenceContactMethodPager pagerField;

        private ResumeStructuredXMLResumeReferenceContactMethodTTYTDD tTYTDDField;

        private string internetEmailAddressField;

        private string internetWebAddressField;

        private ResumeStructuredXMLResumeReferenceContactMethodPostalAddress postalAddressField;

        /// <remarks/>
        public string Use
        {
            get
            {
                return this.useField;
            }
            set
            {
                this.useField = value;
            }
        }

        /// <remarks/>
        public string Location
        {
            get
            {
                return this.locationField;
            }
            set
            {
                this.locationField = value;
            }
        }

        /// <remarks/>
        public string WhenAvailable
        {
            get
            {
                return this.whenAvailableField;
            }
            set
            {
                this.whenAvailableField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeReferenceContactMethodTelephone Telephone
        {
            get
            {
                return this.telephoneField;
            }
            set
            {
                this.telephoneField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeReferenceContactMethodMobile Mobile
        {
            get
            {
                return this.mobileField;
            }
            set
            {
                this.mobileField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeReferenceContactMethodFax Fax
        {
            get
            {
                return this.faxField;
            }
            set
            {
                this.faxField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeReferenceContactMethodPager Pager
        {
            get
            {
                return this.pagerField;
            }
            set
            {
                this.pagerField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeReferenceContactMethodTTYTDD TTYTDD
        {
            get
            {
                return this.tTYTDDField;
            }
            set
            {
                this.tTYTDDField = value;
            }
        }

        /// <remarks/>
        public string InternetEmailAddress
        {
            get
            {
                return this.internetEmailAddressField;
            }
            set
            {
                this.internetEmailAddressField = value;
            }
        }

        /// <remarks/>
        public string InternetWebAddress
        {
            get
            {
                return this.internetWebAddressField;
            }
            set
            {
                this.internetWebAddressField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeReferenceContactMethodPostalAddress PostalAddress
        {
            get
            {
                return this.postalAddressField;
            }
            set
            {
                this.postalAddressField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeReferenceContactMethodTelephone
    {

        private byte internationalCountryCodeField;

        private bool internationalCountryCodeFieldSpecified;

        private object nationalNumberField;

        private ushort areaCityCodeField;

        private bool areaCityCodeFieldSpecified;

        private string subscriberNumberField;

        private byte extensionField;

        private bool extensionFieldSpecified;

        private string formattedNumberField;

        /// <remarks/>
        public byte InternationalCountryCode
        {
            get
            {
                return this.internationalCountryCodeField;
            }
            set
            {
                this.internationalCountryCodeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool InternationalCountryCodeSpecified
        {
            get
            {
                return this.internationalCountryCodeFieldSpecified;
            }
            set
            {
                this.internationalCountryCodeFieldSpecified = value;
            }
        }

        /// <remarks/>
        public object NationalNumber
        {
            get
            {
                return this.nationalNumberField;
            }
            set
            {
                this.nationalNumberField = value;
            }
        }

        /// <remarks/>
        public ushort AreaCityCode
        {
            get
            {
                return this.areaCityCodeField;
            }
            set
            {
                this.areaCityCodeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool AreaCityCodeSpecified
        {
            get
            {
                return this.areaCityCodeFieldSpecified;
            }
            set
            {
                this.areaCityCodeFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string SubscriberNumber
        {
            get
            {
                return this.subscriberNumberField;
            }
            set
            {
                this.subscriberNumberField = value;
            }
        }

        /// <remarks/>
        public byte Extension
        {
            get
            {
                return this.extensionField;
            }
            set
            {
                this.extensionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ExtensionSpecified
        {
            get
            {
                return this.extensionFieldSpecified;
            }
            set
            {
                this.extensionFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string FormattedNumber
        {
            get
            {
                return this.formattedNumberField;
            }
            set
            {
                this.formattedNumberField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeReferenceContactMethodMobile
    {

        private string formattedNumberField;

        /// <remarks/>
        public string FormattedNumber
        {
            get
            {
                return this.formattedNumberField;
            }
            set
            {
                this.formattedNumberField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeReferenceContactMethodFax
    {

        private string formattedNumberField;

        /// <remarks/>
        public string FormattedNumber
        {
            get
            {
                return this.formattedNumberField;
            }
            set
            {
                this.formattedNumberField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeReferenceContactMethodPager
    {

        private string formattedNumberField;

        /// <remarks/>
        public string FormattedNumber
        {
            get
            {
                return this.formattedNumberField;
            }
            set
            {
                this.formattedNumberField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeReferenceContactMethodTTYTDD
    {

        private string formattedNumberField;

        /// <remarks/>
        public string FormattedNumber
        {
            get
            {
                return this.formattedNumberField;
            }
            set
            {
                this.formattedNumberField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeReferenceContactMethodPostalAddress
    {

        private string countryCodeField;

        private string postalCodeField;

        private string regionField;

        private string municipalityField;

        private ResumeStructuredXMLResumeReferenceContactMethodPostalAddressDeliveryAddress deliveryAddressField;

        /// <remarks/>
        public string CountryCode
        {
            get
            {
                return this.countryCodeField;
            }
            set
            {
                this.countryCodeField = value;
            }
        }

        /// <remarks/>
        public string PostalCode
        {
            get
            {
                return this.postalCodeField;
            }
            set
            {
                this.postalCodeField = value;
            }
        }

        /// <remarks/>
        public string Region
        {
            get
            {
                return this.regionField;
            }
            set
            {
                this.regionField = value;
            }
        }

        /// <remarks/>
        public string Municipality
        {
            get
            {
                return this.municipalityField;
            }
            set
            {
                this.municipalityField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeReferenceContactMethodPostalAddressDeliveryAddress DeliveryAddress
        {
            get
            {
                return this.deliveryAddressField;
            }
            set
            {
                this.deliveryAddressField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeReferenceContactMethodPostalAddressDeliveryAddress
    {

        private string addressLineField;

        /// <remarks/>
        public string AddressLine
        {
            get
            {
                return this.addressLineField;
            }
            set
            {
                this.addressLineField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSecurityCredential
    {

        private string nameField;

        private string idField;

        private string issuingAuthorityField;

        private string descriptionField;

        private ResumeStructuredXMLResumeSecurityCredentialEffectiveDate effectiveDateField;

        /// <remarks/>
        public string Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        /// <remarks/>
        public string Id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        public string IssuingAuthority
        {
            get
            {
                return this.issuingAuthorityField;
            }
            set
            {
                this.issuingAuthorityField = value;
            }
        }

        /// <remarks/>
        public string Description
        {
            get
            {
                return this.descriptionField;
            }
            set
            {
                this.descriptionField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSecurityCredentialEffectiveDate EffectiveDate
        {
            get
            {
                return this.effectiveDateField;
            }
            set
            {
                this.effectiveDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSecurityCredentialEffectiveDate
    {

        private ResumeStructuredXMLResumeSecurityCredentialEffectiveDateValidFrom validFromField;

        private ResumeStructuredXMLResumeSecurityCredentialEffectiveDateValidTo validToField;

        private ResumeStructuredXMLResumeSecurityCredentialEffectiveDateFirstIssuedDate firstIssuedDateField;

        /// <remarks/>
        public ResumeStructuredXMLResumeSecurityCredentialEffectiveDateValidFrom ValidFrom
        {
            get
            {
                return this.validFromField;
            }
            set
            {
                this.validFromField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSecurityCredentialEffectiveDateValidTo ValidTo
        {
            get
            {
                return this.validToField;
            }
            set
            {
                this.validToField = value;
            }
        }

        /// <remarks/>
        public ResumeStructuredXMLResumeSecurityCredentialEffectiveDateFirstIssuedDate FirstIssuedDate
        {
            get
            {
                return this.firstIssuedDateField;
            }
            set
            {
                this.firstIssuedDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSecurityCredentialEffectiveDateValidFrom
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSecurityCredentialEffectiveDateValidTo
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeStructuredXMLResumeSecurityCredentialEffectiveDateFirstIssuedDate
    {

        private string anyDateField;

        /// <remarks/>
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeNonXMLResume
    {

        private string textResumeField;

        /// <remarks/>
        public string TextResume
        {
            get
            {
                return this.textResumeField;
            }
            set
            {
                this.textResumeField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://ns.hr-xml.org/2006-02-28")]
    public partial class ResumeUserArea
    {

        private ResumeUserArea1 resumeUserArea1Field;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("ResumeUserArea", Namespace = "http://sovren.com/hr-xml/2006-02-28")]
        public ResumeUserArea1 ResumeUserArea1
        {
            get
            {
                return this.resumeUserArea1Field;
            }
            set
            {
                this.resumeUserArea1Field = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    [System.Xml.Serialization.XmlRootAttribute("ResumeUserArea", Namespace = "http://sovren.com/hr-xml/2006-02-28", IsNullable = false)]
    public partial class ResumeUserArea1
    {

        private ResumeUserAreaCulture cultureField;

        private ResumeUserAreaLocation locationField;

        private ResumeUserAreaPersonalInformation personalInformationField;

        private ResumeUserAreaExperienceSummary experienceSummaryField;

        //new April 21, 2017
        private ResumeUserAreaHobbies hobbyField;

        private ResumeUserAreaTrainingHistory trainingHistoryField;

        private ResumeUserAreaSection[] sectionsField;

        private ResumeUserAreaReservedData reservedDataField;

        private ResumeUserAreaCustomDataMatch[] customDataField;

        private string coverLetterTextField;

        private string parsedTextLengthField;

        private string searchHintsField;

        private string parseTimeField;

        private ResumeUserAreaTimedOut timedOutField;

        private string licenseSerialNumberField;

        private string parserConfigurationStringField;

        private string parserVersionField;

        /// <remarks/>
        public ResumeUserAreaCulture Culture
        {
            get
            {
                return this.cultureField;
            }
            set
            {
                this.cultureField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaLocation Location
        {
            get
            {
                return this.locationField;
            }
            set
            {
                this.locationField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaPersonalInformation PersonalInformation
        {
            get
            {
                return this.personalInformationField;
            }
            set
            {
                this.personalInformationField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaExperienceSummary ExperienceSummary
        {
            get
            {
                return this.experienceSummaryField;
            }
            set
            {
                this.experienceSummaryField = value;
            }
        }

        /// <summary>
        /// new to April 21, 2017 <remarks/>
        public ResumeUserAreaHobbies Hobbies
        {
            get
            {
                return this.hobbyField;
            }
            set
            {
                this.hobbyField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaTrainingHistory TrainingHistory
        {
            get
            {
                return this.trainingHistoryField;
            }
            set
            {
                this.trainingHistoryField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("Section", IsNullable = false)]
        public ResumeUserAreaSection[] Sections
        {
            get
            {
                return this.sectionsField;
            }
            set
            {
                this.sectionsField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaReservedData ReservedData
        {
            get
            {
                return this.reservedDataField;
            }
            set
            {
                this.reservedDataField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("CustomDataMatch", IsNullable = false)]
        public ResumeUserAreaCustomDataMatch[] CustomData
        {
            get
            {
                return this.customDataField;
            }
            set
            {
                this.customDataField = value;
            }
        }

        /// <remarks/>
        public string CoverLetterText
        {
            get
            {
                return this.coverLetterTextField;
            }
            set
            {
                this.coverLetterTextField = value;
            }
        }

        /// <remarks/>
        public string ParsedTextLength
        {
            get
            {
                return this.parsedTextLengthField;
            }
            set
            {
                this.parsedTextLengthField = value;
            }
        }

        /// <remarks/>
        public string SearchHints
        {
            get
            {
                return this.searchHintsField;
            }
            set
            {
                this.searchHintsField = value;
            }
        }

        /// <remarks/>
        public string ParseTime
        {
            get
            {
                return this.parseTimeField;
            }
            set
            {
                this.parseTimeField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaTimedOut TimedOut
        {
            get
            {
                return this.timedOutField;
            }
            set
            {
                this.timedOutField = value;
            }
        }

        /// <remarks/>
        public string LicenseSerialNumber
        {
            get
            {
                return this.licenseSerialNumberField;
            }
            set
            {
                this.licenseSerialNumberField = value;
            }
        }

        /// <remarks/>
        public string ParserConfigurationString
        {
            get
            {
                return this.parserConfigurationStringField;
            }
            set
            {
                this.parserConfigurationStringField = value;
            }
        }

        /// <remarks/>
        public string ParserVersion
        {
            get
            {
                return this.parserVersionField;
            }
            set
            {
                this.parserVersionField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaCulture
    {

        private string languageField;

        private string countryField;

        private string cultureInfoField;

        /// <remarks/>
        public string Language
        {
            get
            {
                return this.languageField;
            }
            set
            {
                this.languageField = value;
            }
        }

        /// <remarks/>
        public string Country
        {
            get
            {
                return this.countryField;
            }
            set
            {
                this.countryField = value;
            }
        }

        /// <remarks/>
        public string CultureInfo
        {
            get
            {
                return this.cultureInfoField;
            }
            set
            {
                this.cultureInfoField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaLocation
    {

        private ResumeUserAreaLocationLatitude latitudeField;

        private ResumeUserAreaLocationLongitude longitudeField;

        /// <remarks/>
        public ResumeUserAreaLocationLatitude Latitude
        {
            get
            {
                return this.latitudeField;
            }
            set
            {
                this.latitudeField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaLocationLongitude Longitude
        {
            get
            {
                return this.longitudeField;
            }
            set
            {
                this.longitudeField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaLocationLatitude
    {

        private string inferredField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string inferred
        {
            get
            {
                return this.inferredField;
            }
            set
            {
                this.inferredField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaLocationLongitude
    {

        private string inferredField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string inferred
        {
            get
            {
                return this.inferredField;
            }
            set
            {
                this.inferredField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaPersonalInformation
    {

        private ResumeUserAreaPersonalInformationDateOfBirth dateOfBirthField;

        private string birthplaceField;

        private ResumeUserAreaPersonalInformationNationality nationalityField;

        private ResumeUserAreaPersonalInformationNationalIdentities nationalIdentitiesField;

        private ResumeUserAreaPersonalInformationGender genderField;

        private ResumeUserAreaPersonalInformationMaritalStatus maritalStatusField;

        private string drivingLicenseField;

        private string currentLocationField;

        private string preferredLocationField;

        private string willingToRelocateField;

        private string familyCompositionField;

        private string fathersNameField;

        private string mothersMaidenNameField;

        private string availabilityField;

        private string visaStatusField;

        private string passportNumberField;

        private ResumeUserAreaPersonalInformationCurrentSalary currentSalaryField;

        private ResumeUserAreaPersonalInformationRequiredSalary requiredSalaryField;

        private string hukouCityField;

        private string hukouAreaField;

        private string politicalAffiliationField;

        private ResumeUserAreaPersonalInformationMessagingAddress messagingAddressField;

        private string motherTongueField;

        /// <remarks/>
        public ResumeUserAreaPersonalInformationDateOfBirth DateOfBirth
        {
            get
            {
                return this.dateOfBirthField;
            }
            set
            {
                this.dateOfBirthField = value;
            }
        }

        /// <remarks/>
        public string Birthplace
        {
            get
            {
                return this.birthplaceField;
            }
            set
            {
                this.birthplaceField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaPersonalInformationNationality Nationality
        {
            get
            {
                return this.nationalityField;
            }
            set
            {
                this.nationalityField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaPersonalInformationNationalIdentities NationalIdentities
        {
            get
            {
                return this.nationalIdentitiesField;
            }
            set
            {
                this.nationalIdentitiesField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaPersonalInformationGender Gender
        {
            get
            {
                return this.genderField;
            }
            set
            {
                this.genderField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaPersonalInformationMaritalStatus MaritalStatus
        {
            get
            {
                return this.maritalStatusField;
            }
            set
            {
                this.maritalStatusField = value;
            }
        }

        /// <remarks/>
        public string DrivingLicense
        {
            get
            {
                return this.drivingLicenseField;
            }
            set
            {
                this.drivingLicenseField = value;
            }
        }

        /// <remarks/>
        public string CurrentLocation
        {
            get
            {
                return this.currentLocationField;
            }
            set
            {
                this.currentLocationField = value;
            }
        }

        /// <remarks/>
        public string PreferredLocation
        {
            get
            {
                return this.preferredLocationField;
            }
            set
            {
                this.preferredLocationField = value;
            }
        }

        /// <remarks/>
        public string WillingToRelocate
        {
            get
            {
                return this.willingToRelocateField;
            }
            set
            {
                this.willingToRelocateField = value;
            }
        }

        /// <remarks/>
        public string FamilyComposition
        {
            get
            {
                return this.familyCompositionField;
            }
            set
            {
                this.familyCompositionField = value;
            }
        }

        /// <remarks/>
        public string FathersName
        {
            get
            {
                return this.fathersNameField;
            }
            set
            {
                this.fathersNameField = value;
            }
        }

        /// <remarks/>
        public string MothersMaidenName
        {
            get
            {
                return this.mothersMaidenNameField;
            }
            set
            {
                this.mothersMaidenNameField = value;
            }
        }

        /// <remarks/>
        public string Availability
        {
            get
            {
                return this.availabilityField;
            }
            set
            {
                this.availabilityField = value;
            }
        }

        /// <remarks/>
        public string VisaStatus
        {
            get
            {
                return this.visaStatusField;
            }
            set
            {
                this.visaStatusField = value;
            }
        }

        /// <remarks/>
        public string PassportNumber
        {
            get
            {
                return this.passportNumberField;
            }
            set
            {
                this.passportNumberField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaPersonalInformationCurrentSalary CurrentSalary
        {
            get
            {
                return this.currentSalaryField;
            }
            set
            {
                this.currentSalaryField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaPersonalInformationRequiredSalary RequiredSalary
        {
            get
            {
                return this.requiredSalaryField;
            }
            set
            {
                this.requiredSalaryField = value;
            }
        }

        /// <remarks/>
        public string HukouCity
        {
            get
            {
                return this.hukouCityField;
            }
            set
            {
                this.hukouCityField = value;
            }
        }

        /// <remarks/>
        public string HukouArea
        {
            get
            {
                return this.hukouAreaField;
            }
            set
            {
                this.hukouAreaField = value;
            }
        }

        /// <remarks/>
        public string PoliticalAffiliation
        {
            get
            {
                return this.politicalAffiliationField;
            }
            set
            {
                this.politicalAffiliationField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaPersonalInformationMessagingAddress MessagingAddress
        {
            get
            {
                return this.messagingAddressField;
            }
            set
            {
                this.messagingAddressField = value;
            }
        }

        /// <remarks/>
        public string MotherTongue
        {
            get
            {
                return this.motherTongueField;
            }
            set
            {
                this.motherTongueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaPersonalInformationDateOfBirth
    {

        private string inferredField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string inferred
        {
            get
            {
                return this.inferredField;
            }
            set
            {
                this.inferredField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaPersonalInformationNationality
    {

        private string inferredField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string inferred
        {
            get
            {
                return this.inferredField;
            }
            set
            {
                this.inferredField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaPersonalInformationNationalIdentities
    {

        private ResumeUserAreaPersonalInformationNationalIdentitiesNationalIdentity nationalIdentityField;

        /// <remarks/>
        public ResumeUserAreaPersonalInformationNationalIdentitiesNationalIdentity NationalIdentity
        {
            get
            {
                return this.nationalIdentityField;
            }
            set
            {
                this.nationalIdentityField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaPersonalInformationNationalIdentitiesNationalIdentity
    {

        private string nationalIdentityNumberField;

        private string nationalIdentityPhraseField;

        private string nationalIdentityTypeField;

        /// <remarks/>
        public string NationalIdentityNumber
        {
            get
            {
                return this.nationalIdentityNumberField;
            }
            set
            {
                this.nationalIdentityNumberField = value;
            }
        }

        /// <remarks/>
        public string NationalIdentityPhrase
        {
            get
            {
                return this.nationalIdentityPhraseField;
            }
            set
            {
                this.nationalIdentityPhraseField = value;
            }
        }

        /// <remarks/>
        public string NationalIdentityType
        {
            get
            {
                return this.nationalIdentityTypeField;
            }
            set
            {
                this.nationalIdentityTypeField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaPersonalInformationGender
    {

        private string inferredField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string inferred
        {
            get
            {
                return this.inferredField;
            }
            set
            {
                this.inferredField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaPersonalInformationMaritalStatus
    {

        private string inferredField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string inferred
        {
            get
            {
                return this.inferredField;
            }
            set
            {
                this.inferredField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaPersonalInformationCurrentSalary
    {

        private string currencyField;

        private decimal valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string currency
        {
            get
            {
                return this.currencyField;
            }
            set
            {
                this.currencyField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public decimal Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaPersonalInformationRequiredSalary
    {

        private string currencyField;

        private decimal valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string currency
        {
            get
            {
                return this.currencyField;
            }
            set
            {
                this.currencyField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public decimal Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaPersonalInformationMessagingAddress
    {

        private string typeField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaExperienceSummary
    {

        private string descriptionField;

        private string monthsOfWorkExperienceField;

        private string yearsOfWorkExperienceField;

        private string monthsOfManagementExperienceField;

        private string yearsOfManagementExperienceField;

        private string currentManagementLevelField;

        private string highestManagementScoreField;

        private string executiveTypeField;

        private string managementStoryField;

        private ResumeUserAreaExperienceSummaryBestFitTaxonomy[] bestFitTaxonomiesField;

        /// <remarks/>
        public string Description
        {
            get
            {
                return this.descriptionField;
            }
            set
            {
                this.descriptionField = value;
            }
        }

        /// <remarks/>
        public string MonthsOfWorkExperience
        {
            get
            {
                return this.monthsOfWorkExperienceField;
            }
            set
            {
                this.monthsOfWorkExperienceField = value;
            }
        }

        /// <remarks/>
        public string YearsOfWorkExperience
        {
            get
            {
                return this.yearsOfWorkExperienceField;
            }
            set
            {
                this.yearsOfWorkExperienceField = value;
            }
        }

        /// <remarks/>
        public string MonthsOfManagementExperience
        {
            get
            {
                return this.monthsOfManagementExperienceField;
            }
            set
            {
                this.monthsOfManagementExperienceField = value;
            }
        }

        /// <remarks/>
        public string YearsOfManagementExperience
        {
            get
            {
                return this.yearsOfManagementExperienceField;
            }
            set
            {
                this.yearsOfManagementExperienceField = value;
            }
        }

        /// <remarks/>
        public string CurrentManagementLevel
        {
            get
            {
                return this.currentManagementLevelField;
            }
            set
            {
                this.currentManagementLevelField = value;
            }
        }

        /// <remarks/>
        public string HighestManagementScore
        {
            get
            {
                return this.highestManagementScoreField;
            }
            set
            {
                this.highestManagementScoreField = value;
            }
        }

        /// <remarks/>
        public string ExecutiveType
        {
            get
            {
                return this.executiveTypeField;
            }
            set
            {
                this.executiveTypeField = value;
            }
        }

        /// <remarks/>
        public string ManagementStory
        {
            get
            {
                return this.managementStoryField;
            }
            set
            {
                this.managementStoryField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("BestFitTaxonomy", IsNullable = false)]
        public ResumeUserAreaExperienceSummaryBestFitTaxonomy[] BestFitTaxonomies
        {
            get
            {
                return this.bestFitTaxonomiesField;
            }
            set
            {
                this.bestFitTaxonomiesField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaExperienceSummaryBestFitTaxonomy
    {

        private ResumeUserAreaExperienceSummaryBestFitTaxonomyBestFitTaxonomy[] bestFitTaxonomyField;

        private string idField;

        private string rootIdField;

        private string nameField;

        private decimal weightField;

        private decimal percentOfOverallField;

        private decimal percentOfParentField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("BestFitTaxonomy")]
        public ResumeUserAreaExperienceSummaryBestFitTaxonomyBestFitTaxonomy[] BestFitTaxonomy
        {
            get
            {
                return this.bestFitTaxonomyField;
            }
            set
            {
                this.bestFitTaxonomyField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string rootId
        {
            get
            {
                return this.rootIdField;
            }
            set
            {
                this.rootIdField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public decimal weight
        {
            get
            {
                return this.weightField;
            }
            set
            {
                this.weightField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public decimal percentOfOverall
        {
            get
            {
                return this.percentOfOverallField;
            }
            set
            {
                this.percentOfOverallField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public decimal percentOfParent
        {
            get
            {
                return this.percentOfParentField;
            }
            set
            {
                this.percentOfParentField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaExperienceSummaryBestFitTaxonomyBestFitTaxonomy
    {

        private string idField;

        private string rootIdField;

        private string nameField;

        private decimal weightField;

        private decimal percentOfOverallField;

        private decimal percentOfParentField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string rootId
        {
            get
            {
                return this.rootIdField;
            }
            set
            {
                this.rootIdField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public decimal weight
        {
            get
            {
                return this.weightField;
            }
            set
            {
                this.weightField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public decimal percentOfOverall
        {
            get
            {
                return this.percentOfOverallField;
            }
            set
            {
                this.percentOfOverallField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public decimal percentOfParent
        {
            get
            {
                return this.percentOfParentField;
            }
            set
            {
                this.percentOfParentField = value;
            }
        }
    }

    /// <summary>
    /// new to April 21, 2017
    /// </summary>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaHobbies
    {
        private string hobbyField;

        public string hobby
        {
            get
            {
                return this.hobbyField;
            }
            set
            {
                this.hobbyField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaTrainingHistory
    {

        private string textField;

        private ResumeUserAreaTrainingHistoryTraining[] trainingField;

        /// <remarks/>
        public string Text
        {
            get
            {
                return this.textField;
            }
            set
            {
                this.textField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("Training")]
        public ResumeUserAreaTrainingHistoryTraining[] Training
        {
            get
            {
                return this.trainingField;
            }
            set
            {
                this.trainingField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaTrainingHistoryTraining
    {

        private string typeField;

        private string trainingNameField;

        private string[] qualificationsField;

        private string entityField;

        private string descriptionField;

        private ResumeUserAreaTrainingHistoryTrainingStartDate startDateField;

        private ResumeUserAreaTrainingHistoryTrainingEndDate endDateField;

        /// <remarks/>
        public string Type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }

        /// <remarks/>
        public string TrainingName
        {
            get
            {
                return this.trainingNameField;
            }
            set
            {
                this.trainingNameField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("Qualification", IsNullable = false)]
        public string[] Qualifications
        {
            get
            {
                return this.qualificationsField;
            }
            set
            {
                this.qualificationsField = value;
            }
        }

        /// <remarks/>
        public string Entity
        {
            get
            {
                return this.entityField;
            }
            set
            {
                this.entityField = value;
            }
        }

        /// <remarks/>
        public string Description
        {
            get
            {
                return this.descriptionField;
            }
            set
            {
                this.descriptionField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaTrainingHistoryTrainingStartDate StartDate
        {
            get
            {
                return this.startDateField;
            }
            set
            {
                this.startDateField = value;
            }
        }

        /// <remarks/>
        public ResumeUserAreaTrainingHistoryTrainingEndDate EndDate
        {
            get
            {
                return this.endDateField;
            }
            set
            {
                this.endDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaTrainingHistoryTrainingStartDate
    {

        private string anyDateField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Namespace = "http://ns.hr-xml.org/2006-02-28")]
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaTrainingHistoryTrainingEndDate
    {

        private string anyDateField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Namespace = "http://ns.hr-xml.org/2006-02-28")]
        public string AnyDate
        {
            get
            {
                return this.anyDateField;
            }
            set
            {
                this.anyDateField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaSection
    {

        private string sectionTypeField;

        private byte startsField;

        private byte endsField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string sectionType
        {
            get
            {
                return this.sectionTypeField;
            }
            set
            {
                this.sectionTypeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public byte starts
        {
            get
            {
                return this.startsField;
            }
            set
            {
                this.startsField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public byte ends
        {
            get
            {
                return this.endsField;
            }
            set
            {
                this.endsField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaReservedData
    {

        private string[] phonesField;

        private string[] emailAddressesField;

        private string[] urlsField;

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("Phone", IsNullable = false)]
        public string[] Phones
        {
            get
            {
                return this.phonesField;
            }
            set
            {
                this.phonesField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("EmailAddress", IsNullable = false)]
        public string[] EmailAddresses
        {
            get
            {
                return this.emailAddressesField;
            }
            set
            {
                this.emailAddressesField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("Url", IsNullable = false)]
        public string[] Urls
        {
            get
            {
                return this.urlsField;
            }
            set
            {
                this.urlsField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaCustomDataMatch
    {

        private string typeField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://sovren.com/hr-xml/2006-02-28")]
    public partial class ResumeUserAreaTimedOut
    {

        private string typeField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }
}