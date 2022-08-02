import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WorkerT} from "./workers.type";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(private http: HttpClient) {
  }

  getWorkers():Observable<WorkerT[]> {
    return this.http.get<WorkerT[]>('/assets/mates.json');
  }
}
