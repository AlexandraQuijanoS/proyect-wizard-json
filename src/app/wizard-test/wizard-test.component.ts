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
  WizardService,
  WizardStepComponent,
  WizardStepStatus,
} from '@fundamental-ngx/core';

@Component({
  selector: 'app-wizard-test',
  templateUrl: './wizard-test.component.html',
  styleUrls: ['./wizard-test.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'fd-wizard-example',
  },
  providers: [WizardService],
})
export class WizardTestComponent implements OnInit {
  /**
   * documentation related property
   * provides access to the HTML element with "overlay" reference
   */
  @ViewChild('overlay')
  overlay!: ElementRef<HTMLElement>;

  /**
   * documentation related property
   * specifies if the doc example is rendered in fullscreen or not
   */
  fullscreen = false;

  step1status: WizardStepStatus = 'current';
  step2status: WizardStepStatus = 'upcoming';
  step3status: WizardStepStatus = 'upcoming';
  step4status: WizardStepStatus = 'upcoming';
  step5status: WizardStepStatus = 'upcoming';
  step6status: WizardStepStatus = 'upcoming';
  step7status: WizardStepStatus = 'upcoming';
  step8status: WizardStepStatus = 'upcoming';
  step9status: WizardStepStatus = 'upcoming';
  step10status: WizardStepStatus = 'upcoming';
  step11status: WizardStepStatus = 'upcoming';
  step12status: WizardStepStatus = 'upcoming';
  step13status: WizardStepStatus = 'upcoming';
  step14status: WizardStepStatus = 'upcoming';
  step15status: WizardStepStatus = 'upcoming';
  step16status: WizardStepStatus = 'upcoming';

  fullName = '';
  addressLine1 = '';
  addressLine2 = '';

  /** @hidden */
  @ViewChildren(WizardStepComponent)
  steps!: QueryList<WizardStepComponent>;

  constructor(private _wizardService: WizardService) {}

  ngOnInit(): void {
    this.goToStep(1);
  }

  statusChanged(stepNumber: number, event: WizardStepStatus): void {
    if (event === 'current') {
      this.goToStep(stepNumber);
    }
  }

