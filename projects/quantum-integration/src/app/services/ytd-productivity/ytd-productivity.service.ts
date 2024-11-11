import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductivityMonthlyDTO } from '../../interfaces/productivity-monthly.dto';

@Injectable({
  providedIn: 'root',
})
export class YtdProductivityService {
  private readonly http = inject(HttpClient);
  httpUrl: string = 'https://example.api/v1/';

  /** Get ytd productivity */
  getYtdProductivity(year: string): Observable<ProductivityMonthlyDTO[]> {
    return this.http.get<ProductivityMonthlyDTO[]>(
      `${this.httpUrl}/ytd-productivity/${year}`
    );
  }
}
