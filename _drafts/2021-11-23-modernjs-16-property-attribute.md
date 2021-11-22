---
title: 프로퍼티 어트리뷰트
subtitle: 모던 자바스크립트 Deep Dive | 16장 | 프로퍼티 어트리뷰트
readtime: 15 min
author: wookshin
---

<br/>

# 프로퍼티 어트리뷰트

## 1. 내부 슬롯과 내부 메서드

앞으로 살펴볼 프로퍼티 어트리뷰트를 이해하기 위해 먼저 내부 슬롯(internal slot)과 내부 메서드(internal method)의 개념에 대해 알아봅시다.

**내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티(pseudo property)와 의사 메서드(pseudo method)**입니다.  
ECMAScript 사양에 등장하는 이중 대괄호([[...]])로 감싼 이름들이 내부 슬롯과 내부 메서드 입니다.

내부 슬롯과 내부 메서드는 ECMAScript 사양에 정의된 대로 구현되어 자바스크립트 엔진에서 실제로 동작하지만 개발자가 직접 접근할 수 있도록 외부로 공개된 객체의 프로퍼티는 아닙니다.  
즉, 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 내부 로직이므로 원칙적으로 자바스크립트는 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않습니다.  
단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 합니다.

예를 들어, 모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖습니다.  
내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 원칙적으로 직접 접근할 수 없지만 [[Prototype]] 내부 슬롯의 경우, \_\_proto\_\_를 통해 간접적으로 접근할 수 있습니다.

<br/>

```javascript
const o = {};

// 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접 접근할 수 없다.
o.[[Prototype]] // -> Uncaught SyntaxError: Unexpected token '['
// 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.
o.__proto__ // -> Object.prototype
```

<br/><br/>

## 2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

**자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의합니다.**  
프로퍼티의 상태란 프로퍼티의 값(value), 값의 갱신 가능 여부(writable), 열거 가능 여부(enumerable), 재정의 가능 여부(configurable)를 말합니다.

프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 상태 값(meta-property)인 내부 슬롯 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]] 입니다.  
따라서 프로퍼티 어트리뷰트에 직접 접근할 수 없지만 Object.getOwnPropertyDescriptor 메서드를 사용하여 간접적으로 확인할 수는 있습니다.

<br/>

```javascript
const person = {
  name: "Lee",
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
console.log(Object.getOwnPropertyDescriptor(person, "name"));
// {value: "Lee", writable: true, enumerable: true, configurable: true}
```

<br/>

Object.getOwnPropertyDescriptor 메서드를 호출할 때 첫 번째 매개변수에는 객체의 참조를 전달하고, 두번째 매개변수에는 프로퍼티 키를 문자열로 전달합니다.  
이때 Object.getOwnPropertyDescriptor 메서드는 프로퍼티 어트리뷰트 정보를 제공하는 **프로퍼티 디스크립터(Property Descriptor) 객체** 를 반환합니다.  
만약 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 프로퍼티 디스크립터를 요구하면 undefined가 반환됩니다.

Object.getOwnPropertyDescriptor 메서드는 하나의 프로퍼티에 대해 프로퍼티 디스크립터 객체를 반환하지만 ES8에서 도입된 Object.getOwnPropertyDescriptors 메서드는 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환합니다.

<br/>

```javascript
const person = {
  name: "Lee",
};

// 프로퍼티 동적 생성
person.age = 20;

// 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: true, enumerable: true, configurable: true},
  age: {value: 20, writable: true, enumerable: true, configurable: true}
}
*/
```

<br/>
<br/>

## 3. 데이터 프로퍼티와 접근자 프로퍼티

프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분할 수 있습니다.

- 데이터 프로퍼티(data property) : 키와 값으로 구성된 일반적인 프로퍼티입니다. 지금까지 살펴본 모든 프로퍼티는 데이터 프로퍼티입니다.
- 접근자 프로퍼티(accessor property) : 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수(accessor function)로 구성된 프로퍼티입니다.

