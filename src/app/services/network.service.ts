import { Injectable } from '@angular/core';
import { Observable, fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  isOnline$!: Observable<boolean>;
  isOffline$!: Observable<boolean>;

  constructor() {
    this.isOnline$ = fromEvent(window, 'online').pipe(
      map(() => true),
      startWith(navigator.onLine)
    );

    this.isOffline$ = fromEvent(window, 'offline').pipe(
      map(() => false),
      startWith(navigator.onLine)
    );
  }
}
