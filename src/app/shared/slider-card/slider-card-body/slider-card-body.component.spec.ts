import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCardBodyComponent } from './slider-card-body.component';

describe('SliderCardBodyComponent', () => {
  let component: SliderCardBodyComponent;
  let fixture: ComponentFixture<SliderCardBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderCardBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SliderCardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
