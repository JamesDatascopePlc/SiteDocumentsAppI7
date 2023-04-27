import { createStore, propsFactory } from "@ngneat/elf";

export function booleanAdapter(name: string, initialValue: boolean) {
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

  return {
    value: store.pipe(selectBoolean()),
    toggle: () => store.update(setBoolean(state => !state.boolean)),
    set: (val: boolean) => store.update(setBoolean(val))
  };
}