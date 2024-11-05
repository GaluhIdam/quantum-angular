import { TestBed } from '@angular/core/testing';

import { PracticeAreaService } from './practice-area.service';

describe('PracticeAreaService', () => {
  let service: PracticeAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticeAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
