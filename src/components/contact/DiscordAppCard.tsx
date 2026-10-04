const DEFAULT_INSTALL_URL =
  "https://discord.com/oauth2/authorize?client_id=1549424708292837438&integration_type=1&scope=identify+applications.commands";

const DM_URL = "https://discord.com/users/1549424708292837438";

/* What actually happens, in order. No feature grid, no status lights. */
const STEPS = [
  "Add the bot to your Discord account. It installs on your account, so it needs no server permissions.",
  "Type /brief in any chat. A short form asks for the game link, screens, budget and references.",
  "A copy of the brief lands in your DMs. I reply there myself; my replies carry a green bar.",
];

interface DiscordAppCardProps {
  directInstallUrl?: string;
  initialConnectedUser?: string;
}

export function DiscordAppCard({
  directInstallUrl,
  initialConnectedUser,
}: DiscordAppCardProps) {
  const connectedUser = initialConnectedUser;
  const authUrl = directInstallUrl || DEFAULT_INSTALL_URL;

  return (
    <div className="rounded-plate border border-rule bg-surface p-6 sm:p-8">
      <ol className="max-w-3xl">
        {STEPS.map((step, i) => (
          <li
            key={step}
            className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-rule-soft py-4 first:pt-0 last:border-0 last:pb-0"
          >
            <span className="idx">{String(i + 1).padStart(2, "0")}</span>
            <p className="t-body">{step}</p>
          </li>
        ))}
      </ol>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">
        <a
          href={authUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="btn"
        >
          <svg aria-hidden className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z" />
          </svg>
          {connectedUser ? "Re-authorize the bot" : "Add bot to Discord"}
          <span aria-hidden>&rarr;</span>
        </a>

        <a
          href={DM_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-ghost"
        >
          Message @Cerbi
        </a>

        {connectedUser && <span className="annot">Linked as @{connectedUser}</span>}
      </div>
    </div>
  );
}
