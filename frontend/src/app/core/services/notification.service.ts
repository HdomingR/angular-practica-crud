import { Injectable, inject } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  NotificationComponent,
  NotificationType,
} from '../../components/notification/notification.component';

/**
 * Service responsible for displaying toast notifications using CDK Overlay.
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private overlay = inject(Overlay);

  /**
   * Displays a notification with the given message, type and duration.
   * @param message - The text to display in the notification
   * @param type - The notification type: 'success', 'error' or 'info'
   * @param duration - Time in milliseconds before the notification disappears
   */
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

  /**
   * Displays a success notification.
   * @param message - The text to display
   */
  success(message: string): void {
    this.show(message, 'success');
  }

  /**
   * Displays an error notification.
   * @param message - The text to display
   */
  error(message: string): void {
    this.show(message, 'error');
  }

  /**
   * Displays an info notification.
   * @param message - The text to display
   */
  info(message: string): void {
    this.show(message, 'info');
  }

  /**
   * Creates and positions an overlay in the bottom-right corner of the screen.
   * @returns The created OverlayRef instance
   */
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
