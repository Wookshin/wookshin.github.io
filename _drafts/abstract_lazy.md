# Abstract Loop & Lazy Execution

### 복잡한 다층형 그래프트는 어떻게 이터레이션할 것인가?

```js
{
  [Symbol.iterator]()(retun this;),
  data:[{a:[1,2,3,4], b:'-'}, [5,6,7], 8, 9],
  next(){
    return ???;
  }
}
```

```js
{
  [Symbol.iterator](){return this;},
  data:[{a:[1,2,3,4], b:'-'}, [5,6,7], 8, 9],
  next(){
    let v;
    while(v = this.data.shift()){
      switch(true) {
        case Array.isArray(v):
          this.data.unshift(...v);
          break;
        case v && typeof v == 'object':
          for(var k in v) this.data.unshift(v[k]);
          break;
        default:
          return {value:v, done:false};
      }
    }
    return {done:true}
  }
}
```

<br/>

### 좀 더 간단히 바꿔보자

```js
{
  [Symbol.iterator](){return this;},
  data:[{a:[1,2,3,4], b:'-'}, [5,6,7], 8, 9],
  next(){
    let v;
    while(v = this.data.shift()){
      if(!(v instanceof Object)) return {value:v};
      if(!Array.isArray(v)) v = Object.values(v);
      this.data.unshift(...v);
    }
    return {done:true};
  }
}
```

<br/>

자바스크립트 코어 객체를 잘 활용하자.

- Object.values

위 방법으로 진행했을 때 Loop가 다 돌면 data가 빈배열이 되는 현상이 생긴다.
클래스로 만들어서 매번 Loop 마다 인스턴스를 만들자.

```js
const Compx = class {
  constructor(data) {
    this.data = data;
  }
  [Symbol.iterator]() {
    const data = JSON.parse(JSON.stringify(this.data)); //데이터 사본으로 진행하기 위해.
    return {
      next() {
        let v;
        while ((v = data.shift())) {
          if (!(v instanceof Object)) return { value: v };
          if (!Array.isArray(v)) v = Object.values(v);
          data.unshift(...v);
        }
        return { done: true };
      },
    };
  }
};
const a = new Compx([{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9]);
console.log([...a]);
console.log([...a]);
```

```js
const Compx = class {
  constructor(data) {
    this.data = data;
  }
  *gene() {
    const data = JSON.parse(JSON.stringify(this.data)); //데이터 사본으로 진행하기 위해.
    let v;
    while ((v = data.shift())) {
      if (!(v instanceof Object)) yield v;
      else {
        if (!Array.isArray(v)) v = Object.values(v);
        data.unshift(...v);
      }
    }
  }
};
const a = new Compx([{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9]);
console.log([...a.gene()]);
console.log([...a.gene()]);
```

<br/>
<br/>

## ABSTRACT LOOP 추상 루프

다양한 구조의 루프와 무관하게 해당 값이나 상황의 개입만 하고 싶은 경우

console.log를 추가하기 위해 전체 함수를 복사하는 방법 밖에 없다.
모든 것들이 문으로 확정되어있기 때문에 그렇다.

```js
(data, f) => {
  let v;
  while ((v = data.shift())) {
    if (!(v instanceof Object)) f(v);
    else {
      if (!Array.isArray(v)) v = Object.values(v);
      data.unshift(...v);
    }
  }
};

(data, f) => {
  let v;
  while ((v = data.shift())) {
    if (!(v instanceof Object)) {
      console.log(v);
      f(v);
    } else {
      if (!Array.isArray(v)) v = Object.values(v);
      data.unshift(...v);
    }
  }
};
```

<br/>

### 결국 제어문을 직접 사용할 수 없고 구조객체를 이용해 루프실행기를 별도로 구현

```js
(data, f) => {
  let v;
  //루프 공통 골격
  while ((v = data.shift())) {
    //개별구조객체1
    if (!(v instanceof Object)) f(v);
    //개별구조객체2
    else {
      if (!Array.isArray(v)) v = Object.values(v);
      data.unshift(...v);
    }
  }
};
```

<br/>

### 팩토리 + 컴포지트

```js
const Operator = class {
  static factory(v) {
    if (v instanceof Object) {
      if (!Array.isArray(v)) v = Object.values(v);
      return new ArrayOp(v.map((v) => Operator.factory(v)));
    } else return new PrimaOp(v);
  }
  constructor(v) {
    this.v = v;
  }
  operation(f) {
    throw 'override';
  }
};
const PrimaOp = class extends Operator {
  constructor(v) {
    super(v);
  }
  operation(f) {
    f(this.v);
  }
};
const ArrayOp = class extends Operator {
  constructor(v) {
    super(v);
  }
  operation(f) {
    for (const v of this.v) v.operation(f);
  }
};
Operator.factory([1, 2, 3, { a: 4, b: 5 }, 6, 7]).operation(console.log);
```

```js
if (1) {
  const Operator = class {
    static factory(v) {
      if (v instanceof Object) {
        if (!Array.isArray(v)) v = Object.values(v);
        return new ArrayOp(v.map((v) => Operator.factory(v)));
      } else return typeof v == 'string' ? new StringOp(v) : new PrimaOp(v);
    }
    constructor(v) {
      this.v = v;
    }
    operation(f) {
      throw 'override';
    }
  };
  const StringOp = class extends Operator {
    constructor(v) {
      super(v);
    }
    operation(f) {
      for (const a of this.v) f(a);
    }
  };
  const PrimaOp = class extends Operator {
    constructor(v) {
      super(v);
    }
    operation(f) {
      f(this.v);
    }
  };
  const ArrayOp = class extends Operator {
    constructor(v) {
      super(v);
    }
    operation(f) {
      for (const v of this.v) v.operation(f);
    }
  };
  Operator.factory([1, 2, 3, { a: 'abc', b: 5 }, 6, 7]).operation(console.log);
}
```

<br/>

### 팩토리 + 컴포지트 + ES6 Iterable

```js
const Operator = class {
  static factory(v) {
    if (v instanceof Object) {
      if (!Array.isArray(v)) v = Object.values(v);
      return new ArrayOp(v.map((v) => Operator.factory(v)));
    } else return new PrimaOp(v);
  }
  constructor(v) {
    this.v = v;
  }
  *gene() {
    throw 'override';
  }
};
const PrimaOp = class extends Operator {
  constructor(v) {
    super(v);
  }
  *gene() {
    yield this.v;
  }
};
const ArrayOp = class extends Operator {
  constructor(v) {
    super(v);
  }
  *gene() {
    for (const v of this.v) yield* v.gene();
  }
};
for (const v of Operator.factory([1, 2, 3, { a: 4, b: 5 }, 6, 7]).gene())
  console.log(v);
```

<br/>
<br/>

## LAZY EXECUTION

### YIELD

```js
const odd = function* (data) {
  for (const v of data) {
    console.log('odd', odd.cnt++);
    if (v % 2) yield v;
  }
};
odd.cnt = 0;
for (const v of odd([1, 2, 3, 4])) console.log(v);
```

```js
const take = function* (data, n) {
  for (const v of data) {
    console.log('take', take.cnt++);
    if(n--) yield v; else break;
  }
};
take.cnt = 0;
for (const v of take([1, 2, 3, 4], 2)) console.log(v);
```

```js
for (const v of take(odd([1, 2, 3, 4]), 2)) console.log(v);
```

