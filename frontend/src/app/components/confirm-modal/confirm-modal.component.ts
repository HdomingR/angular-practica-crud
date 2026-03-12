import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DirectivaDirective } from '../../directiva.directive';

export interface ConfirmModalData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-modal',
  imports: [DirectivaDirective],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  dialogRef = inject(DialogRef);
  data = inject<ConfirmModalData>(DIALOG_DATA);

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
