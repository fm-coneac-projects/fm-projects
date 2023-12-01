import { Injectable } from '@angular/core';
import { InvoiceHeader, InvoiceItem, Invoice } from '../models/invoice';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  url: string = '../data/invoices.json';

  constructor(private httpClient: HttpClient) {
  }

  getAllInvoices(): Observable<Array<Invoice>> {
    return this.httpClient.get<Array<Invoice>>(this.url);
  }

}
