import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  SideNavigationModel,
  WizardService,
  WizardStepComponent,
  WizardStepStatus,
} from '@fundamental-ngx/core';
import {
  Invoice,
  PayableAmount,
  PaymentMeans,
  SectionsInvoice,
} from '../types/Invoce';
import { JsonServiceService } from './services/json-service.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { keyValue } from '../types/ListInvoice';

export type WizardStep = {
  status: WizardStepStatus;
  label: string;
  glyph: string;
  messageStrip?: string;
  contentText?: string;
};

@Component({
  selector: 'app-wizard-json',
  templateUrl: './wizard-json.component.html',
  styleUrls: ['./wizard-json.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'fd-wizard-example',
  },
  providers: [WizardService],
})
export class WizardJsonComponent implements OnInit {
  @ViewChild('overlay')
  overlay!: ElementRef<HTMLElement>;
  fullscreen = false;

  name = '';

  steps: WizardStep[] = [
    {
      status: 'current',
      label: 'Datos generales',
      glyph: 'product',
    },
    {
      status: 'completed',
      label: 'Orden de compra',
      glyph: 'user-edit',
    },
    {
      status: 'completed',
      label: 'Contingencia',
      glyph: 'user-edit',
    },
    {
      status: 'completed',
      label: 'Emisor Exito',
      glyph: 'user-edit',
    },
    {
      status: 'completed',
      label: 'Receptor',
      glyph: 'user-edit',
    },
    {
      status: 'completed',
      label: 'Formas de pago',
      glyph: 'user-edit',
    },
    {
      status: 'completed',
      label: 'Descuentos',
      glyph: 'user-edit',
    },
    {
      status: 'completed',
      label: 'Tributos de impuestos',
      glyph: 'user-edit',
    },
    {
      status: 'completed',
      label: 'Retenciones',
      glyph: 'user-edit',
    },
    {
      status: 'completed',
      label: 'Totales',
      glyph: 'user-edit',
    },
    {
      status: 'completed',
      label: 'Detalle general',
      glyph: 'user-edit',
    },
  ];
  loading = true;

  /** @hidden */
  @ViewChildren(WizardStepComponent)
  wizardStepComponents!: QueryList<WizardStepComponent>;

  // Informacion JSON
  infoJSON!: Invoice;
  // Secciones del wizard
  sectionsName: string[] = [];
  // Invoice forms
  generalForm!: FormGroup;
  orderForm!: FormGroup;
  contingencyForm!: FormGroup;
  transmitterForm!: FormGroup;
  receiverForm!: FormGroup;
  paymentMeansForm!: FormArray;
  discountsForm!: FormArray;
  tributesForm!: FormArray;
  retentionsForm!: FormGroup;
  totalForm!: FormGroup;

  //Descarga

  fileUrl: any;

  listCustomizationID: keyValue[] = [];
  listProfileExecutionID: keyValue[] = [];
  listInvoiceTypeCode: keyValue[] = [];

  ejemplo: any;

  constructor(
    private _wizardService: WizardService,
    private serviceJson: JsonServiceService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.serviceJson.getJSON().subscribe({
      next: async (response) => {
        this.infoJSON = response;
        this.optionList();
        setTimeout(() => {
          this.initForm();
        }, 2000);
      },
      error: () => {
        console.log('Error');
      },
    });
  }

  optionList() {
    this.serviceJson.getLists().subscribe({
      next: async (response) => {
        this.listCustomizationID = await response.CustomizationID;
        this.listProfileExecutionID = await response.ProfileExecutionID;
        this.listInvoiceTypeCode = await response.InvoiceTypeCode;
      },
      error: () => {
        console.log('Error');
      },
    });
  }

