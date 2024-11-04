import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO, Result } from '../../../core/dtos/response.dto';
import { LocationDTO } from '../../../pages/master-data/location/dto/location.dto';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly httpClient = inject(HttpClient);
  httpUrl: string = 'unknown';

  /** Retrieves location from a REST API. */
  getLocations(search: string): Observable<ResponseDTO<Result<LocationDTO[]>>> {
    return this.httpClient.get<ResponseDTO<Result<LocationDTO[]>>>(
      `${this.httpUrl}/location`,
      {
        params: new HttpParams().set('search', search),
      }
    );
  }

  /** Retrieves country from a REST API for get provinces and retrieves provinces for get cities */
  getCountryOrProvinceDetail(
    uuid: string,
    param: 'country' | 'province'
  ): Observable<ResponseDTO<Result<unknown[]>>> {
    return this.httpClient.get<ResponseDTO<Result<unknown[]>>>(
      `${this.httpUrl}/location`,
      {
        params: new HttpParams().set(param, uuid),
      }
    );
  }

  /** Create location to a REST API. */
  postLocation(request: unknown): Observable<unknown> {
    return this.httpClient.post<unknown>(`${this.httpUrl}/location`, request);
  }

  /** Put location to a REST API. */
  putLocation(uuid: string, request: unknown): Observable<unknown> {
    return this.httpClient.put<unknown>(
      `${this.httpUrl}/location/${uuid}`,
      request
    );
  }

  /** Delete location to a REST API. */
  deleteLocation(uuid: string): Observable<unknown> {
    return this.httpClient.delete<unknown>(`${this.httpUrl}/location/${uuid}`);
  }
}
