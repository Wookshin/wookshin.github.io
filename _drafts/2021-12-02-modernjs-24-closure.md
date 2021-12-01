---
title: 클로저
subtitle: 모던 자바스크립트 Deep Dive | 24장 | 클로저
readtime: 15 min
author: wookshin
---

<br/>

# 클로저

클로저(closure)는 난해하기로 유명한 자바스크립트의 개념 중 하나로 자바스크립트에 관심이 있다면 한번쯤 들어보았을 것입니다.  
사실 클로저는 앞서 살펴본 실행 컨텍스트에 대한 사전 지식이 있으면 이해하기 어려운 개념은 아닙니다.

클로저는 자바스크립트 고유의 개념이 아닙니다.  
함수를 일급 객체로 취급하는 함수형 프로그래밍 언어(예: 하스켈, 리스프, 얼랭, 스칼라 등)에서 사용되는 중요한 특성입니다.

클로저는 자바스크립트 고유의 개념이 아니므로 클로저의 정의가 ECMAScript 사양에 등장하지 않습니다.  
MDN 에서는 클로저에 대해 다음과 같이 정의하고 있습니다.

> "A closure is that combination of a function and the lexical environment within which that function was declared."  
> 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

정의가 무척이나 난해해서 무슨 의미인지 잘 와 닿지 않습니다.  
예제를 통해 정의의 의미부터 살펴봅시다.  
위 정의에서 먼저 이해해야 할 핵심 키워드는 "함수가 선언된 렉시컬 환경"입니다.

<br/>

```javascript
const x = 1;

function outerFunc() {
  const x = 10;

  function innerFunc() {
    console.log(x); // 10
  }

  innerFunc();
}

outerFunc();
```

<br/>

outerFunc 함수 내부에서 중첩 함수 innerFunc가 정의되고 호출되었습니다.  
이때 중첩 함수 innerFunc의 상위 스코프는 외부 함수 outerFuc의 스코프입니다.  
따라서 중첩 함수 innerFunc 내부에서 자신을 포함하고 있는 외부 함수 outerFunc의 x 변수에 접근할 수 있습니다.

만약 innerFunc 함수가 outerFunc 함수의 내부에서 정의된 중첩 함수가 아니라면 innerFunc 함수를 outerFunc 함수의 내부에서 호출한다 하더라도 outer 함수의 변수에 접근할 수 없습니다.

<br/>

```javascript
const x = 1;

function outerFunc() {
  const x = 10;
  innerFunc();
}

function innerFunc() {
  console.log(x); // 1
}

outerFunc();
```

<br/>

이 같은 현상이 발생하는 이유는 자바스크립트가 렉시컬 스코프를 따르는 프로그래밍 언어이기 때문입니다.

<br/><br/>

## 1. 렉시컬 스코프

렉시컬 스코프를 실행 컨텍스트의 관점에서 한번 살펴봅시다.

**자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디에 정의했는지에 따라 상위 스코프를 결정합니다.**  
**이를 렉시컬 스코프(정적 스코프)라 합니다.**

<br/>

```javascript
const x = 1;

function foo() {
  const x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
```

<br/>

위 예제의 foo 함수와 bar 함수는 모두 전역에서 정의된 전역 함수입니다.  
함수의 스코프는 함수를 어디서 정의했느냐에 따라 결정되므로 foo 함수와 bar 함수의 상위 스코프는 전역입니다.  
함수를 어디서 호출했는지는 함수의 상위 스코프 결정에 어떠한 영향도 주지 못합니다.  
즉, 함수의 상위 스코프는 함수를 정의한 위치에 의해 정적으로 결정되고 변하지 않습니다.

스코프의 실체는 실행 컨텍스트의 렉시컬 환경입니다.  
이 렉시컬 환경은 자신의 "외부 렉시컬 환경에 대한 참조(Outer Lexical Environment Reference)"를 통해 상위 렉시컬 환경과 연결됩니다.  
이것이 바로 스코프 체인입니다.

따라서 "함수의 상위 스코프를 결정한다"는 것은 "렉시컬 환경의 외부 렉시컬 환경에 대한 참조에 저장할 참조값을 결정한다"는 것과 같습니다.  
렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장할 참조값이 바로 상위 렉시컬 환경에 대한 참조이며, 이것이 상위 스코프이기 때문입니다.  
이 개념을 반영해서 다시 한번 렉시컬 스코프를 정의해 보면 다음과 같습니다.

**렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정됩니다.**  
**이것이 바로 렉시컬 스코프입니다.**

<br/><br/>

## 2. 함수 객체의 내부 슬롯 [[Environment]]

함수가 정의된 환경(위치)과 호출되는 환경(위치)은 다를 수 있습니다.  
따라서 렉시컬 스코프가 가능혀려면 함수는 자신이 호출되는 환경과는 상관없이 자신이 정의된 환경, 즉 상위 스코프(함수 정의가 위치하는 스코프가 바로 상위 스코프입니다)를 기억해야 합니다.  
이를 위해 **함수는 자신의 내부 슬롯 [[Environment]]에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장합니다.**

다시 말해, 함수 정의가 평가되어 함수 객체를 생성할 때 자신이 정의된 환경(위치)에 의해 결정된 상위 스코프의 참조를 함수 객체 자신의 내부 슬롯 [[Environment]]에 저장합니다.  
이때 자신의 내부 슬롯 [[Environment]]에 저장된 상위 스코프의 참조는 현재 실행 중인 실행 컨텍스트의 렉시컬 환경을 가리킵니다.

