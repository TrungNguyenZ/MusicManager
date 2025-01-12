import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalPercentComponent } from './digital-percent.component';

describe('DigitalPercentComponent', () => {
  let component: DigitalPercentComponent;
  let fixture: ComponentFixture<DigitalPercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalPercentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
