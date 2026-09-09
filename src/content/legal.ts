/* ============================================================================
   LEGAL COPY — edit this file, not the pages.

   These pages describe what the site actually does, checked against the code:
   there is no analytics, no tracking and no cookie of any kind, and the only
   personal data that moves anywhere is what someone types into the contact
   form. The IP address /api/contact sees is used only to rate limit the form,
   is held in memory for ten minutes, and is never stored or emailed.

   If you add analytics, a cookie banner, embeds, or any third-party script,
   these pages stop being accurate and must be updated.

   NOT LEGAL ADVICE. Have someone qualified read these if the site starts
   handling anything sensitive or you begin trading through it.
   ============================================================================ */

export const legal = {
  /** Shown as the "last reviewed" date on every legal page. Update on edits. */
  updated: "9 September 2026",
} as const;

export type LegalSection = {
  heading: string;
  body: string[];
  /** Optional definition rows, rendered as a spec table. */
  rows?: { term: string; detail: string }[];
};

/* ------------------------------------------------------------------------- */

export const privacy: { intro: string; sections: LegalSection[] } = {
  intro:
    "This site is a portfolio. It does not run analytics, does not set cookies, and does not track you between visits. The only personal data it handles is what you type into the contact form, and the network information your browser sends in order to load the page at all.",
  sections: [
    {
      heading: "What is collected",
      body: [
        "Nothing at all unless you submit the contact form. There is no account system, no newsletter, no advertising and no profiling.",
      ],
      rows: [
        {
          term: "Contact form",
          detail:
            "The name or handle you enter, the game name or link, the scope you pick, and your message. If you put an email address in the name field it is used as the reply-to address.",
        },
        {
          term: "IP address",
          detail:
            "Seen when you submit the form. It is held in server memory for up to ten minutes purely to limit how many submissions one address can send, then discarded. It is not written to a database, not included in the notification email, and not used for anything else.",
        },
        {
          term: "Server logs",
          detail:
            "The hosting provider keeps standard request logs (IP, timestamp, page requested, user agent) under its own retention policy. This is normal web hosting and is not read or analysed by the site owner.",
        },
      ],
    },
    {
      heading: "Why",
      body: [
        "Form contents are used to answer your enquiry and, if we work together, to quote and run the job. Nothing more.",
        "The IP address is used for one thing: stopping the form being flooded by bots. It is not logged, stored, or used to identify or profile visitors.",
        "The lawful basis, where the UK or EU GDPR applies, is legitimate interest: answering an enquiry you chose to send, and keeping the form from being flooded with spam.",
      ],
    },
    {
      heading: "Who else sees it",
      body: [
        "The site does not sell, rent or share personal data for advertising. It never has. Data reaches these providers only because they carry the message:",
      ],
      rows: [
        {
          term: "Vercel",
          detail:
            "Hosting and delivery. Processes requests and keeps standard server logs.",
        },
        {
          term: "Resend",
          detail:
            "Delivers the notification email containing your submission to the site owner's inbox.",
        },
        {
          term: "Discord",
          detail:
            "If a webhook is configured, a copy of the submission is posted to a private channel the site owner controls. It is not public.",
        },
      ],
    },
    {
      heading: "How long it is kept",
      body: [
        "Rate-limiting records live in memory only, are discarded within ten minutes, and are never written to disk.",
        "Enquiry emails sit in the site owner's mailbox and are kept while the enquiry is live, and afterwards only as long as needed for records of work done. Ask and they will be deleted.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "If you are in the UK or EU you can ask for a copy of what is held about you, ask for it to be corrected or deleted, object to it being processed, or complain to your national data protection authority.",
        "In practice this is a mailbox, not a database. Email the address on the contact page and it will be handled.",
      ],
    },
    {
      heading: "Children",
      body: [
        "This site sells design services to game developers. It is not aimed at children and is not a place to submit personal information if you are under 13. If a child has sent something through the form, email and it will be deleted.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "If the site ever starts using analytics, embeds or cookies, this page will be updated before that goes live and the date at the top will change.",
      ],
    },
  ],
};

/* ------------------------------------------------------------------------- */

export const cookies: { intro: string; sections: LegalSection[] } = {
  intro:
    "This site sets no cookies. There is no consent banner because there is nothing to consent to.",
  sections: [
    {
      heading: "The short version",
      body: [
        "No analytics, no tag manager, no advertising or social pixels, no session cookies, no local storage, no fingerprinting. Fonts are served from this domain rather than fetched from Google, so loading a page does not tell any third party you were here.",
        "If your browser shows a cookie for this domain, it will have been set by the hosting platform for security or load balancing, not by anything on this site that identifies you.",
      ],
    },
    {
      heading: "If that changes",
      body: [
        "Adding analytics or an embedded video would mean cookies or similar storage. If that happens, this page is updated first and a proper consent prompt is added where the law requires one. Until then there is genuinely nothing running.",
      ],
    },
  ],
};

/* ------------------------------------------------------------------------- */

export const terms: { intro: string; sections: LegalSection[] } = {
  intro:
    "Plain terms for using this website. They are not the contract for a commission — that gets agreed separately in writing before any work starts.",
  sections: [
    {
      heading: "Using the site",
      body: [
        "You are welcome to browse, read and share links to anything here. Do not attempt to break, overload or gain unauthorised access to the site, and do not use the contact form to send spam or anything unlawful.",
      ],
    },
    {
      heading: "The work shown",
      body: [
        "The interface designs, screenshots, layouts and written case studies on this site are the site owner's own work and are published here as a portfolio. Please do not republish them as your own or use them as marketing for someone else's product.",
        "Reposting a screenshot with credit and a link back is fine and appreciated.",
        "Game names, logos and trademarks belonging to clients or to Roblox Corporation remain theirs. Nothing here implies endorsement by, or affiliation with, Roblox Corporation.",
      ],
    },
    {
      heading: "Accuracy",
      body: [
        "The case studies describe work as it was designed and built at the time. Live games change after handover, so what is running today may differ from what is documented here.",
        "Nothing on this site is a guarantee of a particular result for your game.",
      ],
    },
    {
      heading: "Enquiries",
      body: [
        "Sending the contact form is not a booking and does not create an agreement. Scope, price and timeline are agreed in writing first.",
        "Do not send confidential material through the form. If something is sensitive, say so and it can be moved somewhere appropriate.",
      ],
    },
    {
      heading: "Liability",
      body: [
        "The site is provided as-is. To the extent the law allows, the site owner is not liable for loss arising from use of the site or reliance on anything published here. Nothing here limits liability for death, personal injury or fraud, which cannot be limited.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the law of the site owner's country of residence, and its courts have jurisdiction over any dispute.",
      ],
    },
  ],
};
