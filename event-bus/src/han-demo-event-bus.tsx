import { Subject } from "rxjs";

// Anything exported from this file is importable by other in-browser modules.
export function publicApiFunction() {
  console.log('test function');
}

const eventBus = new Subject();
export const eventBus$ = eventBus.asObservable();
export const setData = data => {
  console.log(data);
  eventBus.next(data);
}