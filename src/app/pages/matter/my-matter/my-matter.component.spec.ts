import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMatterComponent } from './my-matter.component';

describe('MyMatterComponent', () => {
  let component: MyMatterComponent;
  let fixture: ComponentFixture<MyMatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMatterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
