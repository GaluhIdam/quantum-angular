import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  BadgeComponent,
  ButtonIconComponent,
  Icon,
  IconsComponent,
  LinkComponent,
  TextComponent,
  TooltipComponent,
} from '@quantum/fui';
import { CommonModule } from '@angular/common';
import { SliderCardComponent } from '../../../../shared/slider-card/slider-card.component';
import { SliderCardBodyComponent } from '../../../../shared/slider-card/slider-card-body/slider-card-body.component';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    CommonModule,
    ButtonIconComponent,
    TextComponent,
    LinkComponent,
    BadgeComponent,
    IconsComponent,
    TooltipComponent,
    SliderCardComponent,
    SliderCardBodyComponent,
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
})
export class InformationComponent {
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
}
