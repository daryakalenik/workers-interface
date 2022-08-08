import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormGroup} from "@angular/forms";


interface DialogData {
  workersForm: FormGroup;
}

@Component({
  selector       : 'app-new-worker-form',
  templateUrl    : './new-worker-form.component.html',
  styleUrls      : ['./new-worker-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewWorkerFormComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<NewWorkerFormComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}
