import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutSpecialRatesComponent } from './flyout-special-rates.component';

describe('FlyoutSpecialRatesComponent', () => {
  let component: FlyoutSpecialRatesComponent;
  let fixture: ComponentFixture<FlyoutSpecialRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyoutSpecialRatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlyoutSpecialRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
