import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUtilitySimpleComponent } from './table-utility-simple.component';

describe('TableUtilitySimpleComponent', () => {
  let component: TableUtilitySimpleComponent;
  let fixture: ComponentFixture<TableUtilitySimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableUtilitySimpleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableUtilitySimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
