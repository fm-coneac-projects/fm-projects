import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from "@angular/common/http";
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./components/menu/menu/menu.component";
import { MatIconModule } from "@angular/material/icon";
import { InvoiceService } from "./services/invoice.service";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenuComponent,
    MatIconModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [InvoiceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'invoice.ts-app';
}
