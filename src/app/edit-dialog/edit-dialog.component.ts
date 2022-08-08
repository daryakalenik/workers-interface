import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {WorkerT} from "../workers.type"


@Component({
  selector       : 'app-edit-dialog',
  templateUrl    : './edit-dialog.component.html',
  styleUrls      : ['./edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDialogComponent implements OnInit {
  editWorkerForm: FormGroup | null = null;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(
      MAT_DIALOG_DATA) public data: { worker: WorkerT, ageValidators: Validators[], stringValidators: Validators[] },
    readonly fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.editWorkerForm = this.fb.group({
      age      : [this.data.worker.age,
        this.data.ageValidators],
      firstName: [this.data.worker.name.first, this.data.stringValidators],
      lastName : [this.data.worker.name.last, this.data.stringValidators]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
