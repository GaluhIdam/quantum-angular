import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAppliedComponent } from './filter-applied.component';

describe('FilterAppliedComponent', () => {
  let component: FilterAppliedComponent;
  let fixture: ComponentFixture<FilterAppliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterAppliedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
