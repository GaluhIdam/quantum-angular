import { Component } from '@angular/core';
import { PageEmptyComponent } from '../../../shared/page-empty/page-empty.component';
import {
  BadgeComponent,
  ButtonIconComponent,
  StepContentComponent,
  StepProps,
  StepsComponent,
  StepStatus,
  TextComponent,
} from '@quantum/fui';
import { Step1Component } from './step-1/step-1.component';
import { CommonModule } from '@angular/common';
import { Step2Component } from './step-2/step-2.component';
import { Step3Component } from './step-3/step-3.component';
import { Step4Component } from './step-4/step-4.component';

@Component({
  selector: 'app-matter-form',
  standalone: true,
  imports: [
    CommonModule,
    PageEmptyComponent,
    StepsComponent,
    StepContentComponent,
    TextComponent,
    BadgeComponent,
    ButtonIconComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
  ],
  templateUrl: './matter-form.component.html',
  styleUrl: './matter-form.component.scss',
})
export class MatterFormComponent {
  steps: StepProps[] = [
    {
      id: 'step-1',
      stepType: 'icon',
      stepStatus: StepStatus.COMPLETE,
      title: 'Client Search',
      stepIcon: {
        complete: 'check',
      },
    },
    {
      id: 'step-2',
      stepType: 'number',
      stepStatus: StepStatus.CURRENT,
      title: 'Opening Section',
      stepIcon: {
        complete: 'check',
      },
    },
    {
      id: 'step-3',
      stepType: 'number',
      stepStatus: StepStatus.INCOMPLETE,
      title: 'Midpoint Section',
      stepIcon: {
        complete: 'check',
      },
    },
    {
      id: 'step-4',
      stepType: 'number',
      stepStatus: StepStatus.INCOMPLETE,
      title: 'Closing Section',
      stepIcon: {
        complete: 'check',
      },
    },
  ];

  billabilityForm: string = '';

  backTop: boolean = false;

  /** Toggle move step */
  toggleMoveStep(param: 'previous' | 'next'): void {
    this.backTop = !this.backTop;
    const currentIndex = this.steps.findIndex(
      (step) => step.stepStatus === StepStatus.CURRENT
    );

    if (param === 'previous' && currentIndex > 0) {
      this.steps[currentIndex].stepStatus = StepStatus.INCOMPLETE;
      this.steps[currentIndex].stepType = 'number';

      this.steps[currentIndex - 1].stepStatus = StepStatus.CURRENT;
      this.steps[currentIndex - 1].stepType = 'number';
    } else if (param === 'next' && currentIndex < this.steps.length - 1) {
      this.steps[currentIndex].stepStatus = StepStatus.COMPLETE;
      this.steps[currentIndex].stepType = 'icon';

      this.steps[currentIndex + 1].stepStatus = StepStatus.CURRENT;
      this.steps[currentIndex + 1].stepType = 'number';
    }
  }

  /** Billability selection */
  billabilitySelected(event: string): void {
    this.billabilityForm = event;
  }
}
