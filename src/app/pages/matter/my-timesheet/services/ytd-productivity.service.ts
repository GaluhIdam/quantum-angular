import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YtdProductivityService {
  private readonly http = inject(HttpClient);
  httpUrl: string = 'https://quantum-api-dummy.vercel.app/api';

  /** Get ytd productivity */
  getYtdProductivity(search: string): Observable<[]> {
    return this.http.get<[]>(`${this.httpUrl}/ytd-productivity`, {
      params: new HttpParams().set('month', search),
    });
  }
}
