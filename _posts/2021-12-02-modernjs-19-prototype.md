---
title: 프로토타입
subtitle: 모던 자바스크립트 Deep Dive | 19장 | 프로토타입
readtime: 50 min
author: wookshin
tags: [javascript]
---

<br/>

# 프로토타입

자바스크립트는 명령형(imperative), 함수형(functional), 프로토타입 기반(prototype-based) 객체지향 프로그래밍(OOP)을 지원하는 멀티 패러다임 프로그래밍 언어입니다.

간혹 C++나 자바 같은 클래스 기반 객체지향 프로그래밍 언어의 특징은 클래스와 상속, 캡슐화를 위한 키워드인 `public`, `private`, `protected` 등이 없어서 자바스크립트는 객체지향 언어가 아니라고 오해하는 경우도 있습니다.  
하지만 자바스크립트는 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 객체지향 프로그래밍 능력을 지니고 있는 프로토타입 기반의 객체지향 프로그래밍 언어입니다.

<br/>

> **클래스(class)**  
> ES6에서 클래스가 도입되었습니다.  
> 하지만 ES6의 클래스가 기존의 프로토타입 기반 객체지향 모델을 폐지하고 새로운 객체지향 모델을 제공하는 것은 아닙니다.  
> 사실 클래스도 함수이며, 기존 프로토타입 기반 패턴의 문법적 설탕(syntactic sugar)이라고 볼 수 있습니다.  
> 클래스와 생성자 함수는 모두 프로토타입 기반의 인스턴스를 생성하지만 정확히 동일하게 동작하지는 않습니다.  
> 클래스는 생성자 함수보다 엄격하며 클래스는 생성자 함수에서는 제공하지 않는 기능도 제공합니다.  
> 따라서 클래스를 프로토타입 기반 객체 생성 패턴의 단순한 문법적 설탕으로 보기보다는 새로운 객체 생성 메커니즘으로 보는 것이 좀 더 합당하다고 할 수 있습니다.

<br/>

자바스크립트는 객체 기반의 프로그래밍 언어이며 **자바스크립트를 이루고 있는 거의 "모든 것"이 객체** 입니다.  
원시 타이(primitive type)의 값을 제외한 나머지 값들(함수, 배열, 정규 표현식 등)은 모두 객체입니다.

먼저 객체지향 프로그래밍에 대해 간단히 살펴봅시다.

<br/>

## 1. 객체지향 프로그래밍

객체지향 프로그래밍은 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍(imperative programming)의 절차지향적 관점에서 벗어나 여러 개의 독립적 단위, 즉 객체(object)의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말합니다.

객체지향 프로그래밍은 실세계의 실체(사물이나 개념)을 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작합니다.  
실체는 특징이나 성질을 나타내는 **속성(attribute/property)** 을 가지고 있고, 이를 통해 실체를 인식하거나 구별할 수 있습니다.

예를 들어, 사람은 이름, 주소, 성별, 나이, 신장, 체중, 학력, 성격, 직업 등 다양한 속성을 갖습니다.  
이때 "이름이 아무개이고 성별은 여성이며 나이는 20세인 사람"과 같이 속성을 구체적으로 표현하면 특정한 사람을 다른 사람과 구별하여 인식할 수 있습니다.

이러한 방식을 프로그래밍에 접목시켜봅시다.  
사람에게는 다양한 속성이 있으나 우리가 구현하려는 프로그램에서는 사람의 "이름"과 "주소"라는 속성에만 관심이 있다고 가정합시다.  
이처럼 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하는 것을 **추상화(abstraction)** 라 합니다.

"이름"과 "주소"라는 속성을 갖는 person이라는 객체를 자바스크립트로 표현하면 다음과 같습니다.

<br/>

```javascript
// 이름과 주소 속성을 갖는 객체
const person = {
  name: "Lee",
  address: "Seoul",
};

console.log(person); // {name: "Lee", address: "Seoul"}
```

<br/>

이때 프로그래머(subject, 주체)는 이름과 주소 속성으로 표현된 객체(object)인 person을 다른 객체와 구별하여 인식할 수 있습니다.  
이처럼 **속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체** 라 하며, 객체지향 프로그래밍은 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임입니다.

이번에는 원(Circle)이라는 개념을 객체로 만들어봅시다.  
원에는 반지름이라는 속성이 있습니다.  
이 반지름을 가지고 원의 지름, 둘레, 넓이를 구할 수 있습니다.

이때 반지름은 원의 **상태를 나타내는 데이터** 이며 원의 지름, 둘레, 넓이를 구하는 것은 **동작** 입니다.

<br/>

```javascript
const circle = {
  radius: 5, // 반지름

  // 원의 지름: 2r
  getDiameter() {
    return 2 * this.radius;
  },

  // 원의 둘레: 2πr
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  },

  // 원의 넓이: πrr
  getArea() {
    return Math.PI * this.radius ** 2;
  },
};

console.log(circle);
// {radius: 5, getDiameter: ƒ, getPerimeter: ƒ, getArea: ƒ}

console.log(circle.getDiameter()); // 10
console.log(circle.getPerimeter()); // 31.41592653589793
console.log(circle.getArea()); // 78.53981633974483
```

<br/>

이처럼 객체지향 프로그래밍은 객체의 **상태(state)** 를 나타내는 데이터와 상태 데이터를 조작할 수 있는 **동작 (behavior)** 을 하나의 논리적인 단위로 묶어 생각합니다.  
따라서 객체는 **상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조** 라고 할 수 있습니다.

이때 객체의 상태 데이터를 프로퍼티(property), 동작을 메서드(method)라 부릅니다.

각 객체는 고유의 기능을 갖는 독립적인 부품으로 볼 수 있지만 자신의 고유한 기능을 수행하면서 다른 객체와 관계성(relationship)을 가질 수 있습니다.  
다른 객체와 메시지를 주고받거나 데이터를 처리할 수도 있습니다.  
또는 다른 객체의 상태 데이터나 동작을 상속받아 사용하기도 합니다.

<br/><br/>

## 2. 상속과 프로토 타입

상속(inheritance)은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말합니다.

자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거합니다.  
중복을 제거하는 방법은 기존의 코드를 적극적으로 재사용하는 것입니다.  
코드 재사용은 개발 비용을 현저히 줄일 수 있는 잠재력이 있으므로 매우 중요합니다.

다음 예제를 살펴봅시다.

<br/>

```javascript
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    // Math.PI는 원주율을 나타내는 상수다.
    return Math.PI * this.radius ** 2;
  };
}

// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);
// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
console.log(circle1.getArea === circle2.getArea); // false

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

<br/>

생성자 함수는 동일한 프로퍼티(메서드 포함) 구조를 갖는 객체를 여러 개 생성할 때 유용합니다.  
하지만 위 예제의 생성자 함수는 문제가 있습니다.

`Circle` 생성자 함수가 생성하는 모든 객체(인스턴스)는 `radius` 프로퍼티와 `getArea` 메서드를 갖습니다.  
`radius` 프로퍼티 값은 일반적으로 인스턴스마다 다릅니다(같은 상태를 갖는 여러 개의 인스턴스가 필요하다면 `radius` 프로퍼티 값이 같을 수도 있습니다).  
하지만 `getArea` 메서드는 모든 인스턴스가 동일한 내용의 메서드를 사용하므로 단 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직합니다.  
그런데 `Circle` 생성자 함수는 인스턴스를 생성할 때마다 `getArea` 메서드를 중복 생성하고 모든 인스턴스가 중복 소유합니다.

이처럼 동일한 생성자 함수에 의해 생성된 모든 인스턴스가 동일한 메서드를 중복 소유하는 것은 메모리를 불필요하게 낭비합니다.  
또한 인스턴스를 생성할 때마다 메서드를 생성하므로 퍼포먼스에도 악영향을 줍니다.  
만약 10개의 인스턴스를 생성하면 내용이 동일한 메서드도 10개 생성됩니다.

상속을 통해 불필요한 중복을 제거해 봅시다.  
**자바스크립트는 프로토타입(prototype)을 기반으로 상속을 구현합니다.**

<br/>

```javascript
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
// 공유해서 사용할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
// 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다.
// 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

<br/>

Circle 생성자 함수가 생성한 모든 인스턴스를 자신의 프로토타입, 즉 상위(부모) 객체 역할을 하는 `Circle.prototype`의 모든 프로퍼티와 메서드를 상속받습니다.

`getArea` 메서드는 단 하나만 생성되어 프로토타입인 `Circle.prototype`의 메서드로 할당되어 있습니다.  
따라서 `Circle` 생성자 함수가 생성하는 모든 인스턴스는 `getArea` 메서드를 상속받아 사용할 수 있습니다.  
즉, 자신의 상태를 나타내는 `radius` 프로퍼티만 개별적으로 소유하고 내용이 동일한 메서드는 상속을 통해 공유하여 사용하는 것입니다.

상속은 코드의 재사용이란 관점에서 매우 유용합니다.  
생성자 함수가 생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현해 두면 생성자 함수가 생성할 모든 인스턴스는 별도의 구현 없이 상위(부모) 객체인 프로토타입의 자산을 공유하여 사용할 수 있습니다.

<br/><br/>

## 3. 프로토타입 객체

