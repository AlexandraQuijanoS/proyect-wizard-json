export type Invoice = {
  TrackId: string;
  Invoice: SectionsInvoice;
};

export type SectionsInvoice = {
  'ext:UBLExtensions': UBLExtensions;
  'cbc:CustomizationID': string;
  'cbc:ProfileExecutionID': string;
  'cbc:ID': string;
  'cbc:IssueDate': string;
  'cbc:IssueTime': string;
  'cbc:InvoiceTypeCode': string;
  'cbc:Note'?: Notes[];
  'cbc:DocumentCurrencyCode': string;
  'cbc:LineCountNumeric': string;
  'cac:OrderReference'?: OrderReference;
  'cac:AdditionalDocumentReference'?: AdditionalDocumentReference;
  'cac:AccountingSupplierParty'?: AccountingSupplierParty;
  'cac:AccountingCustomerParty'?: AccountingCustomerParty;
  'cac:PaymentMeans'?: PaymentMeans[];
  'cac:AllowanceCharge'?: AllowanceCharge[];
  'cac:TaxTotal'?: TaxTotal[];
  'cac:WithholdingTaxTotal'?: WithholdingTaxTotal[];
  'cac:LegalMonetaryTotal'?: LegalMonetaryTotal;
  'cac:InvoiceLine'?: InvoiceLine[];
};

export type UBLExtensions = {
  'ext:UBLExtension': UBLExtension;
};

export type UBLExtension = {
  'ext:ExtensionContent': ExtensionContent;
};

export type ExtensionContent = {
  'sts:DianExtensions': DianExtensions;
};

export type DianExtensions = {
  'sts:InvoiceControl': InvoiceControl;
};

export type InvoiceControl = {
  'sts:InvoiceAuthorization': string;
  'sts:AuthorizationPeriod': AuthorizationPeriod;
  'sts:AuthorizedInvoices': AuthorizedInvoices;
};

export type AuthorizationPeriod = {
  'cbc:StartDate': string;
  'cbc:EndDate': string;
};

export type AuthorizedInvoices = {
  'sts:Prefix': string;
  'sts:From': string;
  'sts:To': string;
};

export type Notes = {
  languageLocaleID: string;
  'cbc:Note': string;
};

export type OrderReference = {
  'cbc:ID': string;
  'cbc:IssueDate': string;
};

export type AdditionalDocumentReference = {
  'cbc:ID': string;
  'cbc:IssueDate': string;
  'cbc:DocumentTypeCode': string;
};

export type AccountingSupplierParty = {
  'cbc:AdditionalAccountID': string;
  'cac:Party': Party;
};

export type Party = {
  'cac:PartyName': PartyName;
  'cac:PhysicalLocation': PhysicalLocation;
  'cac:PartyTaxScheme': PartyTaxScheme;
  'cac:PartyLegalEntity': PartyLegalEntity;
  'cac:Contact': Contact;
};

export type PartyName = {
  'cbc:Name': string;
};

export type PhysicalLocation = {
  'cac:Address': Address;
};

export type Address = {
  'cbc:ID': string;
  'cbc:CityName': string;
  'cbc:PostalZone': string;
  'cbc:CountrySubentity': string;
  'cbc:CountrySubentityCode': string;
  'cac:AddressLine': AddressLine;
  'cac:Country': Country;
};

export type AddressLine = {
  'cbc:Line': string;
};

export type Country = {
  'cbc:IdentificationCode': string;
  'cbc:Name': Name;
  languageID?: string,
};

export type Name = {
  languageID: string;
  'cbc:Name': string;
};

export type PartyTaxScheme = {
  'cbc:RegistrationName': string;
  'cbc:CompanyID': CompanyID;
  'cbc:TaxLevelCode': TaxLevelCode;
  'cac:RegistrationAddress': RegistrationAddress;
  'cac:TaxScheme': TaxScheme;
};

export type CompanyID = {
  schemeID: string;
  schemeName: string;
  schemeAgencyID: string;
  schemeAgencyName: string;
  'cbc:CompanyID': string;
};

export type TaxLevelCode = {
  listName: string;
  'cbc:TaxLevelCode': string;
};

export type RegistrationAddress = {
  'cbc:ID': string;
  'cbc:CityName': string;
  'cbc:PostalZone': string;
  'cbc:CountrySubentity': string;
  'cbc:CountrySubentityCode': string;
  'cac:AddressLine': AddressLine;
  'cac:Country': Country;
};

export type TaxScheme = {
  'cbc:ID': string;
  'cbc:Name': string;
};

export type PartyLegalEntity = {
  'cbc:RegistrationName': string;
  'cbc:CompanyID': CompanyID;
  'cac:CorporateRegistrationScheme': CorporateRegistrationScheme;
};

export type CorporateRegistrationScheme = {
  'cbc:ID': string;
  'cbc:Name': string;
};

export type Contact = {
  "cbc:Telephone": string;
  "cbc:ElectronicMail": string;
  "cbc:Nota": string;
}

