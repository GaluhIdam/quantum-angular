import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  ButtonIconComponent,
  IconsComponent,
  PopoverComponent,
  ProgressComponent,
  TextComponent,
} from '@quantum/fui';
import { EmptyDataComponent } from '../../../../shared/empty-data/empty-data.component';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';

@Component({
  selector: 'app-productivity',
  standalone: true,
  imports: [
    CommonModule,
    PopoverComponent,
    ButtonIconComponent,
    IconsComponent,
    ProgressComponent,
    EmptyDataComponent,
    SkeletonComponent,
    TextComponent,
  ],
  templateUrl: './productivity.component.html',
  styleUrl: './productivity.component.scss',
})
export class ProductivityComponent implements OnInit {
  @Input() loading: boolean = true;
  @Input() data: number[] = [70, 90];

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
