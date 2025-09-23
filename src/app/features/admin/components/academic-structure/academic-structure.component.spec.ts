import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicStructureComponent } from './academic-structure.component';

describe('AcademicStructureComponent', () => {
  let component: AcademicStructureComponent;
  let fixture: ComponentFixture<AcademicStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicStructureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