  goToStep(step: number): void {
    switch (step) {
      case 1: {
        this.step1status = 'current';
        this.step2status = 'upcoming';
        this.step3status = 'upcoming';
        this.step4status = 'upcoming';
        this.step5status = 'upcoming';
        this.step6status = 'upcoming';
        this.step7status = 'upcoming';
        this.step8status = 'upcoming';
        this.step9status = 'upcoming';
        this.step10status = 'upcoming';
        this.step11status = 'upcoming';
        this.step12status = 'upcoming';
        this.step13status = 'upcoming';
        this.step14status = 'upcoming';
        this.step15status = 'upcoming';
        this.step16status = 'upcoming';
       
        break;
      }
      case 2: {
        this.step1status = 'completed';
        this.step2status = 'current';
        this.step3status = 'upcoming';
        this.step4status = 'upcoming';
        this.step5status = 'upcoming';
        this.step6status = 'upcoming';
        this.step7status = 'upcoming';
        this.step8status = 'upcoming';
        this.step9status = 'upcoming';
        this.step10status = 'upcoming';
        this.step11status = 'upcoming';
        this.step12status = 'upcoming';
        this.step13status = 'upcoming';
        this.step14status = 'upcoming';
        this.step15status = 'upcoming';
        this.step16status = 'upcoming';
       
        break;
      }
      case 3: {
        this.step1status = 'completed';
        this.step2status = 'completed';
        this.step3status = 'current';
        this.step4status = 'upcoming';
        this.step5status = 'upcoming';
        this.step6status = 'upcoming';
        this.step7status = 'upcoming';
        this.step8status = 'upcoming';
        this.step9status = 'upcoming';
        this.step10status = 'upcoming';
        this.step11status = 'upcoming';
        this.step12status = 'upcoming';
        this.step13status = 'upcoming';
        this.step14status = 'upcoming';
        this.step15status = 'upcoming';
        this.step16status = 'upcoming';
       
        break;
      }
      case 4: {
        this.step1status = 'completed';
        this.step2status = 'completed';
        this.step3status = 'completed';
        this.step4status = 'current';
        this.step5status = 'upcoming';
        this.step6status = 'upcoming';
        this.step7status = 'upcoming';
        this.step8status = 'upcoming';
        this.step9status = 'upcoming';
        this.step10status = 'upcoming';
        this.step11status = 'upcoming';
        this.step12status = 'upcoming';
        this.step13status = 'upcoming';
        this.step14status = 'upcoming';
        this.step15status = 'upcoming';
        this.step16status = 'upcoming';
       
        break;
      }
      case 5: {
        this.step1status = 'completed';
        this.step2status = 'completed';
        this.step3status = 'completed';
        this.step4status = 'completed';
        this.step5status = 'current';
        this.step6status = 'upcoming';
        this.step7status = 'upcoming';
        this.step8status = 'upcoming';
        this.step9status = 'upcoming';
        this.step10status = 'upcoming';
        this.step11status = 'upcoming';
        this.step12status = 'upcoming';
        this.step13status = 'upcoming';
        this.step14status = 'upcoming';
        this.step15status = 'upcoming';
        this.step16status = 'upcoming';
       
        break;
      }
      case 6: {
        this.step1status = 'completed';
        this.step2status = 'completed';
        this.step3status = 'completed';
        this.step4status = 'completed';
        this.step5status = 'completed';
        this.step6status = 'current';
        this.step7status = 'upcoming';
        this.step8status = 'upcoming';
        this.step9status = 'upcoming';
        this.step10status = 'upcoming';
        this.step11status = 'upcoming';
        this.step12status = 'upcoming';
        this.step13status = 'upcoming';
        this.step14status = 'upcoming';
        this.step15status = 'upcoming';
        this.step16status = 'upcoming';
       
        break;
      }
      case 7: {
        this.step1status = 'completed';
        this.step2status = 'completed';
        this.step3status = 'completed';
        this.step4status = 'completed';
        this.step5status = 'completed';
        this.step6status = 'completed';
        this.step7status = 'current';
        this.step8status = 'upcoming';
        this.step9status = 'upcoming';
        this.step10status = 'upcoming';
        this.step11status = 'upcoming';
        this.step12status = 'upcoming';
        this.step13status = 'upcoming';
        this.step14status = 'upcoming';
        this.step15status = 'upcoming';
        this.step16status = 'upcoming';
       
        break;
      }
      case 8: {
        this.step1status = 'completed';
        this.step2status = 'completed';
        this.step3status = 'completed';
        this.step4status = 'completed';
        this.step5status = 'completed';
        this.step6status = 'completed';
        this.step7status = 'completed';
        this.step8status = 'current';
        this.step9status = 'upcoming';
        this.step10status = 'upcoming';
        this.step11status = 'upcoming';
        this.step12status = 'upcoming';
        this.step13status = 'upcoming';
        this.step14status = 'upcoming';
        this.step15status = 'upcoming';
        this.step16status = 'upcoming';
       
        break;
      }
      case 9: {
        this.step1status = 'completed';
        this.step2status = 'completed';
        this.step3status = 'completed';
        this.step4status = 'completed';
        this.step5status = 'completed';
        this.step6status = 'completed';
        this.step7status = 'completed';
        this.step8status = 'completed';
        this.step9status = 'current';
        this.step10status = 'upcoming';
        this.step11status = 'upcoming';
        this.step12status = 'upcoming';
        this.step13status = 'upcoming';
        this.step14status = 'upcoming';
        this.step15status = 'upcoming';
        this.step16status = 'upcoming';
       
        break;
      }
      case 10: {
        this.step1status = 'completed';
        this.step2status = 'completed';
        this.step3status = 'completed';
        this.step4status = 'completed';
        this.step5status = 'completed';
        this.step6status = 'completed';
        this.step7status = 'completed';
        this.step8status = 'completed';
        this.step9status = 'completed';
        this.step10status = 'current';
        this.step11status = 'upcoming';
        this.step12status = 'upcoming';
        this.step13status = 'upcoming';
        this.step14status = 'upcoming';
        this.step15status = 'upcoming';
        this.step16status = 'upcoming';
       
        break;
      }
      case 11: {
        this.step1status = 'completed';
        this.step2status = 'completed';
        this.step3status = 'completed';
        this.step4status = 'completed';
        this.step5status = 'completed';
        this.step6status = 'completed';
        this.step7status = 'completed';
        this.step8status = 'completed';
        this.step9status = 'completed';
        this.step10status = 'completed';
        this.step11status = 'current';
        this.step12status = 'upcoming';
        this.step13status = 'upcoming';
        this.step14status = 'upcoming';
        this.step15status = 'upcoming';
        this.step16status = 'upcoming';
       
        break;
      }
      case 12: {
        this.step1status = 'completed';
        this.step2status = 'completed';
        this.step3status = 'completed';
        this.step4status = 'completed';
        this.step5status = 'completed';
        this.step6status = 'completed';
        this.step7status = 'completed';
        this.step8status = 'completed';
        this.step9status = 'completed';
        this.step10status = 'completed';
        this.step11status = 'completed';
        this.step12status = 'current';
        this.step13status = 'upcoming';
        this.step14status = 'upcoming';
        this.step15status = 'upcoming';
        this.step16status = 'upcoming';
       
        break;
      }
      case 13: {
        this.step1status = 'completed';
        this.step2status = 'completed';
        this.step3status = 'completed';
        this.step4status = 'completed';
        this.step5status = 'completed';
        this.step6status = 'completed';
        this.step7status = 'completed';
        this.step8status = 'completed';
        this.step9status = 'completed';
        this.step10status = 'completed';
        this.step11status = 'completed';
        this.step12status = 'completed';
        this.step13status = 'current';
        this.step14status = 'upcoming';
        this.step15status = 'upcoming';
        this.step16status = 'upcoming';
       
        break;
      }
      case 14: {
        this.step1status = 'completed';
        this.step2status = 'completed';
        this.step3status = 'completed';
        this.step4status = 'completed';
        this.step5status = 'completed';
        this.step6status = 'completed';
        this.step7status = 'completed';
        this.step8status = 'completed';
        this.step9status = 'completed';
        this.step10status = 'completed';
        this.step11status = 'completed';
        this.step12status = 'completed';
        this.step13status = 'completed';
        this.step14status = 'current';
        this.step15status = 'upcoming';
        this.step16status = 'upcoming';
       
        break;
      }
      case 15: {
        this.step1status = 'completed';
        this.step2status = 'completed';
        this.step3status = 'completed';
        this.step4status = 'completed';
        this.step5status = 'completed';
        this.step6status = 'completed';
        this.step7status = 'completed';
        this.step8status = 'completed';
        this.step9status = 'completed';
        this.step10status = 'completed';
        this.step11status = 'completed';
        this.step12status = 'completed';
        this.step13status = 'completed';
        this.step14status = 'completed';
        this.step15status = 'current';
        this.step16status = 'upcoming';
       
        break;
      }
      case 16: {
        this.step1status = 'completed';
        this.step2status = 'completed';
        this.step3status = 'completed';
        this.step4status = 'completed';
        this.step5status = 'completed';
        this.step6status = 'completed';
        this.step7status = 'completed';
        this.step8status = 'completed';
        this.step9status = 'completed';
        this.step10status = 'completed';
        this.step11status = 'completed';
        this.step12status = 'completed';
        this.step13status = 'completed';
        this.step14status = 'completed';
        this.step15status = 'completed';
        this.step16status = 'current';
        break;
      }
    }
  }

  /**
   * documentation related function
   * opens the example in full screen
   */

  /**
   * documentation related function
   * exits the full screen mode of the example
   */
  exitFullscreenExample(event: Event): void {
    event.stopPropagation();
    this.fullscreen = false;
    this.overlay.nativeElement.style.width = '0%';
  }

  handleFocus(event: KeyboardEvent, index: number): void {
    this._wizardService.progressBarKeyHandler(event, this.steps, index);
  }

  //NEW

  downloadNewJson() {
    console.log('Se descargo el nuevo JSON con las modificaciones');
  }
}
