import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonIconComponent,
  ComboBoxComponent,
  FormControlLayoutComponent,
  Icon,
  IconsComponent,
  LinkComponent,
  SelectFieldComponent,
  TextComponent,
  TooltipComponent,
} from '@quantum/fui';
import { SliderCardComponent } from '../../../../../shared/slider-card/slider-card.component';
import { SliderCardBodyComponent } from '../../../../../shared/slider-card/slider-card-body/slider-card-body.component';
import { FlyoutStakeholderComponent } from '../../flyout-shared/flyout-stakeholder/flyout-stakeholder.component';
import { FlyoutContactPersonComponent } from '../../flyout-shared/flyout-contact-person/flyout-contact-person.component';

@Component({
  selector: 'app-client-information',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextComponent,
    TooltipComponent,
    ComboBoxComponent,
    IconsComponent,
    ButtonIconComponent,
    FormControlLayoutComponent,
    SelectFieldComponent,
    SliderCardComponent,
    SliderCardBodyComponent,
    LinkComponent,
    FlyoutStakeholderComponent,
    FlyoutContactPersonComponent,
  ],
  templateUrl: './client-information.component.html',
  styleUrl: './client-information.component.scss',
})
export class ClientInformationComponent {
  /** Client Name Form */
  clientNameForm: FormControl = new FormControl('');
  clientNameOption: {
    name: string;
    value: any;
  }[] = [
    {
      name: 'Acme Corporation',
      value: {
        parent: 'Acme Corporation',
        companyOrigin: 'USA',
        address: '123 Elm Street, Suite 400, San Francisco, CA 94107',
        entityType: 'Private',
        industry: 'Technology',
      },
    },
    {
      name: 'Globex Corporation',
      value: {
        parent: 'Global Industries Ltd.',
        companyOrigin: 'UK',
        address: '456 Oxford Road, Building A, London, W1D 1AN',
        entityType: 'Public',
        industry: 'Manufacturing',
      },
    },
    {
      name: 'Initech LLC',
      value: {
        parent: 'Initech Holdings',
        companyOrigin: 'USA',
        address: '789 Innovation Drive, Suite 300, Austin, TX 73301',
        entityType: 'Private',
        industry: 'Software Development',
      },
    },
    {
      name: 'Soylent Corporation',
      value: {
        parent: 'Soylent Group',
        companyOrigin: 'Germany',
        address: '12 Factory Lane, Berlin, 10178',
        entityType: 'Public',
        industry: 'Food & Beverage',
      },
    },
    {
      name: 'Umbrella Corporation',
      value: {
        parent: 'Umbrella Group',
        companyOrigin: 'Switzerland',
        address: '16 Alpine Road, Zurich, 8001',
        entityType: 'Private',
        industry: 'Pharmaceuticals',
      },
    },
    {
      name: 'Stark Industries',
      value: {
        parent: 'Stark Enterprises',
        companyOrigin: 'USA',
        address: '10880 Malibu Point, Malibu, CA 90265',
        entityType: 'Private',
        industry: 'Defense',
      },
    },
  ];
  clientNameSelected: {
    name: string;
    value: any;
  }[] = [];
  clientNameSlider: {
    id: number;
    title: string;
    status: boolean;
    icon: Icon;
    link: string;
  }[] = [];
  currentSlideIndexClientName: number = 0;

  /** Client Contact Person Form */
  isClientContactPerson: boolean = false;
  clientContactPersonForm: FormControl = new FormControl('');
  clientContactPersonOption: {
    label: string;
    value: any;
  }[] = [
    {
      label: 'Jane Cooper (JC)',
      value: 'JC',
    },
    {
      label: 'Devon Lane (DL)',
      value: 'DL',
    },
    {
      label: 'Robert Fox (RF)',
      value: 'RF',
    },
  ];

