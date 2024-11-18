import { TestBed } from '@angular/core/testing';

import { AllMatterService } from './all-matter.service';

describe('AllMatterService', () => {
  let service: AllMatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllMatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
