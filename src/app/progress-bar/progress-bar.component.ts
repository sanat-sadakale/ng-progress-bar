import { Component, OnInit } from '@angular/core';
import { ProgressBarConfig } from './progress-bar-config';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  private _step: number;
  public get max(): number {
    return this.config.max;
  }
  public get progress(): number {
    return this.config.progress;
  }
  public get animated(): boolean {
    return this.config.animated;
  }
  public get showText(): boolean {
    return this.config.showValue;
  }
  public get step(): number {
    return this.config.step;
  }
  constructor(private config: ProgressBarConfig) {
    this._step = config.step;
  }
  /**
   * updateProgress
   */
  public updateProgress(step: number, limit: number) {
    this._step = step;
  }


  ngOnInit(): void {
  }

}
