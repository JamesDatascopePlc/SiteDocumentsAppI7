export interface PenWeight { min: number, max: number }

export class PenWeights {
  static readonly ExtraFine: PenWeight = { min: .5, max: 1.5 };
  static readonly Fine: PenWeight = { min: 1.5, max: 2.5 };
  static readonly Regular: PenWeight = { min: 2.5, max: 3.5 };
  static readonly Bold: PenWeight = { min: 3.5, max: 4.5 };
  static readonly Bolder: PenWeight = { min: 4.5, max: 5.5 };
  static readonly ExtraBold: PenWeight = { min: 5.5, max: 6.5 };
}

export type PenWeightOption = {
  label: string,
  value: PenWeight
}

export function usePenWeights(): PenWeightOption[] {
  return Object.keys(PenWeights).map(label => 
    ({
      label: label.replace(/([A-Z])/g, ' $1').trim(),
      value: PenWeights[label as keyof typeof PenWeights] as PenWeight
    })
  );
}