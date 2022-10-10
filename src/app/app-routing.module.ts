import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WizardJsonComponent } from './wizard-json/wizard-json.component';
import { WizardTestComponent } from './wizard-test/wizard-test.component';

const routes: Routes = [
  { path: '**', redirectTo: 'wizard-json' },
  
  { path: 'wizard', component: WizardTestComponent },

  { path: 'wizard-json', component: WizardJsonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
