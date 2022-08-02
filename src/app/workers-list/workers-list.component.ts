import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkersService} from "../workers.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WorkerT} from "../workers.type"


@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit, OnDestroy {
  workers: WorkerT[]=[];
  worker: WorkerT={age:0, name:{first:'', last:''}};
  isAddingNewWorker: boolean = false;
  currentEditedWorker: number | null=null;
  searchValue: string = '';
  workersForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required, Validators.maxLength(15), Validators.pattern("[A-Za-zА-яа-яЁё]([ A-Za-zА-яа-яЁё])*")]),
    lastName: new FormControl<string>('', [Validators.required, Validators.maxLength(15), Validators.pattern("[A-Za-zА-яа-яЁё]([ A-Za-zА-яа-яЁё])*")]),
    age: new FormControl<string>('', [Validators.required, Validators.min(1), Validators.max(99), Validators.pattern("([1-9]|[1-9]\\d)")])
  });
  private destroy$ = new Subject<void>();

  constructor(private workersService: WorkersService) {
  }

  ngOnInit(): void {
    this.workersService.getWorkers().pipe(takeUntil(this.destroy$)).subscribe((data:WorkerT[]) => {
      this.workers = data
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  deleteWorker(index: number): void {
    this.workers?.splice(index, 1)
    this.currentEditedWorker = null;
  }

  editWorker(index: number): void {
    this.currentEditedWorker = index;
  }

  saveChanges(): void {
    this.currentEditedWorker = null;
  }

  addingNewWorker(): void {
    this.isAddingNewWorker = !this.isAddingNewWorker;
    this.workersForm.reset();
  }

  onSubmitReactiveForm(): void {
    this.worker = {
      age: +this.workersForm.value.age,
      name: {first: this.workersForm.value.firstName, last: this.workersForm.value.lastName}
    }
    this.workers?.push(this.worker)
    this.addingNewWorker()
  }


}
