"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EmailField({ error: externalError }: { error?: string }) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const invalid = !/^\S+@\S+\.\S+$/.test(value);
  const error = externalError ?? (submitted && invalid ? "Invalid email" : undefined);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex w-80 flex-col gap-2"
    >
      <Input
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit">Submit</Button>
    </form>
  );
}