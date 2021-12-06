---
title: strict mode
subtitle: 모던 자바스크립트 Deep Dive | 20장 | strict mode
readtime: 15 min
author: wookshin
---

<br/>

# strict mode

## 1. strict mode란?

아래 예제의 실행 결과는 무엇일까요?

<br/>

```javascript
function foo() {
  x = 10;
}
foo();

console.log(x); // ?
```

<br/>

`foo` 함수 내에서 선언하지 않은 `x` 변수에 값 `10`을 할당했습니다.  
이때 `x` 변수를 찾아야 `x`에 값을 할당할 수 있기 때문에 자바스크립트 엔진은 `x` 변수가 어디에서 선언되었는지 스코프 체인을 통해 검색하기 시작합니다.

자바스크립트 엔진은 먼저 `foo` 함수의 스코프에서 `x` 변수의 선언을 검색합니다.  
`foo` 함수의 스코프에는 `x` 변수의 선언이 없으므로 검색해 실패할 것이고, 자바스크립트 엔진은 `x` 변수를 검색하기 위해 `foo` 함수 컨텍스트의 상위 스코프(위 예제의 경우 전역 스코프)에서 `x` 변수의 선언을 검색합니다.

전역 스코프에도 `x` 변수의 선언이 존재하지 않기 때문에 ReferenceError를 발생시킬 것 같지만 자바스크립트 엔진은 암묵적으로 전역 객체에 `x` 프로퍼티를 동적 생성합니다.  
이때 전역 객체의 `x` 프로퍼티는 마치 전역 변수처럼 사용할 수 있습니다.  
이러한 현상을 **암묵적 전역(implicit glogbal)**이라 합니다.

개발자 의도와는 상관없이 발생한 암묵적 전역은 오류를 발생시키는 원인이 될 가능성이 큽니다.  
따라서 반드시 `var`, `let`, `const` 키워드를 사용하여 변수를 선언한 다음 사용해야 합니다.

하지만 오타나 문법 지식의 미비로 인한 실수는 언제나 발생합니다.  
따라서 오류를 줄여 안정적인 코드를 생산하기 위해서는 좀 더 근본적인 접근이 필요합니다.  
다시 말해, 잠재적인 오류를 발생시키기 어려운 개발 환경을 만들고 그 환경에서 개발하는 것이 좀 더 근본적인 해결책이라고 할 수 있습니다.

이를 지원하기 위해 ES5부터 `strict mode`(엄격 모드)가 추가되었씁니다.  
`strict mode`는 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킵니다.

ESLint 같은 린트 도구를 사용해도 `strict mode`와 유사한 효과를 얻을 수 있습니다.  
린트 도구는 정적 분석(static analysis) 기능을 통해 소스코드를 실행하기 전에 소스코드를 스캔하여 문법적 오류만이 아니라 잠재적 오류까지 찾아내고 오류의 원인을 리포팅해주는 유용한 도구입니다.

린트 도구는 `strict mode`가 제한하는 오류는 물론 코딩 컨벤션을 설정 파일 형태로 정의하고 강제할 수 있기 때문에 더욱 강력한 효과를 얻을 수 있습니다.

`strict mode`의 적용 방법과 `strict mode`가 발생시키는 에러에 대해 간략히 살펴봅시다.  
참고로 ES6에서 도입된 클래스와 모듈은 기본적으로 `strict mode`가 적용됩니다.

<br/><br/>

## 2. strict mode의 적용

`strict mode`를 적용하려면 전역의 선두 또는 함수 몸체의 선두에 `'use strict';`를 추가합니다.  
전역의 선두에 추가하면 스크립트 전체에 strict mode가 적용됩니다.

<br/>

```javascript
"use strict";

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

<br/>

함수 몸체의 선두에 추가하면 해당 함수와 중첩 함수에 `strict mode`가 적용됩니다.

<br/>

```javascript
function foo() {
  "use strict";

  x = 10; // ReferenceError: x is not defined
}
foo();
```

<br/>

코드의 선두에 `'use strict';`를 위치시키지 않으면 `strict mode`가 제대로 동작하지 않습니다.

<br/>

```javascript
function foo() {
  x = 10; // 에러를 발생시키지 않는다.
  ("use strict");
}
foo();
```

<br/><br/>

## 3. 전역에 strict mode를 적용하는 것은 피하자

전역에 적용한 `strict mode`는 스크립트 단위로 적용됩니다.

<br/>

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      "use strict";
    </script>
    <script>
      x = 1; // 에러가 발생하지 않는다.
      console.log(x); // 1
    </script>
    <script>
      "use strict";

      y = 1; // ReferenceError: y is not defined
      console.log(y);
    </script>
  </body>
</html>
```

