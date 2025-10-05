import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableViewerComponent } from './timetable-viewer.component';

describe('TimetableViewerComponent', () => {
  let component: TimetableViewerComponent;
  let fixture: ComponentFixture<TimetableViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetableViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
