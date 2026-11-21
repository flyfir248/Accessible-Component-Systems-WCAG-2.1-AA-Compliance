"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({ open, onCancel, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div role="dialog" className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-lg font-semibold">Delete this project?</div>

          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <div
            onClick={onCancel}
            className="cursor-pointer rounded-md px-4 py-2 text-sm text-gray-400"
          >
            Cancel
          </div>

          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
