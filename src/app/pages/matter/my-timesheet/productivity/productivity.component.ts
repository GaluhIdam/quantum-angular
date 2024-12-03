import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  IconsComponent,
  PopoverComponent,
  ProgressComponent,
  TextComponent,
} from '@quantum/fui';
import { EmptyDataComponent } from '../../../../shared/empty-data/empty-data.component';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';
import { ProductivitySummaryDTO } from '../../../../interfaces/productivity-summary.dto';
import { BaseController } from '../../../../core/controller/basecontroller';
import { ProductivityService } from '../../../../services/matter/my-timesheet/productivity/productivity.service';

@Component({
  selector: 'app-productivity',
  standalone: true,
  imports: [
    CommonModule,
    PopoverComponent,
    IconsComponent,
    ProgressComponent,
    EmptyDataComponent,
    SkeletonComponent,
    TextComponent,
  ],
  templateUrl: './productivity.component.html',
  styleUrl: './productivity.component.scss',
})
export class ProductivityComponent extends BaseController {
  @Output() typeOut: EventEmitter<'month' | 'year' | 'appraisalYear'> =
    new EventEmitter<'month' | 'year' | 'appraisalYear'>();

  /** Loading status */
  loading: boolean = true;

  /** Data productivities */
  dataProductivity: ProductivitySummaryDTO = {
    billableActualHour: 0,
    billableTargetHour: 100,
    nonbillableActualHour: 0,
    nonbillableTargetHour: 100,
  };

  /** Percetage of productivity */
  percentageBillabel: number = 20;
  percentageNonBillabel: number = 20;

  /** Period */
  period: 'month' | 'year' | 'appraisalYear' = 'month';

  constructor(private readonly productivitiesService: ProductivityService) {
    super();
  }

  ngOnInit(): void {
    this.typeOut.emit(this.period);
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  /** Toggle for change date range */
  toggleSelectRange(period: 'month' | 'year' | 'appraisalYear'): void {
    this.period = period;
    this.typeOut.emit(period);
    // this.getDataProductivites(period);
  }

  /** Getting data productivities from service
   * @service
   *  ProductivityService
   */
  private getDataProductivites(type: string): void {
    this.productivitiesService.getProductivities(type).subscribe({
      next: (res) => {
        this.dataProductivity = res;
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
