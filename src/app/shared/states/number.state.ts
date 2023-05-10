import { createStore, propsFactory } from "@ngneat/elf";
import { Observable, map, shareReplay } from "rxjs";
import { AdapterConfig } from "./adapter-config.model";

export interface NumberState {
  value$: Observable<number>,
  increment: () => void,
  decrement: () => void,
  is$: (predicate: (value: number) => boolean) => Observable<boolean>,
  set: (value: number) => void
}

export function numberState<TProps = {}>({ name, initialValue, props }: AdapterConfig<number, NumberState, TProps>): TProps & NumberState {
  const propsFn = props != null 
    ? props
    : () => ({}); 

  const {
    withNumber,
    selectNumber,
    setNumber
  } = propsFactory("number", {
    initialValue
  });

  const store = createStore(
    { name },
    withNumber()
  );

  const state: NumberState = {
    value$: store.pipe(selectNumber(), shareReplay()),
    increment: () => store.update(setNumber(state => state.number + 1)),
    decrement: () => store.update(setNumber(state => state.number - 1)),
    is$: (predicate: (value: number) => boolean) => store.pipe(
      selectNumber(),
      map(predicate)
    ),
    set: (value: number) => store.update(setNumber(value))
  }
  
  return {
    ...propsFn(state),
    ...state
  } as TProps & NumberState
}