import { Component, input } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  message = input<string>('');
  type = input<NotificationType>('info');
}
