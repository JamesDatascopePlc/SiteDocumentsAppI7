import { ToStringValuesPipe } from './to-string-values.pipe';

describe('ToStringValuesPipe', () => {
  it('create an instance', () => {
    const pipe = new ToStringValuesPipe();
    expect(pipe).toBeTruthy();
  });
});
