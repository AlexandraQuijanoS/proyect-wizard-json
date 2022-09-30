import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardTestComponent } from './wizard-test.component';

describe('WizardTestComponent', () => {
  let component: WizardTestComponent;
  let fixture: ComponentFixture<WizardTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WizardTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
