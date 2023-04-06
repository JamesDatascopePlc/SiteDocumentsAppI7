export type Prefix<TObject, TPrefix extends string> = {
  [Property in keyof TObject as `${TPrefix}.${string & Property}`]: TObject[Property]
}