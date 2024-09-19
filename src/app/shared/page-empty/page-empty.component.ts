import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsComponent, TextComponent } from '@quantum/fui';

@Component({
  selector: 'shared-page-empty',
  standalone: true,
  imports: [CommonModule, RouterModule, TextComponent, IconsComponent],
  templateUrl: './page-empty.component.html',
  styleUrl: './page-empty.component.scss',
})
export class PageEmptyComponent {
  @Input() titlePage: string = 'Title Page';
  @Input() descriptionPage?: string;
  @Input() backLink?: string;
  @Input() backTop: boolean = false;

  @ViewChild('nextSection') nextSectionRef!: ElementRef;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.scrollToTop();
      this.scrollToNext();
    }
  }

  scrollToTop(): void {
    // Use ViewChild to get a reference to the body if needed
    const body = this.el.nativeElement.ownerDocument.body;
    this.renderer.setStyle(body, 'scrollBehavior', 'smooth');
    this.renderer.setProperty(
      this.el.nativeElement.ownerDocument.documentElement,
      'scrollTop',
      -1000
    );

    // Reset scroll behavior after scroll
    setTimeout(() => this.renderer.removeStyle(body, 'scrollBehavior'), 1000);
  }

  scrollToNext(): void {
    if (this.nextSectionRef) {
      this.nextSectionRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
