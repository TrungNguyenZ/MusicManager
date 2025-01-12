import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRevenueArtComponent } from './table-revenue-art.component';

describe('TableRevenueArtComponent', () => {
  let component: TableRevenueArtComponent;
  let fixture: ComponentFixture<TableRevenueArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRevenueArtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRevenueArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
