---
title: Iteration와 Generator
subtitle: 코드스피츠 77 ES6+ 3화 참조
readtime: 20 min
author: wookshin
---

<br/>

# Iteration과 Generator

<br/>

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols

<br/>

## iteration Protocols
Iteration Protocols는 ECMAScript 2015에 나왔으며, 2개의 Protocol을 갖습니다.
iterable protocol과 iterator protocol입니다. 

## iterable protocol이란?
iterable 하다라는 것은 하기 조건을 충족했을 때 입니다. 
 - Symbol.iterator라는 Key를 가진 함수가 존재하며 해당 함수는 인자가 없습니다.
 - 해당 함수의 Return 값은 iterator Protocol을 구현한 객체입니다.

iterable protocol을 구현한 object는 for...of loop, spread, destructing 등 다양한 곳에서 활용 가능합니다. 

<br/>

## iterator protocol이란?
iterator protocol을 준수했다는 것은 해당 객체가 next라는 함수를 가지며, 이 함수는 iterator라는 객체를 
iterator 객체는 done과 value 키를 가진 객체입니다.

<br/>

## iteration protocol 예제 
string도 빌트인 iterable 객체입니다. 
```js
const someString = 'hi';
console.log(typeof someString[Symbol.iterator]); // "function"
```

```js
const iterator = someString[Symbol.iterator]();
console.log(iterator + ''); // "[object String Iterator]"

console.log(iterator.next()); // { value: "h", done: false }
console.log(iterator.next()); // { value: "i", done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

```js
console.log([...someString]); // ["h", "i"]
```


## iterable protocol 예제 
String, Array, TypedArray, Map, Set은 모두 빌트인 iterable입니다. 즉, [Symbol.Iterator] 키를 갖는 함수를 가지고 있단 뜻이죠.
```js
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
console.log([...myIterable]); // [1, 2, 3]
```

## Iterable을 허용하는 내장 API들
```js
var myObj = {};
new Map([[1,"a"],[2,"b"],[3,"c"]]).get(2);               // "b"
new WeakMap([[{},"a"],[myObj,"b"],[{},"c"]]).get(myObj); // "b"
new Set([1, 2, 3]).has(3);                               // true
new Set("123").has("2");                                 // true
new WeakSet(function*() {
    yield {};
    yield myObj;
    yield {};
}()).has(myObj);                                         // true


let arr = Array.from(function*(){yield 1; yield 2; yield 3;}());
arr;
// [1, 2, 3]
```

## Iterable과 함께 사용되는 문법(구문(statements)과 표현(expressions))

### for-of loops
```js
for(let value of ["a", "b", "c"]){
    console.log(value);
}
// "a"
// "b"
// "c"
```

### spread operator
```js
[..."abc"]; // ["a", "b", "c"]
```


### yield*
```js
function* gen(){
  yield* ["a", "b", "c"];
}

gen().next(); // { value:"a", done:false }

function* gen() {
    yield ["a", "b", "c"];
}

gen().next(); // {value: Array(1), done: false}
```

### destructuring assignment
```js
[a, b, c] = new Set(["a", "b", "c"]);
a // "a"
```


## generator object 는 iterator 또는 iterable 인가?
generator object 는 iterator 이면서 iterable 입니다.

```js
var aGeneratorObject = function*(){
    yield 1;
    yield 2;
    yield 3;
}();
typeof aGeneratorObject.next;
// "function", 이것은 next 메서드를 가지고 있기 때문에 iterator입니다.
typeof aGeneratorObject[Symbol.iterator];
// "function", 이것은 @@iterator 메서드를 가지고 있기 때문에 iterable입니다.
aGeneratorObject[Symbol.iterator]() === aGeneratorObject;
// true, 이 Object의 @@iterator 메서드는 자기자신(iterator)을 리턴하는 것으로 보아 잘 정의된 iterable이라고 할 수 있습니다.
[...aGeneratorObject];
// [1, 2, 3]
```

## generator 여러 예제
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

### Generator 간단 예제
```js
function* idMaker() {
  var index = 0;
  while (true)
    yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
// ...
```

### Generator yield* 예제
```js
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i) {
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```

### Generator 객체 속성
```js
const someObj = {
  *generator () {
    yield 'a';
    yield 'b';
  }
}

const gen = someObj.generator()

console.log(gen.next()); // { value: 'a', done: false }
console.log(gen.next()); // { value: 'b', done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

### Generator 객체 메소드
```js
class Foo {
  *generator () {
    yield 1;
    yield 2;
    yield 3;
  }
}

const f = new Foo ();
const gen = f.generator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

### Generator 식으로 정의
```js
const foo = function* () {
  yield 10;
  yield 20;
};

const bar = foo();
console.log(bar.next()); // {value: 10, done: false}
```

### power example
```js
function * power(n) {
  for(current = n; ; current*=n){
    yield current;
  }
}

for (let a of power(3)){
  console.log(a);
  if(a > 32) break;
}
```
