---
title: 프로토타입
subtitle: 모던 자바스크립트 Deep Dive | 19장 | 프로토타입
readtime: 15 min
author: wookshin
---

<br/>

# 프로토타입

자바스크립트는 명령형(imperative), 함수형(functional), 프로토타입 기반(prototype-based) 객체지향 프로그래밍(OOP)을 지원하는 멀티 패러다임 프로그래밍 언어입니다.

간혹 C++나 자바 같은 클래스 기반 객체지향 프로그래밍 언어의 특징은 클래스와 상속, 캡슐화를 위한 키워드인 public, private, protected 등이 없어서 자바스크립트는 객체지향 언어가 아니라고 오해하는 경우도 있습니다.  
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
이처럼 **속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조** 를 객체라 하며, 객체지향 프로그래밍은 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임입니다.

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

Circle 생성자 함수가 생성하는 모든 객체(인스턴스)는 radius 프로퍼티와 getArea 메서드를 갖습니다.  
radius 프로퍼티 값은 일반적으로 인스턴스마다 다릅니다(같은 상태를 갖는 여러 개의 인스턴스가 필요하다면 radius 프로퍼티 값이 같을 수도 있습니다).  
하지만 getArea 메서드는 모든 인스턴스가 동일한 내용의 메서드를 사용하므로 단 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직합니다.  
그런데 Circle 생성자 함수는 인스턴스를 생성할 때마다 getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유합니다.

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

Circle 생성자 함수가 생성한 모든 인스턴스를 자신의 프로토타입, 즉 상위(부모) 객체 역할을 하는 Circle.prototype의 모든 프로퍼티와 메서드를 상속받습니다.

getArea 메서드는 단 하나만 생성되어 프로토타입인 Circle.prototype의 메서드로 할당되어 있습니다.  
따라서 Circle 생성자 함수가 생성하는 모든 인스턴스는 getArea 메서드를 상속받아 사용할 수 있습니다.  
즉, 자신의 상태를 나타내는 radius 프로퍼티만 개별적으로 소유하고 내용이 동일한 메서드는 상속을 통해 공유하여 사용하는 것입니다.

상속은 코드의 재사용이란 관점에서 매우 유용합니다.  
생성자 함수가 생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현해 두면 생성자 함수가 생성할 모든 인스턴스는 별도의 구현 없이 상위(부모) 객체인 프로토타입의 자산을 공유하여 사용할 수 있습니다.

<br/><br/>

## 3. 프로토타입 객체

프로토타입 객체(또는 줄여서 프로토타입)란 객체지향 프로그래밍의 근간을 이루는 객체 간 상속(inheritance)을 구현하기 위해 사용됩니다.  
프로토타입은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티(메서드 포함)를 제공합니다.  
프로토타입을 상속받은 하위(자식) 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용할 수 있습니다.

모든 객체는 [[Prototype]]이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조(null인 경우도 있습니다)입니다.  
[[Prototype]]에 저장되는 프로토타입은 객체 생성 방식에 의해 결정됩니다.  
즉, 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고 [[Prototype]]에 저장됩니다.

예를 들어, 객체 리터럴에 의해 생성된 객체의 프로토타입은 Object.prototype이고 생성자 함수에 의해 생성된 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체입니다.

모든 객체는 하나의 프로토타입을 갖습니다.  
그리고 모든 프로토타입은 생성자 함수와 연결되어 있습니다.

[[Prototype]] 내부 슬롯에는 직접 접근할 수 없지만, \_\_proto\_\_ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 자신의 [[Prototype]] 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근할 수 있습니다.  
그리고 프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 prototype 프로퍼티를 통해 프로토타입에 접근할 수 있습니다.

<br/>

### 3.1 \_\_proto\_\_ 접근자 프로퍼티

**모든 객체는 \_\_proto\_\_ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있습니다.**

#### \_\_proto\_\_는 접근자 프로퍼티입니다.

내부 슬롯은 프로퍼티가 아닙니다.  
따라서 자바스크립트는 원칙적으로 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않습니다.  
단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 합니다.  
[[Prototype]] 내부 슬롯에도 직접 접근할 수 없으며 \_\_proto\_\_ 접근자 프로퍼티를 통해 간접적으로 [[Prototype]] 내부 슬롯의 값, 즉 프로토타입에 접근할 수 있습니다.

접근자 프로퍼티는 자체적으로는 값([[Value]] 프로퍼티 어트리뷰트)을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수(accessor function), 즉 [[Get]], [[Set]] 프로퍼티 어트리뷰트로 구성된 프로퍼티입니다.

