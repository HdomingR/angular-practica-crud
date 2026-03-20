import { Injectable, signal } from '@angular/core';

/**
 * Service responsible for controlling the global loading state of the application.
 */
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  /** Signal that indicates whether the loader is currently visible */
  isLoading = signal<boolean>(false);

  /**
   * Shows the loader by setting isLoading to true.
   */
  show(): void {
    this.isLoading.set(true);
  }

  /**
   * Hides the loader by setting isLoading to false.
   */
  hide(): void {
    this.isLoading.set(false);
  }
}
