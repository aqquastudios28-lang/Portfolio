"use client";

import { useState } from "react";

/**
 * No backend, by design. The form composes a mailto: link and hands off to the
 * visitor's own mail client, so there is no server to run, no third-party form
 * service holding messages, and nothing that can silently drop a lead.
 *
 * If you later want in-page submission, swap the handler for a POST to a
 * route handler and keep the markup.
 */
export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");

  const subject = experience
    ? `Project enquiry — ${experience}`
    : "Project enquiry";

  const body = [
    name ? `Hi, I'm ${name}.` : "Hi,",
    "",
    experience ? `Experience: ${experience}` : "",
    "",
    message,
  ]
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n");

  const href = `mailto:${email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  const field =
    "w-full border border-rule bg-ink-2 px-3.5 py-3 text-sm text-bone placeholder:text-bone-faint transition-colors hover:border-rule-strong focus:border-accent focus:outline-none";

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = href;
      }}
    >
      <div>
        <label htmlFor="cf-name" className="t-label mb-2 block">
          Your name
        </label>
        <input
          id="cf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex"
          autoComplete="name"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="cf-exp" className="t-label mb-2 block">
          Experience or studio
        </label>
        <input
          id="cf-exp"
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Name of the game, or a link to it"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="cf-msg" className="t-label mb-2 block">
          What do you need?
        </label>
        <textarea
          id="cf-msg"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="The problem you're hitting, the scope you have in mind, and roughly when you need it."
          className={`${field} resize-y`}
        />
      </div>

      {/* The one filled control on the site. Square, no icon: the label
          already names the action. */}
      <button
        type="submit"
        className="w-full border border-bone bg-bone px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:bg-accent sm:w-auto"
      >
        Open in your email app
      </button>

      <p className="text-xs leading-relaxed text-bone-faint">
        This composes a message in your own mail client — nothing is sent
        through this site.
      </p>
    </form>
  );
}
