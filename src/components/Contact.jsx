import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LuCopy, LuCheck, LuArrowUpRight, LuArrowRight, LuLoaderCircle, LuCircleCheck, LuTriangleAlert } from 'react-icons/lu';
import { profile, socials } from '../data/portfolio';
import { EASE } from '../lib/motion';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { RollText } from './ui/TextMotion';
import Magnetic from './ui/Magnetic';

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
  if (!values.name.trim()) errors.name = 'Please enter your name';
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address';
  if (values.message.trim().length < 10) errors.message = 'Please write at least 10 characters';
  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="label block">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/* One ruled line of contact detail, with an arrow that turns on hover */
function ContactRow({ label, value, href, external }) {
  return (
    <li>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="group flex items-center justify-between gap-4 border-t border-line py-5"
      >
        <span className="label w-20 shrink-0">{label}</span>
        <span className="min-w-0 flex-1 truncate text-[15px] text-fg transition-transform duration-500 ease-out group-hover:translate-x-1">
          {value}
        </span>
        <LuArrowUpRight
          className="h-4 w-4 shrink-0 text-subtle transition-[transform,color] duration-300 group-hover:rotate-45 group-hover:text-accent"
          aria-hidden="true"
        />
      </a>
    </li>
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

  const github = socials.find((s) => s.label === 'GitHub');
  const linkedin = socials.find((s) => s.label === 'LinkedIn');

  return (
    <section id="contact" className="section bg-deep/50" aria-labelledby="contact-title">
      <div className="container-site">
        <SectionHeading
          id="contact-title"
          index="05"
          label="Contact"
          title="Have a role or a project in mind?"
          description="Send a message and I’ll get back to you as soon as I can"
        />

        <div className="grid gap-20 lg:grid-cols-12 lg:gap-8">
          {/* Direct contact */}
          <Reveal className="lg:col-span-5">
            <p className="label">Email</p>
            <a
              href={`mailto:${profile.email}`}
              className="link display mt-4 inline text-[1.5rem] leading-snug [overflow-wrap:anywhere] sm:text-[2rem] lg:text-[1.75rem] xl:text-[2.25rem]"
            >
              {profile.email}
            </a>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a href={`mailto:${profile.email}`} className="btn-primary group">
                  <RollText>Write to me</RollText>
                  <LuArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </Magnetic>
              <button type="button" onClick={copyEmail} className="btn-ghost" aria-live="polite">
                {copied ? (
                  <LuCheck className="h-4 w-4 text-success" aria-hidden="true" />
                ) : (
                  <LuCopy className="h-4 w-4" aria-hidden="true" />
                )}
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>

            <ul className="mt-14 border-b border-line">
              <ContactRow label="Phone" value={profile.phone} href={profile.phoneHref} />
              <ContactRow label="LinkedIn" value={linkedin.handle} href={linkedin.href} external />
              <ContactRow label="GitHub" value={github.handle} href={github.href} external />
            </ul>
            <p className="label mt-5">{profile.location}</p>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="relative lg:col-span-6 lg:col-start-7">
            <AnimatePresence mode="wait">
              {status === 'sent' || status === 'mailto' ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex min-h-[460px] flex-col items-start justify-center"
                  role="status"
                >
                  <LuCircleCheck className="h-8 w-8 text-success" aria-hidden="true" />
                  <h3 className="display mt-6 text-[2.25rem] leading-tight">
                    {status === 'sent' ? 'Message sent' : 'Your email app should be open'}
                  </h3>
                  <p className="mt-4 max-w-md text-muted">
                    {status === 'sent'
                      ? 'Thank you. It’s in my inbox and I’ll get back to you as soon as I can.'
                      : 'The message is ready there, so just press send. If nothing opened, email me directly at '}
                    {status === 'mailto' && (
                      <a className="link" href={`mailto:${profile.email}`}>
                        {profile.email}
                      </a>
                    )}
                  </p>
                  <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-10">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  onSubmit={onSubmit}
                  noValidate
                  className="space-y-10"
                >
                  <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
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

                  <Field id="subject" label="Subject, optional">
                    <input
                      id="subject"
                      name="subject"
                      value={values.subject}
                      onChange={onChange}
                      placeholder="Job opportunity, project or collaboration"
                      className="input"
                    />
                  </Field>

                  <Field id="message" label="Message" error={errors.message}>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={values.message}
                      onChange={onChange}
                      placeholder="What do you have in mind?"
                      className="input h-auto resize-none py-3 leading-relaxed"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                  </Field>

                  {/* Honeypot for bots — hidden from people and assistive tech */}
                  <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                  {status === 'error' && (
                    <p className="flex items-start gap-2 rounded-[10px] border border-danger/30 bg-danger/10 p-3 text-sm text-danger" role="alert">
                      <LuTriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      Your message could not be sent. Please try again, or email me directly.
                    </p>
                  )}

                  <button type="submit" disabled={status === 'sending'} className="btn-primary group w-full sm:w-auto">
                    {status === 'sending' ? (
                      <>
                        <LuLoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      <>
                        <RollText>Send message</RollText>
                        <LuArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
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