왜냐하면 함수 정의가 평가되어 함수 객체를 생성하는 시점은 함수가 정의된 환경, 즉 상위 함수(또는 전역 코드)가 평가 또는 실행되고 있는 시점이며, 이때 현재 실행 중인 실행 컨텍스트는 상위 함수(또는 전역 코드)의 실행 컨텍스트이기 때문입니다.

예를 들어, 전역에서 정의된 함수 선언문은 전역 코드가 평가되는 시점에 평가되어 함수 객체를 생성합니다.  
이때 생성된 함수 객체의 내부 슬롯 [[Environment]]에는 함수 정의가 평가되는 시점, 즉 전역 코드 평가 시점에 실행 중인 실행 컨텍스트의 렉시컬 환경인 전역 렉시컬 환경의 참조가 저장됩니다.

함수 내부에서 정의된 함수 표현식은 외부 함수 코드가 실행되는 시점에 평가되어 함수 객체를 생성합니다.  
이때 생성된 함수 객체의 내부 슬롯 [[Environment]]에는 함수 정의가 평가되는 시점, 즉 외부 함수 코드 실행 시점에 실행 중인 실행 컨텍스트의 렉시컬 환경인 외부 함수 렉시컬 환경의 참조가 저장됩니다.

**따라서 함수 객체의 내부 슬롯 [[Environment]]에 저장된 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 바로 상위 스코프입니다.**  
**또한 자신이 호출되었을 때 생성될 함수 렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장될 참조값입니다.**  
**함수 객체는 내부 슬롯 [[Environment]]에 저장한 렉시컬 환경의 참조, 즉 상위 스코프를 자신이 존재하는 한 기억합니다.**

<br/>

```javascript
const x = 1;

function foo() {
  const x = 10;

  // 상위 스코프는 함수 정의 환경(위치)에 따라 결정된다.
  // 함수 호출 위치와 상위 스코프는 아무런 관계가 없다.
  bar();
}

// 함수 bar는 자신의 상위 스코프, 즉 전역 렉시컬 환경을 [[Environment]]에 저장하여 기억한다.
function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
```

<br/>

foo 함수와 bar 함수는 모두 전역에서 함수 선언문으로 정의되었습니다.  
따라서 foo 함수와 bar 함수는 모두 전역 코드가 평가되는 시점에 평가되어 함수 객체를 생성하고 전역 객체 window의 메서드가 됩니다.  
이때 생성된 함수 객체의 내부 슬롯 [[Environment]]에는 함수 정의가 평가된 시점, 즉 전역 코드 평가 시점에 실행 중인 실행 컨텍스트의 렉시컬 환경인 전역 렉시컬 환경의 참조가 저장됩니다.

함수가 호출되면 함수 내부로 코드의 제어권이 이동합니다.  
그리고 함수 코드를 평가하기 시작합니다.  
함수 코드 평가는 아래 순서로 진행됩니다.

&nbsp;1. 함수 실행 컨텍스트 생성  
&nbsp;2. 함수 렉시컬 환경 생성  
&nbsp;&nbsp;&nbsp;2.1 함수 환경 레코드 생성
&nbsp;&nbsp;&nbsp;2.2 this 바인딩
&nbsp;&nbsp;&nbsp;2.3 외부 렉시컬 환경에 대한 참조 결정

이때 함수 렉시컬 환경의 구성 요소인 **외부 렉시컬 환경에 대한 참조에는 함수 객체의 내부 슬롯 [[Environment]]에 저장된 렉시컬 환경의 참조가 할당됩니다.**  
즉, 함수 객체의 내부 슬롯 [[Environment]]에 저장된 렉시컬 환경의 참조는 바로 함수의 상위 스코프를 의미합니다.  
이것이 바로 함수 정의 위치에 따라 상위 스코프를 결정하는 렉시컬 스코프의 실체입니다.

<br/><br/>

## 3. 클로저와 렉시컬 환경

다음 예제를 살펴봅시다.

<br/>

```javascript
const x = 1;

// ①
function outer() {
  const x = 10;
  const inner = function () {
    console.log(x);
  }; // ②
  return inner;
}

// outer 함수를 호출하면 중첩 함수 inner를 반환한다.
// 그리고 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거된다.
const innerFunc = outer(); // ③
innerFunc(); // ④ 10
```

<br/>

outer 함수를 호출하면 outer 함수는 중첩 함수 inner를 반환하고 생명 주기(life cycle)를 마감합니다.  
즉, outer 함수의 실행이 종료되면 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거(pop)됩니다.  
이때 outer 함수의 지역 변수 x와 변수 값 10을 저장하고 있던 outer 함수의 실행 컨텍스트가 제거되었으므로 outer 함수의 지역 변수 x 또한 생명 주기를 마감합니다.  
따라서 outer 함수의 지역 변수 x는 더는 유효하지 않게 되어 x 변수에 접근할 수 있는 방법은 달리 없어 보입니다.

그러나 위 코드의 실행 결과는 outer 함수의 지역 변수 x의 값인 10입니다.  
이미 생명 주기가 종료되어 실행 컨텍스트 스택에서 제거된 outer 함수의 지역 변수 x가 다시 부활이라도 한 듯이 동작하고 있습니다.

이처럼 **외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있습니다.**  
**이러한 중첩 함수를 클로저(closure)라고 부릅니다.**

다시 클로저에 대한 MDN의 정의로 돌아가 봅시다.

