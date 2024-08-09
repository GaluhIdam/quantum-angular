import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMatterFlyoutComponent } from './filter-matter-flyout.component';

describe('FilterMatterFlyoutComponent', () => {
  let component: FilterMatterFlyoutComponent;
  let fixture: ComponentFixture<FilterMatterFlyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterMatterFlyoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterMatterFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
