import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterBusinessSourceComponent } from './matter-business-source.component';

describe('MatterBusinessSourceComponent', () => {
  let component: MatterBusinessSourceComponent;
  let fixture: ComponentFixture<MatterBusinessSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatterBusinessSourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatterBusinessSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