"A closure is the combination of a function and the lexical environment within which that function was declared."  
클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합입니다.

위 정의에서 "그 함수가 선언된 렉시컬 환경"이란 함수가 정의된 위치의 스코프, 즉 상위 스코프를 의미하는 실행 컨텍스트의 렉시컬 환경을 말합니다.

자바스크립트의 모든 함수는 자신의 상위 스코프를 기억합니다.  
모든 함수가 기억하는 상위 스코프는 함수를 어디서 호출하든 상관없이 유지됩니다.  
따라서 함수를 어디서 호출하든 상관없이 함수는 언제나 자신이 기억하는 상위 스코프의 식별자를 참조할 수 있으며 식별자에 바인딩된 값을 변경할 수도 있습니다.

위 예제에서 inner 함수는 자신이 평가될 때 자신이 정의된 위치에 의해 결정된 상위 스코프를 [[Environment]] 내부 슬롯에 저장합니다.  
이때 저장된 상위 스코프는 함수가 존재하는 한 유지됩니다.

위 예제로 돌아가봅시다.  
위 예제에서 outer 함수가 평가되어 함수 객체를 생성할 때 (①) 현재 실행 중인 실행 컨텍스트의 렉시컬 환경, 즉 전역 렉시컬 환경을 outer 함수 객체의 [[Environment]] 내부 슬롯에 상위 스코프로서 저장합니다.

outer 함수를 호출하면 outer 함수의 렉시컬 환경이 생성되고 앞서 outer 함수 객체의 [[Environment]] 내부 슬롯에 저장된 전역 렉시컬 환경을 outer 함수 렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 할당합니다.

그리고 중첩 함수 inner가 평가됩니다.(② inner 함수는 함수 표현식으로 정의했기 때문에 런타임에 평가됩니다.)  
이때 중첩 함수 inner는 자신의 [[Environment]] 내부 슬롯에 현재 실행 중인 실행 컨텍스트의 렉시컬 환경, 즉 outer 함수의 렉시컬 환경을 상위 스코프로서 저장합니다.

outer 함수의 실행이 종료하면 inner 함수를 반환하면서 outer 함수의 생명주기가 종료됩니다.(③)  
즉, outer 함수의 실행 컨텍스트가 실행 컨텍스트 스택에서 제거됩니다.  
이때 **outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거되지만 outer 함수의 렉시컬 환경까지 소멸하는 것은 아닙니다.**

outer 함수의 렉시컬 환경은 inner 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있고 inner 함수는 전역 변수 innerFunc에 의해 참조되고 있으므로 가비지 컬렉션의 대상이 되지 않기 때문입니다.  
가비지 컬렉터는 누군가가 참조하고 있는 메모리 공간을 함부로 해제하지 않습니다.

outer 함수가 반환한 inner 함수를 호출(④)하면 inner 함수의 실행 컨텍스트가 생성되고 실행 컨텍스트 스택에 푸시됩니다.  
그리고 렉시컬 환경의 외부 렉시컬 환경에 대한 참조에는 inner 함수 객체의 [[Environment]] 내부 슬롯에 저장되어 있는 참조값이 할당됩니다.

중첩 함수 inner는 외부 함수 outer보다 더 오래 생존했습니다.  
이떄 외부 함수보다 더 오래 생존한 중첩 함수는 외부 함수의 생존 여부(샐힝 컨텍스트의 생존 여부)와 상관없이 자신이 정의된 위치에 의해 결정된 상위 스코프를 기억합니다.  
이처럼 중첩 함수 inner의 내부에서는 상위 스코프를 참조할 수 있으므로 상위 스코프의 식별자를 참조할 수 있고 식별자의 값을 변경할 수도 있습니다.

자바스크립트의 모든 함수는 상위 스코프를 기억하므로 이론적으로 모든 함수는 클로저입니다.  
하지만 일반적으로 모든 함수를 클로저라고 하지는 않습니다.

다음 예제를 브라우저에서 디버깅 모드로 실행해봅시다.

<br/>

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      function foo() {
        const x = 1;
        const y = 2;

        // 일반적으로 클로저라고 하지 않는다.
        function bar() {
          const z = 3;

          debugger;
          // 상위 스코프의 식별자를 참조하지 않는다.
          console.log(z);
        }

        return bar;
      }

      const bar = foo();
      bar();
    </script>
  </body>
</html>
```

<br/>

위 예제의 중첩 함수 bar는 외부 함수 foo보다 더 오래 유지되지만 상위 스코프의 어떤 식별자도 참조하지 않습니다.  
이처럼 상위 스코프의 어떤 식별자도 참조하지 않는 경우 대부분의 모던 브라우저는 최적화를 통해 다음 그림과 같이 상위 스코프를 기억하지 않습니다.  
참조하지도 않는 식별자를 기억하는 것은 메모리 낭비이기 때문입니다.  
따라서 bar 함수는 클로저라고 할 수 없습니다.

또 다른 예제를 브라우저에서 디버깅 모드로 실행해봅시다.

<br/>

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      function foo() {
        const x = 1;

        // 일반적으로 클로저라고 하지 않는다.
        // bar 함수는 클로저였지만 곧바로 소멸한다.
        function bar() {
          debugger;
          // 상위 스코프의 식별자를 참조한다.
          console.log(x);
        }
        bar();
      }

      foo();
    </script>
  </body>
</html>
```

<br/>

