import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutFilterMatterComponent } from './flyout-filter-matter.component';

describe('FlyoutFilterMatterComponent', () => {
  let component: FlyoutFilterMatterComponent;
  let fixture: ComponentFixture<FlyoutFilterMatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyoutFilterMatterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlyoutFilterMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
