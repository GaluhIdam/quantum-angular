import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  BadgeComponent,
  ButtonIconComponent,
  IconsComponent,
  ProgressComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IconsComponent,
    ButtonIconComponent,
    ProgressComponent,
    BadgeComponent,
  ],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.scss',
})
export class ContentCardComponent {
  constructor(private router: Router) {}

  /** Go to detail page */
  gotoPage(): void {
    this.router.navigate(['matter', 'my-matter', 'detail-matter']);
  }
}
