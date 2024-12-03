import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  parsePhoneNumberFromString,
  AsYouType,
  CountryCode,
} from 'libphonenumber-js';
import { catchError, Observable, of } from 'rxjs';
import { CountryCodeDTO } from '../dtos/country-code.dto';
import { BaseController } from '../controller/basecontroller';

@Injectable({
  providedIn: 'root',
})
export class PhoneNumberService extends BaseController {
  private readonly _http = inject(HttpClient);

  restApi: string = 'https://restcountries.com/v3.1';

  formatE164(phoneNumber: string, countryCode: CountryCode): string | null {
    const phone = parsePhoneNumberFromString(phoneNumber, countryCode);
    return phone ? phone.format('E.164') : null;
  }

  // For formatting while typing (optional)
  formatAsYouType(phoneNumber: string, countryCode: CountryCode): string {
    return new AsYouType(countryCode).input(phoneNumber);
  }

  /** Get Country Code */
  getCountryandCode(): Observable<CountryCodeDTO[]> {
    return this._http.get<CountryCodeDTO[]>(
      `${this.restApi}/all?fields=name,flags,cca2,idd`
    );
  }

  /** Get and search country code */
  getSearchCountry(name: string): Observable<CountryCodeDTO[]> {
    return this._http
      .get<CountryCodeDTO[]>(
        `${this.restApi}/name/${name}?fields=name,flags,cca2,idd`
      )
      .pipe(catchError((error) => this.errorHandlerService(error, 'array')));
  }
}
