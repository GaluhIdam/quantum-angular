import { Component } from '@angular/core';
import { FilterBarComponent } from '../../shared/filter-bar/filter-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FilterBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
