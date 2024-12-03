import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutRetainerTermComponent } from './flyout-retainer-term.component';

describe('FlyoutRetainerTermComponent', () => {
  let component: FlyoutRetainerTermComponent;
  let fixture: ComponentFixture<FlyoutRetainerTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyoutRetainerTermComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlyoutRetainerTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
