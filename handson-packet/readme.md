This slide kicks off **Step 1 — Generate the Component** for building a `DeleteConfirmModal` in a **Next.js + Tailwind + `shadcn/ui**` app.

### Breaking Down the Prompt Requirements

* **Trigger & actions:** Opens from a `"Delete"` trigger button and provides clear `"Cancel"` and `"Delete"` actions so destructive actions aren't accidental.


* **WAI-ARIA Dialog pattern:** Uses proper dialog semantics and labeling (such as an accessible dialog title and description, or `shadcn/ui`'s dialog/alert-dialog primitives) so screen readers announce the modal context clearly.


* **Keyboard operability:** Supports keyboard navigation (`Tab` between controls, `Enter`/`Space` to activate buttons, and `Escape` to dismiss/cancel) without relying on mouse clicks.


* **Focus management (trap & restore):** Keeps `Tab` focus trapped inside the modal while it is open, and returns focus back to the originating `"Delete"` trigger button when closed or cancelled.



### Implementation Tip for `shadcn/ui`

* Because `shadcn/ui` components sit as editable source files in your repository and wrap accessible primitives, using a `shadcn/ui` `Dialog` or `AlertDialog` gives you built-in focus trapping, `Escape` handling, and ARIA dialog wiring out of the box—which you can then inspect directly in code and verify with `axe-core` plus a quick manual keyboard pass.

Would you like a clean React/TypeScript implementation of `DeleteConfirmModal` along with a test to audit it?


