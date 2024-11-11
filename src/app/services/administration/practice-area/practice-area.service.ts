import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PracticeAreaService {
  private readonly httpClient = inject(HttpClient);
  httpUrl: string = 'unknown';
}
