import { Subject } from "rxjs";

// Anything exported from this file is importable by other in-browser modules.
export function publicApiFunction() {
  console.log('test function');
}

export const eventBus$ = new Subject();
export const setData = data => {
  eventBus$.next(data);
}