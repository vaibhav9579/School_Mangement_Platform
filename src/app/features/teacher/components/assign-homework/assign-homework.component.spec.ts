import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignHomeworkComponent } from './assign-homework.component';

describe('AssignHomeworkComponent', () => {
  let component: AssignHomeworkComponent;
  let fixture: ComponentFixture<AssignHomeworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignHomeworkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
