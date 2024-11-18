import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatterDTO } from '../../../../interfaces/matter.dto';
import { PaginationDTO } from '../../../../core/dtos/pagination.dto';

@Injectable({
  providedIn: 'root',
})
export class MatterService {
  private readonly http = inject(HttpClient);
  httpUrl: string = 'https://example.api/v1/';

  /**
   * Get matters with search from REST API.
   * @param search - example: "12345"
   * @returns
   * {
   *   "data": [
   *     {
   *       "uuid": "123e4567-e89b-12d3-a456-426614174000",
   *       "matter": "12345",
   *       "description": "this is matter description"
   *       "created_at": "2024-11-01T10:00:00Z",
   *       "updated_at": "2024-11-02T12:00:00Z"
   *     },
   *   ],
   *   "page": 1,
   *   "limit": 3,
   *   "totalItems": 10
   * }
   */
  getMatters(search: string): Observable<PaginationDTO<MatterDTO[]>> {
    return this.http.get<PaginationDTO<MatterDTO[]>>(
      `${this.httpUrl}/matters`,
      {
        params: new HttpParams().set('search', search),
      }
    );
  }
}
