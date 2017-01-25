import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';


//Route Configuration
export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'registration'},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutesModule{}
