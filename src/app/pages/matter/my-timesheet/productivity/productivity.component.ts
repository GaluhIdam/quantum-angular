import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ButtonIconComponent,
  IconsComponent,
  PopoverComponent,
  ProgressComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-productivity',
  standalone: true,
  imports: [
    CommonModule,
    PopoverComponent,
    ButtonIconComponent,
    IconsComponent,
    ProgressComponent,
  ],
  templateUrl: './productivity.component.html',
  styleUrl: './productivity.component.scss',
})
export class ProductivityComponent {}
