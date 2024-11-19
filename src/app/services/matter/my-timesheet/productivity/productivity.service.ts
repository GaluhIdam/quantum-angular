import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductivitySummaryDTO } from '../../../../interfaces/productivity-summary.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductivityService {
  private readonly http = inject(HttpClient);
  httpUrl: string = 'https://example.api/v1/';

  /**
   * Get productivity from REST API.
   * @param startDate example: "2024-11-01"
   * @param endDate example: "2024-11-30"
   * @returns
   * {
   *   "billableActualHour": 20,
   *   "billableTargetHour": 150,
   *   "nonbillableActualHour": 10,
   *   "nonbillableTargetHour": 100,
   * }
   */
  getProductivities(type: string): Observable<ProductivitySummaryDTO> {
    return this.http.get<ProductivitySummaryDTO>(
      `${this.httpUrl}/productivity/${type}`
    );
  }
}
