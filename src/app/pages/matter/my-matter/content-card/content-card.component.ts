import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BadgeComponent, ButtonIconComponent, TextComponent } from '@quantum/fui';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonIconComponent, BadgeComponent, TextComponent],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.scss',
})
export class ContentCardComponent {
  @Input() type: number = 1;

  constructor(private router: Router) {}

  /** Go to detail page */
  gotoPage(): void {
    this.router.navigate(['matter', 'detail-matter']);
  }
}
