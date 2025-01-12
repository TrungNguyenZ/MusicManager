import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubePercentComponent } from './youtube-percent.component';

describe('YoutubePercentComponent', () => {
  let component: YoutubePercentComponent;
  let fixture: ComponentFixture<YoutubePercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubePercentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoutubePercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
