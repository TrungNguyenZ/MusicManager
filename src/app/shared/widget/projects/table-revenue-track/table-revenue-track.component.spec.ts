import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRevenueTrackComponent } from './table-revenue-track.component';

describe('TableRevenueTrackComponent', () => {
  let component: TableRevenueTrackComponent;
  let fixture: ComponentFixture<TableRevenueTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRevenueTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRevenueTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
