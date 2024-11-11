import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActivityDTO,
  MatterDTO,
  MyTimesheetDTO,
  MyTimesheetPostDTO,
} from '../../../../interfaces/my-timesheet-temporary.dto';
import { BaseController } from '../../../../core/controller/basecontroller';
import { environment } from '../../../../environment/env';
import { Response, Result } from '../../../../core/dtos/response.dto';
import { FilterAppliedDTO } from '../../../../shared/filter-applied/filter-apllied.dto';

@Injectable({
  providedIn: 'root',
})
export class MyTimesheetService extends BaseController {
  private readonly _http = inject(HttpClient);

  /** Data filter for my timesheet */
  dataFilterMyTimesheet(): FilterAppliedDTO[] {
    return [
      {
        name: 'Date',
        status: false,
      },
      {
        name: 'Matter',
        status: false,
      },
      {
        name: 'Time Description',
        status: false,
      },
    ];
  }

  /** Get matter */
  getMatters(search: string): Observable<MatterDTO[]> {
    return this._http.get<MatterDTO[]>(`${environment.httpUrl}/matters`, {
      params: new HttpParams().set('matter', search),
    });
  }

  /** Get activities */
  getActivites(): Observable<ActivityDTO[]> {
    return this._http.get<ActivityDTO[]>(`${environment.httpUrl}/activities`);
  }

  /** Get timesheets */
  getTimesheets(): Observable<MyTimesheetDTO[]> {
    return this._http.get<MyTimesheetDTO[]>(
      `${environment.httpUrl}/timesheets`
    );
  }

  /** Get my timesheet data with range */
  getTimesheetWithRange(
    startDate: string,
    endDate: string
  ): Observable<MyTimesheetDTO[]> {
    return this._http.get<MyTimesheetDTO[]>(
      `${environment.httpUrl}/timesheets`,
      {
        params: new HttpParams()
          .set('startDate', startDate)
          .set('endDate', endDate),
      }
    );
  }

  /** Filter timesheet */
  getFilterTimesheet(
    startDate: string | null,
    endDate: string | null,
    matters: string | null,
    addDescription: string | null,
    page: number,
    limit: number
  ): Observable<Result<MyTimesheetDTO[]>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    if (matters) params = params.set('matters', matters);
    if (addDescription) params = params.set('description', addDescription);

    return this._http.get<Result<MyTimesheetDTO[]>>(
      `${environment.httpUrl}/filter-timesheets`,
      { params: params }
    );
  }

  /** Post new timesheet */
  postTimesheet(
    request: MyTimesheetPostDTO
  ): Observable<Response<MyTimesheetDTO>> {
    return this._http.post<Response<MyTimesheetDTO>>(
      `${environment.httpUrl}/my-timesheet`,
      request
    );
  }

  /** Put timesheet */
  putTimesheet(
    uuid: string,
    request: MyTimesheetPostDTO
  ): Observable<Response<MyTimesheetDTO>> {
    return this._http.put<Response<MyTimesheetDTO>>(
      `${environment.httpUrl}/my-timesheet/${uuid}`,
      request
    );
  }

  /** Delete timesheet */
  deleteTimesheet(uuid: string): Observable<Response<MyTimesheetDTO>> {
    return this._http.delete<Response<MyTimesheetDTO>>(
      `${environment.httpUrl}/my-timesheet/${uuid}`
    );
  }
}
