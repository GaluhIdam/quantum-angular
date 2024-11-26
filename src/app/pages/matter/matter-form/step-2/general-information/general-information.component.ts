import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AppendComponent,
  ButtonIconComponent,
  ComboBoxComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  SelectFieldComponent,
  TextareaComponent,
  TextComponent,
  TooltipComponent,
} from '@quantum/fui';
import { Subscription } from 'rxjs';
import { FlyoutMatterMembersComponent } from '../../flyout-shared/flyout-matter-members/flyout-matter-members.component';
import { FlyoutUploadMatterComponent } from '../../flyout-shared/flyout-upload-matter/flyout-upload-matter.component';

@Component({
  selector: 'app-general-information',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    AppendComponent,
    IconsComponent,
    ComboBoxComponent,
    TooltipComponent,
    TextareaComponent,
    SelectFieldComponent,
    ButtonIconComponent,
    FlyoutMatterMembersComponent,
    FlyoutUploadMatterComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
  ],
  templateUrl: './general-information.component.html',
  styleUrl: './general-information.component.scss',
})
export class GeneralInformationComponent {
  @Output() billabilitySelected: EventEmitter<string> =
    new EventEmitter<string>();

  /** Matter Number Form */
  matterNumberForm: FormControl = new FormControl('', Validators.required);

  /** Parent Matter Form */
  parentMatterForm: FormControl = new FormControl('', Validators.required);
  isParentMatter: boolean = false;

  /** Conflict Search Id Form */
  conflictSearchIdForm: FormControl = new FormControl('', Validators.required);
  isConflictSearchId: boolean = false;

  /** Project Name Form */
  projectNameForm: FormControl = new FormControl('', Validators.required);
  isProjectName: boolean = false;

  /** Matter Short Desc Form */
  matterShortDescForm: FormControl = new FormControl('', Validators.required);
  isMatterShortDesc: boolean = false;

  /** Billable Form */
  billability: string = 'Billable';
  billabilityForm: FormControl = new FormControl(
    this.billability,
    Validators.required
  );
  billableOption: { label: string; value: any }[] = [
    { label: 'Billable', value: 'Billable' },
    { label: 'Potential Matter', value: 'Potential Matter' },
    { label: 'Probono', value: 'Probono' },
    { label: 'Nonbillable', value: 'Nonbillable' },
  ];

  /** Matter Form */
  matterForm: FormControl = new FormControl('');

  /** Practice Matter Form */
  practiceMatterForm: FormControl = new FormControl('');
  practiceMatterOption: { label: string; value: any }[] = [
    {
      label: 'Practice Matter 1',
      value: 'Practice Matter 1',
    },
    {
      label: 'Practice Matter 2',
      value: 'Practice Matter 2',
    },
  ];

  /** Matter Type Form */
  matterTypeForm: FormControl = new FormControl('');
  matterTypeOption: { label: string; value: any }[] = [
    {
      label: 'Matter Type 1',
      value: 'Matter Type 1',
    },
    {
      label: 'Matter Type 2',
      value: 'Matter Type 2',
    },
  ];

  /** Person in Charge Form */
  personInChargeForm: FormControl = new FormControl('');

  /** Partner in Charge Form */
  partnerInChargeForm: FormControl = new FormControl('');

  /** Partner Referal Marketing Form */
  partnerReferalMarketingForm: FormControl = new FormControl('');

  /** Business Source Form */
  businessSourceForm: FormControl = new FormControl('');
  businessSourceOption: { label: string; value: any }[] = [
    {
      label: 'Business Source 1',
      value: 'Business Source 1',
    },
    {
      label: 'Business Source 2',
      value: 'Business Source 2',
    },
  ];
  /** Second Business Source Form */
  secondBusinessSourceForm: FormControl = new FormControl('');
  secondBusinessSourceOption: { label: string; value: any }[] = [
    {
      label: 'Second  Business Source 1',
      value: 'Second Business Source 1',
    },
    {
      label: 'Second Business Source 2',
      value: 'Second Business Source 2',
    },
  ];

  /** Matter Members Form */
  allEmployeList: { name: string; position: string }[] = [
    {
      name: 'Jane Cooper (JC)',
      position: 'Junior Associate',
    },
    {
      name: 'Devon Lane (DL)',
      position: 'Middle Associate',
    },
    {
      name: 'Robert Fox (RF)',
      position: 'Senior Associate',
    },
  ];
  selectedEmployeMatterMember: { name: string; position: string }[] = [];

  isModalConfirmBillability: boolean = false;

  isOpenFlyoutUploadMatter: boolean = false;
  isOpenFlyoutManageMember: boolean = false;

  obs!: Subscription[];

  ngOnInit(): void {
    this.obs = [
      this.billabilityForm.valueChanges.subscribe((value) => {
        this.billabilitySelected.emit(value);
      }),
    ];
  }

  /** Open/Close Flyout Matter Form */
  openFlyoutUploadMatter(): void {
    this.isOpenFlyoutUploadMatter = !this.isOpenFlyoutUploadMatter;
  }

  /** Open/Close Flyout Manage Members */
  openFlyoutManageMember(): void {
    this.isOpenFlyoutManageMember = !this.isOpenFlyoutManageMember;
  }

  /** Catch data from flyout matter member */
  selectionOut(event: { name: string; position: string }[]): void {
    this.selectedEmployeMatterMember = event;
  }

  /** Changes of billability */
  changeBillability(event: any): void {
    if (this.billabilityForm.value !== this.billability) {
      this.isModalConfirmBillability = true;
    }
  }

  /** Toggle Modal Confirm Billabilty */
  toggleModalChanger(param: boolean, status?: 'change' | 'cancel'): void {
    this.isModalConfirmBillability = param;
    if (status === 'change') {
      this.billability = this.billabilityForm.value;
    } else {
      this.billabilityForm = new FormControl(this.billability);
    }
  }
}
