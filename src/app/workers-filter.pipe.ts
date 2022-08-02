import {Pipe, PipeTransform} from '@angular/core';
import {WorkerT} from "./workers.type";


@Pipe({
  name: 'workersFilter'
})
export class WorkersFilterPipe implements PipeTransform {

  transform(workers: WorkerT[], value: string): WorkerT[] {
    if (value === '' || workers.length === 0) {
      return workers
    }
    return workers.filter((worker): boolean => {
      return String(worker.age).indexOf(value) !== -1 ||
        worker.name.first.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        worker.name.last.toLowerCase().indexOf(value.toLowerCase()) !== -1
    })


  }
}
