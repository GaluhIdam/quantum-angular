import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActivityDTO,
  MatterDTO,
  MyTimesheetDTO,
  MyTimesheetPostDTO,
} from '../dtos/my-timesheet.dto';
import { BaseController } from '../../../../core/controller/basecontroller';
import { ResponseDTO, Result } from '../../../../core/dtos/response.dto';
import { FilterAppliedDTO } from '../../../../shared/filter-applied/filter-apllied.dto';

@Injectable({
  providedIn: 'root',
})
export class MyTimesheetService extends BaseController {
  private readonly http = inject(HttpClient);
  httpUrl: string = 'https://quantum-api-dummy.vercel.app/api';

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
    return this.http.get<MatterDTO[]>(`${this.httpUrl}/matters`, {
      params: new HttpParams().set('matter', search),
    });
  }

  /** Get activities */
  getActivites(): Observable<ActivityDTO[]> {
    return this.http.get<ActivityDTO[]>(`${this.httpUrl}/activities`);
  }

  /** Get timesheets */
  getTimesheets(): Observable<MyTimesheetDTO[]> {
    return this.http.get<MyTimesheetDTO[]>(`${this.httpUrl}/timesheets`);
  }

  /** Get my timesheet data with range */
  getTimesheetWithRange(
    startDate: string,
    endDate: string
  ): Observable<MyTimesheetDTO[]> {
    return this.http.get<MyTimesheetDTO[]>(`${this.httpUrl}/timesheets`, {
      params: new HttpParams()
        .set('startDate', startDate)
        .set('endDate', endDate),
    });
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

    return this.http.get<Result<MyTimesheetDTO[]>>(
      `${this.httpUrl}/filter-timesheets`,
      { params: params }
    );
  }

  /** Post new timesheet */
  postTimesheet(
    request: MyTimesheetPostDTO
  ): Observable<ResponseDTO<MyTimesheetDTO>> {
    return this.http.post<ResponseDTO<MyTimesheetDTO>>(
      `${this.httpUrl}/my-timesheet`,
      request
    );
  }

  /** Put timesheet */
  putTimesheet(
    uuid: string,
    request: MyTimesheetPostDTO
  ): Observable<ResponseDTO<MyTimesheetDTO>> {
    return this.http.put<ResponseDTO<MyTimesheetDTO>>(
      `${this.httpUrl}/my-timesheet/${uuid}`,
      request
    );
  }

  /** Delete timesheet */
  deleteTimesheet(uuid: string): Observable<ResponseDTO<MyTimesheetDTO>> {
    return this.http.delete<ResponseDTO<MyTimesheetDTO>>(
      `${this.httpUrl}/my-timesheet/${uuid}`
    );
  }
}
