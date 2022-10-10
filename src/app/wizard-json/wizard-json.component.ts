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
        }, 3000);
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

    this.orderForm = new FormGroup(
      this.addGroup(this.infoJSON.Invoice['cac:OrderReference'])
    );

    // Campos de contingencia

    this.contingencyForm = new FormGroup(
      this.addGroup(this.infoJSON.Invoice['cac:AdditionalDocumentReference'])
    );

    // Emisor Exito

    this.transmitterForm = new FormGroup(
      this.addGroup(this.infoJSON.Invoice['cac:AccountingSupplierParty'])
    );

    // Receptor
    this.receiverForm = new FormGroup(
      this.addGroup(this.infoJSON.Invoice['cac:AccountingCustomerParty'])
    );

    // Formas de pago

    this.paymentMeansForm = new FormArray(
      this.addArrayGroup(this.infoJSON.Invoice['cac:PaymentMeans'])
    );
    // Descuentos

    this.discountsForm = new FormArray(
      this.addArrayGroup(this.infoJSON.Invoice['cac:AllowanceCharge'])
    );

    // Tributos impuestos

    this.tributesForm = new FormArray(
      this.addArrayGroup(this.infoJSON.Invoice['cac:TaxTotal'])
    );
console.log(this.tributesForm);

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

  changeName(fieldName: string) {
    return fieldName.split(':').length > 1
      ? fieldName.split(':')[1]
      : fieldName.split(':')[0];
  }
}
