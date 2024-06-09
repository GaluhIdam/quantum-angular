import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DailyActivityDTO } from '../dtos/my-timesheet.dto';

@Injectable({
  providedIn: 'root',
})
export class MyTimesheetService {
  private readonly _http = inject(HttpClient);

  /** Getting History Activity With Date Range
   * @param startDate
   * @param endDate
   */
  getHistoryActivity(): Observable<DailyActivityDTO[]> {
    return this._http.get<DailyActivityDTO[]>('');
  }
}
