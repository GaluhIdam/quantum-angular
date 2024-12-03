import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BaseController } from '../../../../core/controller/basecontroller';
import { PayerInformationComponent } from './payer-information/payer-information.component';
import { ProofEngagementComponent } from './proof-engagement/proof-engagement.component';
import { SpecialRatesComponent } from './special-rates/special-rates.component';

@Component({
  selector: 'step-3',
  standalone: true,
  imports: [
    CommonModule,
    PayerInformationComponent,
    ProofEngagementComponent,
    SpecialRatesComponent,
  ],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss',
})
export class Step3Component extends BaseController {
  @Input() billabiltiySelection: string = '';
}
