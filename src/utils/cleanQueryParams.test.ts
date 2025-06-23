import { cleanQueryParams } from './cleanQueryParams';

describe('cleanQueryParams', () => {
  describe('filtering null, undefined, empty string values', () => {
    it('should remove null values', () => {
      const params = {
        name: 'John',
        age: null,
        city: 'Seoul',
      };

      const result = cleanQueryParams(params);

      expect(result).toEqual({
        name: 'John',
        city: 'Seoul',
      });
      expect(result).not.toHaveProperty('age');
    });

    it('should remove undefined values', () => {
      const params = {
        name: 'John',
        age: undefined,
        city: 'Seoul',
      };

      const result = cleanQueryParams(params);

      expect(result).toEqual({
        name: 'John',
        city: 'Seoul',
      });
      expect(result).not.toHaveProperty('age');
    });

    it('should remove empty string values', () => {
      const params = {
        name: 'John',
        age: '',
        city: 'Seoul',
      };

      const result = cleanQueryParams(params);

      expect(result).toEqual({
        name: 'John',
        city: 'Seoul',
      });
      expect(result).not.toHaveProperty('age');
    });

    it('should remove all falsy values that should be filtered', () => {
      const params = {
        validString: 'test',
        nullValue: null,
        undefinedValue: undefined,
        emptyString: '',
        validNumber: 0, // should be kept
        validBoolean: false, // should be kept
      };

      const result = cleanQueryParams(params);

      expect(result).toEqual({
        validString: 'test',
        validNumber: 0,
        validBoolean: false,
      });
    });
  });

  describe('preserving valid values', () => {
    it('should preserve valid string values', () => {
      const params = {
        name: 'John Doe',
        description: 'Test description',
      };

      const result = cleanQueryParams(params);

      expect(result).toEqual(params);
    });

    it('should preserve valid number values including 0', () => {
      const params = {
        count: 0,
        price: 100,
        negative: -50,
        float: 3.14,
      };

      const result = cleanQueryParams(params);

      expect(result).toEqual(params);
    });

    it('should preserve boolean values including false', () => {
      const params = {
        isActive: true,
        isDeleted: false,
      };

      const result = cleanQueryParams(params);

      expect(result).toEqual(params);
    });

    it('should preserve array values', () => {
      const params = {
        tags: ['tag1', 'tag2'],
        numbers: [1, 2, 3],
        emptyArray: [],
      };

      const result = cleanQueryParams(params);

      expect(result).toEqual(params);
    });

    it('should preserve object values', () => {
      const params = {
        user: { name: 'John', age: 30 },
        config: { theme: 'dark' },
        emptyObject: {},
      };

      const result = cleanQueryParams(params);

      expect(result).toEqual(params);
    });
  });

  describe('Date object handling', () => {
    it('should convert Date objects to ISO strings', () => {
      const date = new Date('2024-01-15T12:00:00.000Z');
      const params = {
        name: 'test',
        createdAt: date,
        updatedAt: new Date('2024-01-16T10:30:00.000Z'),
      };

      const result = cleanQueryParams(params);

      expect(result).toEqual({
        name: 'test',
        createdAt: '2024-01-15T12:00:00.000Z',
        updatedAt: '2024-01-16T10:30:00.000Z',
      });
    });

    it('should handle multiple Date objects', () => {
      const params = {
        startDate: new Date('2024-01-01T00:00:00.000Z'),
        endDate: new Date('2024-12-31T23:59:59.999Z'),
        lastLogin: new Date('2024-06-15T14:30:00.000Z'),
      };

      const result = cleanQueryParams(params);

      expect(result.startDate).toBe('2024-01-01T00:00:00.000Z');
      expect(result.endDate).toBe('2024-12-31T23:59:59.999Z');
      expect(result.lastLogin).toBe('2024-06-15T14:30:00.000Z');
    });

    it('should handle Date objects with different timezones', () => {
      const date = new Date('2024-01-15T12:00:00+09:00');
      const params = {
        localDate: date,
      };

      const result = cleanQueryParams(params);

      expect(result.localDate).toBe(date.toISOString());
    });
  });

  describe('complex scenarios', () => {
    it('should handle mixed valid and invalid values', () => {
      const params = {
        name: 'John',
        age: null,
        city: '',
        isActive: true,
        count: 0,
        description: undefined,
        tags: ['tag1', 'tag2'],
        createdAt: new Date('2024-01-15T12:00:00.000Z'),
      };

      const result = cleanQueryParams(params);

      expect(result).toEqual({
        name: 'John',
        isActive: true,
        count: 0,
        tags: ['tag1', 'tag2'],
        createdAt: '2024-01-15T12:00:00.000Z',
      });
    });

    it('should return empty object when all values are invalid', () => {
      const params = {
        field1: null,
        field2: undefined,
        field3: '',
      };

      const result = cleanQueryParams(params);

      expect(result).toEqual({});
      expect(Object.keys(result)).toHaveLength(0);
    });

    it('should handle empty input object', () => {
      const params = {};

      const result = cleanQueryParams(params);

      expect(result).toEqual({});
    });

    it('should not mutate original object', () => {
      const originalParams = {
        name: 'John',
        age: null,
        createdAt: new Date('2024-01-15T12:00:00.000Z'),
      };
      const paramsCopy = { ...originalParams };

      const result = cleanQueryParams(originalParams);

      expect(originalParams).toEqual(paramsCopy);
      expect(result).not.toBe(originalParams);
    });
  });

  describe('type safety', () => {
    it('should maintain type structure', () => {
      interface TestParams {
        name: string;
        age: number | null;
        isActive: boolean;
        createdAt: Date;
      }

      const params: TestParams = {
        name: 'John',
        age: null,
        isActive: true,
        createdAt: new Date('2024-01-15T12:00:00.000Z'),
      };

      const result = cleanQueryParams(params);

      // Type check - result should be Partial<TestParams>
      expect(typeof result.name).toBe('string');
      expect(typeof result.isActive).toBe('boolean');
      expect(typeof result.createdAt).toBe('string');
      expect(result).not.toHaveProperty('age');
    });

    it('should handle generic types correctly', () => {
      const params = {
        stringField: 'test',
        numberField: 42,
        booleanField: true,
        nullField: null,
        dateField: new Date(),
      };

      const result = cleanQueryParams(params);

      expect(result.stringField).toBe('test');
      expect(result.numberField).toBe(42);
      expect(result.booleanField).toBe(true);
      expect(typeof result.dateField).toBe('string');
      expect(result).not.toHaveProperty('nullField');
    });
  });
});