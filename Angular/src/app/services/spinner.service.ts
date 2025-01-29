import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerVisible = new BehaviorSubject<boolean>(false);
  spinnerVisible$ = this.spinnerVisible.asObservable();

  show(): void {
    setTimeout(() => {
      this.spinnerVisible.next(true);
    });
  }

  hide(): void {
    setTimeout(() => {
      this.spinnerVisible.next(false);
    });
  }
}
