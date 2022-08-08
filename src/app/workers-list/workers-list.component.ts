import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from '@angular/material/dialog';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

import {WorkerT} from "../workers.type"
import {NewWorkerFormComponent} from "../new-worker-form/new-worker-form.component";
import {WorkersService} from "../workers.service";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {actionsColumn, ageColumn, firstNameColumn, lastNameColumn, numberColumn} from "./constants"


@Component({
  selector       : 'app-workers-list',
  templateUrl    : './workers-list.component.html',
  styleUrls      : ['./workers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersListComponent implements OnInit, OnDestroy {
  readonly numberColumn: string = numberColumn;
  readonly firstNameColumn: string = firstNameColumn;
  readonly lastNameColumn: string = lastNameColumn;
  readonly ageColumn: string = ageColumn;
  readonly actionsColumn: string = actionsColumn;

  isSortedByMaxAge: boolean = false;
  isSortedByMinAge: boolean = false;
  workersForm: FormGroup | null = null;
  workers: WorkerT[] | null = null;
  worker: WorkerT | null = null;
  searchValue: string = '';
  readonly destroy$ = new Subject<void>();
  ageValidators: Validators[] = [Validators.required, Validators.min(1), Validators.max(99),
    Validators.pattern("([1-9]|[1-9]\\d)")];
  stringValidators: Validators[] = [Validators.required, Validators.maxLength(15),
    Validators.pattern("[A-Za-zА-яа-яЁё]([ A-Za-zА-яа-яЁё])*"), this.onValidatingName]


  constructor(
    readonly changeDetection: ChangeDetectorRef, readonly workersService: WorkersService, readonly dialog: MatDialog,
    readonly fb: FormBuilder
  ) {
  }

  onOpenDialog(): void {
    const dialogRef = this.dialog.open(NewWorkerFormComponent, {
      data: {workersForm: this.workersForm}, autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      result ? (
        this.worker =
          {
            age : isNaN(+result.age) ? 0 : +result.age,
            name: {
              first: result.firstName,
              last : result.lastName
            }
          },
          this.workers ? (
            this.workers?.unshift(this.worker)) : (this.workers = [], this.workers.push(this.worker)),
          this.workersForm?.reset(), this.changeDetection.markForCheck()) : null

    })
  }

  ngOnInit(): void {
    this.workersService.getWorkers().pipe(takeUntil(this.destroy$)).subscribe((data: WorkerT[]) => {
      this.workers = data;
      this.changeDetection.markForCheck()
    })
    this.workersForm = this.fb.group({
      age      : ['',
        this.ageValidators],
      firstName: ['', this.stringValidators],
      lastName : ['', this.stringValidators]
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTableClick(event: any): void {
    switch (event.target?.dataset.action) {
      case 'delete':
        const confirmRef = this.dialog.open(ConfirmDialogComponent);
        confirmRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
          result ? (this.workers?.splice(event.target?.dataset.row, 1), this.changeDetection.markForCheck()) : null
        })

        break;
      case 'edit':
        const editRef = this.dialog.open(EditDialogComponent,
          {
            data        : {
              worker: this.workers?.[event.target?.dataset.row], ageValidators: this.ageValidators,
              stringValidators                                                : this.stringValidators
            }, autoFocus: false
          })
        editRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
          result && this.workers ? (
            this.workers[event.target?.dataset.row].age = result.age,
              this.workers[event.target?.dataset.row].name.first = result.firstName,
              this.workers[event.target?.dataset.row].name.last =
                result.lastName, this.changeDetection.markForCheck()) : null
        })

        break;

    }

  }

  onFilterWorkers(workers: WorkerT[]): WorkerT[] | [] {
    if (this.searchValue === '' || workers === null) {
      return workers
    }
    return workers.filter((worker) => {
      return String(worker.age).includes(this.searchValue) ||
        worker.name.first.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        worker.name.last.toLowerCase().includes(this.searchValue.toLowerCase())
    })
  }

  onSortByMaxAge(): void {
    this.isSortedByMaxAge ? null : this.workers?.sort((a, b) => a.age < b.age ? 1 : -1),
      this.isSortedByMaxAge = true, this.isSortedByMinAge = false
  }


  onSortByMinAge(): void {
    this.isSortedByMinAge ? null : this.workers?.sort((a, b) => a.age > b.age ? 1 : -1),
      this.isSortedByMinAge = true, this.isSortedByMaxAge = false
  }

  onValidatingName(control: AbstractControl): { [key: string]: boolean } | null {
    return control.value ? (
      control.value[0] !== control.value[0].toUpperCase() ? {'notUpperCase': true} : null) : null

  }


}
