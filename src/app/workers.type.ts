export type WorkerT = {
  age: number,
  name: NameT,
  [key: string]: any
}

type NameT = {
  first: string,
  last: string,
}
