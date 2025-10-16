import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableTempComponent } from './time-table-temp.component';

describe('TimeTableTempComponent', () => {
  let component: TimeTableTempComponent;
  let fixture: ComponentFixture<TimeTableTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeTableTempComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTableTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
