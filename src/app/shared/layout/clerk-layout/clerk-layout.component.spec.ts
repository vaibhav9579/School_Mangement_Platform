import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkLayoutComponent } from './clerk-layout.component';

describe('ClerkLayoutComponent', () => {
  let component: ClerkLayoutComponent;
  let fixture: ComponentFixture<ClerkLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClerkLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClerkLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
