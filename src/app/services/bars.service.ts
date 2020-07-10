import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BarsService {

  constructor(private http: HttpClient) {
  }
  public getBarsConfigurations = () => this.http.get<BarsConfiguration>(environment.barsEndpointUrl);
}


export interface BarsConfiguration {
  buttons: number[];
  bars: number[];
  limit: number;
}
