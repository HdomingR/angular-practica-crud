import { Injectable, inject } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  NotificationComponent,
  NotificationType,
} from '../../components/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private overlay = inject(Overlay);

  show(
    message: string,
    type: NotificationType = 'info',
    duration = 3000,
  ): void {
    const overlayRef = this.createOverlay();
    const portal = new ComponentPortal(NotificationComponent);
    const componentRef = overlayRef.attach(portal);

    componentRef.setInput('message', message);
    componentRef.setInput('type', type);

    setTimeout(() => overlayRef.dispose(), duration);
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  private createOverlay(): OverlayRef {
    return this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .bottom('1.5rem')
        .right('1.5rem'),
    });
  }
}
