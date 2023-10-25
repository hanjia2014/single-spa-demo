import { Subject } from "rxjs";
import Eev from 'eev';

// Anything exported from this file is importable by other in-browser modules.
export function publicApiFunction() {
  console.log('test function');
}

const eventBusSub = new Subject();
export const eventBus$ = eventBusSub.asObservable();

export const setData = data => {
  eventBusSub.next(data);
}

export const e = new Eev();