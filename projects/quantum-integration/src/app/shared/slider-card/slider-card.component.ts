import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import {
  ButtonIconComponent,
  Icon,
  IconsComponent,
  LinkComponent,
  TextComponent,
} from '@quantum/fui';
import { SliderCardBodyComponent } from './slider-card-body/slider-card-body.component';

@Component({
  selector: 'shared-slider-card',
  standalone: true,
  imports: [
    CommonModule,
    IconsComponent,
    LinkComponent,
    TextComponent,
    ButtonIconComponent,
  ],
  templateUrl: './slider-card.component.html',
  styleUrl: './slider-card.component.scss',
})
export class SliderCardComponent {
  @Input() dataSlider: {
    id: number;
    title: string;
    status: boolean;
    icon: Icon;
    link: string;
  }[] = [];
  @Input() currentSlideIndex: number = 0;
  @Output() slideOut: EventEmitter<number> = new EventEmitter<number>();

  /** Toggle move slide */
  toggleMoveSlide(param: 'previous' | 'next'): void {
    const currentIndex = this.dataSlider.findIndex(
      (slide) => slide.status === true
    );
    if (param === 'previous' && currentIndex > 0) {
      this.dataSlider[currentIndex].status = false;
      this.dataSlider[currentIndex - 1].status = true;
      this.currentSlideIndex = currentIndex - 1;
    } else if (param === 'next' && currentIndex < this.dataSlider.length - 1) {
      this.dataSlider[currentIndex].status = false;
      this.dataSlider[currentIndex + 1].status = true;
      this.currentSlideIndex = currentIndex + 1;
    }
    this.slideOut.emit(this.currentSlideIndex);
  }
}
