import { createStore, propsFactory } from "@ngneat/elf";
import { Observable } from "rxjs";
import { AdapterConfig } from "./adapter-config.model";

export interface BooleanState {
  value$: Observable<boolean>,
  toggle: () => void,
  set: (value: boolean) => void
}

export function booleanState<TProps = {}>({ name, initialValue, props }: AdapterConfig<boolean, BooleanState, TProps>): TProps & BooleanState {
  const propsFn = props != null 
    ? props
    : () => ({});

    const { 
      withBoolean,
      selectBoolean,
      setBoolean
    } = propsFactory("boolean", {
      initialValue
    });
  
    const store = createStore(
      { name }, 
      withBoolean()
    );
  
    const state: BooleanState = {
      value$: store.pipe(selectBoolean()),
      toggle: () => store.update(setBoolean(state => !state.boolean)),
      set: (val: boolean) => store.update(setBoolean(val))
    };

    return {
      ...propsFn(state),
      ...state
    } as TProps & BooleanState;
}