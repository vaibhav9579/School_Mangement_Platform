import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyClassTeacherComponent } from './apply-class-teacher.component';

describe('ApplyClassTeacherComponent', () => {
  let component: ApplyClassTeacherComponent;
  let fixture: ComponentFixture<ApplyClassTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyClassTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyClassTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
