import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ButtonIconComponent,
  IconsComponent,
  PopoverComponent,
  ProgressComponent,
  TextComponent,
} from '@quantum/fui';
import { EmptyDataComponent } from '../../../../shared/empty-data/empty-data.component';
import { Subscription } from 'rxjs';
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
export class ProductivityComponent {
  loading: boolean = true;
  data: number[] = [70, 90];

  private subscription!: Subscription;

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
