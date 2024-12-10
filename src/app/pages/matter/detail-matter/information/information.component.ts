import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  BadgeComponent,
  ButtonIconComponent,
  DatePickerComponent,
  Icon,
  IconsComponent,
  LinkComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  TextComponent,
  TooltipComponent,
} from '@quantum/fui';
import { CommonModule } from '@angular/common';
import { SliderCardComponent } from '../../../../shared/slider-card/slider-card.component';
import { SliderCardBodyComponent } from '../../../../shared/slider-card/slider-card-body/slider-card-body.component';
import { FlyoutSimpleComponent } from '../../../../shared/flyout-simple/flyout-simple.component';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    CommonModule,
    ButtonIconComponent,
    TextComponent,
    BadgeComponent,
    IconsComponent,
    TooltipComponent,
    SliderCardComponent,
    SliderCardBodyComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    DatePickerComponent,
    FlyoutSimpleComponent,
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
})
export class InformationComponent {
  /** Status modal reopen */
  isModalReOpen: boolean = false;

  /** Status modal reopen */
  isModalCompletionDate: boolean = false;

  /** Status modal step to close */
  isModalStepClose: boolean = false;

  /** Modal FYI */
  isModalFYICompleted: boolean = false;

  /** Flyout associate matter */
  isFlyoutAssociateMatter: boolean = false;

  /** Type Billable */
  type: {
    billability: 'Billable' | 'Potential Matter' | 'Probono' | 'Non Billable';
    pricingType?: 'Lumpsum' | 'Retainer' | 'Hourly' | 'Cap';
    status: 'Complete' | 'Active' | 'Closed';
  } = {
    billability: 'Billable',
    pricingType: 'Hourly',
    status: 'Closed',
  };

  clientNameSelected: {
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
  ];
  clientNameSlider: {
    id: number;
    title: string;
    status: boolean;
    icon: Icon;
    link: string;
  }[] = [];
  currentSlideIndexClientName: number = 0;

  /** Section */
  @ViewChild('matterInformatSecion') matterInformationSec!: ElementRef;
  @ViewChild('clientInformationSec') clientInformationSec!: ElementRef;
  @ViewChild('billingInformationSec') billingInformationSec!: ElementRef;
  @ViewChild('transactionInformationSec')
  transactionInformationSec!: ElementRef;
  @ViewChild('otherInformationSec') otherInformationSec!: ElementRef;

  constructor(private router: Router) {}

  ngOnInit(): void {
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

  movePage(): void {
    this.router.navigate(['/matter/matter-form']);
  }

  /** Update index slider client name or instructing party */
  slideOut(event: number, param: 'CN' | 'IP'): void {
    if (param === 'CN') {
      this.currentSlideIndexClientName = event;
    }
  }

  /** Scroll for section */
  scrollToSection(section: string) {
    let targetElement: ElementRef | null = null;

    switch (section) {
      case 'matterInformation':
        targetElement = this.matterInformationSec;
        break;
      case 'clientInformation':
        targetElement = this.clientInformationSec;
        break;
      case 'billingInformation':
        targetElement = this.billingInformationSec;
        break;
      case 'transactionInformation':
        targetElement = this.transactionInformationSec;
        break;
      case 'otherInformation':
        this.otherInformationSec.nativeElement.scrollIntoView({
          behavior: 'smooth',
        });
        break;
    }

    if (targetElement) {
      const container = document.querySelector(
        '.scroll-container'
      ) as HTMLElement;
      const targetPosition = targetElement.nativeElement.offsetTop;

      container.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  }

  /** Toggle Modal ReOpen */
  toggleModalReOpen(
    modal:
      | 'reopen'
      | 'completion'
      | 'infoStepClose'
      | 'fyiComplete'
      | 'flyoutAssociateMatter',
    param: boolean
  ): void {
    if (modal === 'reopen') {
      this.isModalReOpen = param;
    }
    if (modal === 'completion') {
      this.isModalCompletionDate = param;
    }
    if (modal === 'infoStepClose') {
      this.isModalStepClose = param;
    }
    if (modal === 'fyiComplete') {
      this.isModalFYICompleted = param;
    }
    if (modal === 'flyoutAssociateMatter') {
      this.isFlyoutAssociateMatter = param;
    }
  }
}
