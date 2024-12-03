import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutOtherStakeholderComponent } from './flyout-other-stakeholder.component';

describe('FlyoutOtherStakeholderComponent', () => {
  let component: FlyoutOtherStakeholderComponent;
  let fixture: ComponentFixture<FlyoutOtherStakeholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyoutOtherStakeholderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlyoutOtherStakeholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
