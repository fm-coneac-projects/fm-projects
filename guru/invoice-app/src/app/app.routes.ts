import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { NewInvoiceComponent } from "./components/new-invoice/new-invoice.component";

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'newInvoice',
    component: NewInvoiceComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
