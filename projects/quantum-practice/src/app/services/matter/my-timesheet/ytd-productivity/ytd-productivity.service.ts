import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductivityMonthlyDTO } from '../../../../interfaces/productivity-monthly.dto';

@Injectable({
  providedIn: 'root',
})
export class YtdProductivityService {
  private readonly http = inject(HttpClient);
  httpUrl: string = 'https://example.api/v1/';

  /**
   * Get ytd productivity by year from REST API.
   * @param year example: 2024
   * @example
   * [
   *  {
   *   "month": "January"
   *   "billableActualHour": 20,
   *   "billableTargetHour": 150,
   *   "nonbillableActualHour": 10,
   *   "nonbillableTargetHour": 100,
   *  },
   *  {
   *   "month": "February"
   *   "billableActualHour": 20,
   *   "billableTargetHour": 150,
   *   "nonbillableActualHour": 10,
   *   "nonbillableTargetHour": 100,
   *  },
   * ]
   */
  getYtdProductivities(
    year: number,
    type: string
  ): Observable<ProductivityMonthlyDTO[]> {
    return this.http.get<ProductivityMonthlyDTO[]>(
      `${this.httpUrl}/ytd-productivity`,
      { params: new HttpParams().set('year', year).set('type', type) }
    );
  }
}
