import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarConfig {
  max = 100;
  animated = true;
  textType: string;
  type: string;
  showValue = false;
  progress = 0;
  step: 1;
  constructor(){}
}
