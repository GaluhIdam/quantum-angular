import { inject, Injectable } from '@angular/core';
import { FilterAppliedDTO } from '../../../../shared/filter-applied/filter-apllied.dto';
import { Observable } from 'rxjs';
import { MatterDTO } from '../../my-timesheet/dtos/my-timesheet.dto';
import { ResponseDTO } from '../../../../core/dtos/response.dto';
import { environment } from '../../../../environment/env';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MyMatterService {
  private readonly _http = inject(HttpClient);

  /** Data filter my matter */
  dataFilterMyMatter(): FilterAppliedDTO[] {
    return [
      {
        name: 'Client Project',
        status: true,
      },
      {
        name: 'Matter Number',
        status: true,
      },
      {
        name: 'Project Name',
        status: true,
      },
      {
        name: 'Matter Description',
        status: true,
      },
      {
        name: 'Matter Category',
        status: true,
      },
      {
        name: 'Practice Area',
        status: true,
      },
      {
        name: 'Practice Group',
        status: true,
      },
      {
        name: 'Matter Type',
        status: true,
      },
      {
        name: 'Fee Structure',
        status: true,
      },
      {
        name: 'Matter PIC',
        status: true,
      },
      {
        name: 'Matter Members',
        status: true,
      },
      {
        name: 'Unbilled Amount',
        status: true,
      },
      {
        name: 'Completion Date',
        status: true,
      },
      {
        name: 'Creation Date',
        status: true,
      },
    ];
  }

  /** Get matter by Search & Status */
  getMatterBySearchStatus(
    search: string,
    status: string
  ): Observable<ResponseDTO<MatterDTO>> {
    return this._http.get<ResponseDTO<MatterDTO>>(
      `${environment.apiUrl}/matters`,
      {
        params: new HttpParams().set('search', search).set('status', status),
      }
    );
  }

  /** Filter timesheet */
  filterMatters(
    search: string,
    status: string,
    clientName: string,
    matterNumber: string,
    projectName: string,
    timeDescription: string,
    matterCategory: string,
    practiceArea: string,
    practiceGroup: string,
    matterType: string,
    feeStructure: string,
    matterPIC: string,
    matterMembers: string,
    unbilledAmount: string,
    completionDate: string,
    creationDate: string
  ): Observable<ResponseDTO<MatterDTO[]>> {
    return this._http.get<ResponseDTO<MatterDTO[]>>(
      `${environment.apiUrl}/filter-matters`,
      {
        params: new HttpParams()
          .set('search', search)
          .set('status', status)
          .set('clientName', clientName)
          .set('matterNumber', matterNumber)
          .set('projectName', projectName)
          .set('timeDescription', timeDescription)
          .set('matterCategory', matterCategory)
          .set('practiceArea', practiceArea)
          .set('practiceGroup', practiceGroup)
          .set('matterType', matterType)
          .set('feeStructure', feeStructure)
          .set('matterPIC', matterPIC)
          .set('matterMembers', matterMembers)
          .set('unbilledAmount', unbilledAmount)
          .set('completionDate', completionDate)
          .set('creationDate', creationDate),
      }
    );
  }

  /** Post new matter */
  postMatter(request: {}): Observable<ResponseDTO<MatterDTO>> {
    return this._http.post<ResponseDTO<MatterDTO>>(
      `${environment.apiUrl}`,
      request
    );
  }

  /** Put matter */
  putMatter(uuid: string, request: {}): Observable<ResponseDTO<MatterDTO>> {
    return this._http.put<ResponseDTO<MatterDTO>>(
      `${environment.apiUrl}/${uuid}`,
      request
    );
  }

  /** Delete matter with uuid */
  deleteMatter(uuid: string): Observable<ResponseDTO<MatterDTO>> {
    return this._http.delete<ResponseDTO<MatterDTO>>(
      `${environment.apiUrl}/${uuid}`
    );
  }
}