위 예제의 중첩 함수 bar는 상위 스코프의 식별자를 참조하고 있으므로 클로저입니다.  
하지만 외부 함수 foo의 외부로 중첩 함수 bar가 반환되지 않습니다.  
즉, 외부 함수 foo보다 중첩 함수 bar의 생명 주기가 짧습니다.  
이런 경우 중첩 함수 bar는 클로저였지만 외부 함수보다 일찍 소멸되기 때문에 생명 주기가 종료된 외부 함수의 식별자를 참조할 수 있다는 클로저의 본질에 부합하지 않습니다.  
따라서 중첩 함수 bar는 일반적으로 클로저라고 하지 않습니다.

또 다른 예제를 브라우저에서 디버깅 모드로 실행해봅시다.

<br/>

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      function foo() {
        const x = 1;
        const y = 2;

        // 클로저
        // 중첩 함수 bar는 외부 함수보다 더 오래 유지되며 상위 스코프의 식별자를 참조한다.
        function bar() {
          debugger;
          console.log(x);
        }
        return bar;
      }

      const bar = foo();
      bar();
    </script>
  </body>
</html>
```

<br/>

위 예제의 중첩 함수 bar는 상위 스코프의 식별자를 참조하고 있으므로 클로저입니다.  
그리고 외부 함수의 외부로 반환되어 외부 함수보다 더 오래 살아 남습니다.

이처럼 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있습니다.  
이러한 중첩 함수를 클로저라고 부릅니다.  
**클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적입니다.**

다만 클로저인 중첩 함수 bar는 상위 스코프의 x, y 식별자 중에서 x만 참조하고 있습니다.  
이런 경우 대부분의 모던 브라우저는 최적화를 통해 상위 스코프의 식별자 중에서 클로저가 참조하고 있는 식별자만을 기억합니다.

클로저에 의해 참조되는 상위 스코프의 변수(위 예제의 경우 foo 함수의 x변수)를 **자유 변수(free variable)** 라고 부릅니다.  
클로저(closure)란 "함수가 자유 변수에 대해 닫혀있다(closed)"라는 의미입니다.  
이를 좀 더 알기 쉽게 의역하자면 "자유 변수에 묶여있는 함수"라고 할 수 있습니다.

이론적으로 클로저는 상위 스코프를 기억해야 하므로 불필요한 메모리의 점유를 걱정할 수도 있습니다.  
하지만 모던 자바스크립트 엔진은 최적화가 잘 되어 있어서 클로저가 참조하고 있지 않는 식별자는 기억하지 않습니다.  
즉, 상위 스코프의 식별자 중에서 기억해야 할 식별자만 기억합니다.  
기억해야 할 식별자를 기억하는 것을 불필요한 메모리 낭비라고 볼 수 없습니다.  
즉, 클로저의 메모리 점유는 필요한 것을 기억하기 위한 것이므로 이는 걱정할 대상이 아닙니다.

클로저는 자바스크립트의 강력한 기능으로, 필요하다면 적극적으로 활용해야 합니다.  
클로저가 유용하게 사용되는 상황을 살펴봅시다.

<br/><br/>

## 4. 클로저의 활용

**클로저는 상태(state)를 안전하게 변경하고 유지하기 위해 사용합니다.**  
다시 말해, 상태가 의도치 않게 변경되지 않도록 **상태를 안전하게 은닉(information hiding)** 하고 **특정 함수에게만 상태 변경을 허용** 하기 위해 사용합니다.

함수가 호출될 때마다 호출된 횟수를 누적하여 출력하는 카운터를 만들어봅시다.  
이 예제의 호출된 횟수(num 변수)가 바로 안전하게 변경하고 유지해야 할 상태입니다.

<br/>

```javascript
// 카운트 상태 변수
let num = 0;

// 카운트 상태 변경 함수
const increase = function () {
  // 카운트 상태를 1만큼 증가 시킨다.
  return ++num;
};

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

<br/>

위 코드는 잘 동작하지만 오류를 발생시킬 가능성을 내포하고 있는 좋지 않은 코드입니다.  
그 이유는 위 예제가 바르게 동작하려면 다음의 전제 조건이 지켜져야 하기 때문입니다.

1.  카운트 상태(num 변수의 값)는 increase 함수가 호출되기 전까지 변경되지 않고 유지되어야 합니다.
2.  이를 위해 카운트 상태(num 변수의 값)는 increase 함수만이 변경할 수 있어야 합니다.

하지만 카운트 상태는 전역 변수를 통해 관리되고 있기 때문에 언제든지 누구나 접근할 수 있고 변경할 수 있습니다.(암묵적 결합)  
이는 의도치 않게 상태가 변경될 수 있다는 것을 의미합니다.  
만약 누군가에 의해 의도치 않게 카운트 상태, 즉 전역 변수 num의 값이 변경되면 이는 오류로 이어집니다.

따라서 카운트 상태를 안전하게 변경하고 유지하기 위해서는 increase 함수만이 num 변수를 참조하고 변경할 수 있게 하는 것이 바람직합니다.  
이를 위해 전역 변수 num을 increase 함수의 지역 변수로 바꾸어 의도치 않은 상태 변경을 방지해봅시다.

<br/>

```javascript
// 카운트 상태 변경 함수
const increase = function () {
  // 카운트 상태 변수
  let num = 0;

  // 카운트 상태를 1만큼 증가 시킨다.
  return ++num;
};

// 이전 상태를 유지하지 못한다.
console.log(increase()); // 1
console.log(increase()); // 1
console.log(increase()); // 1
```