  initForm() {
    // Datos generales
    this.generalForm = this.formBuilder.group({
      CustomizationID: new FormControl(
        this.infoJSON.Invoice['cbc:CustomizationID']
      ),
      ProfileExecutionID: new FormControl(
        this.infoJSON.Invoice['cbc:ProfileExecutionID']
      ),
      ID: new FormControl(this.infoJSON.Invoice['cbc:ID']),
      IssueDate: new FormControl(this.infoJSON.Invoice['cbc:IssueDate']),
      IssueTime: new FormControl(this.infoJSON.Invoice['cbc:IssueTime']),
      InvoiceTypeCode: new FormControl(
        this.infoJSON.Invoice['cbc:InvoiceTypeCode']
      ),
      Note: new FormControl(this.infoJSON.Invoice['cbc:Note']),
      DocumentCurrencyCode: new FormControl(
        this.infoJSON.Invoice['cbc:DocumentCurrencyCode']
      ),
      LineCountNumeric: new FormControl(
        this.infoJSON.Invoice['cbc:LineCountNumeric']
      ),
      Dependency: new FormControl(''),
      ResolutionNumber: new FormControl(''),
      StartDate: new FormControl(
        this.infoJSON.Invoice['ext:UBLExtensions']['ext:UBLExtension'][
          'ext:ExtensionContent'
        ]['sts:DianExtensions']['sts:InvoiceControl'][
          'sts:AuthorizationPeriod'
        ]['cbc:StartDate']
      ),
      EndDate: new FormControl(
        this.infoJSON.Invoice['ext:UBLExtensions']['ext:UBLExtension'][
          'ext:ExtensionContent'
        ]['sts:DianExtensions']['sts:InvoiceControl'][
          'sts:AuthorizationPeriod'
        ]['cbc:EndDate']
      ),
      Prefix: new FormControl(
        this.infoJSON.Invoice['ext:UBLExtensions']['ext:UBLExtension'][
          'ext:ExtensionContent'
        ]['sts:DianExtensions']['sts:InvoiceControl']['sts:AuthorizedInvoices'][
          'sts:Prefix'
        ]
      ),
      StartConsecutive: new FormControl(''),
      EndConsecutive: new FormControl(''),
      From: new FormControl(
        this.infoJSON.Invoice['ext:UBLExtensions']['ext:UBLExtension'][
          'ext:ExtensionContent'
        ]['sts:DianExtensions']['sts:InvoiceControl']['sts:AuthorizedInvoices'][
          'sts:From'
        ]
      ),
      To: new FormControl(
        this.infoJSON.Invoice['ext:UBLExtensions']['ext:UBLExtension'][
          'ext:ExtensionContent'
        ]['sts:DianExtensions']['sts:InvoiceControl']['sts:AuthorizedInvoices'][
          'sts:To'
        ]
      ),
      InvoiceAuthorization: new FormControl(
        this.infoJSON.Invoice['ext:UBLExtensions']['ext:UBLExtension'][
          'ext:ExtensionContent'
        ]['sts:DianExtensions']['sts:InvoiceControl'][
          'sts:InvoiceAuthorization'
        ]
      ),
    });

    // Orden de compra

    this.orderForm = this.formBuilder.group({
      'cbc:ID': new FormControl(
        this.infoJSON.Invoice['cac:OrderReference']?.['cbc:ID']
      ),
      'cbc:IssueDate': new FormControl(
        this.infoJSON.Invoice['cac:OrderReference']?.['cbc:IssueDate']
      ),
    });

    // Campos de contingencia

    this.contingencyForm = this.formBuilder.group({
      'cbc:ID': new FormControl(
        this.infoJSON.Invoice['cac:AdditionalDocumentReference']?.['cbc:ID']
      ),
      'cbc:IssueDate': new FormControl(
        this.infoJSON.Invoice['cac:AdditionalDocumentReference']?.[
          'cbc:IssueDate'
        ]
      ),
      'cbc:DocumentTypeCode': new FormControl(
        this.infoJSON.Invoice['cac:AdditionalDocumentReference']?.[
          'cbc:DocumentTypeCode'
        ]
      ),
    });

    // Emisor Exito

    this.transmitterForm = new FormGroup({
      'cbc:AdditionalAccountID': new FormControl(
        this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
          'cbc:AdditionalAccountID'
        ]
      ),
      'cac:Party': new FormGroup({
        'cac:PartyName': new FormGroup({
          'cbc:Name': new FormControl(
            this.infoJSON.Invoice['cac:AccountingSupplierParty']?.['cac:Party'][
              'cac:PartyName'
            ]['cbc:Name']
          ),
        }),
        'cac:PhysicalLocation': new FormGroup({
          'cac:Address': new FormGroup({
            'cbc:ID': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PhysicalLocation']['cac:Address']['cbc:ID']
            ),
            'cbc:CityName': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PhysicalLocation']['cac:Address']['cbc:CityName']
            ),
            'cbc:PostalZone': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PhysicalLocation']['cac:Address']['cbc:PostalZone']
            ),
            'cbc:CountrySubentity': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PhysicalLocation']['cac:Address']['cbc:CountrySubentity']
            ),
            'cbc:CountrySubentityCode': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PhysicalLocation']['cac:Address'][
                'cbc:CountrySubentityCode'
              ]
            ),
            'cac:AddressLine': new FormGroup({
              'cbc:Line': new FormControl(
                this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                  'cac:Party'
                ]['cac:PhysicalLocation']['cac:Address']['cac:AddressLine'][
                  'cbc:Line'
                ]
              ),
            }),
            'cac:Country': new FormGroup({
              'cbc:IdentificationCode': new FormControl(
                this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                  'cac:Party'
                ]['cac:PhysicalLocation']['cac:Address']['cac:Country'][
                  'cbc:IdentificationCode'
                ]
              ),
              'cbc:Name': new FormGroup({
                languageID: new FormControl(
                  this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                    'cac:Party'
                  ]['cac:PhysicalLocation']['cac:Address']['cac:Country'][
                    'cbc:Name'
                  ].languageID
                ),
                'cbc:Name': new FormControl(
                  this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                    'cac:Party'
                  ]['cac:PhysicalLocation']['cac:Address']['cac:Country'][
                    'cbc:Name'
                  ]['cbc:Name']
                ),
              }),
            }),
          }),
        }),
        'cac:PartyTaxScheme': new FormGroup({
          'cbc:RegistrationName': new FormControl(
            this.infoJSON.Invoice['cac:AccountingSupplierParty']?.['cac:Party'][
              'cac:PartyTaxScheme'
            ]['cbc:RegistrationName']
          ),
          'cbc:CompanyID': new FormGroup({
            'cbc:CompanyID': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cbc:CompanyID']['cbc:CompanyID']
            ),
            schemeAgencyID: new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cbc:CompanyID'].schemeAgencyID
            ),
            schemeID: new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cbc:CompanyID'].schemeID
            ),
            schemeName: new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cbc:CompanyID'].schemeName
            ),
            schemeAgencyName: new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cbc:CompanyID'].schemeAgencyName
            ),
          }),
          'cbc:TaxLevelCode': new FormGroup({
            'cbc:TaxLevelCode': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cbc:TaxLevelCode']['cbc:TaxLevelCode']
            ),
            listName: new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cbc:TaxLevelCode'].listName
            ),
          }),
          'cac:RegistrationAddress': new FormGroup({
            'cbc:ID': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cac:RegistrationAddress']['cbc:ID']
            ),
            'cbc:CityName': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cac:RegistrationAddress']['cbc:CityName']
            ),
            'cbc:PostalZone': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cac:RegistrationAddress'][
                'cbc:PostalZone'
              ]
            ),
            'cbc:CountrySubentity': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cac:RegistrationAddress'][
                'cbc:CountrySubentity'
              ]
            ),
            'cbc:CountrySubentityCode': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cac:RegistrationAddress'][
                'cbc:CountrySubentityCode'
              ]
            ),
            'cac:AddressLine': new FormGroup({
              'cbc:Line': new FormControl(
                this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                  'cac:Party'
                ]['cac:PartyTaxScheme']['cac:RegistrationAddress'][
                  'cac:AddressLine'
                ]['cbc:Line']
              ),
            }),
            'cac:Country': new FormGroup({
              'cbc:IdentificationCode': new FormControl(
                this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                  'cac:Party'
                ]['cac:PartyTaxScheme']['cac:RegistrationAddress'][
                  'cac:Country'
                ]['cbc:IdentificationCode']
              ),
              'cbc:Name': new FormGroup({
                'cbc:Name': new FormControl(
                  this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                    'cac:Party'
                  ]['cac:PartyTaxScheme']['cac:RegistrationAddress'][
                    'cac:Country'
                  ]['cbc:Name']['cbc:Name']
                ),
                languageID: new FormControl(
                  this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                    'cac:Party'
                  ]['cac:PartyTaxScheme']['cac:RegistrationAddress'][
                    'cac:Country'
                  ]['cbc:Name'].languageID
                ),
              }),
            }),
          }),
          'cac:TaxScheme': new FormGroup({
            'cbc:ID': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cac:TaxScheme']['cbc:ID']
            ),
            'cbc:Name': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cac:TaxScheme']['cbc:Name']
            ),
          }),
        }),
        'cac:PartyLegalEntity': new FormGroup({
          'cbc:RegistrationName': new FormControl(
            this.infoJSON.Invoice['cac:AccountingSupplierParty']?.['cac:Party'][
              'cac:PartyLegalEntity'
            ]['cbc:RegistrationName']
          ),
          'cbc:CompanyID': new FormGroup({
            schemeAgencyID: new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyLegalEntity']['cbc:CompanyID'].schemeAgencyID
            ),
            schemeID: new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyLegalEntity']['cbc:CompanyID'].schemeID
            ),
            schemeName: new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyLegalEntity']['cbc:CompanyID'].schemeName
            ),
            schemeAgencyName: new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyLegalEntity']['cbc:CompanyID'].schemeAgencyName
            ),
            'cbc:CompanyID': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyLegalEntity']['cbc:CompanyID']['cbc:CompanyID']
            ),
          }),
          'cac:CorporateRegistrationScheme': new FormGroup({
            'cbc:ID': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyLegalEntity']['cac:CorporateRegistrationScheme'][
                'cbc:ID'
              ]
            ),
            'cbc:Name': new FormControl(
              this.infoJSON.Invoice['cac:AccountingSupplierParty']?.[
                'cac:Party'
              ]['cac:PartyLegalEntity']['cac:CorporateRegistrationScheme'][
                'cbc:Name'
              ]
            ),
          }),
        }),
        'cac:Contact': new FormGroup({
          'cbc:Telephone': new FormControl(
            this.infoJSON.Invoice['cac:AccountingSupplierParty']?.['cac:Party'][
              'cac:Contact'
            ]['cbc:Telephone']
          ),
          'cbc:ElectronicMail': new FormControl(
            this.infoJSON.Invoice['cac:AccountingSupplierParty']?.['cac:Party'][
              'cac:Contact'
            ]['cbc:ElectronicMail']
          ),
        }),
      }),
    });

    // Receptor

    this.receiverForm = new FormGroup({
      'cbc:AdditionalAccountID': new FormControl(
        this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
          'cbc:AdditionalAccountID'
        ]
      ),
      'cac:Party': new FormGroup({
        'cac:PartyName': new FormGroup({
          'cbc:Name': new FormControl(
            this.infoJSON.Invoice['cac:AccountingCustomerParty']?.['cac:Party'][
              'cac:PartyName'
            ]['cbc:Name']
          ),
        }),
        'cac:PhysicalLocation': new FormGroup({
          'cac:Address': new FormGroup({
            'cbc:ID': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PhysicalLocation']['cac:Address']['cbc:ID']
            ),
            'cbc:CityName': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PhysicalLocation']['cac:Address']['cbc:CityName']
            ),
            'cbc:PostalZone': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PhysicalLocation']['cac:Address']['cbc:PostalZone']
            ),
            'cbc:CountrySubentity': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PhysicalLocation']['cac:Address']['cbc:CountrySubentity']
            ),
            'cbc:CountrySubentityCode': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PhysicalLocation']['cac:Address'][
                'cbc:CountrySubentityCode'
              ]
            ),
            'cac:AddressLine': new FormGroup({
              'cbc:Line': new FormControl(
                this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                  'cac:Party'
                ]['cac:PhysicalLocation']['cac:Address']['cac:AddressLine'][
                  'cbc:Line'
                ]
              ),
            }),
            'cac:Country': new FormGroup({
              'cbc:IdentificationCode': new FormControl(
                this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                  'cac:Party'
                ]['cac:PhysicalLocation']['cac:Address']['cac:Country'][
                  'cbc:IdentificationCode'
                ]
              ),
              'cbc:Name': new FormGroup({
                languageID: new FormControl(
                  this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                    'cac:Party'
                  ]['cac:PhysicalLocation']['cac:Address']['cac:Country'][
                    'cbc:Name'
                  ].languageID
                ),
                'cbc:Name': new FormControl(
                  this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                    'cac:Party'
                  ]['cac:PhysicalLocation']['cac:Address']['cac:Country'][
                    'cbc:Name'
                  ]['cbc:Name']
                ),
              }),
            }),
          }),
        }),
        'cac:PartyTaxScheme': new FormGroup({
          'cbc:RegistrationName': new FormControl(
            this.infoJSON.Invoice['cac:AccountingCustomerParty']?.['cac:Party'][
              'cac:PartyTaxScheme'
            ]['cac:RegistrationAddress']
          ),
          'cbc:CompanyID': new FormGroup({
            schemeID: new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cbc:CompanyID'].schemeID
            ),
            schemeName: new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cbc:CompanyID'].schemeName
            ),
            schemeAgencyID: new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cbc:CompanyID'].schemeAgencyID
            ),
            schemeAgencyName: new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cbc:CompanyID'].schemeAgencyName
            ),
            'cbc:CompanyID': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cbc:CompanyID']['cbc:CompanyID']
            ),
          }),
          'cbc:TaxLevelCode': new FormGroup({
            listName: new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cbc:TaxLevelCode'].listName
            ),
            'cbc:TaxLevelCode': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cbc:TaxLevelCode']['cbc:TaxLevelCode']
            ),
          }),
          'cac:RegistrationAddress': new FormGroup({
            'cbc:ID': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cac:RegistrationAddress']['cbc:ID']
            ),
            'cbc:CityName': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cac:RegistrationAddress']['cbc:CityName']
            ),
            'cbc:PostalZone': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cac:RegistrationAddress'][
                'cbc:PostalZone'
              ]
            ),
            'cbc:CountrySubentity': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cac:RegistrationAddress'][
                'cbc:CountrySubentity'
              ]
            ),
            'cbc:CountrySubentityCode': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cac:RegistrationAddress'][
                'cbc:CountrySubentityCode'
              ]
            ),
            'cac:AddressLine': new FormGroup({
              'cbc:Line': new FormControl(
                this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                  'cac:Party'
                ]['cac:PartyTaxScheme']['cac:RegistrationAddress'][
                  'cac:AddressLine'
                ]['cbc:Line']
              ),
            }),
            'cac:Country': new FormGroup({
              'cbc:IdentificationCode': new FormControl(
                this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                  'cac:Party'
                ]['cac:PartyTaxScheme']['cac:RegistrationAddress'][
                  'cac:Country'
                ]['cbc:IdentificationCode']
              ),
              'cbc:Name': new FormGroup({
                languageID: new FormControl(
                  this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                    'cac:Party'
                  ]['cac:PartyTaxScheme']['cac:RegistrationAddress'][
                    'cac:Country'
                  ]['cbc:Name'].languageID
                ),
                'cbc:Name': new FormControl(
                  this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                    'cac:Party'
                  ]['cac:PartyTaxScheme']['cac:RegistrationAddress'][
                    'cac:Country'
                  ]['cbc:Name']['cbc:Name']
                ),
              }),
            }),
          }),
          'cac:TaxScheme': new FormGroup({
            'cbc:ID': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cac:TaxScheme']['cbc:ID']
            ),
            'cbc:Name': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyTaxScheme']['cac:TaxScheme']['cbc:Name']
            ),
          }),
        }),
        'cac:PartyLegalEntity': new FormGroup({
          'cbc:RegistrationName': new FormControl(
            this.infoJSON.Invoice['cac:AccountingCustomerParty']?.['cac:Party'][
              'cac:PartyLegalEntity'
            ]['cbc:RegistrationName']
          ),
          'cbc:CompanyID': new FormGroup({
            schemeID: new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyLegalEntity']['cbc:CompanyID'].schemeID
            ),
            schemeName: new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyLegalEntity']['cbc:CompanyID'].schemeName
            ),
            schemeAgencyID: new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyLegalEntity']['cbc:CompanyID'].schemeAgencyID
            ),
            schemeAgencyName: new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyLegalEntity']['cbc:CompanyID'].schemeAgencyName
            ),
            'cbc:CompanyID': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyLegalEntity']['cbc:CompanyID']['cbc:CompanyID']
            ),
          }),
          'cac:CorporateRegistrationScheme': new FormGroup({
            'cbc:Name': new FormControl(
              this.infoJSON.Invoice['cac:AccountingCustomerParty']?.[
                'cac:Party'
              ]['cac:PartyLegalEntity']['cac:CorporateRegistrationScheme'][
                'cbc:Name'
              ]
            ),
          }),
        }),
        'cac:Contact': new FormGroup({
          'cbc:Telephone': new FormControl(
            this.infoJSON.Invoice['cac:AccountingCustomerParty']?.['cac:Party'][
              'cac:Contact'
            ]['cbc:Telephone']
          ),
          'cbc:ElectronicMail': new FormControl(
            this.infoJSON.Invoice['cac:AccountingCustomerParty']?.['cac:Party'][
              'cac:Contact'
            ]['cbc:ElectronicMail']
          ),
          'cbc:Nota': new FormControl(
            this.infoJSON.Invoice['cac:AccountingCustomerParty']?.['cac:Party'][
              'cac:Contact'
            ]['cbc:Nota']
          ),
        }),
      }),
    });

    //Formas de pago

    this.paymentMeansForm = new FormArray(
      this.addGroup(this.infoJSON.Invoice['cac:PaymentMeans'])
    );

    // // Descuentos

    // this.discountsForm = this.formBuilder.array([{
    //   ID: new FormControl(""),
    //   ChargeIndicator: new FormControl(""),
    //   AllowanceChargeReasonCode: new FormControl(""),
    //   AllowanceChargeReason: new FormControl(""),
    //   MultiplierFactorNumeric: new FormControl(""),
    //   Amount: this.formBuilder.group({
    //     currencyID: new FormControl(""),
    //     Amount: new FormControl(""),
    //   }),
    //   BaseAmount: this.formBuilder.group({
    //     currencyID: new FormControl(""),
    //     BaseAmount: new FormControl(""),
    //   })
    // }])

    // // Tributos impuestos

    // this.tributesForm = this.formBuilder.array([{
    //   TaxAmount: this.formBuilder.group({
    //     currencyID: new FormControl(""),
    //     TaxAmount: new FormControl(""),
    //   }),
    //   RoundingAmount:  this.formBuilder.group({
    //     currencyID: new FormControl(""),
    //     RoundingAmount: new FormControl(""),
    //   }),
    //   TaxSubTotal: this.formBuilder.array([{
    //     TaxableAmount: this.formBuilder.group({
    //       currencyID: new FormControl(""),
    //       TaxableAmount: new FormControl(""),
    //     }),
    //     TaxAmount: this.formBuilder.group({
    //       currencyID: new FormControl(""),
    //       TaxAmount: new FormControl(""),
    //     }),
    //     BaseUnitMeasure: this.formBuilder.group({
    //       UnitCode: new FormControl(""),
    //       BaseUnitMeasure: new FormControl(""),
    //     }),
    //     PerUnitAmount: this.formBuilder.group({
    //       currencyID: new FormControl(""),
    //       PerUnitAmount: new FormControl(""),
    //     }),
    //     TaxCategory: this.formBuilder.group({
    //       Percent: new FormControl(""),
    //       TaxScheme: this.formBuilder.group({
    //         ID: new FormControl(""),
    //         Name: new FormControl(""),
    //       })

    //     })
    //   }]),

    // }])

    // // Retenciones

    // this.retentionsForm = this.formBuilder.group({
    //   TaxAmount: this.formBuilder.group({
    //     TaxAmount: new FormControl(""),
    //     currencyID: new FormControl(""),
    //   }),
    //   TaxSubTotal: this.formBuilder.array([{
    //     TaxableAmount: this.formBuilder.group({
    //       currencyID: new FormControl(""),
    //       TaxableAmount: new FormControl(""),
    //     }),
    //     TaxAmount: this.formBuilder.group({
    //       currencyID: new FormControl(""),
    //       TaxAmount: new FormControl(""),
    //     }),
    //     BaseUnitMeasure: this.formBuilder.group({
    //       UnitCode: new FormControl(""),
    //       BaseUnitMeasure: new FormControl(""),
    //     }),
    //     PerUnitAmount: this.formBuilder.group({
    //       currencyID: new FormControl(""),
    //       PerUnitAmount: new FormControl(""),
    //     }),
    //     TaxCategory: this.formBuilder.group({
    //       Percent: new FormControl(""),
    //       TaxScheme: this.formBuilder.group({
    //         ID: new FormControl(""),
    //         Name: new FormControl(""),
    //       })

    //     })
    //   }]),
    // })

    // // Totales

    // this.totalForm = this.formBuilder.group({
    //   LineExtensionAmount: this.formBuilder.group({
    //     currencyID: new FormControl(""),
    //     LineExtensionAmount: new FormControl(""),
    //   }),
    //   TaxExclusiveAmount: this.formBuilder.group({
    //     currencyID: new FormControl(""),
    //     TaxExclusiveAmount: new FormControl(""),
    //   }),
    //   TaxInclusiveAmount: this.formBuilder.group({
    //     currencyID: new FormControl(""),
    //     TaxInclusiveAmount: new FormControl(""),
    //   }),
    //   AllowanceTotalAmount: this.formBuilder.group({
    //     currencyID: new FormControl(""),
    //     AllowanceTotalAmount: new FormControl(""),
    //   }),
    //   ChargeTotalAmount: this.formBuilder.group({
    //     currencyID: new FormControl(""),
    //     ChargeTotalAmount: new FormControl(""),
    //   }),
    //   PrePaidAmountAmount: this.formBuilder.group({
    //     currencyID: new FormControl(""),
    //     PrePaidAmountAmount: new FormControl(""),
    //   }),
    //   PayableRoundingAmount: this.formBuilder.group({
    //     currencyID: new FormControl(""),
    //     PayableRoundingAmount: new FormControl(""),
    //   }),
    //   PayableAmount: this.formBuilder.group({
    //     currencyID: new FormControl(""),
    //     PayableAmount: new FormControl(""),
    //   }),
    // })

    this.loading = false;
  }

  addGroup(group: any): any[] {
    const auxArr: any[] = [];
    group?.forEach((y: any) => {
      console.log(y);
      let obj: any = {};
      for (const [key, value] of Object.entries(y)) {
        obj[key] = new FormControl(value);
      }
      auxArr.push(new FormGroup(obj));
    });
    return auxArr;
  }

  statusChanged(stepNumber: number, event: WizardStepStatus): void {
    if (event === 'current') {
      this.goToStep(stepNumber);
    }
  }

  goToStep(step: number): void {
    this.steps.map((item, i) => {
      // if (i < step) {
      //   item.status = 'completed';
      // } else if (i === step) {
      //   item.status = 'current';
      // } else {
      //   item.status = 'completed';
      // }
      if (i === step) {
        item.status = 'current';
      } else {
        item.status = 'completed';
      }
    });
  }

  /** @hidden */
  handleFocus(event: KeyboardEvent, index: number): void {
    this._wizardService.progressBarKeyHandler(
      event,
      this.wizardStepComponents,
      index
    );
  }

  //NEW

  saveNewJson() {}

  downloadNewJson() {
    let data: SectionsInvoice;
    data = {
      ...this.infoJSON.Invoice,
      'cbc:CustomizationID': this.generalForm.value.CustomizationID,
      'cbc:ProfileExecutionID': this.generalForm.value.ProfileExecutionID,
      'cbc:ID': this.generalForm.value.ID,
      'cbc:IssueDate': this.generalForm.value.IssueDate,
      'cbc:IssueTime': this.generalForm.value.IssueTime,
      'cbc:InvoiceTypeCode': this.generalForm.value.InvoiceTypeCode,
      'cbc:Note': this.generalForm.value.Note,
      'cbc:DocumentCurrencyCode': this.generalForm.value.DocumentCurrencyCode,
      'cbc:LineCountNumeric': this.generalForm.value.LineCountNumeric,
      'ext:UBLExtensions': {
        'ext:UBLExtension': {
          'ext:ExtensionContent': {
            'sts:DianExtensions': {
              'sts:InvoiceControl': {
                'sts:AuthorizationPeriod': {
                  'cbc:EndDate': this.generalForm.value.EndDate,
                  'cbc:StartDate': this.generalForm.value.StartDate,
                },
                'sts:AuthorizedInvoices': {
                  'sts:From': this.generalForm.value.From,
                  'sts:Prefix': this.generalForm.value.Prefix,
                  'sts:To': this.generalForm.value.To,
                },
                'sts:InvoiceAuthorization':
                  this.generalForm.value.InvoiceAuthorization,
              },
            },
          },
        },
      },
      'cac:OrderReference': this.orderForm.value,
      'cac:AdditionalDocumentReference': this.contingencyForm.value,
      'cac:AccountingSupplierParty': this.transmitterForm.value,
    };
    var theJSON = JSON.stringify(data);
    var uri = this.sanitizer.bypassSecurityTrustUrl(
      'data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON)
    );
    this.fileUrl = uri;
    this.serviceJson.saveJSON(
      this.infoJSON.TrackId,
      this.generalForm,
      this.orderForm,
      this.contingencyForm
    );
  }
}
