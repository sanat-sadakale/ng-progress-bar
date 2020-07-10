import { Component } from '@angular/core';
import { BarsService, BarsConfiguration } from './services/bars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Optus Progress bar demo application using angular';

  private _barsData : BarsConfiguration;
  public get barsData(): BarsConfiguration {
    return this._barsData || {};
  }

  constructor(private barServiceClient: BarsService){
    barServiceClient.getBarsConfigurations().subscribe((response: BarsConfiguration) => {
      this._barsData =  response;
    }, (error: any) => {
      console.log(`Error in retrieving bars details: ${error.message}`);

    });
  }
  /**
   * onButtonClick
   */
  public onButtonClick(barIndex: number, stepValue: number, limit: number) {
    console.log(`params: index: ${barIndex}, step: ${stepValue}, limit: ${limit}`);
  }
}
