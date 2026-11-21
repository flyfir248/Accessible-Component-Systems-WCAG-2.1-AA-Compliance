import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// jsdom shim (you never need to touch this).
// Base UI feature-detects `focus({ preventScroll })` by reading that option; jsdom ignores
// focus() options, so Base UI thinks it is unsupported and skips "return focus on close".
// Real browsers support it, so we make jsdom behave like them. Verified against Chrome.
const nativeFocus = HTMLElement.prototype.focus;
HTMLElement.prototype.focus = function (options?: FocusOptions) {
  void options?.preventScroll;
  return nativeFocus.call(this, options);
};
