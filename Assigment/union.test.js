const union = require('./union');

describe('union function', () => {
  test('should merge arrays of numbers and remove duplicates', () => {
    const result = union([1, 2, 3], [2, 3, 4]);
    expect(result).toEqual(expect.arrayContaining([1, 2, 3, 4]));
    expect(result.length).toBe(4);
  });

  test('should merge arrays of strings and remove duplicates', () => {
    const result = union(['a'], ['b']);
    expect(result).toEqual(expect.arrayContaining(['a', 'b']));
    expect(result.length).toBe(2);
  });

  test('should merge arrays of objects', () => {
    const result = union([{a: {b: 10}}], [{a: {b: 20}}]);
    
    // For objects, we need to check the structure more carefully
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('a.b', 10);
    expect(result[1]).toHaveProperty('a.b', 20);
  });

  test('should handle complex nested objects and mixed types', () => {
    const complexObj1 = {b: 10, c: {z: {t: 5, _t: 5}, f: [4]}};
    const complexObj2 = {b: 10, c: {z: {t: 5, _t: 5}, f: [4]}};
    
    const result = union([complexObj1, 2], [complexObj2, '2']);
    
    // For strict equality of objects, we'll check structure
    expect(result.length).toBe(3); // 2 objects + number 2 + string '2'
    
    // Testing presence of elements
    expect(result).toContainEqual(complexObj1);
    expect(result).toContainEqual(2);
    expect(result).toContainEqual('2');
  });

  test('should handle empty arrays', () => {
    const result = union([], []);
    expect(result).toEqual([]);
  });

  test('should handle arrays with undefined or null values', () => {
    const result = union([undefined, null], [null]);
    expect(result).toEqual(expect.arrayContaining([undefined, null]));
    expect(result.length).toBe(2);
  });
});