Object.prototype의 접근자 프로퍼티인 \_\_proto\_\_는 getter/setter 함수라고 부르는 접근자 함수([[Get]], [[Set]] 프로퍼티 어트리뷰트에 할당된 함수)를 통해 [[Prototype]] 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당합니다.  
\_\_proto\_\_ 접근자 프로퍼티를 통해 프로토타입에 접근하면 내부적으로 \_\_proto\_\_ 접근자 프로퍼티인 getter 함수인 [[Get]]이 호출됩니다.  
\_\_proto\_\_ 접근자 프로퍼티를 통해 새로운 프로토타입을 할당하면 \_\_proto\_\_ 접근자 프로퍼티의 setter 함수인 [[Set]]이 호출됩니다.

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

\_\_proto\_\_ 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티입니다.  
모든 객체는 상속을 통해 Object.prototype.\_\_proto\_\_ 접근자 프로퍼티를 사용할 수 있습니다.

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
> 자바스크립트 엔진은 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 \_\_proto\_\_ 접근자 프로퍼티가 가리키는 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색합니다.  
> 프로토타입 체인의 종점, 즉 프로토타입 체인의 최상위 객체는 Object.prototype이며, 이 객체의 프로퍼티와 메서드는 모든 객체에 상속됩니다.

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

위 예제에서는 parent 객체를 child 객체의 프로토타입으로 설정한 후, child 객체를 parent 객체의 프로토타입으로 설정했습니다.  
이러한 코드가 에러없이 정상적으로 처리되면 서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인이 만들어지기 때문에 \_\_proto\_\_ 접근자 프로퍼티는 에러를 발생시킵니다.

프로토타입 체인은 단방향 링크드 리스트로 구현되어야 합니다.  
즉, 프로퍼티 검색 방향이 한쪽 방향으로만 흘러가야 합니다.  
하지만 서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인, 다시 말해 순환 참조(circular reference)하는 프로토타입 체인이 만들어지면 프로토타입 체인 종점이 존재하지 않기 때문에 프로토타입 체인에서 프로퍼티를 검색할 때 무한 루프에 빠집니다.  
따라서 아무런 체크 없이 무조건적으로 프로토타입을 교체할 수 없도록 \_\_proto\_\_ 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어 있습니다.

<br/>

#### \_\_proto\_\_ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않습니다.

\_\_proto\_\_ 접근자 프로퍼티는 ES5까지 ECMAScript 사양에 포함되지 않은 비표준이었습니다.  
하지만 일부 브라우저에서 \_\_proto\_\_를 지원하고 있었기 때문에 브라우저 호환성을 고려하여 ES6에서 \_\_proto\_\_를 표준으로 채택했습니다.  
현재 대부분의 브라우저(IE 11 이상)가 \_\_proto\_\_를 지원합니다.

하지만 코드 내에서 \_\_proto\_\_ 접근자 프로퍼티를 직접 사용하는 것은 권장하지 않습니다.  
모든 객체가 \_\_proto\_\_ 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문입니다.  
직접 상속을 통해 다음과 같이 Object.prototype을 상속받지 않는 객체를 생성할 수도 있기 때문에 \_\_proto\_\_ 접근자 프로퍼티를 사용할 수 없는 경우가 있습니다.

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

따라서 \_\_proto\_\_ 접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우에는 Object.getPrototypeOf 메서드를 사용하고, 프로토타입을 교체하고 싶은 경우에는 Object.setPrototypeOf 메서드를 사용할 것을 권장합니다.

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

Object.getPrototypeOf 메서드와 Object.setPrototypeOf 메서드는 get Object.prototype.\_\_proto\_\_와 set Object.prototype.\_\_proto\_\_의 처리 내용과 정확히 일치합니다.  
Object.getPrototypeOf 메서드는 ES5에서 도입된 메서드이며, IE9 이상에서 지원합니다.  
Object.setPrototypeOf 메서드는 ES6에서 도입된 메서드이며, IE11 이상에서 지원합니다.

<br/>

### 3.2 함수 객체의 prototype 프로퍼티

**함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킵니다.**

<br/>

```javascript
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}.hasOwnProperty("prototype")); // -> true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}.hasOwnProperty("prototype")); // -> false
```

<br/>

prototype 프로퍼티는 생성자 함수가 생성할 객체(인스턴스)의 프로토타입을 가리킵니다.  
따라서 생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않습니다.

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

