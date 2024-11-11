import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductivitySummaryDTO } from '../../interfaces/productivity-summary.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductivityService {
  private readonly http = inject(HttpClient);
  httpUrl: string = 'https://example.api/v1/';

  /** Get productivity */
  getProductivity(
    startDate: string,
    endDate: string
  ): Observable<ProductivitySummaryDTO[]> {
    return this.http.get<ProductivitySummaryDTO[]>(
      `${this.httpUrl}/productivity`,
      {
        params: new HttpParams()
          .set('startDate', startDate)
          .set('endDate', endDate),
      }
    );
  }
}
