/* eslint-disable import/prefer-default-export */

/**
 * Removes given item from the given array.
 */
export function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}