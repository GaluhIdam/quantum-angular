import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonIconComponent } from '@quantum/fui';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [ButtonIconComponent],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
})
export class InformationComponent {
  constructor(private router: Router) {}

  movePage(): void {
    this.router.navigate(['/matter/matter-form']);
  }
}
