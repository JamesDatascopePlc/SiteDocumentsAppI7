export interface AdapterConfig<TValue, TState, TProps> {
  name: string,
  initialValue: TValue,
  props?: (state: TState) => TProps
}