export type AccountingCustomerParty = {
  "cbc:AdditionalAccountID": string,
  "cac:Party": Party;
}

export type PaymentMeans = {
  "cbc:ID": string;
  "cbc:PaymentMeansCode": string;
  "cbc:PaymentDueDate": string;
  "cbc:PaymentID": string;
}

export type AllowanceCharge = {
  "cbc:ID": string;
  "cbc:ChargeIndicator": string;
  "cbc:AllowanceChargeReasonCode": string;
  "cbc:AllowanceChargeReason": string;
  "cbc:MultiplierFactorNumeric": string;
  "cbc:Amount": Amount;
  "cbc:BaseAmount": BaseAmount;
}

export type Amount = {
  "currencyID": string;
  "cbc:Amount": string;
}

export type BaseAmount = {
  "currencyID": string;
  "cbc:BaseAmount": string;
}

export type TaxTotal = {
  "cbc:TaxAmount": TaxAmount;
  "cbc:RoundingAmount": RoundingAmount;
  "cac:TaxSubtotal": TaxSubtotal[];
}

export type TaxAmount = {
  "currencyID": string;
  "cbc:TaxAmount": string;
}

export type RoundingAmount = {
  "currencyID": string;
  "cbc:RoundingAmount": string;
}

export type TaxSubtotal = {
  "cbc:TaxableAmount": TaxableAmount;
  "cbc:TaxAmount": TaxAmount;
  "cac:TaxCategory": TaxCategory;
}

export type TaxableAmount = {
  "currencyID": string;
  "cbc:TaxableAmount": string;
}

export type TaxCategory = {
  "cbc:Percent": string
  "cac:TaxScheme": TaxScheme;
}

export type WithholdingTaxTotal = {
  "cbc:TaxAmount": TaxAmount;
  "cac:TaxSubtotal": TaxSubtotal[];
}

export type LegalMonetaryTotal = {
  "cbc:LineExtensionAmount": LineExtensionAmount;
  "cbc:TaxExclusiveAmount": TaxExclusiveAmount;
  "cbc:TaxInclusiveAmount": TaxInclusiveAmount;
  "cbc:AllowanceTotalAmount": AllowanceTotalAmount;
  "cbc:ChargeTotalAmount": ChargeTotalAmount;
  "cbc:PrePaidAmountAmount": PrePaidAmountAmount;
  "cbc:PayableRoundingAmount": PayableRoundingAmount;
  "cbc:PayableAmount": PayableAmount;
}

export type LineExtensionAmount = {
  "currencyID": string
  "cbc:LineExtensionAmount": string;
}

export type TaxExclusiveAmount = {
  "currencyID": string;
  "cbc:TaxExclusiveAmount": string;
}

export type TaxInclusiveAmount = {
  "currencyID": string;
  "cbc:TaxInclusiveAmount": string;
}

export type AllowanceTotalAmount = {
  "currencyID": string;
  "cbc:AllowanceTotalAmount": string;
}

export type ChargeTotalAmount = {
  "currencyID": string;
  "cbc:ChargeTotalAmount": string;
}

export type PrePaidAmountAmount = {
  "currencyID": string;
  "cbc:PrePaidAmountAmount": string;
}

export type PayableRoundingAmount = {
  "currencyID": string;
  "cbc:PayableRoundingAmount": string;
}

export type PayableAmount = {
  "currencyID": string;
  "cbc:PayableAmount": string;
}

export type InvoiceLine = {
  "cbc:ID": ID;
  "cbc:InvoicedQuantity": InvoicedQuantity;
  "cbc:LineExtensionAmount": LineExtensionAmount;
  "cac:AllowanceCharge": AllowanceCharge[];
  "cac:TaxTotal": TaxTotal[];
  "cac:WithholdingTaxTotal": WithholdingTaxTotal[];
  "cac:Item": Item;
  "cac:Price": Price;
}

export type ID = {
  "schemeID": string;
  "cbc:ID": string;
  "schemeName"?: string
  "schemeAgencyID"?: string
  "schemeAgencyName"?: string;
}

export type InvoicedQuantity = {
  "unitCode": string;
  "cbc:InvoicedQuantity": string;
  
}

export type Item = {
  "cbc:Description": string;
  "cac:StandardItemIdentification": StandardItemIdentification;
  "cac:InformationContentProviderParty": InformationContentProviderParty;
}

export type StandardItemIdentification = {
  "cbc:ID": ID;
}

export type InformationContentProviderParty = {
  "cac:PowerOfAttorney": PowerOfAttorney;
}

export type PowerOfAttorney = {
  "cac:AgentParty": AgentParty;
}

export type AgentParty = {
  "cac:PartyIdentification": PartyIdentification;
}

export type PartyIdentification = {
  "cbc:ID": ID;
}

export type Price = {
  "cbc:PriceAmount": PriceAmount;
  "cbc:BaseQuantity": BaseQuantity;
}

export type PriceAmount = {
  "currencyID": string;
  "cbc:PriceAmount": string;
}

export type BaseQuantity = {
  "unitCode": string;
  "cbc:BaseQuantity": string;
}