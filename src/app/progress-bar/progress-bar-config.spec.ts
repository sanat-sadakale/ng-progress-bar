import { TestBed } from '@angular/core/testing';

import { ProgressBarConfig } from './progress-bar-config';

describe('ProgressBarConfig', () => {
  let service: ProgressBarConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressBarConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default values', () => {
    const config = new ProgressBarConfig();
    expect(config.limit).toBe(100);
    expect(config.animated).toBe(true);
    expect(config.type).toBeUndefined();
    expect(config.showValue).toBe(true);
    expect(config.step).toBe(1);
    expect(config.progress).toBe(0);
  });
});
