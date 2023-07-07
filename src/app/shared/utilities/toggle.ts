export class Toggle<T> {
  value: T;

  constructor(protected value1: T, protected value2: T) {
    this.value = value1;
  }

  toggle(): Toggle<T> {
    this.value = this.value !== this.value1 ? this.value1 : this.value2; 
    return this;
  }
}