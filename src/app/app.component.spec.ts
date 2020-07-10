import { BarsConfiguration, BarsService } from './services/bars.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Observable, Subject } from 'rxjs';

describe('AppComponent', () => {
  let throwError = false;
  const dummyBars = { buttons: [11, 39, -25, -34], bars: [89, 12, 19], limit: 160 };

  class MockBarsService {
    getBarsConfigurations(): Observable<BarsConfiguration> {
      const subject = new Subject<BarsConfiguration>();
      if (throwError) {
        subject.error(new Error('timeout error'));
      } else {
        subject.next(dummyBars);
      }
      return subject;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: BarsService, useClass: MockBarsService }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Optus Progress bar demo application using angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Optus Progress bar demo application using angular');
  });

  it('should render loading before API returns bars data', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isLoading = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.content').innerText).toContain('Loading...');
  });
  it('should render bars data', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isLoading = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.content').innerText).toContain('Loading...');
  });
  it('should catch error', () => {
    const fixture = TestBed.createComponent(AppComponent);
    throwError = true;
    const app = fixture.componentInstance;
    app.isLoading = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.content').innerText).toContain('Loading...');
  });
  it('should update selected bar on click action', () => {
    const fixture = TestBed.createComponent(AppComponent);
    throwError = true;
    const app = fixture.componentInstance;
    app.isLoading = false;
    app.selectBarId = 0;
    fixture.detectChanges();

    app.onButtonClick(0, 10, dummyBars.limit);
    expect(fixture.nativeElement.querySelector('.content').innerText).toContain('Loading...');
  });
});
