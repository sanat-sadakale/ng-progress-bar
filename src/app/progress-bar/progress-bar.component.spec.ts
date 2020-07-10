import { ProgressBarConfig } from './progress-bar-config';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressBarComponent ],
      providers: [ProgressBarConfig]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should accept inputs and render in the component', () => {
    component.id = 1;
    component.progress = 10;
    component.limit = 200;
    component.step = 14;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.progress').innerText).toEqual(`${component.getPercentValue()}%`);
    expect(component.id).toEqual(1);
  });
  it('Should update progress bar', () => {
    component.id = 1;
    component.progress = 10;
    component.limit = 200;
    component.step = 14;
    const percent = component.getPercentValue();
    component.updateProgress(20, 200);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.progress').innerText).toEqual(`${percent + 10}%`);
    expect(component.id).toEqual(1);
  });
  it('Should indicate with full 100% progress bar', () => {
    component.id = 1;
    component.progress = 20;
    component.limit = 200;
    component.step = 14;
    component.updateProgress(200, 200);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.progress').innerText).toEqual(`100%`);
    expect(component.type).toEqual('full');
  });
  it('Should indicate with empty 0% progress bar', () => {
    component.id = 1;
    component.progress = 0;
    component.limit = 200;
    component.step = 14;
    component.updateProgress(-50, 200);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.progress').innerText).toEqual(`0%`);
    expect(component.type).toEqual('empty');
  });
});
