import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuCopy,
  LuCheck,
  LuSend,
  LuLoaderCircle,
  LuCircleCheck,
  LuTriangleAlert,
  LuArrowUpRight,
} from 'react-icons/lu';
import { profile, socials } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SocialIcon from './ui/SocialIcon';

/*
 * Messages are delivered with Web3Forms (free) when VITE_WEB3FORMS_ACCESS_KEY is set.
 * Without a key, the form opens the visitor's email app with everything pre-filled,
 * so a message is never silently lost.
 */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const empty = { name: '', email: '', subject: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please tell me your name.';
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.message.trim().length < 10) errors.message = 'A little more detail, please (10+ characters).';
  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error
  const [copied, setCopied] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    const subject = values.subject.trim() || `New message from ${values.name.trim()}`;

    if (!ACCESS_KEY) {
      const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          from_name: 'Portfolio contact form',
          subject: `[Portfolio] ${subject}`,
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          botcheck: e.target.botcheck?.checked ?? false,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Request failed');
      setStatus('sent');
      setValues(empty);
    } catch {
      setStatus('error');
    }
  };

  const contactRows = [
    { icon: LuPhone, label: 'Phone', value: profile.phone, href: profile.phoneHref },
    { icon: LuMapPin, label: 'Location', value: profile.location },
  ];

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="aurora bottom-0 left-1/2 -z-10 h-[30rem] w-[40rem] -translate-x-1/2 bg-accent/70" aria-hidden="true" />
      <div className="container-site">
        <SectionHeading
          id="contact-title"
          index="05"
          eyebrow="Contact"
          title="Let’s build something"
          accent="great together."
          description="Have a role, a project or an idea in mind? I’d love to hear about it. Send a message and I’ll get back to you as soon as I can."
        />

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Direct contact */}
          <Reveal className="flex flex-col gap-5">
            <div className="card relative overflow-hidden p-7">
              <div className="bg-dots absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom_left,#000,transparent_60%)]" aria-hidden="true" />
              <div className="relative">
                <p className="eyebrow text-[10px]">Prefer email?</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-4 block break-all text-xl font-semibold tracking-tight text-fg transition-colors hover:text-accent sm:text-2xl"
                >
                  {profile.email}
                </a>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={copyEmail} className="btn-ghost px-5 py-2.5" aria-live="polite">
                    {copied ? <LuCheck className="h-4 w-4 text-success" /> : <LuCopy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy email'}
                  </button>
                  <a href={`mailto:${profile.email}`} className="btn-primary px-5 py-2.5">
                    <LuMail className="h-4 w-4" /> Write to me
                  </a>
                </div>
              </div>
            </div>

            <ul className="card divide-y divide-line/70">
              {contactRows.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-surface-2 text-accent">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-subtle">{label}</span>
                      <span className="block truncate text-[15px] font-medium text-fg">{value}</span>
                    </span>
                    {href && (
                      <LuArrowUpRight className="h-4 w-4 text-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                    )}
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="group flex items-center gap-4 p-5 transition-colors hover:bg-surface-2/40">
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-5">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="grid grid-cols-2 gap-5">
              {socials
                .filter((s) => s.label !== 'Email')
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card group flex flex-col gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                  >
                    <span className="flex items-center justify-between">
                      <SocialIcon label={s.label} className="h-6 w-6 text-fg" />
                      <LuArrowUpRight className="h-4 w-4 text-subtle transition group-hover:text-fg" />
                    </span>
                    <span>
                      <span className="block font-semibold text-fg">{s.label}</span>
                      <span className="block truncate text-xs text-muted">{s.handle}</span>
                    </span>
                  </a>
                ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="card relative overflow-hidden p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {status === 'sent' || status === 'mailto' ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
                    <LuCircleCheck className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold text-fg">
                    {status === 'sent' ? 'Message sent — thank you!' : 'Almost there!'}
                  </h3>
                  <p className="mt-3 max-w-sm text-muted">
                    {status === 'sent'
                      ? 'Your message is in my inbox. I’ll get back to you as soon as possible.'
                      : 'Your email app should have opened with the message ready — just press send. If it didn’t, email me directly at '}
                    {status === 'mailto' && (
                      <a className="font-medium text-accent underline-offset-4 hover:underline" href={`mailto:${profile.email}`}>
                        {profile.email}
                      </a>
                    )}
                  </p>
                  <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-8">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-fg">Send a message</h3>
                    <p className="mt-1 text-sm text-muted">All fields except subject are required.</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Your name" error={errors.name}>
                      <input
                        id="name"
                        name="name"
                        autoComplete="name"
                        value={values.name}
                        onChange={onChange}
                        placeholder="Jane Doe"
                        className="input"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                    </Field>
                    <Field id="email" label="Email address" error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={onChange}
                        placeholder="jane@company.com"
                        className="input"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                    </Field>
                  </div>

                  <Field id="subject" label="Subject">
                    <input
                      id="subject"
                      name="subject"
                      value={values.subject}
                      onChange={onChange}
                      placeholder="Job opportunity, project, collaboration…"
                      className="input"
                    />
                  </Field>

                  <Field id="message" label="Message" error={errors.message}>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={values.message}
                      onChange={onChange}
                      placeholder="Tell me a bit about what you have in mind…"
                      className="input resize-none"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                  </Field>

                  {/* Honeypot for bots — hidden from people and assistive tech */}
                  <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                  {status === 'error' && (
                    <p className="flex items-start gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500" role="alert">
                      <LuTriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                      Something went wrong sending your message. Please try again or email me directly.
                    </p>
                  )}

                  <button type="submit" disabled={status === 'sending'} className="btn-primary w-full py-3.5 sm:w-auto sm:px-8">
                    {status === 'sending' ? (
                      <>
                        <LuLoaderCircle className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <LuSend className="h-4 w-4" /> Send message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
