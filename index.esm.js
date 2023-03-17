import { isIterable, isFunction } from 'locustjs-base';
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

var data = persons.join(personBooks, p => p.id, pb => pb.person_id)
    .join(books, ({ right }) => right.book_id, b => b.id)
    .join(personAddress, ({ left }) => left.left.id, pa => pa.person_id)
    .select((p, pb, b, pa) => ({ person_id: pb.person_id, author: p.name, book: b.title, city: pa.city }))

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

class Enumerable {
  constructor(data) {
    if (isIterable(data)) {
      this.data = data;
    } else {
      throw `Enumerable.ctor: data is not iterable.`
    }
  }
  [Symbol.iterator] = function* () {
    for (let item of data) {
      yield item;
    }
  }
  innerJoin(target, fnLeft, fnRight, comparer) {
    const data = this.data;

    return new Enumerable(function* () {
      for (let left of data) {
        for (let right of target) {
          const match = comparer ?
            comparer(fnLeft(left), fnRight(right))
            :
            fnLeft(left) == fnRight(right);

          if (match) {
            yield { left, right, [is_join]: true }
          }
        }
      }
    })
  }
  leftJoin(target, fnLeft, fnRight, comparer) {
    const data = this.data;

    return new Enumerable(function* () {
      for (let left of data) {
        for (let right of target) {
          const match = right == null || (comparer ?
            comparer(fnLeft(left), fnRight(right))
            :
            fnLeft(left) == fnRight(right));

          if (match) {
            yield { left, right, [is_join]: true }
          }
        }
      }
    })
  }
  rightJoin(target, fnLeft, fnRight, comparer) {
    const data = this.data;

    return new Enumerable(function* () {
      for (let left of data) {
        for (let right of target) {
          const match = left == null || (comparer ?
            comparer(fnLeft(left), fnRight(right))
            :
            fnLeft(left) == fnRight(right));

          if (match) {
            yield { left, right, [is_join]: true }
          }
        }
      }
    })
  }
  where(predicate) {
    const data = this.data;

    return new Enumerable(function* () {
      for (let item of data) {
        const args = unwrap_join(item);

        if (predicate(...args)) {
          yield item;
        }
      }
    })
  }
  select(mapper) {
    const data = this.data;

    return new Enumerable(function* () {
      for (let item of data) {
        const args = unwrap_join(item)
        result.push(mapper(...args))
      }
    })
  }
}

// Array.prototype.innerJoin = function() {
//   return new Enumerable(this)
// }

export {
  Enumerable
}