생성자 함수로 호출하기 위해 정의하지 않은 일반 함수(함수 선언문, 함수 표현식)도 prototype 프로퍼티를 소유하지만 객체를 생성하지 않는 일반 함수의 prototype 프로퍼티는 아무런 의미가 없습니다.

**모든 객체가 가지고 있는(엄밀히 말하면 Object.prototype으로부터 상속받은) \_\_proto\_\_ 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킵니다.**  
하지만 이들 프로퍼티를 사용하는 주체가 다릅니다.

<br/>

| 구분                          | 소유        | 값                | 사용 주체   | 사용 목적                                                                    |
| ----------------------------- | ----------- | ----------------- | ----------- | ---------------------------------------------------------------------------- |
| \_\_proto\_\_ 접근자 프로퍼티 | 모든 객체   | 프로토타입의 참조 | 모든 객체   | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용                      |
| prototype 프로퍼티            | constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |

<br/>

예를 들어, 생성자 함수로 객체를 생성한 후, \_\_proto\_\_ 접근자 프로퍼티와 prototype 프로퍼티로 프로토타입 객체에 접근해봅시다.

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

모든 프로토타입은 constructor 프로퍼티를 갖습니다.  
이 constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킵니다.  
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

위 예제에서 Person 생성자 함수는 me 객체를 생성했습니다.  
이때 me 객체는 프로토타입의 constructor 프로퍼티를 통해 생성자 함수와 연결됩니다.  
me 객체에는 constructor 프로퍼티가 없지만 me 객체의 프로토타입인 Person.prototype에는 constructor 프로퍼티가 있습니다.  
따라서 me 객체는 프로토타입인 Person.prototype의 constructor 프로퍼티를 상속받아 사용할 수 있습니다.

<br/><br/>

## 4. 리터럴 표기법에 의해 생성된 객체의 생성자 함수의 프로토타입

앞에서 살펴본 바와 같이 생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor 프로퍼티에 의해 생성자 함수와 연결됩니다.  
이때 constructor 프로퍼티가 가리키는 생성자 함수는 인스턴스를 생성한 생성자 함수입니다.

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

하지만 리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 객체 생성 방식도 있습니다.

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
하지만 리터럴 표기법에 의해 생성된 객체의 경우 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수는 없습니다.

<br/>

```javascript
// obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다.
const obj = {};

// 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
console.log(obj.constructor === Object); // true
```

<br/>

위 예제의 obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴에 의해 생성된 객체입니다.  
하지만 obj 객체는 Object 생성자 함수와 constructor 프로퍼티로 연결되어 있습니다.  
그렇다면 객체 리터럴에 의해 생성된 객체는 사실 Object 생성자 함수로 생성되는 것은 아닐까요?  
ECMAScript 사양을 살펴봅시다.  
Object 생성자 함수는 다음과 같이 구현하도록 정의되어 있습니다.  

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

<br/><br/>

## 5. 프로토타입의 생성 시점

<br/>

### 5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점

<br/>

### 5.2 빌트인 생성자 함수와 프로토타입 생성 시점

<br/><br/>

## 6. 객체 생성 방식과 프로토타입의 결정

<br/>

### 6.1 객체 리터럴에 의해 생성된 객체의 프로토타입

<br/>

### 6.2 Object 생성자 함수에 의해 생성된 객체의 프로토타입

<br/>

### 6.3 생성자 함수에 의해 생성된 객체의 프로토타입

<br/><br/>

## 7. 프로토타입 체인

<br/><br/>

## 8. 오버라이딩과 프로퍼티 섀도잉

<br/><br/>

## 9. 프로토타입의 교체

<br/>

### 9.1 생성자 함수에 의한 프로토타입의 교체

<br/>

### 9.2 객체 리터럴 내부에서 \_\_proto\_\_에 의한 직접 상속

<br/><br/>

## 10. instanceof 연산자

<br/><br/>

## 11. 직접 상속

<br/>

### 11.1 Object.create에 의한 직접 상속

<br/>

### 11.2 객체 리터럴 내부에서 \_\_proto\_\_에 의한 직접 상속

<br/><br/>

## 12. 정적 프로퍼티/메서드

<br/><br/>

## 13. 프로퍼티 존재 확인

<br/>

### 13.1 in 연산자

<br/>

### 13.2 Object.prototype.hasOwnProperty 메서드

<br/><br/>

## 14. 프로퍼티 열거

<br/>

### 14.1 for...in 문

<br/>

### 14.2 Object.keys/values/entries 메서드

<br/><br/><br/><br/><br/>
