import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarConfig {
  limit = 100;
  animated = true;
  showValue = true;
  progress = 0;
  step = 1;
  type: 'empty';
}