프로토타입 객체(또는 줄여서 프로토타입)란 객체지향 프로그래밍의 근간을 이루는 객체 간 상속(inheritance)을 구현하기 위해 사용됩니다.  
프로토타입은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티(메서드 포함)를 제공합니다.  
프로토타입을 상속받은 하위(자식) 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용할 수 있습니다.

모든 객체는 [[Prototype]]이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조(null인 경우도 있습니다)입니다.  
[[Prototype]]에 저장되는 프로토타입은 객체 생성 방식에 의해 결정됩니다.

**즉, 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고 [[Prototype]]에 저장됩니다.**

예를 들어, 객체 리터럴에 의해 생성된 객체의 프로토타입은 `Object.prototype`이고,  
생성자 함수에 의해 생성된 객체의 프로토타입은 생성자 함수의 `prototype` 프로퍼티에 바인딩되어 있는 객체입니다.

모든 객체는 하나의 프로토타입을 갖습니다.  
그리고 모든 프로토타입은 생성자 함수와 연결되어 있습니다.

[[Prototype]] 내부 슬롯에는 직접 접근할 수 없지만, `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 자신의 [[Prototype]] 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근할 수 있습니다.  
그리고 프로토타입은 자신의 `constructor` 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 `prototype` 프로퍼티를 통해 프로토타입에 접근할 수 있습니다.

<br/>

### 3.1 \_\_proto\_\_ 접근자 프로퍼티

**모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있습니다.**

#### \_\_proto\_\_는 접근자 프로퍼티입니다.

내부 슬롯은 프로퍼티가 아닙니다.  
따라서 자바스크립트는 원칙적으로 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않습니다.  
단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 합니다.

[[Prototype]] 내부 슬롯에도 직접 접근할 수 없으며 `__proto__` 접근자 프로퍼티를 통해 간접적으로 [[Prototype]] 내부 슬롯의 값, 즉 프로토타입에 접근할 수 있습니다.

접근자 프로퍼티는 자체적으로는 값([[Value]] 프로퍼티 어트리뷰트)을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수(accessor function),  
즉 [[Get]], [[Set]] 프로퍼티 어트리뷰트로 구성된 프로퍼티입니다.

Object.prototype의 접근자 프로퍼티인 `__proto__`는 getter/setter 함수라고 부르는 접근자 함수([[Get]], [[Set]] 프로퍼티 어트리뷰트에 할당된 함수)를 통해 [[Prototype]] 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당합니다.

`__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하면 내부적으로 `__proto__` 접근자 프로퍼티인 getter 함수인 [[Get]]이 호출됩니다.  
`__proto__` 접근자 프로퍼티를 통해 새로운 프로토타입을 할당하면 `__proto__` 접근자 프로퍼티의 setter 함수인 [[Set]]이 호출됩니다.

<br/>

```javascript
const obj = {};
const parent = { x: 1 };

// getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
obj.__proto__;
// setter함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;

console.log(obj.x); // 1
```

<br/>

#### \_\_proto\_\_ 접근자 프로퍼티는 상속을 통해 사용됩니다.

`__proto__` 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 `Object.prototype`의 프로퍼티입니다.  
모든 객체는 상속을 통해 `Object.prototype.__proto__` 접근자 프로퍼티를 사용할 수 있습니다.

<br/>

```javascript
const person = { name: "Lee" };

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty("__proto__")); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); // true
```

<br/>

> **Object.prototype**  
> 모든 객체는 프로토타입의 계층 구조인 프로토타입 체인에 묶여 있습니다.  
> 자바스크립트 엔진은 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 `__proto__` 접근자 프로퍼티가 가리키는 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색합니다.  
> 프로토타입 체인의 종점, 즉 프로토타입 체인의 최상위 객체는 `Object.prototype`이며, 이 객체의 프로퍼티와 메서드는 모든 객체에 상속됩니다.

<br/>

#### \_\_proto\_\_ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

[[Prototype]] 내부 슬롯의 값, 즉 프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서입니다.

다음 예제를 살펴봅시다.

<br/>

```javascript
const parent = {};
const child = {};

// child의 프로토타입을 parent로 설정
child.__proto__ = parent;
// parent의 프로토타입을 child로 설정
parent.__proto__ = child; // TypeError: Cyclic __proto__ value
```

<br/>

위 예제에서는 `parent` 객체를 `child` 객체의 프로토타입으로 설정한 후, `child` 객체를 `parent` 객체의 프로토타입으로 설정했습니다.  
이러한 코드가 에러없이 정상적으로 처리되면 서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인이 만들어지기 때문에 `__proto__` 접근자 프로퍼티는 에러를 발생시킵니다.

프로토타입 체인은 단방향 링크드 리스트로 구현되어야 합니다.  
즉, 프로퍼티 검색 방향이 한쪽 방향으로만 흘러가야 합니다.  
하지만 서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인, 다시 말해 순환 참조(circular reference)하는 프로토타입 체인이 만들어지면 프로토타입 체인 종점이 존재하지 않기 때문에 프로토타입 체인에서 프로퍼티를 검색할 때 무한 루프에 빠집니다.  
따라서 아무런 체크 없이 무조건적으로 프로토타입을 교체할 수 없도록 `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어 있습니다.

<br/>

#### \_\_proto\_\_ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않습니다.

`__proto__` 접근자 프로퍼티는 ES5까지 ECMAScript 사양에 포함되지 않은 비표준이었습니다.  
하지만 일부 브라우저에서 `__proto__`를 지원하고 있었기 때문에 브라우저 호환성을 고려하여 ES6에서 `__proto__`를 표준으로 채택했습니다.  
현재 대부분의 브라우저(IE 11 이상)가 `__proto__`를 지원합니다.

하지만 코드 내에서 `__proto__` 접근자 프로퍼티를 직접 사용하는 것은 권장하지 않습니다.  
모든 객체가 `__proto__` 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문입니다.  
직접 상속을 통해 다음과 같이 `Object.prototype`을 상속받지 않는 객체를 생성할 수도 있기 때문에 `__proto__` 접근자 프로퍼티를 사용할 수 없는 경우가 있습니다.

<br/>

```javascript
// obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
const obj = Object.create(null);

// obj는 Object.__proto__를 상속받을 수 없다.
console.log(obj.__proto__); // undefined

// 따라서 Object.getPrototypeOf 메서드를 사용하는 편이 좋다.
console.log(Object.getPrototypeOf(obj)); // null
```

<br/>

따라서 `__proto__` 접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우에는 `Object.getPrototypeOf` 메서드를 사용하고,  
프로토타입을 교체하고 싶은 경우에는 `Object.setPrototypeOf` 메서드를 사용할 것을 권장합니다.

<br/>

```javascript
const obj = {};
const parent = { x: 1 };

// obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.__proto__;
// obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;

