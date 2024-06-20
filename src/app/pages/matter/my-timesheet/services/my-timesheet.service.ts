import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  ActivityDTO,
  MatterDTO,
  MyTimesheetDTO,
  MyTimesheetPostDTO,
} from '../dtos/my-timesheet.dto';
import { BaseController } from '../../../../core/controller/basecontroller';
import { environment } from '../../../../environment/env';
import { ResponseDTO } from '../../../../core/dtos/response.dto';

@Injectable({
  providedIn: 'root',
})
export class MyTimesheetService extends BaseController {
  private readonly _http = inject(HttpClient);

  /** Remote for MyTimesheet Module */
  private remoteControl = new BehaviorSubject<any>(true);
  data$ = this.remoteControl.asObservable();

  updateData(newValue: boolean | null): void {
    this.remoteControl.next(newValue);
  }

  /** Getting Activity and search */
  getActivity(search: string): Observable<ResponseDTO<ActivityDTO[]>> {
    return this._http.get<ResponseDTO<ActivityDTO[]>>(
      `${environment.httpUrl}/activity`,
      {
        params: new HttpParams().set('search', search),
      }
    );
  }

  /** Get Matter and Search
   * @param search
   */
  getMatters(search: string): Observable<ResponseDTO<MatterDTO[]>> {
    return this._http.get<ResponseDTO<MatterDTO[]>>(
      `${environment.httpUrl}/matter`,
      {
        params: new HttpParams().set('search', search),
      }
    );
  }

  /** Get MyTimesheet Data with range
   * @param startDate
   * @param endDate
   */
  getTimesheetWithRange(
    page: number,
    size: number,
    startDate: string,
    endDate: string
  ): Observable<ResponseDTO<MyTimesheetDTO[]>> {
    return this._http.get<ResponseDTO<MyTimesheetDTO[]>>(
      `${environment.httpUrl}/my-timesheet`,
      {
        params: new HttpParams()
          .set('page', page)
          .set('size', size)
          .set('startDate', startDate)
          .set('endDate', endDate),
      }
    );
  }

  /** Post Timesheet
   * @param request
   */
  postTimesheet(
    request: MyTimesheetPostDTO
  ): Observable<ResponseDTO<MyTimesheetDTO>> {
    return this._http.post<ResponseDTO<MyTimesheetDTO>>(
      `${environment.httpUrl}/my-timesheet`,
      request
    );
  }
}
