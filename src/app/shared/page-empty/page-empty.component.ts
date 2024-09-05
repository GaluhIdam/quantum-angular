import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
}
