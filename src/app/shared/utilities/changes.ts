import { clone } from "lodash-es";

export class Changes<T> {
  protected undoValues: T[] = [];
  get undoCount(): number { return this.undoValues.length }

  protected redoValues: T[] = [];
  get redoCount(): number { return this.redoValues.length }

  addUndo(value: T): Changes<T> {
    this.undoValues.push(clone(value));
    this.redoValues = [];

    console.log(this);

    return this;
  }

  undo(currentValue: T): Nullable<T> {
    const lastValue = this.undoValues.pop();
  
    lastValue != null && this.redoValues.push(clone(currentValue));

    console.log(this);

    return clone(lastValue);
  }

  redo(): Nullable<T> {
    const undoValue = this.redoValues.pop();

    undoValue != null && this.undoValues.push(undoValue);

    console.log(this);

    return clone(undoValue);
  }
}