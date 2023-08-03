import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignVacationComponent } from './assign-vacation.component';

describe('AssignVacationComponent', () => {
  let component: AssignVacationComponent;
  let fixture: ComponentFixture<AssignVacationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignVacationComponent]
    });
    fixture = TestBed.createComponent(AssignVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
