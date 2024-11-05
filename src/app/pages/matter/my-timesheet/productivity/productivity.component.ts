import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  ButtonIconComponent,
  IconsComponent,
  PopoverComponent,
  ProgressComponent,
  TextComponent,
} from '@quantum/fui';
import { EmptyDataComponent } from '../../../../shared/empty-data/empty-data.component';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';
import { ProductivityService } from '../../../../services/matter/my-timesheet/productivity/productivity.service';
import { BaseController } from '../../../../core/controller/basecontroller';

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
export class ProductivityComponent extends BaseController implements OnInit {
  /** Call service */
  private readonly productivityService = inject(ProductivityService);

  /** Loading status */
  loading: boolean = true;

  /** Data Productivity */
  data: number[] = [];

  /** Periode */
  periode: 'today' | 'week' | 'month' | 'year' = 'month';

  ngOnInit(): void {
    this.getProductivityData(this.periode);
  }

  /** Get data productivity from service */
  getProductivityData(periode: 'today' | 'week' | 'month' | 'year'): void {
    this.productivityService.getProductivity(periode).subscribe({
      next: (value) => {
        this.data = value.result;
      },
      error: (error) => {
        this.errorToast(error);
        this.loading = false;
        this.periode = periode;
      },
      complete: () => {
        this.loading = false;
        this.periode = periode;
      },
    });
  }
}
