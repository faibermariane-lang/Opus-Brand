"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { contactSection, subjects, type SubjectId } from "@/content/site";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { EVENTS } from "@/lib/events";
import { EASE } from "@/lib/motion";
import { whatsappUrl } from "@/lib/whatsapp";

const f = contactSection.form;

const field =
  "peer w-full rounded-2xl border bg-cream-soft px-5 pt-7 pb-3 text-[1rem] text-green-900 transition-[border-color,box-shadow] duration-500 placeholder:text-transparent focus:border-gold focus:shadow-[0_0_0_4px_rgb(213_178_111/0.18)] focus:outline-none";
const floatLabel =
  "pointer-events-none absolute top-2.5 left-5 text-[0.72rem] font-medium tracking-[0.08em] text-green-900/60 uppercase";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", company: "", email: "", whatsapp: "", subject: "gestao", message: "", website: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    const on = (e: Event) => setValue("subject", (e as CustomEvent<SubjectId>).detail, { shouldValidate: true });
    window.addEventListener(EVENTS.subject, on);
    return () => window.removeEventListener(EVENTS.subject, on);
  }, [setValue]);

  const onSubmit = async (data: ContactInput) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const err = (name: keyof ContactInput) =>
    errors[name] ? (
      <p id={`err-${name}`} className="mt-2 flex items-center gap-2 pl-2 text-sm text-wine" role="alert">
        <span aria-hidden="true" className="size-1 rounded-full bg-wine" />
        {contactSection.states.fieldError}
      </p>
    ) : null;

  const a11y = (name: keyof ContactInput) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `err-${name}` : undefined,
  });
  const border = (name: keyof ContactInput) => (errors[name] ? "border-wine/60" : "border-green-900/15");

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="ok"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex min-h-[420px] flex-col items-start justify-center gap-6 rounded-[var(--radius-card)] border border-gold/40 bg-cream-soft p-10"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-gold text-green-900">
              <Icon name="check" className="size-7" />
            </span>
            <p className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight">{contactSection.states.success}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            initial={false}
            exit={{ opacity: 0 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {/* Honeypot (invisível para pessoas) */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
              </label>
            </div>

            <div className="relative">
              <input id="c-name" autoComplete="name" placeholder={f.name} className={`${field} ${border("name")}`} {...register("name")} {...a11y("name")} />
              <label htmlFor="c-name" className={floatLabel}>{f.name}</label>
              {err("name")}
            </div>
            <div className="relative">
              <input id="c-company" autoComplete="organization" placeholder={f.company} className={`${field} ${border("company")}`} {...register("company")} {...a11y("company")} />
              <label htmlFor="c-company" className={floatLabel}>{f.company}</label>
              {err("company")}
            </div>
            <div className="relative">
              <input id="c-email" type="email" autoComplete="email" inputMode="email" placeholder={f.email} className={`${field} ${border("email")}`} {...register("email")} {...a11y("email")} />
              <label htmlFor="c-email" className={floatLabel}>{f.email}</label>
              {err("email")}
            </div>
            <div className="relative">
              <input id="c-whatsapp" type="tel" autoComplete="tel" inputMode="tel" placeholder={f.whatsapp} className={`${field} ${border("whatsapp")}`} {...register("whatsapp")} {...a11y("whatsapp")} />
              <label htmlFor="c-whatsapp" className={floatLabel}>{f.whatsapp}</label>
              {err("whatsapp")}
            </div>
            <div className="relative sm:col-span-2">
              <select id="c-subject" className={`${field} appearance-none pr-12 ${border("subject")}`} {...register("subject")} {...a11y("subject")}>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
              <label htmlFor="c-subject" className={floatLabel}>{f.subject}</label>
              <Icon name="arrowDown" className="pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2 text-olive" />
              {err("subject")}
            </div>
            <div className="relative sm:col-span-2">
              <textarea id="c-message" rows={5} placeholder={f.message} className={`${field} resize-y ${border("message")}`} {...register("message")} {...a11y("message")} />
              <label htmlFor="c-message" className={floatLabel}>{f.message}</label>
              {err("message")}
            </div>

            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] text-green-900/75">
                <input type="checkbox" className="peer sr-only" {...register("consent")} {...a11y("consent")} />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors peer-checked:border-gold peer-checked:bg-gold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100 ${errors.consent ? "border-wine/60" : "border-green-900/30"}`}
                >
                  <svg viewBox="0 0 16 16" className="size-3.5 text-green-900" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                </span>
                <span>
                  {f.consent.before}
                  <a href="/politica-de-privacidade" className="underline decoration-gold underline-offset-4 hover:text-green-900">
                    {f.consent.link}
                  </a>
                  {f.consent.after}
                </span>
              </label>
              {err("consent")}
            </div>

            <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" variant="dark" icon="arrow" magnetic disabled={status === "sending"}>
                {status === "sending" ? f.sending : f.submit}
              </Button>
              {status === "error" ? (
                <p role="alert" className="max-w-sm text-sm text-wine">
                  {contactSection.states.generalError}{" "}
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    WhatsApp
                  </a>
                </p>
              ) : null}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
