import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  ButtonIconComponent,
  IconsComponent,
  TextComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [TextComponent, IconsComponent, ButtonIconComponent, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  /** Back to home */
  backToHome() {
    this.router.navigate(['/home']);
  }
}
