import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BadgeComponent,
  ButtonIconComponent,
  IconsComponent,
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TableHeadComponent,
  TextComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-proof-engagement',
  standalone: true,
  imports: [
    CommonModule,
    TextComponent,
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableBodyRowComponent,
    TableBodyDataComponent,
    IconsComponent,
    BadgeComponent,
    ButtonIconComponent,
  ],
  templateUrl: './proof-engagement.component.html',
  styleUrl: './proof-engagement.component.scss',
})
export class ProofEngagementComponent {
  titleProof: string[] = ['Name', 'EL Number', 'EL Date', ''];
}
