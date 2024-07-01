import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyFilterComponent } from './apply-filter.component';

describe('ApplyFilterComponent', () => {
  let component: ApplyFilterComponent;
  let fixture: ComponentFixture<ApplyFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
