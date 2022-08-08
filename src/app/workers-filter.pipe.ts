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
      return String(worker.age).includes(value) ||
        worker.name.first.toLowerCase().includes(value.toLowerCase()) ||
        worker.name.last.toLowerCase().includes(value.toLowerCase())
    })


  }
}
