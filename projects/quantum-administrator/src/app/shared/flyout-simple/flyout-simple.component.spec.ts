import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutSimpleComponent } from './flyout-simple.component';

describe('FlyoutSimpleComponent', () => {
  let component: FlyoutSimpleComponent;
  let fixture: ComponentFixture<FlyoutSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyoutSimpleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlyoutSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
