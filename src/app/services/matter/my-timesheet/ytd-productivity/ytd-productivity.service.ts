import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  // getYtdProductivities(
  //   year: number,
  //   type: string
  // ): Observable<ProductivityMonthlyDTO[]> {
  //   return this.http.get<ProductivityMonthlyDTO[]>(
  //     `${this.httpUrl}/ytd-productivity`,
  //     { params: new HttpParams().set('year', year).set('type', type) }
  //   );
  // }

  getYtdProductivities(
    year: number,
    type: string
  ): Observable<ProductivityMonthlyDTO[]> {
    const data: ProductivityMonthlyDTO[] = [
      {
        month: 'January',
        billableActualHour: 20,
        billableTargetHour: 150,
        nonbillableActualHour: 10,
        nonbillableTargetHour: 100,
      },
      {
        month: 'February',
        billableActualHour: 20,
        billableTargetHour: 150,
        nonbillableActualHour: 10,
        nonbillableTargetHour: 100,
      },
      {
        month: 'March',
        billableActualHour: 20,
        billableTargetHour: 150,
        nonbillableActualHour: 10,
        nonbillableTargetHour: 100,
      },
      {
        month: 'April',
        billableActualHour: 20,
        billableTargetHour: 150,
        nonbillableActualHour: 10,
        nonbillableTargetHour: 100,
      },
      {
        month: 'May',
        billableActualHour: 20,
        billableTargetHour: 150,
        nonbillableActualHour: 10,
        nonbillableTargetHour: 100,
      },
      {
        month: 'June',
        billableActualHour: 20,
        billableTargetHour: 150,
        nonbillableActualHour: 10,
        nonbillableTargetHour: 100,
      },
      {
        month: 'July',
        billableActualHour: 20,
        billableTargetHour: 150,
        nonbillableActualHour: 10,
        nonbillableTargetHour: 100,
      },
      {
        month: 'August',
        billableActualHour: 20,
        billableTargetHour: 150,
        nonbillableActualHour: 10,
        nonbillableTargetHour: 100,
      },
      {
        month: 'September',
        billableActualHour: 20,
        billableTargetHour: 150,
        nonbillableActualHour: 10,
        nonbillableTargetHour: 100,
      },
      {
        month: 'October',
        billableActualHour: 20,
        billableTargetHour: 150,
        nonbillableActualHour: 10,
        nonbillableTargetHour: 100,
      },
      {
        month: 'November',
        billableActualHour: 20,
        billableTargetHour: 150,
        nonbillableActualHour: 10,
        nonbillableTargetHour: 100,
      },
      {
        month: 'December',
        billableActualHour: 20,
        billableTargetHour: 150,
        nonbillableActualHour: 10,
        nonbillableTargetHour: 100,
      },
    ];

    return of(data);
  }
}
