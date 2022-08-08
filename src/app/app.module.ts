import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {WorkersListComponent} from './workers-list/workers-list.component';
import {WorkersFilterPipe} from './workers-filter.pipe';
import {NewWorkerFormComponent} from './new-worker-form/new-worker-form.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {EditDialogComponent} from './edit-dialog/edit-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkersListComponent,
    WorkersFilterPipe,
    NewWorkerFormComponent,
    ConfirmDialogComponent,
    EditDialogComponent
  ],
  imports     : [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTableModule,
    BrowserAnimationsModule
  ],
  providers   : [],
  bootstrap   : [AppComponent]
})
export class AppModule {
}
