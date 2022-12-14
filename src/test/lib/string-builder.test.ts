import StringBuilder from '../../lib/string-builder';

describe('StringBuilder', () => {
  test('builds string when calling .add once', () => {
    const text = new StringBuilder().add('hello').text();
    expect(text).toBe('hello');
  });

  test('builds string when calling .add multiple times', () => {
    const text = new StringBuilder()
      .add('h')
      .add('e')
      .add('ll')
      .add('o')
      .text();
    expect(text).toBe('hello');
  });

  test('builds string when calling .add and passing number', () => {
    const text = new StringBuilder()
      .add('h')
      .add('e')
      .add('ll')
      .add('o')
      .add(1)
      .text();
    expect(text).toBe('hello1');
  });

  test('builds string when calling .add and passing array of string', () => {
    const text = new StringBuilder().add(['h', 'e', 'l', 'l', 'o']).text();
    expect(text).toBe('h e l l o');
  });

  test('builds string when calling .addIf correctly', () => {
    const text = new StringBuilder().addIf(false, 'my test').text();
    expect(text).toBe('');

    const text2 = new StringBuilder().addIf(true, 'my test').text();
    expect(text2).toBe('my test');

    const text3 = new StringBuilder().addIf(() => false, 'my test').text();
    expect(text3).toBe('');

    const text4 = new StringBuilder().addIf(() => true, 'my test').text();
    expect(text4).toBe('my test');
  });
});
