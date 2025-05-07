import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNotiFCMComponent } from './send-noti-fcm.component';

describe('SendNotiFCMComponent', () => {
  let component: SendNotiFCMComponent;
  let fixture: ComponentFixture<SendNotiFCMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendNotiFCMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendNotiFCMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
