import {
  FileUploadBuilder,
  LabelBuilder,
  ModalBuilder,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
  type Attachment,
  type ModalSubmitInteraction,
} from "discord.js";
import { IDS } from "../../src/lib/discord-messages.ts";

/**
 * The /brief modal. Five labelled fields is Discord's ceiling, so the deadline
 * and style notes share the free-text field.
 */

export const SCREEN_OPTIONS = [
  { value: "hud", label: "HUD", description: "Currency, side buttons, notifications" },
  { value: "shop", label: "Shop", description: "Items, gamepasses, Robux packs" },
  { value: "inventory", label: "Inventory", description: "Items, pets, equipment" },
  { value: "upgrades", label: "Upgrades", description: "Stats, rebirths, progression" },
  { value: "rewards", label: "Daily rewards", description: "Login streaks, spins, gifts" },
  { value: "quests", label: "Quests & battle pass" },
  { value: "settings", label: "Settings" },
  { value: "loading", label: "Loading & title screen" },
  { value: "full", label: "Full UI set", description: "Every screen, built as one system" },
  { value: "review", label: "UI review", description: "I play your live game and write up fixes" },
  { value: "other", label: "Something else", description: "Tell me in the details" },
];

export const BUDGET_OPTIONS = [
  { value: "under-100", label: "Under $100" },
  { value: "100-250", label: "$100 – $250" },
  { value: "250-500", label: "$250 – $500" },
  { value: "500-1000", label: "$500 – $1,000" },
  { value: "1000-plus", label: "$1,000+" },
  { value: "robux", label: "Paying in Robux" },
  { value: "unsure", label: "Not sure yet", description: "Quote me and we'll go from there" },
];

const FIELD = {
  game: "game",
  screens: "screens",
  budget: "budget",
  details: "details",
  references: "references",
} as const;

export function buildBriefModal(prefill: { game?: string } = {}) {
  const game = new TextInputBuilder()
    .setCustomId(FIELD.game)
    .setStyle(TextInputStyle.Short)
    .setMinLength(2)
    .setMaxLength(200)
    .setPlaceholder("roblox.com/games/… or your working title");
  if (prefill.game) game.setValue(prefill.game.slice(0, 200));

  return new ModalBuilder()
    .setCustomId(IDS.briefModal)
    .setTitle("Commission brief")
    .addLabelComponents(
      new LabelBuilder()
        .setLabel("Game")
        .setDescription("A Roblox link lets me pull the game up. A working title is fine too.")
        .setTextInputComponent(game),
      new LabelBuilder()
        .setLabel("Screens")
        .setDescription("Pick everything you need designed or reworked")
        .setStringSelectMenuComponent(
          new StringSelectMenuBuilder()
            .setCustomId(FIELD.screens)
            .setPlaceholder("HUD, shop, inventory…")
            .setMinValues(1)
            .setMaxValues(SCREEN_OPTIONS.length)
            .addOptions(SCREEN_OPTIONS),
        ),
      new LabelBuilder()
        .setLabel("Budget")
        .setDescription("A rough range is fine, it helps me scope the work")
        .setStringSelectMenuComponent(
          new StringSelectMenuBuilder()
            .setCustomId(FIELD.budget)
            .setPlaceholder("Pick a range")
            .addOptions(BUDGET_OPTIONS),
        ),
      new LabelBuilder()
        .setLabel("Details")
        .setDescription("Deadline, style, what isn't working now")
        .setTextInputComponent(
          new TextInputBuilder()
            .setCustomId(FIELD.details)
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false)
            .setMaxLength(2000)
            .setPlaceholder("Need it in two weeks. Cartoony, chunky buttons. The shop confuses new players…"),
        ),
      new LabelBuilder()
        .setLabel("References")
        .setDescription("Screenshots, mockups or games you like. Up to 5 files.")
        .setFileUploadComponent(
          new FileUploadBuilder().setCustomId(FIELD.references).setRequired(false).setMinValues(0).setMaxValues(5),
        ),
    );
}

export interface BriefSubmission {
  game: string;
  screens: string[];
  budget: string;
  details?: string;
  files: Attachment[];
}

function labelsFor(options: ReadonlyArray<{ value: string; label: string }>, values: readonly string[]) {
  return values.map((value) => options.find((o) => o.value === value)?.label ?? value);
}

export function readBriefSubmission(interaction: ModalSubmitInteraction): BriefSubmission {
  const { fields } = interaction;
  const uploads = fields.getUploadedFiles(FIELD.references);

  return {
    game: fields.getTextInputValue(FIELD.game).trim(),
    screens: labelsFor(SCREEN_OPTIONS, fields.getStringSelectValues(FIELD.screens)),
    budget: labelsFor(BUDGET_OPTIONS, fields.getStringSelectValues(FIELD.budget))[0] ?? "Not given",
    details: fields.getTextInputValue(FIELD.details).trim() || undefined,
    files: uploads ? [...uploads.values()] : [],
  };
}
