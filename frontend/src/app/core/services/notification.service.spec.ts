import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';

import { Overlay } from '@angular/cdk/overlay';

describe('NotificationService', () => {
  let service: NotificationService;

  let overlaySpy: jasmine.SpyObj<Overlay>;

  beforeEach(() => {
    const overlayRefSpy = jasmine.createSpyObj('OverlayRef', [
      'attach',
      'dispose',
    ]);

    const componentRefSpy = jasmine.createSpyObj('ComponentRef', ['setInput']);

    overlayRefSpy.attach.and.returnValue(componentRefSpy);

    overlaySpy = jasmine.createSpyObj('Overlay', ['create', 'position']);

    const positionSpy = jasmine.createSpyObj('PositionStrategy', ['global']);

    const globalSpy = jasmine.createSpyObj('GlobalPositionStrategy', [
      'bottom',
      'right',
    ]);

    globalSpy.bottom.and.returnValue(globalSpy);

    globalSpy.right.and.returnValue(globalSpy);

    positionSpy.global.and.returnValue(globalSpy);

    overlaySpy.position.and.returnValue(positionSpy);

    overlaySpy.create.and.returnValue(overlayRefSpy);

    TestBed.configureTestingModule({
      providers: [
        NotificationService,

        { provide: Overlay, useValue: overlaySpy },
      ],
    });

    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call overlay.create when show is called', () => {
    service.show('Test message');

    expect(overlaySpy.create).toHaveBeenCalled();
  });

  it('should call overlay.create when success is called', () => {
    service.success('Success message');

    expect(overlaySpy.create).toHaveBeenCalled();
  });

  it('should call overlay.create when error is called', () => {
    service.error('Error message');

    expect(overlaySpy.create).toHaveBeenCalled();
  });

  it('should call overlay.create when info is called', () => {
    service.info('Info message');

    expect(overlaySpy.create).toHaveBeenCalled();
  });
});
