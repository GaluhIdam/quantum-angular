import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-data.component.html',
  styleUrl: './empty-data.component.scss',
})
export class EmptyDataComponent {
  @Input({ required: true }) dataLength: number = 0;
}
