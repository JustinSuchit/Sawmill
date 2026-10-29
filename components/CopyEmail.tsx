"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState("");
  const [manualCopy, setManualCopy] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setManualCopy(false);
      setStatus("Email copied.");
    } catch {
      setManualCopy(true);
      setStatus("Select the address below and copy it.");
    }
  }

  return (
    <span className="copy-email">
      <button type="button" onClick={copy} aria-label={`Copy email address ${email}`}>Copy email</button>
      <span role="status">{status}</span>
      {manualCopy && <input aria-label="Email address to copy" readOnly value={email} onFocus={(event) => event.currentTarget.select()} />}
    </span>
  );
}
