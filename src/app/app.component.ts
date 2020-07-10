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

  @ViewChildren(ProgressBarComponent) bars!: QueryList<ProgressBarComponent>;
  public selectBarId: number;

  constructor(private barServiceClient: BarsService) {
    barServiceClient.getBarsConfigurations().subscribe((response: BarsConfiguration) => {
      this._barsData = response;
    }, (error: any) => {
      console.log(`Error in retrieving bars details: ${error.message}`);

    });
  }

  /**
   * onButtonClick
   */
  public onButtonClick(barIndex: number, stepValue: number, limit: number) {
    const selectedBar = this.bars.find(p => p.id === barIndex);
    if (!this.selectBarId) { return; }
    selectedBar?.updateProgress(stepValue, limit);
  }
}
