import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageroledialogComponent } from './manageroledialog.component';

describe('ManageroledialogComponent', () => {
  let component: ManageroledialogComponent;
  let fixture: ComponentFixture<ManageroledialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageroledialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageroledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
