import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceNamePercentComponent } from './price-name-percent.component';

describe('PriceNamePercentComponent', () => {
  let component: PriceNamePercentComponent;
  let fixture: ComponentFixture<PriceNamePercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceNamePercentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceNamePercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
