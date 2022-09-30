import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardJsonComponent } from './wizard-json.component';

describe('WizardJsonComponent', () => {
  let component: WizardJsonComponent;
  let fixture: ComponentFixture<WizardJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WizardJsonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
