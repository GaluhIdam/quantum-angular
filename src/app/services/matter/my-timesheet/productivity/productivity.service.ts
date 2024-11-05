import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Response } from '../../../../core/dtos/response.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductivityService {
  private readonly httpClient = inject(HttpClient);
  httpUrl: string = 'https://quantum-api-dummy.vercel.app/api';

  /** Getting productivity from REST API. */
  getProductivity(
    periode: 'today' | 'week' | 'month' | 'year'
  ): Observable<Response<number[]>> {
    return of();
  }
}