<br/>

카운트 상태를 안전하게 변경하고 유지하기 위한 전역 변수 num을 increase 함수의 지역 변수로 변경하여 의도치 않은 상태 변경은 방지했습니다.  
이제 num 변수의 상태는 increase 함수만이 변경할 수 있습니다.

하지만 increase 함수가 호출될 때마다 지역 변수 num은 다시 선언되고 0으로 초기화되기 때문에 출력 결과는 언제나 1입니다.  
다시 말해, 상태가 변경되기 이전 상태를 유지하지 못합니다.  
이전 상태를 유지할 수 있도록 클로저를 사용해봅시다.

<br/>

```javascript
// 카운트 상태 변경 함수
const increase = (function () {
  // 카운트 상태 변수
  let num = 0;

  // 클로저
  return function () {
    // 카운트 상태를 1만큼 증가 시킨다.
    return ++num;
  };
})();

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

<br/>

위 코드가 실행되면 즉시 실행 함수가 호출되고 즉시 실행 함수가 반환한 함수가 increase 변수에 할당됩니다.  
increase 변수에 할당된 함수는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하는 클로저입니다.

즉시 실행 함수는 호출된 이후 소멸되지만 즉시 실행 함수가 반환한 클로저는 increase 변수에 할당되어 호출됩니다.  
이때 즉시 실행 함수가 반환한 클로저는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하고 있습니다.  
따라서 즉시 실행 함수가 반환한 클로저는 카운트 상태를 유지하기 위한 자유 변수 num을 언제 어디서 호출하든지 참조하고 변경할 수 있습니다.

즉시 실행 함수는 한 번만 실행되므로 increase가 호출될 때마다 num 변수가 재차 초기화될 일은 없을 것입니다.  
또한 num 변수는 외부에서 직접 접근할 수 없는 은닉된 private 변수이므로 전역 변수를 사용했을 때와 같이 의도되지 않은 변경을 걱정할 필요도 없기 때문에 더 안정적인 프로그래밍이 가능합니다.

**이처럼 클로저는 상태(state)가 의도치 않게 변경되지 않도록 안전하게 은닉(information hiding)하고 특정 함수에게만 상태 변경을 허용하여 상태를 안전하게 변경하고 유지하기 위해 사용합니다.**

앞의 예제는 카운트 상태를 증가시킬 수만 있습니다.  
카운트 상태를 감소시킬 수도 있도록 좀 더 발전시켜봅시다.

<br>

```javascript
const counter = (function () {
  // 카운트 상태 변수
  let num = 0;

  // 클로저인 메서드를 갖는 객체를 반환한다.
  // 객체 리터럴은 스코프를 만들지 않는다.
  // 따라서 아래 메서드들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경이다.
  return {
    // num: 0, // 프로퍼티는 public하므로 은닉되지 않는다.
    increase() {
      return ++num;
    },
    decrease() {
      return num > 0 ? --num : 0;
    },
  };
})();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```

<br>

위 예제에서 즉시 실행 함수가 반환하는 객체 리터럴은 즉시 실행 함수의 실행 단계에서 평가되어 객체가 됩니다.  
이때 객체의 메서드도 함수 객체로 생성됩니다.  
객체 리터럴의 중괄호는 코드 블록이 아니므로 별도의 스코프를 생성하지 않습니다.

위 예제의 increase, decrease 메서드의 상위 스코프는 increase, decrease 메서드가 평가되는 시점에 실행 중인 실행 컨텍스트인 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경입니다.  
따라서 increase, decrease 메서드가 언제 어디서 호출되든 상관없이 increase, decrease 함수는 즉시 실행 함수의 스코프의 식별자를 참조할 수 있습니다.

위 예제를 생성자 함수로 표현하면 다음과 같습니다.

<br/>

```javascript
const Counter = (function () {
  // ① 카운트 상태 변수
  let num = 0;

  function Counter() {
    // this.num = 0; // ② 프로퍼티는 public하므로 은닉되지 않는다.
  }

  Counter.prototype.increase = function () {
    return ++num;
  };

  Counter.prototype.decrease = function () {
    return num > 0 ? --num : 0;
  };

  return Counter;
})();