console.log(obj.x); // 1
```

<br/>

`Object.getPrototypeOf` 메서드와 `Object.setPrototypeOf` 메서드는 `get Object.prototype.__proto__`와 `set Object.prototype.__proto__`의 처리 내용과 정확히 일치합니다.  
`Object.getPrototypeOf` 메서드는 ES5에서 도입된 메서드이며, IE9 이상에서 지원합니다.  
`Object.setPrototypeOf` 메서드는 ES6에서 도입된 메서드이며, IE11 이상에서 지원합니다.

<br/>

### 3.2 함수 객체의 prototype 프로퍼티

**함수 객체만이 소유하는 `prototype` 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킵니다.**

<br/>

```javascript
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}.hasOwnProperty("prototype")); // -> true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}.hasOwnProperty("prototype")); // -> false
```

<br/>

`prototype` 프로퍼티는 생성자 함수가 생성할 객체(인스턴스)의 프로토타입을 가리킵니다.  
따라서 생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 `prototype` 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않습니다.

<br/>

```javascript
// 화살표 함수는 non-constructor다.
const Person = (name) => {
  this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(Person.hasOwnProperty("prototype")); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(Person.prototype); // undefined

// ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
const obj = {
  foo() {},
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(obj.foo.hasOwnProperty("prototype")); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(obj.foo.prototype); // undefined
```

<br/>

생성자 함수로 호출하기 위해 정의하지 않은 일반 함수(함수 선언문, 함수 표현식)도 `prototype` 프로퍼티를 소유하지만 객체를 생성하지 않는 일반 함수의 `prototype` 프로퍼티는 아무런 의미가 없습니다.

**모든 객체가 가지고 있는(엄밀히 말하면 `Object.prototype`으로부터 상속받은) `__proto__` 접근자 프로퍼티와 함수 객체만이 가지고 있는 `prototype` 프로퍼티는 결국 동일한 프로토타입을 가리킵니다.**  
하지만 이들 프로퍼티를 사용하는 주체가 다릅니다.

<br/>

| 구분                        | 소유          | 값                | 사용 주체   | 사용 목적                                                                    |
| --------------------------- | ------------- | ----------------- | ----------- | ---------------------------------------------------------------------------- |
| `__proto__` 접근자 프로퍼티 | 모든 객체     | 프로토타입의 참조 | 모든 객체   | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용                      |
| `prototype` 프로퍼티        | `constructor` | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |

<br/>

예를 들어, 생성자 함수로 객체를 생성한 후, `__proto__` 접근자 프로퍼티와 `prototype` 프로퍼티로 프로토타입 객체에 접근해봅시다.

<br/>

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// 결국 Person.prototype과 me.__proto__는 결국 동일한 프로토타입을 가리킨다.
console.log(Person.prototype === me.__proto__); // true
```

<br/>

### 3.3 프로토타입의 constructor 프로퍼티와 생성자 함수

모든 프로토타입은 `constructor` 프로퍼티를 갖습니다.  
이 `constructor` 프로퍼티는 `prototype` 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킵니다.  
이 연결은 생성자 함수가 생성될 때, 즉 함수 객체가 생성될 때 이뤄집니다.

다음 예제를 살펴봅시다.

<br/>

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// me 객체의 생성자 함수는 Person이다.
console.log(me.constructor === Person); // true
```

<br/>

위 예제에서 `Person` 생성자 함수는 `me` 객체를 생성했습니다.  
이때 `me` 객체는 프로토타입의 `constructor` 프로퍼티를 통해 생성자 함수와 연결됩니다.  
`me` 객체에는 `constructor` 프로퍼티가 없지만 `me` 객체의 프로토타입인 `Person.prototype`에는 `constructor` 프로퍼티가 있습니다.  
따라서 `me` 객체는 프로토타입인 `Person.prototype`의 `constructor` 프로퍼티를 상속받아 사용할 수 있습니다.

<br/><br/>

## 4. 리터럴 표기법에 의해 생성된 객체의 생성자 함수의 프로토타입

앞에서 살펴본 바와 같이 생성자 함수에 의해 생성된 인스턴스는 프로토타입의 `constructor` 프로퍼티에 의해 생성자 함수와 연결됩니다.  
이때 `constructor` 프로퍼티가 가리키는 생성자 함수는 인스턴스를 생성한 생성자 함수입니다.

<br/>

```javascript
// obj 객체를 생성한 생성자 함수는 Object다.
const obj = new Object();
console.log(obj.constructor === Object); // true

// add 함수 객체를 생성한 생성자 함수는 Function이다.
const add = new Function("a", "b", "return a + b");
console.log(add.constructor === Function); // true

// 생성자 함수
function Person(name) {
  this.name = name;
}

// me 객체를 생성한 생성자 함수는 Person이다.
const me = new Person("Lee");
console.log(me.constructor === Person); // true
```

<br/>

하지만 리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 `new` 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 객체 생성 방식도 있습니다.

<br/>

```javascript
// 객체 리터럴
const obj = {};

// 함수 리터럴
const add = function (a, b) {
  return a + b;
};

// 배열 리터럴
const arr = [1, 2, 3];

// 정규표현식 리터럴
const regexp = /is/gi;
```

<br/>

리터럴 표기법에 의해 생성된 객체도 물론 프로토타입이 존재합니다.  
하지만 리터럴 표기법에 의해 생성된 객체의 경우 프로토타입의 `constructor` 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수는 없습니다.

<br/>

```javascript
// obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다.
const obj = {};

// 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
console.log(obj.constructor === Object); // true
```

<br/>

위 예제의 `obj` 객체는 `Object` 생성자 함수로 생성한 객체가 아니라 객체 리터럴에 의해 생성된 객체입니다.  
하지만 `obj` 객체는 `Object` 생성자 함수와 `constructor` 프로퍼티로 연결되어 있습니다.  
그렇다면 객체 리터럴에 의해 생성된 객체는 사실 `Object` 생성자 함수로 생성되는 것은 아닐까요?

ECMAScript 사양을 살펴봅시다.  
`Object` 생성자 함수는 다음과 같이 구현하도록 정의되어 있습니다.

<br/>

```markdown
20.1.1.1 Object ( [ value ] )
When the Object function is called with optional argument value, the following steps are taken:

1. If NewTarget is neither undefined nor the active function, then
   a. Return ? OrdinaryCreateFromConstructor(NewTarget, "%Object.prototype%").
2. If value is undefined or null, return ! OrdinaryObjectCreate(%Object.prototype%).
3. Return ! ToObject(value).
   The "length" property of the Object function is 1𝔽.
```

<br/>

2에서 `Object` 생성자 함수에 인수를 전달하지 않거나 `undefined` 또는 `null`을 인수로 전달하면서 호출하면 내부적으로는 추상 연산 `OrdinaryObjectCreate`를 호출하여 `Object.prototype`을 프로토타입으로 갖는 빈 객체를 생성합니다.

<br/>

> **추상 연산(abract operation)**  
> 추상 연산은 ECMAScript 사양에서 내부 동작의 구현 알고리즘을 표현한 것입니다.  
> ECMAScript 사양에서 설명을 위해 사용되는 함수와 유사한 의사 코드라고 이해합시다.

<br/>

```javascript
// 2. Object 생성자 함수에 의한 객체 생성
// Object 생성자 함수는 new 연산자와 함께 호출하지 않아도 new 연산자와 함께 호출한 것과 동일하게 동작한다.
// 인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성한다.
let obj = new Object();
console.log(obj); // {}

// 1. new.target이 undefined나 Object가 아닌 경우
// 인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성된다.
class Foo extends Object {}
new Foo(); // Foo {}

// 3. 인수가 전달된 경우에는 인수를 객체로 변환한다.
// Number 객체 생성
obj = new Object(123);
console.log(obj); // Number {123}

// String  객체 생성
obj = new Object("123");
console.log(obj); // String {"123"}
```

<br/>

객체 리터럴이 평가될 때는 다음과 같이 추상 연산 `OrdinaryObjectCreate`를 호출하여 빈 객체를 생성하고 프로퍼티를 추가하도록 정의되어 있습니다.

<br/>

```markdown
13.2.6.4 Runtime Semantics: Evaluation
ObjectLiteral : { }

1. Return ! OrdinaryObjectCreate(%Object.prototype%).
   ObjectLiteral :
   { PropertyDefinitionList }
   { PropertyDefinitionList , }
1. Let obj be ! OrdinaryObjectCreate(%Object.prototype%).
1. Perform ? PropertyDefinitionEvaluation of PropertyDefinitionList with arguments obj and true.
1. Return obj.
```

<br/>

이처럼 `Object` 생성자 함수 호출과 객체 리터럴의 평가는 추상 연산 `OrdinaryObjectCreate`를 호출하여 빈 객체를 생성하는 점에서 동일하나 `new.target`의 확인이나 프로퍼티를 추가하는 처리 등 세부 내용은 다릅니다.  
따라서 객체 리터럴에 의해 생성된 객체는 `Object` 생성자 함수가 생성한 객체가 아닙니다.

함수 객체의 경우 차이가 더 명확합니다.  
`Function` 생성자 함수를 호출하여 생성한 함수는 렉시컬 스코프를 만들지 않고 전역 함수인 것처럼 스코프를 생성하며 클로저도 만들지 않습니다.  
따라서 함수 선언문과 함수 표현식을 평가하여 함수 객체를 생성한 것은 `Function` 생성자 함수가 아닙니다.  
하지만 `constructor` 프로퍼티를 통해 확인해보면 `foo` 함수의 생성자 함수는 `Function` 생성자 함수입니다.

<br/>

```javascript
// foo 함수는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성했다.
function foo() {}

// 하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수다.
console.log(foo.constructor === Function); // true
```

<br/>

리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요합니다.  
따라서 리터럴 표기법에 의해 생성된 객체도 가상적인 생성자 함수를 갖습니다.  
프로토타입은 생성자 함수와 더불어 생성되며 `prototype`, `contructor` 프로퍼티에 의해 연결되어 있기 때문입니다.

다시 말해, **프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍(pair)으로 존재합니다.**

리터럴 표기법(객체 리터럴, 함수 리터럴, 배열 리터럴, 정규 표현식 리터럴 등)에 의해 생성된 객체는 생성자 함수에 의해 생성된 객체는 아닙니다.  
하지만 큰 틀에서 생각해 보면 리터럴 표기법으로 생성한 객체도 생성자 함수로 생성한 객체와 본질적인 면에서 큰 차이는 없습니다.

예를 들어, 객체 리터럴에 의해 생성한 객체와 `Object` 생성자 함수에 의해 생성한 객체는 생성 과정에 미묘한 차이는 있지만 결국 객체로서 동일한 특성을 갖습니다.  
함수 리터럴에 의해 생성한 함수와 `Function` 생성자 함수에 의해 생성한 함수는 생성 과정과 스코프, 클로저 등의 차이가 있지만 결국 함수로서 동일한 특성을 갖습니다.

따라서 프로토타입의 `contructor` 프로퍼티를 통해 연결되어 있는 생성자 함수를 리터럴 표기법으로 생성한 객체를 생성한 생성자 함수로 생각해도 크게 무리는 없습니다.  
리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입은 다음과 같습니다.

<br/>

| 리터럴 표기법      | 생성자 함수 | 프로토타입           |
| ------------------ | ----------- | -------------------- |
| 객체 리터럴        | `Object`    | `Object.prototype`   |
| 함수 리터럴        | `Function`  | `Function.prototype` |
| 배열 리터럴        | `Array`     | `Array.prototype`    |
| 정규 표현식 리터럴 | `RegExp`    | `RegExp.prototype`   |

<br/><br/>

## 5. 프로토타입의 생성 시점

리터럴 표기법에 의해 생성된 객체도 생성자 함수와 연결되는 것을 살펴보았습니다.  
객체는 리터럴 표기법 또는 생성자 함수에 의해 생성되므로 결국 모든 객체는 생성자 함수와 연결되어 있습니다.

<br/>

> **Object.create 메서드와 클래스에 의한 객체 생성**  
> Object.create 메서드와 클래스로 객체를 생성하는 방법도 있습니다.  
> Object.create 메서드와 클래스로 생성한 객체도 생성자 함수와 연결되어 있습니다.

<br/>

**프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성됩니다.**  
프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재하기 때문입니다.

생성자 함수는 사용자가 직접 정의한 사용자 정의 생성자 함수와 자바스크립트가 기본 제공하는 빌트인 생성자 함수로 구분할 수 있습니다.  
사용자 정의 생성자 함수와 빌트인 생성자 함수를 구분하여 프로토타입 생성 시점에 대해 살펴봅시다.

<br/>

### 5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점

내부 메서드 [[Contruct]]를 갖는 함수 객체, 즉 화살표 함수나 ES6의 메서드 축약 표현으로 정의하지 않고 일반 함수(함수 선언문, 함수 표현식)로 정의한 함수 객체는 `new` 연산자와 함께 생성자 함수로서 호출할 수 있습니다.

**생성자 함수로서 호출할 수 있는 함수, 즉 `consturctor`는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성됩니다.**

<br/>

```javascript
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // {constructor: ƒ}

// 생성자 함수
function Person(name) {
  this.name = name;
}
```

<br/>

생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor는 프로토타입이 생성되지 않습니다.

<br/>

```javascript
// 화살표 함수는 non-constructor다.
const Person = (name) => {
  this.name = name;
};

// non-constructor는 프로토타입이 생성되지 않는다.
console.log(Person.prototype); // undefined
```

<br/>

함수 선언문은 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행됩니다.  
따라서 함수 선언문으로 정의된 `Person` 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 됩니다.  
이때 프로토타입도 더불어 생성됩니다.  
생성된 프로토타입은 `Person` 생성자 함수의 `prototype` 프로퍼티에 바인딩됩니다.

`Person` 생성자 함수와 더불어 생성된 프로토타입의 내부를 살펴봅시다.

```js
{constructor: ƒ}
 constructor: ƒ Person(name)
 [[Prototype]]: Object
```

생성된 프로토타입은 오직 `constructor` 프로퍼티만을 갖는 객체입니다.  
프로토타입도 객체이고 모든 객체는 프로토타입을 가지므로 프로토타입도 자신의 프로토타입을 갖습니다.  
생성된 프로토타입의 프로토타입은 `Object.prototype`입니다.

이처럼 빌트인 생성자 함수가 아닌 사용자 정의 생성자 함수는 자신이 평가되어 함수 객체로 생성되는 시점에 프로토타입도 더불어 생성되며, 생성된 프로토타입의 프로토타입은 언제나 `Object.prototype`입니다.

<br/>

### 5.2 빌트인 생성자 함수와 프로토타입 생성 시점

`Object`, `String`, `Number`, `Function`, `Array`, `RegExp`, `Date`, `Promise` 등과 같은 빌트인 생성자 함수도 일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성됩니다.  
모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성됩니다.  
생성된 프로토타입은 빌트인 생성자 함수의 `prototype` 프로퍼티에 바인딩됩니다.

<br/>

> **전역 객체(global object)**  
> 전역 객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 생성되는 특수한 객체입니다.  
> 전역 객체는 클라이언트 사이드 환경(브라우저)에서는 window, 서버 사이드 환경(Node.js)에서는 global 객체를 의미합니다.  
> 전역 객체는 표준 빌트인 객체(Object, String, Number, Function, Array...)들과 환경에 따른 호스트 객체(클라이언트 Web API 또는 Node.js의 호스트 API), 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖습니다.  
> Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 생성자 함수입니다.

<br/>

```javascript
// 전역 객체 window는 브라우저에 종속적이므로 아래 코드는 브라우저 환경에서 실행해야 한다.
// 빌트인 객체인 Object는 전역 객체 window의 프로퍼티다.
window.Object === Object; // true
```

<br/>

> 표준 빌트인 객체인 Object도 전역 객체의 프로퍼티이며, 전역 객체가 생성되는 시점에 생성됩니다.

<br/>

이처럼 객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재합니다.  
**이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 [[Prototype]] 내부 슬롯에 할당됩니다.**  
이로써 생성된 객체는 프로토타입을 상속받습니다.

<br/><br/>

## 6. 객체 생성 방식과 프로토타입의 결정

객체는 다음과 같이 다양한 생성 방법이 있습니다.

- 객체 리터럴
- `Object` 생성자 함수
- 생성자 함수
- `Object.create` 메서드
- 클래스(ES6)

<br/>

이처럼 다양한 방식으로 생성된 모든 객체는 각 방식마다 세부적인 객체 생성 방식의 차이는 있으나 추상 연산 `OrdinaryObjectCreate`에 의해 생성된다는 공통점이 있습니다.

추상 연산 `OrdinaryObjectCreate`는 필수적으로 자신이 생성할 객체의 프로토타입을 인수로 전달 받습니다.  
그리고 자신이 생성할 객체에 추가할 프로퍼티 목록을 옵션으로 전달할 수 있습니다.  
추상 연산 `OrdinaryObjectCreate`는 빈 객체를 생성한 후, 객체에 추가할 프로퍼티 목록이 인수로 전달된 경우 프로퍼티를 객체에 추가합니다.  
그리고 인수로 전달받은 프로토타입을 자신이 생성한 객체의 [[Prototype]] 내부 슬롯에 할당한 다음, 생성한 객체를 반환합니다.

즉, 프로토타입은 추상 연산 `OrdinaryObjectCreate`에 전달되는 인수에 의해 결정됩니다.  
이 인수는 객체가 생성되는 시점에 객체 생성 방식에 의해 결정됩니다.

<br/>

### 6.1 객체 리터럴에 의해 생성된 객체의 프로토타입

자바스크립트 엔진은 객체 리터럴을 평가하여 객체를 생성할 때 추상 연산 `OrdinaryObjectCreate`를 호출합니다.  
이때 추상 연산 `OrdinaryObjectCreate`에 전달되는 프로토타입은 `Object.prototype`입니다.  
즉, 객체 리터럴에 의해 생성되는 객체의 프로토타입은 `Object.prototype`입니다.

다음 예제를 살펴봅시다.

<br/>

```javascript
const obj = { x: 1 };
```

<br/>

위 객체 리터럴이 평가되면 추상 연산 `OrdinaryObjectCreate`에 의해 `Object` 생성자 함수와 `Object.prototype`과 생성된 객체 사이에 연결이 만들어집니다.

이처럼 객체 리터럴에 의해 생성된 `obj` 객체는 `Object.prototype`을 프로토타입으로 갖게 되며, 이로써 `Object.prototype`을 상속받습니다.  
`obj` 객체는 `constructor` 프로퍼티와 `hasOwnProperty` 메서드 등을 소유하지 않지만 자신의 프로토타입인 `Object.prototype`의 `consturctor` 프로퍼티와 `hasOwnProperty` 메서드를 자신의 자산인 것처럼 자유롭게 사용할 수 있습니다.  
이는 `obj` 객체가 자신의 프로토타입인 `Object.prototype` 객체를 상속받았기 때문입니다.

<br/>

```javascript
const obj = { x: 1 };

// 객체 리터럴에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty("x")); // true
```

<br/>

### 6.2 Object 생성자 함수에 의해 생성된 객체의 프로토타입

`Object` 생성자 함수를 인수 없이 호출하면 빈 객체가 생성됩니다.  
`Object` 생성자 함수를 호출하면 객체 리터럴과 마찬가지로 추상 연산 `OrdinaryObjectCreate`가 호출됩니다.  
이때 추상 연산 `OrdinaryObjectCreate`에 전달되는 프로토타입은 `Object.prototype`입니다.  
즉, `Object` 생성자 함수에 의해 생성되는 객체의 프로토타입은 `Object.prototype`입니다.

다음 예제를 살펴봅시다.

<br/>

```javascript
const obj = new Object();
obj.x = 1;
```

<br/>

위 코드가 실행되면 추상 연산 `OrdinaryObjectCreate`에 의해 `Object` 생성자 함수와 `Object.prototype`과 생성된 객체 사이에 연결이 만들어집니다.  
객체 리터럴에 의해 생성된 객체와 동일한 구조를 갖습니다.

이처럼 `Object` 생성자 함수에 의해 생성된 `obj` 객체는 `Object.prototype`을 프로토타입으로 갖게 되며, 이로써 `Object.prototype`을 상속받습니다.

<br/>

```javascript
const obj = new Object();
obj.x = 1;

// Object 생성자 함수에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty("x")); // true
```

<br/>

객체 리터럴과 `Object` 생성자 함수에 의한 객체 생성 방식의 차이는 프로퍼티를 추가하는 방식에 있습니다.  
객체 리터럴 방식은 객체 리터럴 내부에 프로퍼티를 추가하지만 `Object` 생성자 함수 방식은 일단 빈 객체를 생성한 이후 프로퍼티를 추가해야 합니다.

<br/>

### 6.3 생성자 함수에 의해 생성된 객체의 프로토타입

`new` 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면 다른 객체 생성 방식과 마찬가지로 추상 연산 `OrdinaryObjectCreate`가 호출됩니다.  
이때 추상 연산 `OrdinaryObjectCreate`에 전달되는 프로토타입은 생성자 함수의 `prototype` 프로퍼티에 바인딩되어 있는 객체입니다.  
즉, 생성자 함수에 의해 생성되는 객체의 프로토타입은 생성자 함수의 `prototype` 프로퍼티에 바인딩되어 있는 객체입니다.

다음 예제를 살펴봅시다.

<br/>

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");
```

<br/>

위 코드가 실행되면 추상 연산 `OrdinaryObjectCreate`에 의해 다음과 같이 생성자 함수와 생성자 함수의 `prototype` 프로퍼티에 바인딩되어 있는 객체와 생성된 객체 사이에 연결이 만들어집니다.

표준 빌트인 객체인 `Object` 생성자 함수와 더불어 생성된 프로토타입 `Object.prototype`은 다양한 빌트인 메서드(`hasOwnProperty`, `propertyIsEnumerable` 등)를 갖고 있습니다.  
하지만 사용자 정의 생성자 함수 Person과 더불어 생성된 프로토타입 Person.prototype의 프로퍼티는 constructor뿐입니다.

프로토타입 `Person.prototype`에 프로퍼티를 추가하여 하위(자식) 객체가 상속받을 수 있도록 구현해봅시다.  
프로토타입은 객체입니다.  
따라서 일반 객체와 같이 프로토타입에도 프로퍼티를 추가/삭제할 수 있습니다.  
그리고 이렇게 추가/삭제된 프로퍼티는 프로퍼티 체인에 즉각 반영됩니다.

<br/>

```javascript
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person("Lee");
const you = new Person("Kim");

me.sayHello(); // Hi! My name is Lee
you.sayHello(); // Hi! My name is Kim
```

<br/>

`Person` 생성자 함수를 통해 생성된 모든 객체는 프로토타입에 추가된 `sayHello` 메서드를 상속받아 자신의 메서드처럼 사용할 수 있습니다.

<br/><br/>

## 7. 프로토타입 체인

다음 예제를 살펴봅시다.

<br/>

```javascript
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person("Lee");

// hasOwnProperty는 Object.prototype의 메서드다.
console.log(me.hasOwnProperty("name")); // true
```

<br/>

`Person` 생성자 함수에 의해 생성된 `me` 객체는 `Object.prototype`의 메서드인 `hasOwnProperty`를 호출할 수 있습니다.  
이것은 `me` 객체가 `Person.prototype`뿐만 아니라 `Object.prototype`도 상속받았다는 것을 의미합니다.  
`me` 객체의 프로토타입은 `Person.prototype`입니다.

<br/>

```javascript
Object.getPrototypeOf(me) === Person.prototype; // -> true
```

<br/>

`Person.prototype`의 프로토타입은 `Object.prototype`입니다.  
프로토타입의 프로토타입은 언제나 `Object.prototype`입니다.

<br/>

```javascript
Object.getPrototypeOf(Person.prototype) === Object.prototype; // -> true
```

<br/>

**자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색합니다.**  
**이를 프로토타입 체인이라 합니다.**  
**프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘입니다.**

<br/>

```javascript
// hasOwnProperty는 Object.prototype의 메서드다.
// me 객체는 프로토타입 체인을 따라 hasOwnProperty 메서드를 검색하여 사용한다.
me.hasOwnProperty("name"); // -> true
```

<br/>

`me.hasOwnProperty('name')`과 같이 메서드를 호출하면 자바스크립트 엔진은 다음과 같은 과정을 거쳐 메서드를 검색합니다.  
물론 프로퍼티를 참조하는 경우도 마찬가지입니다.

1.  먼저 `hasOwnProperty` 메서드를 호출한 `me` 객체에서 `hasOwnProperty` 메서드를 검색합니다. `me` 객체에는 `hasOwnProperty` 메서드가 없으므로 프로토타입 체인을 따라, 다시 말해 [[Prototype]] 내부 슬롯에 바인딩되어 있는 프로토타입(위 예제의 경우 `Person.prototype`)으로 이동하여 `hasOwnProperty` 메서드를 검색합니다.
2.  `Person.prototype`에도 `hasOwnProperty` 메서드가 없으므로 프로토타입 체인을 따라, 다시 말해 [[Prototype]] 내부 슬롯에 바인딩되어 있는 프로토타입(위 예제의 경우 `Object.prototype`)으로 이동하여 `hasOwnProperty` 메서드를 검색합니다.
3.  `Object.prototype`에는 `hasOwnProperty` 메서드가 존재합니다. 자바스크립트 엔진은 `Object.prototype.hasOwnProperty` 메서드를 호출합니다. 이때 `Object.prototype.hasOwnProperty` 메서드의 `this`에는 `me` 객체가 바인딩됩니다.

<br/>

```javascript
Object.prototype.hasOwnProperty.call(me, "name");
```

<br/>

> **call 메서드**  
> call 메서드는 this로 사용할 객체를 전달하면서 함수를 호출합니다.

<br/>

프로토타입 체인의 최상위에 위치하는 객체는 언제나 `Object.prototype`입니다.  
따라서 모든 객체는 `Object.prototype`을 상속받습니다.  
**`Object.prototype`을 프로토타입 체인의 종점(end of prototype chain)** 이라 합니다.  
`Object.prototype`의 프로토타입, 즉 [[Prototype]] 내부 슬롯의 값은 `null`입니다.

프로토타입 체인의 종점인 `Object.prototype`에서도 프로퍼티를 검색할 수 없는 경우 `undefined`를 반환합니다.  
이때 에러가 발생하지 않는 것에 주의합시다.

<br/>

```javascript
console.log(me.foo); // undefined
```

<br/>

이처럼 자바스크립트 엔진은 프로토타입 체인을 따라 프로퍼티/메서드를 검색합니다.  
다시 말해, 자바스크립트 엔진은 객체 간의 상속 관계로 이루어진 프로토타입의 계층적인 구조에서 객체의 프로퍼티를 검색합니다.  
따라서 **프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘** 이라고 할 수 있습니다.

이에 반해, 프로퍼티가 아닌 식별자는 스코프 체인에서 검색합니다.  
다시 말해, 자바스크립트 엔진은 함수의 중첩 관계로 이루어진 스코프의 계층적 구조에서 식별자를 검색합니다.  
따라서 **스코프 체인은 식별자 검색을 위한 메커니즘** 이라고 할 수 있습니다.

<br/>

```javascript
me.hasOwnProperty("name");
```

<br/>

위 예제의 경우, 먼저 스코프 체인에서 `me` 식별자를 검색합니다.  
`me` 식별자는 전역에서 선언되었으므로 전역 스코프에서 검색됩니다.  
`me` 식별자를 검색한 다음, `me` 객체의 프로토타입 체인에서 `hasOwnProperty` 메서드를 검색합니다.

이처럼 **스코프 체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용됩니다.**

<br/><br/>

## 8. 오버라이딩과 프로퍼티 섀도잉

다음 예제를 살펴봅시다.

<br/>

```javascript
const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 생성자 함수를 반환
  return Person;
})();

const me = new Person("Lee");

// 인스턴스 메서드
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};

// 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
me.sayHello(); // Hey! My name is Lee
```

<br/>

생성자 함수로 객체(인스턴스)를 생성한 다음, 인스턴스에 메서드를 추가했습니다.

프로토타입이 소유한 프로퍼티(메서드 포함)를 프로토타입 프로퍼티, 인스턴스가 소유한 프로퍼티를 인스턴스 프로퍼티라고 부릅니다.

프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 프로토타입 체인을 따라 프로토타입 프로퍼티를 검색하여 프로토타입 프로퍼티를 덮어쓰는 것이 아니라 인스턴스 프로퍼티로 추가합니다.  
이때 인스턴스 메서드 `sayHello`는 프로토타입 메서드 `sayHello`를 오버라이딩했고 프로토타입 메서드 `sayHello`는 가려집니다.  
이처럼 상속 관계에 의해 프로퍼티가 가려지는 현상을 프로퍼티 섀도잉(property shadowing)이라 합니다.

<br/>

> **오버라이딩(overriding)**  
> 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식입니다.

<br/>

> **오버로딩(overloading)**  
> 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식입니다.  
> 자바스크립트는 오버로딩을 지원하지 않지만 arguments 객체를 사용하여 구현할 수는 있습니다.

<br/>

프로퍼티를 삭제하는 경우도 마찬가지입니다.  
위 예제에서 추가한 인스턴스 메서드 `sayHello`를 삭제해봅시다.

<br/>

```javascript
// 인스턴스 메서드를 삭제한다.
delete me.sayHello;
// 인스턴스에는 sayHello 메서드가 없으므로 프로토타입 메서드가 호출된다.
me.sayHello(); // Hi! My name is Lee
```

<br/>

당연히 프로토타입 메서드가 아닌 인스턴스 메서드 `sayHello`가 삭제됩니다.  
다시 한번 `sayHello` 메서드를 삭제하여 프로토타입 메서드의 삭제를 시도해봅시다.

<br/>

```javascript
// 프로토타입 체인을 통해 프로토타입 메서드가 삭제되지 않는다.
delete me.sayHello;
// 프로토타입 메서드가 호출된다.
me.sayHello(); // Hi! My name is Lee
```

<br/>

이와 같이 하위 객체를 통해 프로토타입의 프로퍼티를 변경 또는 삭제하는 것은 불가능합니다.  
다시 말해 하위 객체를 통해 프로토타입에 `get` 엑세스는 허용되나 `set` 엑세스는 허용되지 않습니다.

프로토타입 프로퍼티를 변경 또는 삭제하려면 하위 객체를 통해 프로토타입 체인으로 접근하는 것이 아니라 프로토타입에 직접 접근해야 합니다.

<br/>

```javascript
// 프로토타입 메서드 변경
Person.prototype.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};
me.sayHello(); // Hey! My name is Lee

// 프로토타입 메서드 삭제
delete Person.prototype.sayHello;
me.sayHello(); // TypeError: me.sayHello is not a function
```

<br/><br/>

## 9. 프로토타입의 교체

프로토타입은 임의의 다른 객체로 변경할 수 있습니다.  
이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미합니다.  
이러한 특징을 활용하여 객체 간의 상속 관계를 동적으로 변경할 수 있습니다.  
프로토타입은 생성자 함수 또는 인스턴스에 의해 교체할 수 있습니다.

<br/>

### 9.1 생성자 함수에 의한 프로토타입의 교체

다음 예제를 살펴봅시다.

<br/>

```javascript
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // ① 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person("Lee");
```

<br/>

①에서 `Person.prototype`에 객체 리터럴을 할당했습니다.  
이는 `Person` 생성자 함수가 생성할 객체의 프로토타입을 객체 리터럴로 교체한 것입니다.

프로토타입으로 교체한 객체 리터럴에는 `consturctor` 프로퍼티가 없습니다.  
`constructor` 프로퍼티는 자바스크립트 엔진이 프로토타입을 생성할 때 암묵적으로 추가한 프로퍼티입니다.  
따라서 `me` 객체의 생성자 함수를 검색하면 `Person`이 아닌 `Object`가 나옵니다.

<br/>

```javascript
// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true
```

<br/>

이처럼 프로토타입을 교체하면 `consturctor` 프로퍼티와 생성자 함수 간의 연결이 파괴됩니다.  
파괴된 `consturctor` 프로퍼티와 생성자 함수 간의 연결을 되살려 봅시다.  
프로토타입으로 교체한 객체 리터럴에 `consturctor` 프로퍼티를 추가하여 프로토타입의 `consturctor` 프로퍼티를 되살립니다.

```javascript
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
    constructor: Person,
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person("Lee");

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false
```

<br/>

### 9.2 인스턴스에 의한 프로토타입의 교체

프로토타입은 생성자 함수의 `prototype` 프로퍼티뿐만 아니라 인스턴스의 `__proto__` 접근자 프로퍼티(또는 `Object.getPrototypeOf` 메서드)를 통해 접근할 수 있습니다.  
따라서 인스턴스의 `__proto__` 접근자 프로퍼티(또는 `Object.setPrototypeOf` 메서드)를 통해 프로토타입을 교체할 수 있습니다.

생성자 함수의 `prototype` 프로퍼티에 다른 임의의 객체를 바인딩하는 것은 미래에 생성할 인스턴스의 프로토타입을 교체하는 것입니다.  
`__proto__` 접근자 프로퍼티를 통해 프로토타입을 교체하는 것은 이미 생성된 객체의 프로토타입을 교체하는 것입니다.

다음 예제를 살펴봅시다.

<br/>

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체
const parent = {
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

// ① me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee
```

<br/>

①에서 `me` 객체의 프로토타입을 `parent` 객체로 교체했습니다.  
프로토타입으로 교체한 객체에는 `consturctor` 프로퍼티가 없으므로 `consturctor` 프로퍼티와 생성자 함수 간의 연결이 파괴됩니다.  
따라서 프로토타입의 `consturctor` 프로퍼티로 `me` 객체의 생성자 함수를 검색하면 `Person`이 아닌 `Object`가 나옵니다.

<br/>

```javascript
// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true
```

<br/>

생성자 함수에 의한 프로토타입 교체와 인스턴스에 의한 프로토타입 교체는 별다른 차이가 없어 보입니다.  
하지만 미묘한 차이가 있습니다.  
생성자 함수에 의한 프로토타입 교체는 `Person` 생성자 함수의 `prototype` 프로퍼티가 교체된 프로토타입을 가르킵니다.  
인스턴스에 의한 프로토타입 교체는 `Person` 생성자 함수의 `prototype` 프로퍼티가 교체된 프로토타입을 가리키지 않습니다.

프로토타입으로 교체한 객체 리터럴에 `consturctor` 프로퍼티를 추가하고 생성자 함수의 `prototype` 프로퍼티를 재설정하여 파괴된 생성자 함수와 프로토타입 간의 연결을 되살려 봅시다.

<br/>

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체
const parent = {
  // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
  constructor: Person,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false

// 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다.
console.log(Person.prototype === Object.getPrototypeOf(me)); // true
```

<br/>

이처럼 프로토타입 교체를 통해 객체 간의 상속 관계를 동적으로 변경하는 것은 꽤나 번거롭습니다.  
따라서 프로토타입은 직접 교체하지 않는 것이 좋습니다.  
상속 관계를 인위적으로 설정하려면 직접 상속이 더 편리하고 안전합니다.  
또는 ES6에서 도입된 클래스를 사용하면 간편하고 직관적으로 상속 관계를 구현할 수 있습니다.

<br/><br/>

## 10. instanceof 연산자

`instanceof` 연산자는 이항 연산자로서 좌변에 객체를 가리키는 식별자, 우변에 생성자 함수를 가리키는 식별자를 피연산자로 받습니다.  
만약 우변의 피연산자가 함수가 아닌 경우 `TypeError`가 발생합니다.

<br/>

```js
객체 instanceof 생성자 함수
```

<br/>

**우변의 생성자 함수의 `prototype`에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 `true`로 평가되고, 그렇지 않은 경우에는 `false`로 평가됩니다.**

<br/>

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

<br/>

`instanceof` 연산자가 어떻게 동작하는지 이해하기 위해 프로토타입을 교체해 봅시다.

<br/>

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체
const parent = {};

// 프로토타입의 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않기 때문에 false로 평가된다.
console.log(me instanceof Person); // false

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

<br/>

`me` 객체는 비록 프로토타입이 교체되어 프로토타입과 생성자 함수 간의 연결이 파괴되었지만 `Person` 생성자 함수에 의해 생성된 인스턴스임에는 틀림이 없습니다.  
그러나 `me instanceof Person`은 `false`로 평가됩니다.

이는 `Person.prototype`이 `me` 객체의 프로토타입 체인 상에 존재하지 않기 때문입니다.  
따라서 프로토타입으로 교체한 `parent` 객체를 `Person` 생성자 함수의 `prototype` 프로퍼티에 바인딩하면 `me instanceof Person`은 `true`로 평가될 것입니다.

<br/>

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체
const parent = {};

// 프로토타입의 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

// parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩한다.
Person.prototype = parent;

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

<br/>

이처럼 `instanceof` 연산자는 프로토타입의 `contructor` 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니라 **생성자 함수의 `prototype`에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인합니다.**

`me instanceof Person`의 경우 `me` 객체의 프로토타입 체인 상에 `Person.prototype`에 바인딩된 객체가 존재하는지 확인합니다.  
`me instanceof Object`의 경우도 마찬가지입니다.  
`me` 객체의 프로토타입 체인 상에 `Object.prototype`에 바인딩된 객체가 존재하는지 확인합니다.

`instanceof` 연산자를 함수로 표현하면 다음과 같습니다.

<br/>

```javascript
function isInstanceof(instance, constructor) {
  // 프로토타입 취득
  const prototype = Object.getPrototypeOf(instance);

  // 재귀 탈출 조건
  // prototype이 null이면 프로토타입 체인의 종점에 다다른 것이다.
  if (prototype === null) return false;

  // 프로토타입이 생성자 함수의 prototype 프로퍼티에 바인딩된 객체라면 true를 반환한다.
  // 그렇지 않다면 재귀 호출로 프로토타입 체인 상의 상위 프로토타입으로 이동하여 확인한다.
  return (
    prototype === constructor.prototype || isInstanceof(prototype, constructor)
  );
}

console.log(isInstanceof(me, Person)); // true
console.log(isInstanceof(me, Object)); // true
console.log(isInstanceof(me, Array)); // false
```

<br/>

따라서 생성자 함수에 의해 프로토타입이 교체되어 `consturctor` 프로퍼티와 생성자 함수 간의 연결이 파괴되어도 생성자 함수의 `prototype` 프로퍼티와 프로토타입 간의 연결은 파괴되지 않으므로 `instanceof`는 아무런 영향을 받지 않습니다.

<br/>

```javascript
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person("Lee");

// constructor 프로퍼티와 생성자 함수 간의 연결은 파괴되어도 instanceof는 아무런 영향을 받지 않는다.
console.log(me.constructor === Person); // false

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true
// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

<br/><br/>

## 11. 직접 상속

### 11.1 Object.create에 의한 직접 상속

`Object.create` 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성합니다.  
`Object.create` 메서드도 다른 객체 생성 방식과 마찬가지로 추상 연산 `OrdinaryObjectCreate`를 호출합니다.

`Object.create` 메서드의 첫 번째 매개변수에는 생성할 객체의 프로토타입으로 지정할 객체를 전달합니다.  
두 번째 매개변수에는 생성할 객체의 프로퍼티 키와 디스크립터 객체로 이뤄진 객체를 전달합니다.  
이 객체의 형식은 `Object.defineProperties` 메서드의 두 번째 인수와 동일합니다.  
두 번째 인수는 옵션이므로 생략 가능합니다.

<br/>

```javascript
// 프로토타입이 null인 객체를 생성한다. 생성된 객체는 프로토타입 체인의 종점에 위치한다.
// obj → null
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null); // true
// Object.prototype을 상속받지 못한다.
console.log(obj.toString()); // TypeError: obj.toString is not a function

// obj → Object.prototype → null
// obj = {};와 동일하다.
obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// obj → Object.prototype → null
// obj = { x: 1 };와 동일하다.
obj = Object.create(Object.prototype, {
  x: { value: 1, writable: true, enumerable: true, configurable: true },
});
// 위 코드는 다음과 동일하다.
// obj = Object.create(Object.prototype);
// obj.x = 1;
console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

const myProto = { x: 10 };
// 임의의 객체를 직접 상속받는다.
// obj → myProto → Object.prototype → null
obj = Object.create(myProto);
console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto); // true

// 생성자 함수
function Person(name) {
  this.name = name;
}

// obj → Person.prototype → Object.prototype → null
// obj = new Person('Lee')와 동일하다.
obj = Object.create(Person.prototype);
obj.name = "Lee";
console.log(obj.name); // Lee
console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
```

<br/>

이처럼 `Object.create` 메서드는 첫 번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성합니다.  
즉, 객체를 생성하면서 직접적으로 상속을 구현하는 것입니다.

이 메서드의 장점은 다음과 같습니다.

- `new` 연산자가 없이도 객체를 생성할 수 있습니다.
- 프로토타입을 지정하면서 객체를 생성할 수 있습니다.
- 객체 리터럴에 의해 생성된 객체도 상속받을 수 있습니다.

<br/>

참고로 `Object.prototype`의 빌트인 메서드인 `Object.prototype.hasOwnProperty`, `Object.prototype.isPrototypeOf`, `Object.prototype.propertyIsEnumerable` 등은 모든 객체의 프로토타입 체인의 종점, 즉 Object.prototype의 메서드이므로 모든 객체가 상속받아 호출할 수 있습니다.

<br/>

```javascript
const obj = { a: 1 };

obj.hasOwnProperty("a"); // -> true
obj.propertyIsEnumerable("a"); // -> true
```

<br/>

그런데 ESLint에서는 앞의 예제와 같이 `Object.prototype`의 빌트인 메서드를 객체가 직접 호출하는 것을 권장하지 않습니다.  
그 이유는 `Object.create` 메서드를 통해 프로토타입 체인의 종점에 위치하는 객체를 생성할 수 있기 때문입니다.  
프로토타입 체인의 종점에 위치하는 객체는 `Object.prototype`의 빌트인 메서드를 사용할 수 없습니다.

<br/>

```javascript
// 프로토타입이 null인 객체, 즉 프로토타입 체인의 종점에 위치하는 객체를 생성한다.
const obj = Object.create(null);
obj.a = 1;

console.log(Object.getPrototypeOf(obj) === null); // true

// obj는 Object.prototype의 빌트인 메서드를 사용할 수 없다.
console.log(obj.hasOwnProperty("a")); // TypeError: obj.hasOwnProperty is not a function
```

<br/>

따라서 이 같은 에러를 발생시킬 위험을 없애기 위해 `Object.prototype`의 빌트인 메서드는 다음과 같이 간접적으로 호출하는 것이 좋습니다.

<br/>

```javascript
// 프로토타입이 null인 객체를 생성한다.
const obj = Object.create(null);
obj.a = 1;

// console.log(obj.hasOwnProperty('a')); // TypeError: obj.hasOwnProperty is not a function

// Object.prototype의 빌트인 메서드는 객체로 직접 호출하지 않는다.
console.log(Object.prototype.hasOwnProperty.call(obj, "a")); // true
```

<br/>

### 11.2 객체 리터럴 내부에서 \_\_proto\_\_에 의한 직접 상속

`Object.create` 메서드에 의한 직접 상속은 앞에서 다룬 것과 같이 여러 장점이 있습니다.  
하지만 두 번째 인자로 프로퍼티를 정의하는 것은 번거롭습니다.  
일단 객체를 생성한 이후 프로퍼티를 추가하는 방법도 있으나 이 또한 깔끔한 방법은 아닙니다.

ES6에서는 객체 리터럴 내부에서 `__proto__` 접근자 프로퍼티를 사용하여 직접 상속을 구현할 수 있습니다.

<br/>

```javascript
const myProto = { x: 10 };

// 객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속받을 수 있다.
const obj = {
  y: 20,
  // 객체를 직접 상속받는다.
  // obj → myProto → Object.prototype → null
  __proto__: myProto,
};
/* 위 코드는 아래와 동일하다.
const obj = Object.create(myProto, {
  y: { value: 20, writable: true, enumerable: true, configurable: true }
});
*/

console.log(obj.x, obj.y); // 10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true
```

<br/><br/>

## 12. 정적 프로퍼티/메서드

정적(static) 프로퍼티/메서드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드를 말합니다.

다음 예제를 살펴봅시다.

<br/>

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

// 정적 프로퍼티
Person.staticProp = "static prop";

// 정적 메서드
Person.staticMethod = function () {
  console.log("staticMethod");
};

const me = new Person("Lee");

// 생성자 함수에 추가한 정적 프로퍼티/메서드는 생성자 함수로 참조/호출한다.
Person.staticMethod(); // staticMethod

// 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
// 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입 체인 상에 존재해야 한다.
me.staticMethod(); // TypeError: me.staticMethod is not a function
```

<br/>

`Person` 생성자 함수는 객체이므로 자신의 프로퍼티/메서드를 소유할 수 있습니다.  
`Person` 생성자 함수 객체가 소유한 프로퍼티/메서드를 정적 프로퍼티/메서드라고 합니다.  
정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없습니다.

생성자 함수가 생성한 인스턴스는 자신의 프로토타입 체인에 속한 객체의 프로퍼티/메서드에 접근할 수 있습니다.  
하지만 정적 프로퍼티/메서드는 인스턴스의 프로토타입 체인에 속한 객체의 프로퍼티/메서드가 아니므로 인스턴스로 접근할 수 없습니다.

앞에서 살펴본 `Object.create` 메서드는 `Object` 생성자 함수의 정적 메서드고 `Object.prototype.hasOwnProperty` 메서드는 `Object.prototype`의 메서드입니다.  
따라서 `Object.create` 메서드는 인스턴스, 즉 `Object` 생성자 함수가 생성한 객체로 호출할 수 없습니다.  
하지만 `Object.prototype.hasOwnProperty` 메서드는 모든 객체의 프로토타입 체인의 종점, 즉 `Object.prototype`의 메서드이므로 모든 객체가 호출할 수 있습니다.

<br/>

```javascript
// Object.create는 정적 메서드다.
const obj = Object.create({ name: "Lee" });

// Object.prototype.hasOwnProperty는 프로토타입 메서드다.
obj.hasOwnProperty("name"); // -> false
```

<br/>

만약 인스턴스/프로토타입 메서드 내에서 `this`를 사용하지 않는다면 그 메서드는 정적 메서드로 변경할 수 있습니다.  
인스턴스가 호출한 인스턴스/프로토타입 메서드 내에서 `this`는 인스턴스를 가리킵니다.  
메서드 내에서 인스턴스를 참조할 필요가 없다면 정적 메서드로 변경하여도 동작합니다.  
프로토타입 메서드를 호출하려면 인스턴스를 생성해야 하지만 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있습니다.

<br/>

```javascript
function Foo() {}

// 프로토타입 메서드
// this를 참조하지 않는 프로토타입 메소드는 정적 메서드로 변경해도 동일한 효과를 얻을 수 있다.
Foo.prototype.x = function () {
  console.log("x");
};

const foo = new Foo();
// 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 한다.
foo.x(); // x

// 정적 메서드
Foo.x = function () {
  console.log("x");
};

// 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다.
Foo.x(); // x
```

<br/>

MDN과 같은 문서를 보면 다음과 같이 정적 프로퍼티/메서드와 프로토타입 프로퍼티/메서드를 구분하여 소개하고 있습니다.  
따라서 표기법만으로도 정적 프로퍼티/메서드와 프로토타입 프로퍼티/메서드를 구변할 수 있어야 합니다.

참고로 프로토타입 프로퍼티/메서드를 표기할 때 `prototype`을 #으로 표기(예를 들어, `Object.prototype.isPrototypeOf`를 `Object#isPrototypeOf`으로 표기)하는 경우도 있으니 알아두도록 합시다.

<br/><br/>

## 13. 프로퍼티 존재 확인

### 13.1 in 연산자

`in` 연산자는 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인합니다.

<br/>

```javascript
const person = {
  name: "Lee",
  address: "Seoul",
};

// person 객체에 name 프로퍼티가 존재한다.
console.log("name" in person); // true
// person 객체에 address 프로퍼티가 존재한다.
console.log("address" in person); // true
// person 객체에 age 프로퍼티가 존재하지 않는다.
console.log("age" in person); // false
```

<br/>

`in` 연산자는 확인 대상 객체(위 예제의 경우 `person` 객체)의 프로퍼티뿐만 아니라 확인 대상 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인하므로 주의가 필요합니다.  
`person` 객체에는 `toString`이라는 프로퍼티가 없지만 다음 코드의 실행 결과는 `true`입니다.

<br/>

```javascript
console.log("toString" in person); // true
```

<br/>

이는 `in` 연산자가 `person` 객체가 속한 프로토타입 체인 상에 존재하는 모든 프로토타입에서 `toString` 프로퍼티를 검색했기 때문입니다.  
`toString`은 `Object.prototype`의 메서드입니다.

`in` 연산자 대신 ES6에서 도입된 `Reflect.has` 메서드를 사용할 수도 있습니다.  
`Reflect.has` 메서드는 `in` 연산자와 동일하게 동작합니다.

<br/>

```javascript
const person = { name: "Lee" };

console.log(Reflect.has(person, "name")); // true
console.log(Reflect.has(person, "toString")); // true
```

<br/>

### 13.2 Object.prototype.hasOwnProperty 메서드

`Object.prototype.hasOwnProperty` 메서드를 사용해도 객체에 특정 프로퍼티가 존재하는지 확인할 수 있습니다.

<br/>

```javascript
console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("age")); // false
```

<br/>

`Object.prototype.hasOwnProperty` 메서드는 이름에서 알 수 있듯이 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환하고 상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환합니다.

<br/>

```javascript
console.log(person.hasOwnProperty("toString")); // false
```

<br/><br/>

## 14. 프로퍼티 열거

### 14.1 for...in 문

객체의 모든 프로퍼티를 순회하며 열거(enumeration)하려면 `for...in` 문을 사용합니다.

for (변수선언문 in 객체) {...}

<br/>

```javascript
const person = {
  name: "Lee",
  address: "Seoul",
};

// for...in 문의 변수 prop에 person 객체의 프로퍼티 키가 할당된다.
for (const key in person) {
  console.log(key + ": " + person[key]);
}
// name: Lee
// address: Seoul
```

<br/>

`for...in` 문은 객체의 프로퍼티 개수만큼 순회하며 `for...in` 문의 변수 선언문에서 선언한 변수에 프로퍼티 키를 할당합니다.  
위 예제의 경우 `person` 객체에는 2개의 프로퍼티가 있으므로 객체를 2번 순회하면서 프로퍼티 키를 `key` 변수에 할당한 후 코드 블록을 실행합니다.  
첫 번째 순회에서는 프로퍼티 키 `'name'`을 `key` 변수에 할당한 후 코드 블록을 실행하고 두 번째 순회에서는 프로퍼티 키 `'address'`를 `key` 변수에 할당한 후 코드 블록을 실행합니다.

`for...in` 문은 `in` 연산자처럼 순회 대상 객체의 프로퍼티뿐만 아니라 상속받은 프로토타입의 프로퍼티까지 열거합니다.  
하지만 위 예제의 경우 `toString`과 같은 `Object.prototype`의 프로퍼티가 열거되지 않습니다.

<br/>

```javascript
const person = {
  name: "Lee",
  address: "Seoul",
};

// in 연산자는 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인한다.
console.log("toString" in person); // true

// for...in 문도 객체가 상속받은 모든 프로토타입의 프로퍼티를 열거한다.
// 하지만 toString과 같은 Object.prototype의 프로퍼티가 열거되지 않는다.
for (const key in person) {
  console.log(key + ": " + person[key]);
}

// name: Lee
// address: Seoul
```

<br/>

이는 `toString` 메서드가 열거할 수 없도록 정의되어 있는 프로퍼티이기 때문입니다.  
다시 말해, `Object.prototype.toString` 프로퍼티의 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 `false`이기 때문입니다.  
프로퍼티 어트리뷰트 [[Enumerable]]은 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 갖습니다.

<br/>

```javascript
// Object.getOwnPropertyDescriptor 메서드는 프로퍼티 디스크립터 객체를 반환한다.
// 프로퍼티 디스크립터 객체는 프로퍼티 어트리뷰트 정보를 담고 있는 객체다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "toString"));
// {value: ƒ, writable: true, enumerable: false, configurable: true}
```

<br/>

따라서 `for...in` 문에 대해 좀 더 정확히 표현하면 아래와 같습니다.

**`for...in` 문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 `true`인 프로퍼티를 순회하며 열거(enumeration)합니다.**

<br/>

```javascript
const person = {
  name: "Lee",
  address: "Seoul",
  __proto__: { age: 20 },
};

for (const key in person) {
  console.log(key + ": " + person[key]);
}
// name: Lee
// address: Seoul
// age: 20
```

<br/>

`for...in` 문은 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않습니다.

<br/>

```javascript
const sym = Symbol();
const obj = {
  a: 1,
  [sym]: 10,
};

for (const key in obj) {
  console.log(key + ": " + obj[key]);
}
// a: 1
```

<br/>

상속받은 프로퍼티는 제외하고 객체 자신의 프로퍼티만 열거하려면 `Object.prototype.hasOwnProperty` 메서드를 사용하여 객체 자신의 프로퍼티인지 확인해야 합니다.

<br/>

```javascript
const person = {
  name: "Lee",
  address: "Seoul",
  __proto__: { age: 20 },
};

for (const key in person) {
  // 객체 자신의 프로퍼티인지 확인한다.
  if (!person.hasOwnProperty(key)) continue;
  console.log(key + ": " + person[key]);
}
// name: Lee
// address: Seoul
```

<br/>

위 예제의 결과는 `person` 객체의 프로퍼티가 정의된 순서대로 열거되었습니다.  
하지만 `for...in` 문은 프로퍼티를 열거할 때 순서를 보장하지 않으므로 주의하기 바랍니다.  
하지만 대부분의 모던 브라우저는 순서를 보장하고 숫자(사실은 문자열)인 프로퍼티 키에 대해서는 정렬을 실시합니다.

<br/>

```javascript
const obj = {
  2: 2,
  3: 3,
  1: 1,
  b: "b",
  a: "a",
};

for (const key in obj) {
  if (!obj.hasOwnProperty(key)) continue;
  console.log(key + ": " + obj[key]);
}

/*
1: 1
2: 2
3: 3
b: b
a: a
*/
```

<br/>

배열에는 `for...in` 문을 사용하지 말고 일반적인 `for` 문이나 `for...of` 문 또는 `Array.prototype.forEach` 메서드를 사용하기를 권장합니다.  
사실 배열도 객체이므로 프로퍼티와 상속받은 프로퍼티가 포함될 수 있습니다.

<br/>

```javascript
const arr = [1, 2, 3];
arr.x = 10; // 배열도 객체이므로 프로퍼티를 가질 수 있다.

for (const i in arr) {
  // 프로퍼티 x도 출력된다.
  console.log(arr[i]); // 1 2 3 10
}

// arr.length는 3이다.
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1 2 3
}

// forEach 메서드는 요소가 아닌 프로퍼티는 제외한다.
arr.forEach((v) => console.log(v)); // 1 2 3

// for...of는 변수 선언문에서 선언한 변수에 키가 아닌 값을 할당한다.
for (const value of arr) {
  console.log(value); // 1 2 3
}
```

<br/>

### 14.2 Object.keys/values/entries 메서드

지금까지 살펴보았듯이 `for...in`문은 객체 자신의 고유 프로퍼티뿐 아니라 상속받은 프로퍼티도 열거합니다.  
따라서 `Object.prototype.hasOwnProperty` 메서드를 사용하여 객체 자신의 프로퍼티인지 확인하는 추가 처리가 필요합니다.

객체 자신의 고유 프로퍼티만 열거하기 위해서는 `for...in` 문을 사용하는 것보다 `Object.keys/values/entries` 메서드를 사용하는 것을 권장합니다.

`Object.keys` 메서드는 객체 자신의 열거 가능한(enumerable) 프로퍼티 키를 배열로 반환합니다.

<br/>

```javascript
const person = {
  name: "Lee",
  address: "Seoul",
  __proto__: { age: 20 },
};

console.log(Object.keys(person)); // ["name", "address"]
```

<br/>

ES8에서 도입된 `Object.values` 메서드는 객체 자신의 열거 가능한 프로퍼티 값을 배열로 반환합니다.

<br/>

```javascript
console.log(Object.values(person)); // ["Lee", "Seoul"]
```

<br/>

ES8에서 도입된 `Object.entries` 메서드는 객체 자신의 열거 가능한 프로퍼티 키와 값의 쌍의 배열을 배열에 담아 반환합니다.

<br/>

```javascript
console.log(Object.entries(person)); // [["name", "Lee"], ["address", "Seoul"]]

Object.entries(person).forEach(([key, value]) => console.log(key, value));
/*
name Lee
address Seoul
*/
```

<br/><br/><br/><br/><br/>
