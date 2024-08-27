import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-slider-card-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider-card-body.component.html',
  styleUrl: './slider-card-body.component.scss',
})
export class SliderCardBodyComponent {
  @Input() id: number = 0;
  @Input() current: number = 0;
}
