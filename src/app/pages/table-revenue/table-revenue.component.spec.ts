import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRevenueComponent } from './table-revenue.component';

describe('TableRevenueComponent', () => {
  let component: TableRevenueComponent;
  let fixture: ComponentFixture<TableRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRevenueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
