import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutContactPersonComponent } from './flyout-contact-person.component';

describe('FlyoutContactPersonComponent', () => {
  let component: FlyoutContactPersonComponent;
  let fixture: ComponentFixture<FlyoutContactPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyoutContactPersonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlyoutContactPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
