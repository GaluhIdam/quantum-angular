import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutStakeholderComponent } from './flyout-stakeholder.component';

describe('FlyoutStakeholderComponent', () => {
  let component: FlyoutStakeholderComponent;
  let fixture: ComponentFixture<FlyoutStakeholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyoutStakeholderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlyoutStakeholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
