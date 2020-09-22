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
  });
});
