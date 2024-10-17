import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonIconComponent,
  ComboBoxComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  LoadingComponent,
  PopoverComponent,
  PrependComponent,
  SelectFieldComponent,
  TextComponent,
} from '@quantum/fui';
import { FlyoutSimpleComponent } from '../../../../../shared/flyout-simple/flyout-simple.component';
import { PhoneNumberService } from '../../../../../core/services/phone-number.service';
import { debounceTime, Subscription, tap } from 'rxjs';
import { CountryCodeDTO } from '../../../../../core/dtos/country-code.dto';
import { EmptyDataComponent } from '../../../../../shared/empty-data/empty-data.component';

@Component({
  selector: 'app-flyout-contact-person',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlyoutSimpleComponent,
    TextComponent,
    FormControlLayoutComponent,
    SelectFieldComponent,
    InputFieldComponent,
    PrependComponent,
    ButtonIconComponent,
    PopoverComponent,
    ComboBoxComponent,
    IconsComponent,
    LoadingComponent,
    EmptyDataComponent,
  ],
  templateUrl: './flyout-contact-person.component.html',
  styleUrls: ['./flyout-contact-person.component.scss'], // Fixed 'styleUrl' to 'styleUrls'
})
export class FlyoutContactPersonComponent {
  @Input() isOpenFlyoutContactPerson: boolean = false;
  @Output() closeOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  phoneNumber: FormControl = new FormControl('');
  countryForm: FormControl = new FormControl('');
  listCountryCode: CountryCodeDTO[] = [];
  selectedCountry: CountryCodeDTO = {
    flags: {
      png: 'https://flagcdn.com/w320/id.png',
      svg: 'https://flagcdn.com/id.svg',
      alt: 'The flag of Indonesia is composed of two equal horizontal bands of red and white.',
    },
    name: {
      common: 'Indonesia',
      official: 'Republic of Indonesia',
    },
    cca2: 'ID',
    idd: {
      root: '+6', // Correcting the root code to match Indonesia's actual code
      suffixes: ['2'],
    },
  };

  loading: boolean = false;
  displayPopover: boolean = false;

  private subscriptions = new Subscription();

  constructor(private phoneNumberService: PhoneNumberService) {}

  ngOnInit(): void {
    const phoneNumberSub = this.phoneNumber.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          const formattedNumber = this.phoneNumber.value.replace(/\s+/g, '');
          let formattedValue = formattedNumber.startsWith('0')
            ? formattedNumber.slice(1)
            : formattedNumber;
          formattedValue = formattedValue.replace(/(.{4})/g, '$1 ');
          this.phoneNumber.setValue(formattedValue.trim(), {
            emitEvent: false,
          });
        })
      )
      .subscribe();

    const countryFormSub = this.countryForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        if (value) {
          this.searchDataCountry(value);
        } else {
          this.getDataCountryCode();
        }
      });

    this.subscriptions.add(phoneNumberSub);
    this.subscriptions.add(countryFormSub);

    this.getDataCountryCode();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /** Open/Close Flyout */
  openFlyoutContactPerson(): void {
    this.isOpenFlyoutContactPerson = !this.isOpenFlyoutContactPerson;
    this.closeOut.emit(this.isOpenFlyoutContactPerson);
  }

  /** Get data from service */
  getDataCountryCode(): void {
    this.phoneNumberService.getCountryandCode().subscribe((res) => {
      this.listCountryCode = res;
    });
  }

  /** Search data country */
  searchDataCountry(name: string): void {
    this.loading = true;
    this.phoneNumberService.getSearchCountry(name).subscribe((res) => {
      this.listCountryCode = res;
      this.loading = false;
    });
  }

  /** Selection combo box */
  selection(param: CountryCodeDTO): void {
    this.selectedCountry = param;
    this.displayPopover = false;
  }

  /** Catch action from popover */
  isPopoverDisplay(event: boolean): void {
    this.displayPopover = event;
  }
}
