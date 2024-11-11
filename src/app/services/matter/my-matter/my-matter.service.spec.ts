import { TestBed } from '@angular/core/testing';

import { MyMatterService } from './my-matter.service';

describe('MyMatterService', () => {
  let service: MyMatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyMatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
