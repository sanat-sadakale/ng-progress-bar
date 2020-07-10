import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BarsService } from './bars.service';
import { environment } from 'src/environments/environment';

describe('BarsService', () => {
  let service: BarsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BarsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Nothing pending
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<BarsConfiguration>', () => {
    const dummyBars = {buttons: [11, 39, -25, -34], bars: [89, 12, 19], limit: 160};

    service.getBarsConfigurations().subscribe(bars => {
      expect(bars.buttons.length).toBe(4);
      expect(bars.bars.length).toBe(3);
      expect(bars.limit).toBeGreaterThan(0);
      expect(bars).toEqual(dummyBars);
    });

    const req = httpMock.expectOne(environment.barsEndpointUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBars);
  });

  // it('should be return barConfigurations response', async () => {
  //   const bars = await service.getBarsConfigurations().toPromise();
  //   expect(bars.buttons.length).toBe(4);
  //   expect(bars.bars.length).toBe(3);
  //   expect(bars.limit).toBeGreaterThan(0);
  // });
});
