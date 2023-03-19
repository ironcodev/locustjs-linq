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

*/
const is_join = Symbol('is_join');

class EqulityComparer {
  equals(x, y) {

  }
}

class Comparer {
  compare(x, y) {

  }
}

class LooseEqualityComparer extends EqualityComparer {
  equals(x, y) {
    return x == y;
  }
}

class TightEqualityComparer extends EqualityComparer {
  equals(x, y) {
    return x === y;
  }
}

EqulityComparer.Loose = new LooseEqualityComparer();
EqulityComparer.Tight = new TightEqualityComparer();

class StringOrdinalComparer extends Comparer {

}

class StringOrdinalIgnoreCaseComparer extends Comparer {

}

const stringOrdinalComparer = new StringOrdinalComparer();
const stringOrdinalIgnoreCaseComparer = new StringOrdinalIgnoreCaseComparer();

const StringComparer = {
  Ordinal: stringOrdinalComparer,
  IgnoreCase: stringOrdinalIgnoreCaseComparer
}

class Comparable {
  compareTo(x) {

  }
}

const isComparable = x => x && typeof x.compareTo == 'function';

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
      this.data = data;
    } else {
      throw `Enumerator.ctor: given data is not iterable.`
    }

    this.data = data;
    this.index = 0;
  }
  next() {
    if (isArray(this.data)) {
      if (this.index < this.data.length) {
        return { done: false, value: this.data[this.index++] }
      } else {
        return { done: true, value: undefined }
      }
    } else {
      return this.data.next();
    }
  }
}

class Enumerable {
  constructor(data) {
    if (isIterable(data)) {
      this.data = data;
    } else {
      throw `Enumerable.ctor: data is not iterable.`
    }
  }
  [Symbol.iterator] = function () {
    return new Enumerator(this.data)
  }
  innerJoin(target, fnLeft, fnRight, comparer) {
    const data = this.data;
    const newData = (function* () {
      for (let left of data) {
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
    })();

    return new Enumerable(newData);
  }
  leftJoin(target, fnLeft, fnRight, comparer) {
    const data = this.data;
    const newData = (function* () {
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
    })();

    return new Enumerable(newData)
  }
  rightJoin(target, fnLeft, fnRight, comparer) {
    const data = this.data;
    const newData = (function* () {
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
    })();

    return new Enumerable(newData);
  }
  where(predicate) {
    const data = this.data;
    const newData = (function* () {
      for (let item of data) {
        const args = unwrap_join(item);

        if (predicate(...args)) {
          yield item;
        }
      }
    })();

    return new Enumerable(newData);
  }
  select(mapper) {
    const data = this.data;
    const newData = (function* () {
      for (let item of data) {
        const args = unwrap_join(item);

        yield mapper(...args)
      }
    })();

    return new Enumerable(newData);
  }
  count() {
    if (isArray(this.data)) {
      return this.data.length;
    } else {
      let count = 0;

      for (let item of this.data) {
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
  every() {

  }
  all() {

  }
  any() {

  }
  some() {

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
  toArray() {

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
}

Array.prototype.toEnumerable = function () {
  return new Enumerable(this)
}

export {
  Enumerable
}