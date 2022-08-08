import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

import {WorkerT} from "./workers.type";


@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(readonly http: HttpClient) {
  }

  getWorkers(): Observable<WorkerT[]> {
    return this.http.get<WorkerT[]>('/assets/mates.json');
  }
}
