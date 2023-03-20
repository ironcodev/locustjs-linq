import { isIterable, isArray, isFunction } from '@locustjs/base';
/*
var persons = [
    { id: 1, name: 'ali' },
    { id: 2, name: 'reza' },
    { id: 3, name: 'saeed' }
]
var personBooks = [
    { person_id: 1, book_id: 10},
    { person_id: 3, book_id: 12},
    { person_id: 3, book_id: 13}
]
var books = [
    { id: 10, title: 'C#' },
    { id: 11, title: 'Javascript' },
    { id: 12, title: 'VB' },
    { id: 13, title: 'Python' },
    { id: 14, title: 'Java' }
]
var personAddress = [
    { id: 100, person_id: 1, city: 'Tehran' },
    { id: 101, person_id: 1, city: 'Shiraz' }
]

var data = persons.toEnumerable()
    .innerJoin(personBooks, p => p.id, pb => pb.person_id)
    .innerJoin(books, ({ right }) => right.book_id, b => b.id)
    .leftJoin(personAddress, ({ left }) => left.left.id, pa => pa.person_id)
    .select((p, pb, b, pa) => ({ person_id: pb.person_id, author: p.name, book: b.title, city: pa.city }))


left join example:
[
  { id: 1, name: 'ali' },
  { id: 2, name: 'reza' },
  { id: 3, name: 'saeed' },
]

[
  { p_id: 1, city: 'teh' },
  { p_id: 2, city: 'shz' },
]

[
  { left: { id: 1, name: 'ali' }, right: { p_id: 1, city: 'teh' } },
  { left: { id: 1, name: 'ali' }, right: null },
  { left: { id: 2, name: 'reza' }, right: null },
  { left: { id: 2, name: 'reza' }, right: { p_id: 2, city: 'shz' } },
  { left: { id: 3, name: 'reza' }, right: null },
  { left: { id: 3, name: 'reza' }, right: null },
]
*/
const is_join = Symbol('is_join');

function unwrap_join(item) {
  let result = []

  if (item[is_join]) {
    result = result.concat(unwrap_join(item.left))
    result = result.concat(unwrap_join(item.right))
  } else {
    result.push(item)
  }

  return result
}

class Enumerator {
  constructor(data) {
    if (isIterable(data)) {
      this._data = data;
    } else {
      throw `Enumerator.ctor: given data is not iterable.`
    }

    this._data = data;
    this.index = 0;
  }
  next() {
    if (isArray(this._data)) {
      if (this.index < this._data.length) {
        return { done: false, value: this._data[this.index++] }
      } else {
        return { done: true, value: undefined }
      }
    } else {
      return this._data.next();
    }
  }
}

class Enumerable {
  constructor(data) {
    if (isIterable(data)) {
      this._data = data;
    } else {
      throw `Enumerable.ctor: data is not iterable.`
    }
  }
  [Symbol.iterator]() {
    return new Enumerator(this._data)
  }
  *_innerJoin(target, fnLeft, fnRight, comparer) {
    for (let left of this._data) {
      for (let right of target) {
        const match = isFunction(comparer) ?
          comparer(fnLeft(left), fnRight(right))
          :
          fnLeft(left) == fnRight(right);

        if (match) {
          yield { left, right, [is_join]: true }
        }
      }
    }
  }
  innerJoin(target, fnLeft, fnRight, comparer) {
    return new Enumerable(this._innerJoin(target, fnLeft, fnRight, comparer));
  }
  leftJoin(target, fnLeft, fnRight, comparer) {
    const newData = (function* (data) {
      for (let left of data) {
        for (let right of target) {
          const match = comparer ?
            comparer(fnLeft(left), fnRight(right))
            :
            fnLeft(left) == fnRight(right);

          if (match) {
            yield { left, right, [is_join]: true }
          } else {
            yield { left, right: undefined, [is_join]: true }
          }
        }
      }
    })(this._data);

    return new Enumerable(newData)
  }
  rightJoin(target, fnLeft, fnRight, comparer) {
    const newData = (function* (data) {
      for (let left of data) {
        for (let right of target) {
          const match = comparer ?
            comparer(fnLeft(left), fnRight(right))
            :
            fnLeft(left) == fnRight(right);

          if (match) {
            yield { left, right, [is_join]: true }
          } else {
            yield { left: undefined, right, [is_join]: true }
          }
        }
      }
    })(this._data);

    return new Enumerable(newData);
  }
  where(predicate) {
    const newData = (function* (data) {
      for (let item of data) {
        const args = unwrap_join(item);

        if (predicate(...args)) {
          yield item;
        }
      }
    })(this._data);

    return new Enumerable(newData);
  }
  select(mapper) {
    const newData = (function* (data) {
      for (let item of data) {
        const args = unwrap_join(item);

        yield mapper(...args)
      }
    })(this._data);

    return new Enumerable(newData);
  }
  count() {
    if (isArray(this._data)) {
      return this._data.length;
    } else {
      let count = 0;

      for (let item of this._data) {
        count++;
      }

      return count;
    }
  }
  indexOf() {

  }
  lastIndexOf() {

  }
  find() {

  }
  filter() {

  }
  all(fn) {
    return this.every(fn);
  }
  every(fn) {
    if (isArray(this._data)) {
      return this._data.every(fn);
    } else {
      for (let item of this._data) {
        if (!fn(item, this)) {
          return false;
        }
      }

      return true;
    }
  }
  any(fn) {
    if (isArray(this._data)) {
      return this._data.some(fn);
    } else {
      for (let item of this._data) {
        if (fn(item, this)) {
          return true;
        }
      }

      return false;
    }
  }
  some(fn) {
    return this.some(fn);
  }
  first() {

  }
  last() {

  }
  at() {

  }
  orderBy() {

  }
  orderByDescending() {

  }
  groupBy() {

  }
  skip() {

  }
  take() {

  }
  forEach() {

  }
  contains() {

  }
  static range(from, to) {

  }
  concat() {

  }
  slice() {

  }
  cast() {

  }
  min() {

  }
  max() {

  }
  sum() {

  }
  avg() {

  }
  reduce() {
  }
  reverse() {

  }
  union(x, ignoreErrors) {
    return this.merge(x, ignoreErrors);
  }
  intersect(x, ignoreErrors) {
    // to be implemented
  }
  toArray() {
    return Array.from(this._data)
  }
  clear() {
    this._data = [];
  }
}

Array.prototype.toEnumerable = function () {
  return new Enumerable(this)
}

export {
  Enumerable
}