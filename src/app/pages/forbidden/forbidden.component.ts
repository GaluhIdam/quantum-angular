import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  ButtonIconComponent,
  IconsComponent,
  TextComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [TextComponent, IconsComponent, ButtonIconComponent, RouterModule],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.scss',
})
export class ForbiddenComponent {
  constructor(private router: Router) {}

  /** Back to home */
  backToHome() {
    this.router.navigate(['/home']);
  }
}
