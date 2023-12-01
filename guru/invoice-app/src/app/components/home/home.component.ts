import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { HomeHeaderComponent } from "./home-header/home-header/home-header.component";
import { HomeListComponent } from "./home-list/home-list.component";
import { Invoice } from "../../models/invoice";
import { InvoiceService } from "../../services/invoice.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, HomeHeaderComponent, HomeListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  invoiceList: Array<Invoice> | undefined;

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices() {
    this.invoiceService.getAllInvoices().subscribe(invoices => {
      this.invoiceList = invoices;
    });
  }

}
