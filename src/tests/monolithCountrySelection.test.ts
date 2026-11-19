import CountryInputField from '@components/countryInputField';

// Exercise the real lookup method without booting unrelated media/UI singletons.
vi.mock('@components/inputField', () => ({default: class {}}));
vi.mock('@components/scrollable', () => ({default: class {}}));
vi.mock('@components/appNavigationController', () => ({default: {}}));
vi.mock('@lib/richTextProcessor/wrapEmojiText', () => ({default: (value: string) => value}));

describe('Monolith baseline: optional nearest-DC country selection', () => {
  function subject(entries: Array<[string, HTMLLIElement[]]>) {
    const target = {
      liMap: new Map(entries),
      selectCountryByTarget: vi.fn()
    };
    return {
      target,
      select: (iso2: string) => CountryInputField.prototype.selectCountryByIso2.call(
        target as unknown as CountryInputField,
        iso2
      )
    };
  }

  test('selects the first phone-code option of a known country', () => {
    const element = document.createElement('li');
    const {target, select} = subject([['UA', [element]]]);
    select('UA');
    expect(target.selectCountryByTarget).toHaveBeenCalledExactlyOnceWith(element);
  });

  test('an unknown country does not crash or replace manual selection', () => {
    const {target, select} = subject([]);
    expect(() => select('ZZ')).not.toThrow();
    expect(target.selectCountryByTarget).not.toHaveBeenCalled();
  });

  test('a country with no phone-code entries is safely skipped', () => {
    const {target, select} = subject([['ZZ', []]]);
    expect(() => select('ZZ')).not.toThrow();
    expect(target.selectCountryByTarget).not.toHaveBeenCalled();
  });
});
