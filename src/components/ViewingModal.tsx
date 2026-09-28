"use client";

import {
  contactFormMessage,
  openWhatsApp,
  viewingRequestMessage,
} from "@/lib/whatsapp";
import { X } from "@/components/icons";
import { useEffect, useId, useRef, useState } from "react";

interface ViewingModalProps {
  open: boolean;
  onClose: () => void;
  propertyName: string;
}

export function ViewingModal({
  open,
  onClose,
  propertyName,
}: ViewingModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setSuccess(false);
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      next.email = "Valid email is required";
    if (!form.phone.trim()) next.phone = "Phone is required";
    if (!form.date) next.date = "Preferred date is required";
    if (!form.time) next.time = "Preferred time is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    openWhatsApp(
      viewingRequestMessage({
        name: form.name,
        email: form.email,
        phone: form.phone,
        property: propertyName,
        date: form.date,
        time: form.time,
        message: form.message,
      })
    );
    setSuccess(true);
    setForm({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      message: "",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/40 p-0 animate-fade-in sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="clay max-h-[92vh] w-full max-w-lg overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="editorial-label">Request Viewing</p>
            <h2 id={titleId} className="font-display mt-2 text-3xl">
              Schedule a Visit
            </h2>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{propertyName}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="clay-sm grid h-10 w-10 place-items-center rounded-full"
            aria-label="Close viewing request"
          >
            <X size={16} />
          </button>
        </div>

        {success ? (
          <div className="clay-inset p-6 text-center">
            <p className="font-display text-2xl">Request Ready</p>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">
              WhatsApp has opened with your viewing request. We look forward to
              connecting with you.
            </p>
            <button type="button" onClick={onClose} className="btn btn-primary mt-6">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4" noValidate>
            {(
              [
                ["name", "Full Name", "text"],
                ["email", "Email", "email"],
                ["phone", "Phone", "tel"],
                ["date", "Preferred Date", "date"],
                ["time", "Preferred Time", "time"],
              ] as const
            ).map(([key, label, type]) => (
              <div key={key}>
                <label htmlFor={`view-${key}`} className="mb-1.5 block text-sm">
                  {label}
                </label>
                <input
                  id={`view-${key}`}
                  type={type}
                  value={form[key]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [key]: e.target.value }))
                  }
                  className="clay-inset w-full px-4 py-3 outline-none"
                  aria-invalid={!!errors[key]}
                  aria-describedby={errors[key] ? `view-${key}-err` : undefined}
                />
                {errors[key] && (
                  <p id={`view-${key}-err`} className="mt-1 text-xs text-red-600">
                    {errors[key]}
                  </p>
                )}
              </div>
            ))}
            <div>
              <label htmlFor="view-property" className="mb-1.5 block text-sm">
                Property
              </label>
              <input
                id="view-property"
                value={propertyName}
                readOnly
                className="clay-inset w-full px-4 py-3 opacity-80 outline-none"
              />
            </div>
            <div>
              <label htmlFor="view-message" className="mb-1.5 block text-sm">
                Message
              </label>
              <textarea
                id="view-message"
                rows={3}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="clay-inset w-full resize-none px-4 py-3 outline-none"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Send via WhatsApp
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function useContactSubmit() {
  return (data: {
    name: string;
    email: string;
    phone: string;
    property?: string;
    message: string;
  }) => {
    openWhatsApp(contactFormMessage(data));
  };
}
