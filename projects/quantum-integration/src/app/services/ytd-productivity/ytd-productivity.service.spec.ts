import { TestBed } from '@angular/core/testing';

import { YtdProductivityService } from './ytd-productivity.service';

describe('YtdProductivityService', () => {
  let service: YtdProductivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YtdProductivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
