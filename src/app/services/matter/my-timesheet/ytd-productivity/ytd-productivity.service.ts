import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Response } from '../../../../core/dtos/response.dto';
import { YTDProductivityDTO } from '../../../../interfaces/ytd-productivity.dto';

@Injectable({
  providedIn: 'root',
})
export class YtdProductivityService {
  private readonly httpClient = inject(HttpClient);
  httpUrl: string = 'https://quantum-api-dummy.vercel.app/api';

  /** Getting ytd productivity from REST API. */
  getYTDProductivity(year: number): Observable<Response<YTDProductivityDTO[]>> {
    return of();
  }
}
