import { TestBed } from '@angular/core/testing';

import { CompanyEntityService } from './company-entity.service';

describe('CompanyEntityService', () => {
  let service: CompanyEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