  /** Instructint Party Form */
  isInstructingParty: boolean = false;
  instructingPartyForm: FormControl = new FormControl('');
  instructingPartyOption: {
    name: string;
    value: any;
  }[] = [
    {
      name: 'Acme Corporation',
      value: {
        parent: 'Acme Corporation',
        companyOrigin: 'USA',
        address: '123 Elm Street, Suite 400, San Francisco, CA 94107',
        entityType: 'Private',
        industry: 'Technology',
      },
    },
    {
      name: 'Globex Corporation',
      value: {
        parent: 'Global Industries Ltd.',
        companyOrigin: 'UK',
        address: '456 Oxford Road, Building A, London, W1D 1AN',
        entityType: 'Public',
        industry: 'Manufacturing',
      },
    },
    {
      name: 'Initech LLC',
      value: {
        parent: 'Initech Holdings',
        companyOrigin: 'USA',
        address: '789 Innovation Drive, Suite 300, Austin, TX 73301',
        entityType: 'Private',
        industry: 'Software Development',
      },
    },
    {
      name: 'Soylent Corporation',
      value: {
        parent: 'Soylent Group',
        companyOrigin: 'Germany',
        address: '12 Factory Lane, Berlin, 10178',
        entityType: 'Public',
        industry: 'Food & Beverage',
      },
    },
    {
      name: 'Umbrella Corporation',
      value: {
        parent: 'Umbrella Group',
        companyOrigin: 'Switzerland',
        address: '16 Alpine Road, Zurich, 8001',
        entityType: 'Private',
        industry: 'Pharmaceuticals',
      },
    },
    {
      name: 'Stark Industries',
      value: {
        parent: 'Stark Enterprises',
        companyOrigin: 'USA',
        address: '10880 Malibu Point, Malibu, CA 90265',
        entityType: 'Private',
        industry: 'Defense',
      },
    },
  ];
  instructingPartySelected: {
    name: string;
    value: any;
  }[] = [];
  instructingPartySlider: {
    id: number;
    title: string;
    status: boolean;
    icon: Icon;
    link: string;
  }[] = [];
  currentSlideIndexInstructingParty: number = 0;

  isOpenFlyoutContactPerson: boolean = false;
  isOpenFlyoutStakeHolder: boolean = false;

  /** Selection Client Name or Instructing Party Form */
  selectionCombox(event: any, param: 'CN' | 'IP'): void {
    /** Client name process */
    if (param === 'CN') {
      this.clientNameSelected = event;
      this.clientNameSlider = [];
      if (this.clientNameSelected.length > 0) {
        this.clientNameSelected.forEach((item, i) => {
          this.clientNameSlider.push({
            id: i,
            title: item.name,
            status: i === 0 ? true : false,
            icon: 'node',
            link: '#',
          });
        });
      }
    }

    /** Instructing party */
    if (param === 'IP') {
      this.instructingPartySelected = event;
      this.instructingPartySlider = [];
      if (this.instructingPartySelected.length > 0) {
        this.instructingPartySelected.forEach((item, i) => {
          this.instructingPartySlider.push({
            id: i,
            title: item.name,
            status: i === 0 ? true : false,
            icon: 'node',
            link: '#',
          });
        });
      }
    }
  }

  /** Open/Close Flyout Stakeholder or Contact Person */
  openCloseFlyout(param: 'SH' | 'CP'): void {
    if (param === 'SH') {
      this.isOpenFlyoutStakeHolder = !this.isOpenFlyoutStakeHolder;
    }
    if (param === 'CP') {
      this.isOpenFlyoutContactPerson = !this.isOpenFlyoutContactPerson;
    }
  }

  /** Update index slider client name or instructing party */
  slideOut(event: number, param: 'CN' | 'IP'): void {
    if (param === 'CN') {
      this.currentSlideIndexClientName = event;
    }
    if (param === 'IP') {
      this.currentSlideIndexInstructingParty = event;
    }
  }
}
