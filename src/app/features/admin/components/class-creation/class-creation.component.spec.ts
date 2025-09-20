import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCreationComponent } from './class-creation.component';

describe('ClassCreationComponent', () => {
  let component: ClassCreationComponent;
  let fixture: ComponentFixture<ClassCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
