# Lab: AI-Generated Components, Audited and Fixed

IIT Kharagpur × upGrad · Lecture 3. 
By Rajdeep Ghosh, PhD (IIT Kharagpur)


You will run the same loop twice: **Generate → Audit → Triage → Fix → Re-test**.
Part 1 is a delete modal. Part 2 is an email field.

## Before class (needs internet, 1 minute)

You need **Node 20.9 or newer** (`node -v`).

```bash
cd a11y-lab
npm ci
npm run dev      # open http://localhost:3000 — you should see "Project 42" and a Newsletter email field
```
Stop the dev server with `Ctrl+C` when you're done checking. Problems? Send your TA the full error text and your `node -v`.

---

# Part 1 — The delete modal

**Step 1 — Generate.** An AI agent wrote the modal. It is already in `src/components/delete-confirm-modal.tsx`. Open the page and click **Delete project**. It looks fine. (You may use any AI of your choice for your own experiments; use this shared file for the steps below.)

**Step 2 — Run axe.**
```bash
npm test -- delete-confirm
```
It fails with 2 violations: `button-name` (critical) and `aria-dialog-name` (serious).

**Step 3 — Triage.** Unplug your mouse and use only the keyboard on the page:
- `Tab` to **Delete project**, press `Enter`: does focus move into the modal?
- Keep pressing `Tab`: do you ever reach **Cancel**? Does focus escape to the page behind?
- Press `Escape`: does it close?

axe reported 2 problems. You just found about 8 more (Cancel is a `<div onClick>`, no focus trap, no Escape, focus not restored, the title is a `<div>`, low contrast…). **A `<div onClick>` gives no axe violation at all.**

**Step 4 — Fix.** The shadcn Dialog is already in `src/components/ui/dialog.tsx`. Replace the whole of `src/components/delete-confirm-modal.tsx` with:

```tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({ open, onCancel, onConfirm }: Props) {
  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) onCancel(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete this project?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```
> Do **not** add `autoFocus` to the Delete button. It focuses the destructive action and stops focus returning to the page button after Escape.

**Step 5 — Re-test and check by hand.**
```bash
npm test -- delete-confirm     # now passes
```
Then, mouse unplugged, on the page:

| Do this | You should see |
|---|---|
| `Tab` | focus ring on **Delete project** |
| `Enter` | modal opens, focus on **Cancel** |
| `Tab` repeatedly | Cancel → Delete → Close (✕) → Cancel. It never escapes. |
| `Shift+Tab` | goes backwards, still trapped |
| `Escape` | closes, ring back on **Delete project** |
| Zoom to 200 % | nothing clipped |

---

# Part 2 — The email field

Same loop, new component. The AI draft is already in `src/components/email-field.tsx`, with its test next to it.

**Step 1 — Generate.** Open the page and look at the **Newsletter** field. It looks like a normal email box. Submit it empty and you see a red "Invalid email".

**Step 2 — Run axe.**
```bash
npm test -- email-field
```
Both tests fail with the same violation: `label` (critical), "Form elements must have labels".

**Step 3 — Triage.** The input has no label. A screen reader says only "edit text", with no hint what to type. Also check by hand:
- Does the red error text say what is wrong and how to fix it? ("Invalid email" is vague.)
- Is the error announced when it appears, or only visible?
- Is the red text readable? (Jest can't check colour contrast. axe DevTools can.)

> A placeholder is not a label. It disappears as soon as you type. If you add one, axe may go green while the field is still weak.

**Step 4 — Fix.** Replace the whole of `src/components/email-field.tsx` with:

```tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function EmailField({ error: externalError }: { error?: string }) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const invalid = !/^\S+@\S+\.\S+$/.test(value);
  const error =
    externalError ?? (submitted && invalid ? "Enter a valid email address." : undefined);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex w-80 flex-col gap-2"
    >
      {/* A real <label>: it stays visible and is read by screen readers */}
      <Label htmlFor="email">Email address</Label>
      <Input
        id="email"
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? "email-error" : undefined}
      />
      {error && (
        // role="alert": announced the moment it appears. Words, not just colour. red-700 passes 4.5:1
        <p id="email-error" role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

**Step 5 — Re-test and check by hand.**
```bash
npm test          # everything passes now
```
Then, mouse unplugged, on the page:

| Do this | You should see |
|---|---|
| `Tab` to the field | focus ring, and a screen reader says "Email address" |
| Submit empty (`Enter`) | "Enter a valid email address." appears in dark red and is announced |
| Type a valid email, submit | error disappears |

---

## Takeaways
- axe finds the missing **name**, never the missing **behaviour**. A clean scan is a floor, not a ceiling.
- Reach for the component you already own (shadcn Dialog, Label) instead of hand-building from `<div>`s.
- **Never trust, always verify.** Watch a test fail before you trust it passing.

## Extras (optional, any time)
- Jest can't check colour contrast (no layout engine). Install the free **axe DevTools** browser extension and scan the page.
