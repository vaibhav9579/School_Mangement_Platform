import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWithTeacherComponent } from './chat-with-teacher.component';

describe('ChatWithTeacherComponent', () => {
  let component: ChatWithTeacherComponent;
  let fixture: ComponentFixture<ChatWithTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatWithTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatWithTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
