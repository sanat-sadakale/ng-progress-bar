import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ProgressBarConfig } from './progress-bar-config';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  private _step: number;


  private _id: number;
  public get id(): number {
    return this._id;
  }
  @Input()
  public set id(v: number) {
    this._id = v;
  }

  private _progress: number;
  public get progress(): number {
    return this._progress ?? this.config.progress;
  }
  @Input()
  public set progress(v: number) {
    this._progress = v ?? 0;
    if (this._progress >= this.limit) {
      this.type = 'full'
    } else if (this._progress === 0) {
      this.type = 'empty';
    } else {
      this.type = 'in-progress';
    }
  }

  public get animated(): boolean {
    return this.config.animated;
  }
  public get showText(): boolean {
    return this.config.showValue;
  }
  @Input()
  public set step(value: number) {
    this._step = value ?? 0;
  }
  public get step(): number {
    return this._step ?? this.config.step;
  }

  private _type: string;
  public get type(): string {
    return this._type;
  }
  @Input()
  public set type(v: string) {
    this._type = v;
  }


  private _limit: number;
  public get limit(): number {
    return this._limit ?? this.config.limit;
  }
  @Input()
  public set limit(v: number) {
    this._limit = v ?? 1;
  }
  constructor(private config: ProgressBarConfig) {
    this._step = config.step;
  }

  ngOnInit(): void {
  }
  /**
   * updateProgress
   */
  public updateProgress(step: number, limit: number) {
    this._step = step;
    this.limit = limit;
    this.progress = this.getValue(this.progress + step, this.limit);
    if (this.progress >= this.limit) {
      this.type = 'full';
    }
  }

  private getValue = (input: number, max: number, min: number = 0) => Math.max(Math.min(input, max), min);

  /**
   * getPercentValue
   */
  public getPercentValue(): number {
    return 100 * this.getValue(this.progress, this.limit) / this.limit;
  }
}