<br/>

위 예제와 같이 스크립트 단위로 적용된 `strict mode`는 다른 스크립트에 영향을 주지 않고 해당 스크립트에 한정되어 적용됩니다.

하지만 `strict mode` 스크립트와 `non-strict mode` 스크립트를 혼용하는 것은 오류를 발생시킬 수 있습니다.  
특히 외부 서드파티 라이브러리를 사용하는 경우 라이브러리가 `non-strict mode`인 경우도 있기 때문에 전역에 `strict mode`를 적용하는 것은 바람직하지 않습니다.  
이러한 경우 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 `strict mode`를 적용합니다.

<br/>

```javascript
// 즉시 실행 함수의 선두에 strict mode 적용
(function () {
  "use strict";

  // Do something...
})();
```

<br/><br/>

## 4. 함수 단위로 strict mode를 적용하는 것도 피하자

함수 단위로 `strict mode`를 적용할 수도 있습니다.  
그러나 어떤 함수는 `strict mode`를 적용하고 어떤 함수는 `strict mode`를 적용하지 않는 것은 바람직하지 않으며 모든 함수에 일일이 `strict mode`를 적용하는 것은 번거로운 일입니다.

그리고 `strict mode`가 적용된 함수가 참조할 함수 외부의 컨텍스트에 `strict mode`를 적용하지 않는다면 이 또한 문제가 발생할 수 있습니다.

<br/>

```javascript
(function () {
  // non-strict mode
  var lеt = 10; // 에러가 발생하지 않는다.

  function foo() {
    "use strict";

    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
})();
```

<br/>

**따라서 `strict mode`는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직합니다.**

<br/><br/>

## 5. strict mode가 발생시키는 에러

다음은 `strict mode`를 적용했을 때 에러가 발생하는 대표적인 사례입니다.

<br/>

### 5.1 암묵적 전역

선언하지 않은 변수를 참조하면 `ReferenceError`가 발생합니다.

<br/>

```javascript
(function () {
  "use strict";

  x = 1;
  console.log(x); // ReferenceError: x is not defined
})();
```

<br/>

### 5.2 변수, 함수, 매개변수의 삭제

`delete` 연산자로 변수, 함수, 매개변수를 삭제하면 `SyntaxError`가 발생합니다.

<br/>

```javascript
(function () {
  'use strict';

  var x = 1;
  delete x;
  // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a;
    // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo;
  // SyntaxError: Delete of an unqualified identifier in strict mode.
}());
```

<br/>

### 5.3 매개변수 이름의 중복

중복된 매개변수 이름을 사용하면 `SyntaxError`가 발생합니다.

<br/>

```javascript
(function () {
  "use strict";

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
})();
```

<br/>

### 5.4 with 문의 사용

`with`문을 사용하면 `SyntaxError`가 발생합니다.  
`with` 문은 전달된 객체를 스코프 체인에 추가합니다.  
`with` 문은 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지는 효과가 있지만 성능과 가독성이 나빠지는 문제가 있습니다.  
`with` 문은 사용하지 않는 것이 좋습니다.

<br/>

```javascript
(function () {
  "use strict";

  // SyntaxError: Strict mode code may not include a with statement
  with ({ x: 1 }) {
    console.log(x);
  }
})();
```

<br/><br/>

## 6. strict mode 적용에 의한 변화

### 6.1 일반 함수의 this

`strict mode`에서 함수를 일반 함수로서 호출하면 `this`에 `undefined`가 바인딩됩니다.  
생성자 함수가 아닌 일반 함수 내부에서는 `this`를 사용할 필요가 없기 때문입니다.  
이때 에러는 발생하지 않습니다.

<br/>

```javascript
(function () {
  "use strict";

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
})();
```

<br/>

### 6.2 arguments 객체

`strict mode`에서는 매개변수에 전달된 인수를 재할당하여 변경해도 `arguments` 객체에 반영되지 않습니다.

<br/>

```javascript
(function (a) {
  "use strict";
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
})(1);
```

<br/><br/><br/><br/><br/>
