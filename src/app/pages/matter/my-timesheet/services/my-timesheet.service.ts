import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe, retry, tap } from 'rxjs';
import {
  MatterDTO,
  MyTimesheetDTO,
  MyTimesheetPostDTO,
} from '../dtos/my-timesheet.dto';
import { BaseController } from '../../../../core/controller/basecontroller';
import { environment } from '../../../../environment/env';
import { ResponseDTO, Result } from '../../../../core/dtos/response.dto';
import { FilterAplliedDTO } from '../../../../shared/filter-applied/filter-apllied.dto';

@Injectable({
  providedIn: 'root',
})
export class MyTimesheetService extends BaseController {
  private readonly _http = inject(HttpClient);

  /** Data filter for my timesheet */
  dataFilterMyTimesheet(): FilterAplliedDTO[] {
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

  /** Get matter and Search */
  getMatters(search: string): Observable<ResponseDTO<MatterDTO[]>> {
    return this._http.get<ResponseDTO<MatterDTO[]>>(
      `${environment.httpUrl}/matter`,
      {
        params: new HttpParams().set('search', search),
      }
    );
  }

  /** Get my timesheet data with range */
  getTimesheetWithRange(
    startDate: string,
    endDate: string
  ): Observable<ResponseDTO<MyTimesheetDTO[]>> {
    return this._http.get<ResponseDTO<MyTimesheetDTO[]>>(
      `${environment.httpUrl}/my-timesheet`,
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
    size: number
  ): Observable<ResponseDTO<Result<MyTimesheetDTO[]>>> {
    let params = new HttpParams();

    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    if (matters) {
      params = params.set('matters', matters);
    }
    if (addDescription) {
      params = params.set('addDescription', addDescription);
    }
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());

    return this._http.get<ResponseDTO<Result<MyTimesheetDTO[]>>>(
      `${environment.httpUrl}/my-timesheet/filter`,
      { params: params }
    );
  }

  /** Post new timesheet */
  postTimesheet(
    request: MyTimesheetPostDTO
  ): Observable<ResponseDTO<MyTimesheetDTO>> {
    return this._http.post<ResponseDTO<MyTimesheetDTO>>(
      `${environment.httpUrl}/my-timesheet`,
      request
    );
  }

  /** Put timesheet */
  putTimesheet(
    uuid: string,
    request: MyTimesheetPostDTO
  ): Observable<ResponseDTO<MyTimesheetDTO>> {
    return this._http.put<ResponseDTO<MyTimesheetDTO>>(
      `${environment.httpUrl}/my-timesheet/${uuid}`,
      request
    );
  }

  /** Delete timesheet */
  deleteTimesheet(uuid: string): Observable<ResponseDTO<MyTimesheetDTO>> {
    return this._http.delete<ResponseDTO<MyTimesheetDTO>>(
      `${environment.httpUrl}/my-timesheet/${uuid}`
    );
  }
}
