import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  BadgeComponent,
  ButtonIconComponent,
  IconsComponent,
  LinkComponent,
  TextComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-card-all-matter',
  standalone: true,
  imports: [
    CommonModule,
    BadgeComponent,
    IconsComponent,
    TextComponent,
    ButtonIconComponent,
  ],
  templateUrl: './card-all-matter.component.html',
  styleUrl: './card-all-matter.component.scss',
})
export class CardAllMatterComponent {
  constructor(private router: Router) {}

  navigateToDetail(): void {
    this.router.navigate(['matter', 'detail-matter']);
  }
}
