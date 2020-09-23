import { SortMapByKeyAlphabeticallyPipe } from './sort-map-by-key-alphabetically.pipe';

describe('PlayersAlphabeticalPipe', () => {
  let sortMapByKeyAlphabeticallyPipe: SortMapByKeyAlphabeticallyPipe;

  beforeEach(() => {
    sortMapByKeyAlphabeticallyPipe = new SortMapByKeyAlphabeticallyPipe();
  });

  it('should create an instance', () => {
    expect(sortMapByKeyAlphabeticallyPipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return an empty list of player names when the map is empty', () => {
      const emptyMap = new Map<string, any>();

      const results = sortMapByKeyAlphabeticallyPipe.transform(emptyMap);

      expect(results).toEqual([]);
    });

    it('should return a list of the player names when the map is filled', () => {
      const inputMap = new Map<string, any>();
      inputMap.set('name', {});
      inputMap.set('other name', {});
      inputMap.set('way diff name', {});

      const results = sortMapByKeyAlphabeticallyPipe.transform(inputMap);

      expect(results).toEqual(['name', 'other name', 'way diff name']);
    });

    it('should return a list of the player names alphabetized when the map is filled not alphabetically', () => {
      const inputMap = new Map<string, any>();
      inputMap.set('way diff name', {});
      inputMap.set('name', {});
      inputMap.set('other name', {});

      const results = sortMapByKeyAlphabeticallyPipe.transform(inputMap);

      expect(results).toEqual(['name', 'other name', 'way diff name']);
    });
  });
});
