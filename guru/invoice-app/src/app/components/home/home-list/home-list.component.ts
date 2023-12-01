import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-list.component.html',
  styleUrl: './home-list.component.css'
})
export class HomeListComponent {
  noItems: number = 1;
}
