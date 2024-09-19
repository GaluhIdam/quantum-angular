import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { GeneralInformationComponent } from './general-information/general-information.component';
import { ClientInformationComponent } from './client-information/client-information.component';
import { OtherInformationComponent } from './other-information/other-information.component';

@Component({
  selector: 'step-2',
  standalone: true,
  imports: [
    CommonModule,
    GeneralInformationComponent,
    ClientInformationComponent,
    OtherInformationComponent,
  ],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss',
})
export class Step2Component {
  @Output() billabilitySelected: EventEmitter<string> =
    new EventEmitter<string>();

  /** Billability Selected */
  billabilityForm: string = 'Billable';

  /** Catch selector billability and parse to parent */
  catchBillabilitySelected(event: string): void {
    this.billabilityForm = event;
    this.billabilitySelected.emit(event);
  }
}
