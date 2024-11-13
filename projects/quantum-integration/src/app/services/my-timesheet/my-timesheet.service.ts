import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyTimesheetDTO } from '../../interfaces/my-timesheet.dto';

@Injectable({
  providedIn: 'root',
})
export class MyTimesheetService {
  private readonly http = inject(HttpClient);
  httpUrl: string = 'https://example.api/v1/';

  /**
   * Get my timesheet with date range from REST API.
   * @param startDate - example: "2024-11-01"
   * @param endDate - example: "2024-11-30"
   * @param matters - example: "12345, 54321, 7879" (Multiple Selection)
   * @param timeDescription - example: "Discussed tasks and goals for the upcoming sprint."
   * @returns
   * [
   *   {
   *     "uuid": "789e1234-e89b-12d3-a456-426614174000",
   *     "matter": {
   *       "uuid": "456e1234-e89b-12d3-a456-426614174000",
   *       "name": "Matter A",
   *       "created_at": "2024-10-15T08:30:00Z",
   *       "updated_at": "2024-10-15T09:00:00Z"
   *     },
   *     "activity": {
   *       "uuid": "123e4567-e89b-12d3-a456-426614174001",
   *       "name": "Activity 1",
   *       "created_at": "2024-11-01T10:00:00Z",
   *       "updated_at": "2024-11-02T12:00:00Z"
   *     },
   *     "description": "Meeting with client regarding project details",
   *     "date": "2024-11-10",
   *     "duration": "2h 30m",
   *     "pending": true,
   *     "tagBy": "John Doe",
   *     "created_at": "2024-11-10T09:00:00Z",
   *     "updated_at": "2024-11-10T11:30:00Z"
   *   }
   * ]
   */
  getMyTimesheetByDate(
    startDate: string,
    endDate: string
  ): Observable<MyTimesheetDTO[]> {
    return this.http.get<MyTimesheetDTO[]>(`${this.httpUrl}/my-timesheet`, {
      params: new HttpParams()
        .set('startDate', startDate)
        .set('endDate', endDate),
    });
  }
}
