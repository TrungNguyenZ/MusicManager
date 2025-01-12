import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPercentComponent } from './country-percent.component';

describe('CountryPercentComponent', () => {
  let component: CountryPercentComponent;
  let fixture: ComponentFixture<CountryPercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryPercentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
