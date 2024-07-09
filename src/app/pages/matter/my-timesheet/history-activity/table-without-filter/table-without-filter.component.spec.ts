import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWithoutFilterComponent } from './table-without-filter.component';

describe('TableWithoutFilterComponent', () => {
  let component: TableWithoutFilterComponent;
  let fixture: ComponentFixture<TableWithoutFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableWithoutFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableWithoutFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
