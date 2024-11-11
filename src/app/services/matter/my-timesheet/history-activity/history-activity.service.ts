import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Response, Result } from '../../../../core/dtos/response.dto';
import { MyTimesheetDTO } from '../../../../interfaces/my-timesheet.dto';

@Injectable({
  providedIn: 'root',
})
export class HistoryActivityService {
  private readonly httpClient = inject(HttpClient);
  httpUrl: string = 'https://quantum-api-dummy.vercel.app/api';

  /** Getting timesheet by date range from REST API. */
  getTimesheetByDateRange(
    startDate: string,
    endDate: string
  ): Observable<Response<MyTimesheetDTO[]>> {
    return of();
  }

  /** Filtering timesheet by date range, matters, or description */
  getFilterTimesheet(
    startDate: string | null,
    endDate: string | null,
    matters: string | null,
    addDescription: string | null,
    page: number,
    limit: number
  ): Observable<Response<Result<MyTimesheetDTO[]>>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    if (matters) params = params.set('matters', matters);
    if (addDescription) params = params.set('description', addDescription);

    return of();
  }
}
