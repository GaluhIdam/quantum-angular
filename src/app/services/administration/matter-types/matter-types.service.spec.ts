import { TestBed } from '@angular/core/testing';

import { MatterTypesService } from './matter-types.service';

describe('MatterTypesService', () => {
  let service: MatterTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatterTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
