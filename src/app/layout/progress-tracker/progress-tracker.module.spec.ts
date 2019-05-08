import { ProgressTrackerModule } from './progress-tracker.module';

describe('ProgressTrackerModule', () => {
  let progressTrackerModule: ProgressTrackerModule;

  beforeEach(() => {
    progressTrackerModule = new ProgressTrackerModule();
  });

  it('should create an instance', () => {
    expect(progressTrackerModule).toBeTruthy();
  });
});
