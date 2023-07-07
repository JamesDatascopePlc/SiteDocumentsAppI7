import { Meta } from "@storybook/angular";
import { InputType } from "@storybook/types";

// https://storybook.js.org/docs/react/essentials/controls#annotation
export type StorybookArgTypes<TArg> = {
  [name in keyof Partial<TArg>]: InputType 
    & { action?: string }
    & { control?: "boolean" }
    | { control?: { type: "number" | "range", min?: number, max?: number, step?: number } }
    | { control?: "object" }
    | { control?: { type: "file", accept?: string } }
    | { control?: "radio" | "inline-radio" | "check" | "select" | "multi-select", options: string[] }
    | { control?: "text" }
    | { control?: { type: "color", presetColors: string[] } }
    | { control?: "date" }
}

export type StorybookMeta<TArgTypes> = Meta & { argTypes: StorybookArgTypes<TArgTypes> }