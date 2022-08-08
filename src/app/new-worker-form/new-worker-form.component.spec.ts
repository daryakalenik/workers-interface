import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkerFormComponent } from './new-worker-form.component';

describe('NewWorkerFormComponent', () => {
  let component: NewWorkerFormComponent;
  let fixture: ComponentFixture<NewWorkerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWorkerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWorkerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