### 3.1 데이터 프로퍼티

데이터 프로퍼티(data property)는 다음과 같은 프로퍼티 어트리뷰트를 갖습니다.  
이 프로퍼티 어트리뷰트는 자바스크립트 엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의됩니다.

<br/>

#### 프로퍼티 어트리뷰트 [[Value]]

- 프로퍼티 디스크립터 객체의 프로퍼티 : value
- 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값입니다.
- 프로퍼티 키를 통해 프로퍼티 값을 변경하면 [[Value]]에 값을 재할당합니다. 이때 프로퍼티가 없으면 프로퍼티를 동적 생성하고 생성된 프로퍼티의 [[Value]]에 값을 저장합니다.

#### 프로퍼티 어트리뷰트 [[Writable]]

- 프로퍼티 디스크립터 객체의 프로퍼티 : writable
- 프로퍼티 값의 변경 가능여부를 나타내며 불리언 값을 갖습니다.
- [[Writable]]의 값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없는 읽기 전용 프로퍼티가 됩니다.

#### 프로퍼티 어트리뷰트 [[Enumerable]]

- 프로퍼티 디스크립터 객체의 프로퍼티 : enumerable
- 프로퍼티의 열러 기능 여부를 나타내며 불리언 값을 갖습니다.
- [[Enumerable]]의 값이 false인 경우 해당 프로퍼티는 for...in 문이나 Object.keys 메서드 등으로 열거할 수 없습니다.

#### 프로퍼티 어트리뷰트 [[Configurable]]

- 프로퍼티 디스크립터 객체의 프로퍼티 : configurable
- 프로퍼티의 재정의 가능 여부를 나타내며 불리언 값을 갖습니다.
- [[Configurable]]의 값이 false인 경우 해당 프로퍼티의 삭제, 프로퍼티 어트리뷰트 값의 변경이 금지됩니다. 단, [[Writable]]이 true인 경우 [[Value]]의 변경과 [[Writable]]을 false로 변경하는 것은 허용됩니다.

다음 예제를 살펴봅시다.

<br/>

```javascript
const person = {
  name: "Lee",
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 취득한다.
console.log(Object.getOwnPropertyDescriptor(person, "name"));
// {value: "Lee", writable: true, enumerable: true, configurable: true}
```

<br/>

Object.getOwnPropertyDescriptor 메서드가 반환한 프로퍼티 디스크립터 객체를 살펴보면 value 프로퍼티의 값은 'Lee' 입니다.  
이것은 프로퍼티 어트리뷰트 [[Value]]의 값이 'Lee'인 것을 의미합니다.  
그리고 writable, enumerable, configurable 프로퍼티의 값은 모두 true 입니다.  
이것은 프로퍼티 어트리뷰트 [[Writable]], [[Enumerable]], [[Configurable]]의 값이 모두 true인 것을 의미합니다.

이처럼 프로퍼티가 생성될 때 [[Value]]의 값은 프로퍼티 값으로 초기화되며 [[Writable]], [[Enumerable]], [[Configurable]]의 값은 true로 초기화됩니다.  
이것은 프로퍼티를 동적 추가해도 마찬가지입니다.

<br/>

```javascript
const person = {
  name: "Lee",
};

// 프로퍼티 동적 생성
person.age = 20;

console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: true, enumerable: true, configurable: true},
  age: {value: 20, writable: true, enumerable: true, configurable: true}
}
*/
```

<br/>

### 3.2 접근자 프로퍼티

접근자 프로퍼티(accessor property)는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수(accessor function)로 구성된 프로퍼티입니다.

<br/>

#### 프로퍼티 어트리뷰트 [[Get]]

- 프로퍼티 디스크립터 객체의 프로퍼티 : get
- 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수입니다.
- 즉, 접근자 프로퍼티 키로 프로퍼티 값에 접근하면 프로퍼티 어트리뷰트 [[Get]]의 값, 즉 getter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환됩니다.

