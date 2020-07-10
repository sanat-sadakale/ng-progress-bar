import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarConfig {
  max = 100;
  animated = true;
  showValue = true;
  progress = 0;
  step = 1;
  textType: string;
  type: string;
}
