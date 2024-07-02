import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe, retry, tap } from 'rxjs';
import {
  ActivityDTO,
  MatterDTO,
  MyTimesheetDTO,
  MyTimesheetPostDTO,
} from '../dtos/my-timesheet.dto';
import { BaseController } from '../../../../core/controller/basecontroller';
import { environment } from '../../../../environment/env';
import {
  ResponseDTO,
  Result,
  TokenDTO,
  UserKeycloakDTO,
} from '../../../../core/dtos/response.dto';

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

  /** Filter Timesheet
   * @param startDate
   * @param endDate
   * @param matters
   * @param addDescription
   * @param page
   * @param size
   */
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

  /** Post Timesheet
   * @param request
   */
  postTimesheet(
    request: MyTimesheetPostDTO
  ): Observable<ResponseDTO<MyTimesheetDTO>> {
    return this._http
      .post<ResponseDTO<MyTimesheetDTO>>(
        `${environment.httpUrl}/my-timesheet`,
        request
      )
      .pipe(tap(() => this.updateData(true)));
  }

  /** Put Timesheet */
  putTimesheet(
    uuid: string,
    request: MyTimesheetPostDTO
  ): Observable<ResponseDTO<MyTimesheetDTO>> {
    return this._http
      .put<ResponseDTO<MyTimesheetDTO>>(
        `${environment.httpUrl}/my-timesheet/${uuid}`,
        request
      )
      .pipe(tap(() => this.updateData(false)));
  }

  /** Delete Timesheet */
  deleteTimesheet(uuid: string): Observable<ResponseDTO<MyTimesheetDTO>> {
    return this._http.delete<ResponseDTO<MyTimesheetDTO>>(
      `${environment.httpUrl}/my-timesheet/${uuid}`
    );
  }

  /** Post for get Token */
  postToken(): Observable<TokenDTO> {
    const body = new HttpParams()
      .set('client_id', 'quantum-client')
      .set('client_secret', 'wkKbXRbuzUTWHvrQw8y3pNgDFXiCe2Rq')
      .set('grant_type', 'client_credentials');
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.post<TokenDTO>(
      'http://localhost:8080/realms/quantum-demo/protocol/openid-connect/token',
      body.toString(),
      { headers }
    );
  }

  /** Getting Users from keycloak */
  getEmployee(token: string): Observable<UserKeycloakDTO[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<UserKeycloakDTO[]>(
      `http://localhost:8080/admin/realms/quantum-demo/users`,
      { headers }
    );
  }
}
