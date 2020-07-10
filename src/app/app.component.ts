import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { BarsService, BarsConfiguration } from './services/bars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Optus Progress bar demo application using angular';

  private _barsData: BarsConfiguration;
  public get barsData(): BarsConfiguration {
    return this._barsData || {};
  }

  private _isLoading: boolean;
  public get isLoading(): boolean {
    return this._isLoading;
  }
  public set isLoading(v: boolean) {
    this._isLoading = v;
  }


  @ViewChildren(ProgressBarComponent) bars!: QueryList<ProgressBarComponent>;
  public selectBarId = 0;

  constructor(private barServiceClient: BarsService) {
    this._isLoading = false;
    barServiceClient.getBarsConfigurations().subscribe((response: BarsConfiguration) => {
      this._barsData = response;
      this._isLoading = true;
    }, (error: any) => {
      console.log(`Error in retrieving bars details: ${error.message}`);
      this._isLoading = true;

    }, () => this._isLoading = true);
  }

  /**
   * onButtonClick
   */
  public onButtonClick(barIndex: number, stepValue: number, limit: number) {
    const selectedBar = this.bars.find(p => p.id === barIndex);
    if (Number.isNaN(this.selectBarId)) { return; }
    selectedBar?.updateProgress(stepValue, limit);
  }
  public onBarSelection(value: number){
    this.selectBarId = +value;
  }
}
