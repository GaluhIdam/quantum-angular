import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { DailyActivityDTO } from '../dtos/my-timesheet.dto';

@Injectable({
  providedIn: 'root',
})
export class MyTimesheetService {
  private readonly _http = inject(HttpClient);

  /** Remote for MyTimesheet Module */
  private remoteControl = new BehaviorSubject<any>(true);
  data$ = this.remoteControl.asObservable();

  updateData(newValue: boolean | null): void {
    this.remoteControl.next(newValue);
  }

  /** Getting History Activity With Date Range
   * @param startDate
   * @param endDate
   */
  getHistoryActivity(): Observable<DailyActivityDTO[]> {
    return this._http.get<DailyActivityDTO[]>('');
  }
}
