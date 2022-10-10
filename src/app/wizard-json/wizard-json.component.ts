import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  WizardService,
  WizardStepComponent,
  WizardStepStatus,
} from '@fundamental-ngx/core';
import {
  AllowanceCharge,
  Invoice,
  PaymentMeans,
  SectionsInvoice,
  WithholdingTaxTotal,
} from '../types/Invoce';
import { JsonServiceService } from './services/json-service.service';

import { DomSanitizer } from '@angular/platform-browser';
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
  dataJSON!: Invoice;
  // JSON Vacio
  emptyJSON!: Invoice;
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
  retentionsForm!: FormArray;
  totalForm!: FormGroup;
  detailForm!: FormArray;

  // Habilitar forms cuando vienen vacios
  enableOrderForm = true;
  enableContingencyForm = true;
  enableTransmitterForm = true;
  enablePaymentMeansForm = true;

  //Descarga

  fileUrl: any;

  listCustomizationID: keyValue[] = [];
  listProfileExecutionID: keyValue[] = [];
  listInvoiceTypeCode: keyValue[] = [];

  ejemplo: any;
  currentStep = 1
  constructor(
    private _wizardService: WizardService,
    private serviceJson: JsonServiceService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    console.log('soy ngoninit');
    this.serviceJson.getJSON().subscribe({
      next: async (response) => {
        this.dataJSON = response;
        this.optionList();
        setTimeout(() => {
          this.orderData();
        }, 2000);
      },
      error: () => {
        console.log('Error');
      },
    });
    this.serviceJson.getEmptyJSON().subscribe({
      next: async (response) => {
        this.emptyJSON = response;
        console.log(this.emptyJSON);
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

  orderData() {
    this.infoJSON = {
      ...this.dataJSON,
      Invoice: {
        'cac:OrderReference': this.dataJSON.Invoice['cac:OrderReference']
          ? this.dataJSON.Invoice['cac:OrderReference']
          : this.emptyJSON.Invoice['cac:OrderReference'],
        'cac:AdditionalDocumentReference': this.dataJSON.Invoice[
          'cac:AdditionalDocumentReference'
        ]
          ? this.dataJSON.Invoice['cac:AdditionalDocumentReference']
          : this.emptyJSON.Invoice['cac:AdditionalDocumentReference'],
        'cac:AccountingSupplierParty': this.dataJSON.Invoice[
          'cac:AccountingSupplierParty'
        ]
          ? this.dataJSON.Invoice['cac:AccountingSupplierParty']
          : this.emptyJSON.Invoice['cac:AccountingSupplierParty'],
        'cac:AccountingCustomerParty': this.dataJSON.Invoice[
          'cac:AccountingSupplierParty'
        ]
          ? this.dataJSON.Invoice['cac:AccountingSupplierParty']
          : this.emptyJSON.Invoice['cac:AccountingSupplierParty'],
        'cac:PaymentMeans': this.dataJSON.Invoice['cac:PaymentMeans']
          ? this.dataJSON.Invoice['cac:PaymentMeans']
          : this.emptyJSON.Invoice['cac:PaymentMeans'],
        'cac:AllowanceCharge': this.dataJSON.Invoice['cac:AllowanceCharge']
          ? this.dataJSON.Invoice['cac:AllowanceCharge']
          : this.emptyJSON.Invoice['cac:AllowanceCharge'],
        'cac:TaxTotal': this.dataJSON.Invoice['cac:TaxTotal']
          ? this.dataJSON.Invoice['cac:TaxTotal']
          : this.emptyJSON.Invoice['cac:TaxTotal'],
        'cac:WithholdingTaxTotal': this.dataJSON.Invoice[
          'cac:WithholdingTaxTotal'
        ]
          ? this.dataJSON.Invoice['cac:WithholdingTaxTotal']
          : this.emptyJSON.Invoice['cac:WithholdingTaxTotal'],
        'cac:LegalMonetaryTotal': this.dataJSON.Invoice[
          'cac:LegalMonetaryTotal'
        ]
          ? this.dataJSON.Invoice['cac:LegalMonetaryTotal']
          : this.emptyJSON.Invoice['cac:LegalMonetaryTotal'],
        'cac:InvoiceLine': this.dataJSON.Invoice['cac:InvoiceLine']
          ? this.dataJSON.Invoice['cac:InvoiceLine']
          : this.emptyJSON.Invoice['cac:InvoiceLine'],
        'cbc:CustomizationID': this.dataJSON.Invoice['cbc:CustomizationID']
          ? this.dataJSON.Invoice['cbc:CustomizationID']
          : this.emptyJSON.Invoice['cbc:CustomizationID'],
        'cbc:ID': this.dataJSON.Invoice['cbc:ID']
          ? this.dataJSON.Invoice['cbc:ID']
          : this.emptyJSON.Invoice['cbc:ID'],
        'cbc:DocumentCurrencyCode': this.dataJSON.Invoice[
          'cbc:DocumentCurrencyCode'
        ]
          ? this.dataJSON.Invoice['cbc:DocumentCurrencyCode']
          : this.emptyJSON.Invoice['cbc:DocumentCurrencyCode'],
        'cbc:InvoiceTypeCode': this.dataJSON.Invoice['cbc:InvoiceTypeCode']
          ? this.dataJSON.Invoice['cbc:InvoiceTypeCode']
          : this.emptyJSON.Invoice['cbc:InvoiceTypeCode'],
        'cbc:Note': this.dataJSON.Invoice['cbc:Note']
          ? this.dataJSON.Invoice['cbc:Note']
          : this.emptyJSON.Invoice['cbc:Note'],
        'cbc:LineCountNumeric': this.dataJSON.Invoice['cbc:LineCountNumeric']
          ? this.dataJSON.Invoice['cbc:LineCountNumeric']
          : this.emptyJSON.Invoice['cbc:LineCountNumeric'],
        'ext:UBLExtensions': this.dataJSON.Invoice['ext:UBLExtensions']
          ? this.dataJSON.Invoice['ext:UBLExtensions']
          : this.emptyJSON.Invoice['ext:UBLExtensions'],
        'cbc:IssueTime': this.dataJSON.Invoice['cbc:IssueTime']
          ? this.dataJSON.Invoice['cbc:IssueTime']
          : this.emptyJSON.Invoice['cbc:IssueTime'],
        'cbc:ProfileExecutionID': this.dataJSON.Invoice[
          'cbc:ProfileExecutionID'
        ]
          ? this.dataJSON.Invoice['cbc:ProfileExecutionID']
          : this.emptyJSON.Invoice['cbc:ProfileExecutionID'],
        'cbc:IssueDate': this.dataJSON.Invoice['cbc:IssueDate']
          ? this.dataJSON.Invoice['cbc:IssueDate']
          : this.emptyJSON.Invoice['cbc:IssueDate'],
      },
    };
    this.initForm();
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

    this.orderForm = new FormGroup(
      this.addGroup(this.infoJSON.Invoice['cac:OrderReference'])
    );

    this.enableOrderForm = this.dataJSON.Invoice['cac:OrderReference']
      ? false
      : true;

    // Campos de contingencia

    this.contingencyForm = new FormGroup(
      this.addGroup(this.infoJSON.Invoice['cac:AdditionalDocumentReference'])
    );

    this.enableContingencyForm = this.dataJSON.Invoice[
      'cac:AdditionalDocumentReference'
    ]
      ? false
      : true;

    // Emisor Exito

    this.transmitterForm = new FormGroup(
      this.addGroup(this.infoJSON.Invoice['cac:AccountingSupplierParty'])
    );

    this.enableTransmitterForm = this.dataJSON.Invoice[
      'cac:AccountingSupplierParty'
    ]
      ? false
      : true;

    // Receptor
    this.receiverForm = new FormGroup(
      this.addGroup(this.infoJSON.Invoice['cac:AccountingCustomerParty'])
    );

    // Formas de pago

    this.paymentMeansForm = new FormArray(
      this.addArrayGroup(this.infoJSON.Invoice['cac:PaymentMeans'])
    );


    this.enablePaymentMeansForm = this.dataJSON.Invoice['cac:PaymentMeans']
      ? false
      : true;

    // Descuentos

    this.discountsForm = new FormArray(
      this.addArrayGroup(this.infoJSON.Invoice['cac:AllowanceCharge'])
    );

    // Tributos impuestos

    this.tributesForm = new FormArray(
      this.addArrayGroup(this.infoJSON.Invoice['cac:TaxTotal'])
    );

    // Retenciones

    this.retentionsForm = new FormArray(
      this.addArrayGroup(this.infoJSON.Invoice['cac:WithholdingTaxTotal'])
    );

    // Totales

    this.totalForm = new FormGroup(
      this.addGroup(this.infoJSON.Invoice['cac:LegalMonetaryTotal'])
    );

    // Detalle general
    this.detailForm = new FormArray(
      this.addArrayGroup(this.infoJSON.Invoice['cac:InvoiceLine'])
    );
    console.log(this.infoJSON.Invoice['cac:InvoiceLine']);

    this.loading = false;
  }

  returnTypeObj(object: any): any {
    if (typeof object === 'string') {
      return 'string';
    }
    if (typeof object === 'object' && !(object instanceof Array)) {
      return 'object';
    } else if (object instanceof Array) {
      return 'Array';
    }
  }

  addArrayGroup(
    group: PaymentMeans[] | AllowanceCharge[] | WithholdingTaxTotal[] | any
  ) {
    const auxArr: any[] = [];
    group?.forEach(
      (itemGroup: PaymentMeans | AllowanceCharge | WithholdingTaxTotal) => {
        auxArr.push(new FormGroup(this.addGroup(itemGroup)));
      }
    );
    return auxArr;
  }

  addGroup(group: any): any {
    let obj: any = {};
    for (const [key, value] of Object.entries(group)) {
      switch (this.returnTypeObj(value)) {
        case 'string':
          obj[key] = new FormControl(value);
          break;
        case 'object':
          let objIn: any = {};
          for (const [keyIn, valueIn] of Object.entries(group[key])) {
            if (this.returnTypeObj(valueIn) === 'string') {
              objIn[keyIn] = new FormControl(valueIn);
            } else if (this.returnTypeObj(valueIn) === 'object') {
              objIn[keyIn] = new FormGroup(this.addGroup(valueIn));
            } else if (this.returnTypeObj(valueIn) === 'Array') {
              objIn[keyIn] = new FormArray(this.addArrayGroup(valueIn));
            }
          }
          obj[key] = new FormGroup(objIn);
          break;
        case 'Array':
          obj[key] = new FormArray(this.addArrayGroup(group[key]));
          break;
      }
    }
    return obj;
  }

  statusChanged(stepNumber: number, event: WizardStepStatus): void {
    if (event === 'current') {
      this.goToStep(stepNumber);
    }
  }

  goToStep(step: number): void {
    this.steps.map((item, i) => {
      this.currentStep = i
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
      }
    };
    
    if(this.orderForm.dirty){
      data = {...this.infoJSON.Invoice, 'cac:OrderReference': this.orderForm.value}
    } else {
      delete data['cac:OrderReference'] 
    }
    if(this.contingencyForm.dirty) {
      data = {...this.infoJSON.Invoice, 'cac:AdditionalDocumentReference': this.contingencyForm.value}
    }else{
      delete data['cac:AdditionalDocumentReference'] 
    }
    if(this.transmitterForm.dirty) {
      data = {...this.infoJSON.Invoice, 'cac:AccountingSupplierParty': this.transmitterForm.value}
    } else {
      delete data['cac:AccountingSupplierParty']
    }
    if(this.paymentMeansForm.dirty) {
      data = {...this.infoJSON.Invoice, 'cac:PaymentMeans': this.paymentMeansForm.value}
    } else {
      delete data['cac:PaymentMeans']
    }

    var theJSON = JSON.stringify(data);
    var uri = this.sanitizer.bypassSecurityTrustUrl(
      'data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON)
    );
    this.fileUrl = uri;
    this.serviceJson.saveJSON();
  }

  changeName(fieldName: any | string) {
    return fieldName.split(':').length > 1
      ? fieldName.split(':')[1]
      : fieldName.split(':')[0];
  }

  enableSection(section: string) {
    if (section === 'enableOrderForm') {
      this.enableOrderForm = false;
    } else if (section === 'enableContingencyForm') {
      this.enableContingencyForm = false;
    } else if (section === 'enableTransmitterForm') {
      this.enableTransmitterForm = false;
    } else if (section === 'enablePaymentMeansForm') {
      // this.enablePaymentMeansForm = false;
      console.log('Hola');
      this.paymentMeansForm.get('cbc:ID')?.disable();
    }
  }

  // Agregar un array en formas de pago
  addPaymentMeans() {
    this.paymentMeansForm.push(
      new FormGroup(
        this.addGroup(this.emptyJSON.Invoice['cac:PaymentMeans']?.[0])
      )
    );
  }
}