import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskAnnaComponent } from './ask-anna.component';

describe('AskAnnaComponent', () => {
  let component: AskAnnaComponent;
  let fixture: ComponentFixture<AskAnnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskAnnaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskAnnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
