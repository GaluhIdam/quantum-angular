import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActivityDTO } from '../../interfaces/activity.dto';
import { Observable } from 'rxjs';
import { PaginationDTO } from '../../core/interfaces/pagination.dto';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly http = inject(HttpClient);
  httpUrl: string = 'https://example.api/v1/';

  /**
   * Get activities with search from REST API.
   * @param search - example: "Meeting"
   * @returns
   * {
   *   "data": [
   *     {
   *       "uuid": "123e4567-e89b-12d3-a456-426614174000",
   *       "name": "Activity 1",
   *       "created_at": "2024-11-01T10:00:00Z",
   *       "updated_at": "2024-11-02T12:00:00Z"
   *     },
   *   ],
   *   "page": 1,
   *   "limit": 3,
   *   "totalItems": 10
   * }
   */
  getActivities(search: string): Observable<PaginationDTO<ActivityDTO[]>> {
    return this.http.get<PaginationDTO<ActivityDTO[]>>(
      `${this.httpUrl}/activities`,
      {
        params: new HttpParams().set('search', search),
      }
    );
  }
}
