import { Directive, input, computed } from '@angular/core';

/** Visual variant of the button */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

/** Size of the button */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Directive that applies consistent styling and behavior to buttons and anchor elements.
 * @example
 * ```html
 * <button appButton>Primary</button>
 * <button appButton variant="danger" size="lg">Delete</button>
 * <a appButton variant="ghost" href="/somewhere">Link</a>
 */
@Directive({
  selector: '[appButton]',
  host: {
    '[class]': 'hostClasses()',
    '[attr.disabled]': 'disabled() || null',
    '[attr.aria-disabled]': 'disabled()',
  },
})
export class DirectivaDirective {
  /** Visual variant of the button */
  variant = input<ButtonVariant>('primary');

  /** Size of the button */
  size = input<ButtonSize>('md');

  /** Whether the button is in a loading state */
  loading = input<boolean>(false);

  /** Whether the button is disabled */
  disabled = input<boolean>(false);

  /**
   * Computed CSS classes based on the current input values.
   * Automatically recalculates when any input signal changes.
   */
  hostClasses = computed(() => {
    const classes = [
      'app-btn',
      `app-btn--${this.variant()}`,
      `app-btn--${this.size()}`,
    ];
    if (this.loading()) classes.push('app-btn--loading');
    if (this.disabled()) classes.push('app-btn--disabled');
    return classes.join(' ');
  });
}
