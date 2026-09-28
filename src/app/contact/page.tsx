"use client";

import { openWhatsApp, contactFormMessage } from "@/lib/whatsapp";
import { getAllProperties } from "@/lib/properties";
import { useState } from "react";

export default function ContactPage() {
  const properties = getAllProperties();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      next.email = "Valid email is required";
    if (!form.phone.trim()) next.phone = "Phone is required";
    if (!form.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    openWhatsApp(contactFormMessage(form));
    setSuccess(true);
    setForm({
      name: "",
      email: "",
      phone: "",
      property: "",
      message: "",
    });
  };

  return (
    <div>
      <section className="aurora-surface relative overflow-hidden py-20">
        <div
          className="aurora-blob left-10 top-10 h-64 w-64 bg-[var(--aurora-2)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="editorial-label">Contact</p>
          <h1 className="font-display mt-4 text-6xl leading-[0.95] sm:text-7xl">
            LET&apos;S FIND
            <br />
            YOUR NEXT
            <br />
            SPACE.
          </h1>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="space-y-6">
            <div className="clay p-6">
              <p className="editorial-label">Email</p>
              <a
                href="mailto:hello@aureliaestates.com"
                className="mt-2 block text-lg hover:opacity-70"
              >
                hello@aureliaestates.com
              </a>
            </div>
            <div className="clay p-6">
              <p className="editorial-label">Phone</p>
              <a
                href="tel:+2348000000000"
                className="mt-2 block text-lg hover:opacity-70"
              >
                +234 800 000 0000
              </a>
            </div>
            <div className="clay p-6">
              <p className="editorial-label">Location</p>
              <p className="mt-2 text-lg">Lagos, Nigeria</p>
            </div>
          </div>

          <div className="clay p-6 sm:p-8">
            {success ? (
              <div className="clay-inset p-8 text-center">
                <h2 className="font-display text-3xl">Message Ready</h2>
                <p className="mt-3 text-sm text-[var(--fg-muted)]">
                  WhatsApp has opened with your enquiry. Thank you for reaching
                  out to Aurelia Estates.
                </p>
                <button
                  type="button"
                  className="btn btn-primary mt-6"
                  onClick={() => setSuccess(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <h2 className="font-display text-3xl">Send a Message</h2>
                {(
                  [
                    ["name", "Name", "text"],
                    ["email", "Email", "email"],
                    ["phone", "Phone", "tel"],
                  ] as const
                ).map(([key, label, type]) => (
                  <div key={key}>
                    <label htmlFor={`contact-${key}`} className="mb-1.5 block text-sm">
                      {label}
                    </label>
                    <input
                      id={`contact-${key}`}
                      type={type}
                      value={form[key]}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [key]: e.target.value }))
                      }
                      className="clay-inset w-full px-4 py-3 outline-none"
                      aria-invalid={!!errors[key]}
                    />
                    {errors[key] && (
                      <p className="mt-1 text-xs text-red-600">{errors[key]}</p>
                    )}
                  </div>
                ))}
                <div>
                  <label htmlFor="contact-property" className="mb-1.5 block text-sm">
                    Property
                  </label>
                  <select
                    id="contact-property"
                    value={form.property}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, property: e.target.value }))
                    }
                    className="clay-inset w-full px-4 py-3 outline-none"
                  >
                    <option value="">General enquiry</option>
                    {properties.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="clay-inset w-full resize-none px-4 py-3 outline-none"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Send via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
