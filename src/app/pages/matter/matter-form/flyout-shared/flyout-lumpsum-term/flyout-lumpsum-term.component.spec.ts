import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutLumpsumTermComponent } from './flyout-lumpsum-term.component';

describe('FlyoutLumpsumTermComponent', () => {
  let component: FlyoutLumpsumTermComponent;
  let fixture: ComponentFixture<FlyoutLumpsumTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyoutLumpsumTermComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlyoutLumpsumTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
