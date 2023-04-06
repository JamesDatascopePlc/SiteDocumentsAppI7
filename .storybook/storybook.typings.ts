import { InputType } from "@storybook/types";

export type StorybookArgTypes<TArg> = {
  [name in keyof Partial<TArg>]: InputType 
    & { control?: "boolean" }
    | { control?: { type: "number" | "range", min?: number, max?: number, step?: number } }
    | { control?: "object" }
    | { control?: { type: "file", accept?: string } }
    | { control?: "radio" | "inline-radio" | "check" | "select" | "multi-select", options: string[] }
    | { control?: "text" }
    | { control?: { type: "color", presetColors: string[] } }
    | { control?: "date" }
}