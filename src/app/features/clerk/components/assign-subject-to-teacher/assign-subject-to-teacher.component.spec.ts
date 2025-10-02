import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSubjectToTeacherComponent } from './assign-subject-to-teacher.component';

describe('AssignSubjectToTeacherComponent', () => {
  let component: AssignSubjectToTeacherComponent;
  let fixture: ComponentFixture<AssignSubjectToTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignSubjectToTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignSubjectToTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
