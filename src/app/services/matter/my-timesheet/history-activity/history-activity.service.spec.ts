import { TestBed } from '@angular/core/testing';

import { HistoryActivityService } from './history-activity.service';

describe('HistoryActivityService', () => {
  let service: HistoryActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
