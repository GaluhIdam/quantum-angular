import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductivityService {
  private readonly http = inject(HttpClient);
  httpUrl: string = 'https://quantum-api-dummy.vercel.app/api';

  /** Get productivity */
  getProductivity(search: string): Observable<number[]> {
    return this.http.get<number[]>(`${this.httpUrl}/productivity`, {
      params: new HttpParams().set('month', search),
    });
  }
}