#### 프로퍼티 어트리뷰트 [[Set]]]

- 프로퍼티 디스크립터 객체의 프로퍼티 : set
- 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수입니다.
- 즉, 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 프로퍼티 어트리뷰트 [[Set]]의 값, 즉 setter 함수가 호출되고 그 결과가 프로퍼티 값으로 저장됩니다.

#### 프로퍼티 어트리뷰트 [[Enumerable]]

- 프로퍼티 디스크립터 객체의 프로퍼티 : enumerable
- 데이터 프로퍼티의 [[Enumerable]]과 같습니다.

#### 프로퍼티 어트리뷰트 [[Configurable]]

- 프로퍼티 디스크립터 객체의 프로퍼티 : configurable
- 데이터 프로퍼티의 [[Configurable]]과 같습니다.

<br/>

접근자 함수는 getter/setter 함수라고도 부릅니다.  
접근자 프로퍼티는 getter와 setter 함수를 모두 정의할 수도 있고 하나만 정의할 수도 있습니다.

다음 예제를 살펴봅시다.

<br/>

```javascript
const person = {
  // 데이터 프로퍼티
  firstName: "Ungmo",
  lastName: "Lee",

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set fullName(name) {
    // 배열 디스트럭처링 할당: "31.1 배열 디스트럭처링 할당" 참고
    [this.firstName, this.lastName] = name.split(" ");
  },
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(person.firstName + " " + person.lastName); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
person.fullName = "Heegun Lee";
console.log(person); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(person.fullName); // Heegun Lee

// firstName은 데이터 프로퍼티다.
// 데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다.
let descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log(descriptor);
// {value: "Heegun", writable: true, enumerable: true, configurable: true}

// fullName은 접근자 프로퍼티다.
// 접근자 프로퍼티는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다.
descriptor = Object.getOwnPropertyDescriptor(person, "fullName");
console.log(descriptor);
// {get: ƒ, set: ƒ, enumerable: true, configurable: true}
```

<br/>

person 객체의 firstName과 lastName 프로퍼티는 일반적인 데이터 프로퍼티입니다.  
메서드 앞에 get, set이 붙은 메서드가 있는데 이것들이 바로 getter와 setter 함수이고, getter/setter 함수의 이름 fullName이 접근자 프로퍼티입니다.  
접근자 프로퍼티는 자체적으로 값(프로퍼티 어트리뷰트 [[Value]])을 가지지 않으며 다만 데이터 프로퍼티의 값을 읽거나 저장할 때 관여할 뿐입니다.

이를 내부 슬롯/메서드 관점에서 설명하면 다음과 같습니다.  
접근자 프로퍼티 fullName으로 프로퍼티 값에 접근하면 내부적으로 [[Get]] 내부 메서드가 호출되어 다음과 같이 동작합니다.

1.  프로퍼티 키가 유효한지 확인합니다. 프로퍼티 키는 문자열 또는 심벌이어야 합니다. 프로퍼티 키 "fullName"은 문자열이므로 유효한 프로퍼티 키입니다.
2.  프로토타입 체인에서 프로퍼티를 검색합니다. person 객체에 fullName 프로퍼티가 존재합니다.
3.  검색된 fullName 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인합니다. fullName 프로퍼티는 접근자 프로퍼티입니다.
4.  접근자 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값, 즉 getter 함수를 호출하여 그 결과를 반환합니다. 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값은 Object.getOwnPropertyDescriptor 메서드가 반환하는 프로퍼티 디스크립터(Property Descriptor) 객체의 get 프로퍼티 값과 같습니다.

> 프로토타입(prototype)

<br/><br/>

## 4. 프로퍼티 정의

<br/><br/>

## 5. 객체 변경 방지

### 5.1 객체 확장 금지

<br/>

### 5.2 객체 밀봉

<br/>

### 5.3 객체 동결

<br/>

### 5.4 불변 객체

<br/>

<br/>
<br/>
<br/>
<br/>
```