const counter = new Counter();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```

<br/>

위 예제의 num(①)은 생성자 함수 Counter가 생성할 인스턴스의 프로퍼티가 아니라 즉시 실행 함수 내에서 선언된 변수입니다.  
만약 num이 생성자 함수 Counter가 생성할 인스턴스의 프로퍼티라면(②) 인스턴스를 통해 외부에서 접근이 자유로운 public 프로퍼티가 됩니다.  
하지만 즉시 실행 함수 내에서 선언된 num 변수는 인스턴스를 통해 접근할 수 없으며, 즉시 실행 함수 외부에서도 접근할 수 없는 은닉된 변수입니다.

생성자 함수 Counter는 프로토타입을 통해 increase, decrease 메서드를 상속받는 인스턴스를 생성합니다.  
increase, decrease 메서드는 모두 자신의 함수 정의가 평가되어 함수 객체가 될 때 실행 중인 실행 컨텍스트는 프로토타입 메서드일지라도 즉시 실행 함수의 자유 변수 num을 참조할 수 있습니다.  
다시 말해, num 변수의 값은 increase, decrease 메서드만이 변경할 수 있습니다.

변수 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본적 원인이 될 수 있습니다.  
외부 상태 변경이나 가변(mutable) 데이터를 피하고 불변성(immutability)을 지향하는 함수형 프로그래밍에서 부수 효과를 최대한 억제하여 오류를 피하고 프로그램의 안전성을 높이기 위해 클로저는 적극적으로 사용됩니다.

다음은 함수형 프로그래밍에서 클로저를 활용하는 간단한 예제입니다.

<br/>

```javascript
// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
function makeCounter(predicate) {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 클로저를 반환
  return function () {
    // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
    counter = predicate(counter);
    return counter;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다
const increaser = makeCounter(increase); // ①
console.log(increaser()); // 1
console.log(increaser()); // 2

// increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
const decreaser = makeCounter(decrease); // ②
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

<br/>

makeCounter 함수는 보조 함수를 인자로 전달받고 함수를 반환하는 고차 함수입니다.  
makeCounter 함수가 반환하는 함수는 자신이 생성됐을 때의 렉시컬 환경인 makeCounter 함수의 스코프에 속한 counter 변수를 기억하는 클로저입니다.

makeCounter 함수는 인자로 전달받은 보조 함수를 합성하여 자신이 반환하는 함수의 동작을 변경할 수 있습니다.  
이때 주의해야 할 것은 **makeCounter 함수를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다** 는 것입니다.  
이는 함수를 호출하면 그때마다 새로운 makeCounter 함수 실행 컨텍스트의 렉시컬 환경이 생성되기 때문입니다.

①에서 makeCounter 함수를 호출하면 makeCounter 함수의 실행 컨텍스트가 생성됩니다.  
그리고 makeCounter 함수는 함수 객체를 생성하여 반환한 후 소멸됩니다.  
makeCounter 함수가 반환한 함수는 makeCounter 함수의 렉시컬 환경을 상위 스코프로서 기억하는 클로저이며, 전역 변수인 increaser에 할당됩니다.  
이때 makeCounter 함수의 실행 컨텍스트는 소멸되지만 makeCounter 함수 실행 컨텍스트의 렉시컬 환경은 makeCounter 함수가 반환한 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있기 때문에 소멸되지 않습니다.

②에서 makeCounter 함수를 호출하면 새로운 makeCounter 함수의 실행 컨텍스트가 생성됩니다.  
그리고 makeCounter 함수는 함수 객체를 생성하여 반환한 후 소멸됩니다.  
makeCounter 함수가 반환한 함수는 makeCounter 함수의 렉시컬 환경을 상위 스코프로서 기억하는 클로저이며, 전역 변수인 decreaser에 할당됩니다.  
이때 makeCounter 함수의 실행 컨텍스트는 소멸되지만 makeCounter 함수 실행 컨텍스트의 렉시컬 환경은 makeCounter 함수가 반환한 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있기 때문에 소멸되지 않습니다.

위 예제에서 전역 변수 increaser와 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에 카운트를 유지하기 위한 자유 변수 counter를 공유하지 않아 카운터의 증감이 연동되지 않습니다.  
따라서 독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만들려면 렉시컬 환경을 공유하는 클로저를 만들어야 합니다.  
이를 위해서는 makeCounter 함수를 두 번 호출하지 말아야 합니다.

 <br/>

```javascript
// 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
const counter = (function () {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 함수를 인수로 전달받는 클로저를 반환
  return function (predicate) {
    // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
    counter = predicate(counter);
    return counter;
  };
})();

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 보조 함수를 전달하여 호출
console.log(counter(increase)); // 1
console.log(counter(increase)); // 2

// 자유 변수를 공유한다.
console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0
```

<br/><br/>

## 5. 캡슐화와 정보 은닉

캡슐화(encapsulation)는 객체의 상태(state)를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작(behavior)인 메서드를 하나로 묶는 것을 말합니다.  
캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉(information hiding)이라 합니다.

정보 은닉은 외부에 공개할 필요가 없는 구현의 일부를 외부에 공개되지 않도록 감추어 적절치 못한 접근으로부터 객체의 상태가 변경되는 것을 방지해 정보를 보호하고, 객체 간의 상호 의존성, 즉 결합도(coupling)를 낮추는 효과가 있습니다.

대부분의 객체지향 프로그래밍 언어는 클래스를 정의하고 그 클래스를 구성하는 맴버(프로퍼티와 메서드)에 대하여 public, private, protected 같은 접근 제한자(access modifier)를 선언하여 공개 범위를 한정할 수 있습니다.  
public으로 선언된 프로퍼티와 메서드는 클래스 외부에서 참조할 수 있지만 private으로 선언된 경우는 클래스 외부에서 참조할 수 없습니다.

자바스크립트는 public, private, protected 같은 접근 제한자를 제공하지 않습니다.  
따라서 자바스크립트 객체의 모든 프로퍼티와 메서드는 기본적으로 외부에 공개되어 있습니다.  
즉, 객체의 모든 프로퍼티와 메서드는 기본적으로 public 합니다.

다음 예제를 살펴봅시다.

<br/>

```javascript
function Person(name, age) {
  this.name = name; // public
  let _age = age; // private

  // 인스턴스 메서드
  this.sayHi = function () {
    console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
  };
}

const me = new Person("Lee", 20);
me.sayHi(); // Hi! My name is Lee. I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined

const you = new Person("Kim", 30);
you.sayHi(); // Hi! My name is Kim. I am 30.
console.log(you.name); // Kim
console.log(you._age); // undefined
```

<br/>

위 예제의 name 프로퍼티는 현재 외부로 공개되어 있어서 자유롭게 참조하거나 변경할 수 있습니다.  
즉, name 프로퍼티는 public합니다.  
하지만 \_age 변수는 Person 생성자 함수의 지역 변수이므로 Person 생성자 함수 외부에서 참조하거나 변경할 수 없습니다.  
즉, \_age 변수는 private합니다.

하지만 위 예제의 sayHi 메서드는 인스턴스 메서드이므로 Person 객체가 생성될 때마다 중복 생성됩니다.  
sayHi 메서드를 프로토타입 메서드로 변경하여 sayHi 메서드의 중복 생성을 방지해 봅시다.

<br/>

```javascript
function Person(name, age) {
  this.name = name; // public
  let _age = age; // private
}

// 프로토타입 메서드
Person.prototype.sayHi = function () {
  // Person 생성자 함수의 지역 변수 _age를 참조할 수 없다
  console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
};
```

<br/>

이때 Person.prototype.sayHi 메서드 내에서 Person 생성자 함수의 지역 변수 \_age를 참조할 수 없는 문제가 발생합니다.  
따라서 다음과 같이 즉시 실행 함수를 사용하여 Person 생성자 함수와 Person.prototype.sayHi 메서드를 하나의 함수 내에 모아 봅시다.

<br/>

```javascript
const Person = (function () {
  let _age = 0; // private

  // 생성자 함수
  function Person(name, age) {
    this.name = name; // public
    _age = age;
  }

  // 프로토타입 메서드
  Person.prototype.sayHi = function () {
    console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
  };

  // 생성자 함수를 반환
  return Person;
})();

const me = new Person("Lee", 20);
me.sayHi(); // Hi! My name is Lee. I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined

const you = new Person("Kim", 30);
you.sayHi(); // Hi! My name is Kim. I am 30.
console.log(you.name); // Kim
console.log(you._age); // undefined
```

<br/>

위 패턴을 사용하면 public, private, protected 같은 접근 제한자를 제공하지 않는 자바스크립트에서도 정보 은닉이 가능한 것처럼 보입니다.  
즉시 실행 함수가 반환하는 Person 생성자 함수와 Person 생성자 함수의 인스턴스가 상속받아 호출할 Person.prototype.sayHi 메서드는 즉시 실행 함수가 종료된 이후 호출됩니다.  
하지만 Person 생성자 함수와 saiHi 메서드는 이미 종료되어 소멸한 즉시 실행 함수의 지역 변수 \_age를 참조할 수 있는 클로저입니다.

하지만 위 코드도 문제가 있습니다.  
Person 생성자 함수가 여러 개의 인스턴스를 생성할 경우 다음과 같이 \_age 변수의 상태가 유지되지 않는다는 것입니다.

<br/>

```javascript
const me = new Person("Lee", 20);
me.sayHi(); // Hi! My name is Lee. I am 20.

const you = new Person("Kim", 30);
you.sayHi(); // Hi! My name is Kim. I am 30.

// _age 변수 값이 변경된다!
me.sayHi(); // Hi! My name is Lee. I am 30.
```

<br/>

이는 Person.prototype.sayHi 메서드가 단 한 번 생성되는 클로저이기 때문에 발생하는 현상입니다.  
Person.prototype.sayHi 메서드는 즉시 실행 함수가 호출될 때 생성됩니다.  
이때 Person.prototype.sayHi 메서드는 자신의 상위 스코프인 즉시 실행 함수의 실행 컨텍스트의 렉시컬 환경의 참조를 [[Environment]]에 저장하여 기억합니다.  
따라서 Person 생성자 함수의 모든 인스턴스가 상속을 통해 호출할 수 있는 Person.prototype.sayHi 메서드의 상위 스코프는 어떤 인스턴스로 호출하더라도 하나의 동일한 상위 스코프를 사용하게 됩니다.  
이러한 이유로 Person 생성자 함수가 여러 개의 인스턴스를 생성할 경우 위와 같이 \_age 변수의 상태가 유지되지 않습니다.

이처럼 자바스크립트는 정보 은닉을 완전하게 지원하지 않습니다.  
인스턴스 메서드를 사용한다면 자유 변수를 통해 private을 흉내 낼 수는 있지만 프로토타입 메서드를 사용하면 이마저도 불가능해집니다.  
ES6의 Symbol 또는 WeakMap을 사용하여 private한 프로퍼티를 흉내 내기도 했으나 근본적인 해결책이 되지는 않습니다.

다행히도 2021년 1월, TC39 프로세스의 stage 3(candidate)에는 클래스에 private 필드를 정의할 수 있는 새로운 표준 사양이 제안되어 있습니다.  
표준 사양으로 승급이 확실시되는 이 제안은 현재 최신 브라우저(Chrome 74 이상)와 최신 Node.js(버전 12 이상)에 이미 구현되어 있습니다.

<br/><br/>

## 6. 자주 발생하는 실수

아래는 클로저를 사용할 때 자주 발생할 수 있는 실수를 보여주는 예제입니다.

<br/>

```javascript
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = function () {
    return i;
  }; // ①
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]()); // ②
}
```

<br/>

첫 번째 for 문의 코드 블록 내(①)에서 함수가 funcs 배열의 요소로 추가됩니다.  
그리고 두 번째 for 문의 코드 블록 내(②)에서 funcs 배열의 요소로 추가된 함수를 순차적으로 호출합니다.  
이때 funcs 배열의 요소로 추가된 3개의 함수가 0, 1, 2를 반환할 것으로 기대했다면 아쉽지만 결과는 그렇지 않습니다.

for 문의 변수 선언문에서 var 키워드로 선언한 i 변수는 블록 레벨 스코프가 아닌 함수 레벨 스코프를 갖기 때문에 전역 변수입니다.  
전역 변수 i에는 0, 1, 2가 순차적으로 할당됩니다.  
따라서 funcs 배열의 요소로 추가한 함수를 호출하면 전역 변수 i를 참조하여 i의 값 3이 출력됩니다.

클로저를 사용해 위 예제를 바르게 동작하는 코드로 만들어봅시다.

<br/>

```javascript
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = (function (id) {
    // ①
    return function () {
      return id;
    };
  })(i);
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]());
}
```

<br/>

①에서 즉시 실행 함수는 전역 변수 i에 현재 할당되어 있는 값을 인수로 전달받아 매개변수 id에 할당한 후 중첩 함수를 반환하고 종료됩니다.  
즉시 실행 함수가 반환한 함수는 funcs 배열에 순차적으로 저장됩니다.

이때 즉시 실행 함수의 매개변수 id는 즉시 실행 함수가 반환한 중첩 함수의 상위 스코프에 존재합니다.  
즉시 실행 함수가 반환한 중첩 함수는 자신의 상위 스코프(즉시 실행 함수의 렉시컬 환경)를 기억하는 클로저이고, 매개변수 id는 즉시 실행 함수가 반환한 중첩 함수에 묶여있는 자유 변수가 되어 그 값이 유지됩니다.

위 예제는 자바스크립트의 함수 레벨 스코프 특성으로 인해 for 문의 변수 선언문에서 var 키워드로 선언한 변수가 전역 변수가 되기 때문에 발생하는 현상입니다.  
ES6의 let 키워드를 사용하면 이 같은 번거로움이 깔끔하게 해결됩니다.

<br/>

```javascript
const funcs = [];

for (let i = 0; i < 3; i++) {
  funcs[i] = function () {
    return i;
  };
}

for (let i = 0; i < funcs.length; i++) {
  console.log(funcs[i]()); // 0 1 2
}
```

<br/>

for 문의 변수 선언문에서 let 키워드로 선언한 변수를 사용하면 for 문의 코드 블록이 반복 실행될 때마다 for 문 코드 블록의 새로운 렉시컬 환경이 생성됩니다.  
만약 for 문의 코드 블록 내에서 정의한 함수가 있다면 이 함수의 상위 스코프는 for 문의 코드 블록이 반복 실행될 때마다 생성된 for 문 코드 블록의 새로운 렉시컬 환경입니다.

이때 함수의 상위 스코프는 for 문의 코드 블록이 반복 실행될 때마다 식별자(for 문의 변수 선언문에서 선언한 초기화 변수 및 for 문의 코드 블록 내에서 선언한 지역 변수 등)의 값을 유지해야 합니다.  
이를 위해 for 문이 반복될 때마다 독립적인 렉시컬 환경을 생성하여 식별자의 값을 유지합니다.

for 문의 변수 선언문에서 let 키워드로 선언한 초기화 변수를 사용한 for 문의 평가되면 먼저 새로운 렉시컬 환경(LOOP Lexical Environment)을 생성하고 초기화 변수 식별자와 값을 등록합니다.  
그리고 새롭게 생성된 렉시컬 환경을 현재 실행 중인 실행 컨텍스트의 렉시컬 환경으로 교체합니다.

for 문의 코드 블록이 반복 실행되기 시작하면 새로운 렉시컬 환경(PER-ITERATION Lexical Environment)을 생성하고 for 문 코드 블록 내의 식별자와 값(증감문 반영 이전)을 등록합니다.  
그리고 새롭게 생성된 렉시컬 환경을 현재 실행 중인 실행 컨텍스트의 렉시컬 환경으로 교체합니다.

for 문의 코드 블록의 반복 실행이 모두 종료되면 for 문이 실행되기 이전의 렉시컬 환경을 실행 중인 실행 컨텍스트의 렉시컬 환경으로 되돌립니다.

이처럼 let이나 const 키워드를 사용하는 반복문(for 문, for...in문, for...of문, while 문 등)은 코드 블록을 반복 실행할 때마다 새로운 렉시컬 환경을 생성하여 반복할 당시의 상태를 마치 스냅숏을 찍는 것처럼 저장합니다.  
단, 이는 반복문의 코드 블록 내부에서 함수를 정의할 때 의미가 있습니다.  
반복문의 코드 블록 내부에 함수 정의가 없는 반복문이 생성하는 새로운 렉시컬 환경은 반복 직후, 아무도 참조하지 않기 때문에 가비지 컬렉션의 대상이 됩니다.

또 다른 방법으로는 함수형 프로그래밍 기법인 고차 함수를 사용하는 방법이 있습니다.  
이 방법은 변수와 반복문의 사용을 억제할 수 있기 때문에 오류를 줄이고 가독성을 좋게 만듭니다.

<br/>

```javascript
// 요소가 3개인 배열을 생성하고 배열의 인덱스를 반환하는 함수를 요소로 추가한다.
// 배열의 요소로 추가된 함수들은 모두 클로저다.
const funcs = Array.from(new Array(3), (_, i) => () => i); // (3) [ƒ, ƒ, ƒ]

// 배열의 요소로 추가된 함수 들을 순차적으로 호출한다.
funcs.forEach((f) => console.log(f())); // 0 1 2
```

<br/><br/><br/><br/><br/>
