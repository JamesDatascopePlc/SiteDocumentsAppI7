export enum PenColour {
  Black = "#000000",
  White = "#FFFFFF",
  Red = "#FF0000",
  Blue = "#0000FF",
  Green = "#228C22",
  Yellow = "#FFFF00"
}

export type PenColourOption = {
  label: keyof typeof PenColour,
  value: PenColour
}

export function usePenColours(): PenColourOption[] {
  return Object.keys(PenColour).map(label => 
    ({
      label: label as keyof typeof PenColour,
      value: PenColour[label as keyof typeof PenColour]
    })
  );
}
