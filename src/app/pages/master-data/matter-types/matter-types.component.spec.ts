import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTypesComponent } from './matter-types.component';

describe('MatterTypesComponent', () => {
  let component: MatterTypesComponent;
  let fixture: ComponentFixture<MatterTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatterTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatterTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
