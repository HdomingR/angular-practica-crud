import { MileageStatusPipe } from './mileage-status.pipe';

describe('MileageStatusPipe', () => {
  let pipe: MileageStatusPipe;

  beforeEach(() => {
    pipe = new MileageStatusPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return Nuevo when mileage is 0', () => {
    expect(pipe.transform(0)).toBe('Nuevo');
  });

  it('should return Km 0 when mileage is 1', () => {
    expect(pipe.transform(1)).toBe('Km 0');
  });

  it('should return Km 0 when mileage is 99', () => {
    expect(pipe.transform(99)).toBe('Km 0');
  });

  it('should return Ocasión when mileage is 100', () => {
    expect(pipe.transform(100)).toBe('Ocasión');
  });

  it('should return Ocasión when mileage is 15000', () => {
    expect(pipe.transform(15000)).toBe('Ocasión');
  });
});
