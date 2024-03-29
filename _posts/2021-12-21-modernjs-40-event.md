---
title: 이벤트
subtitle: 모던 자바스크립트 Deep Dive | 40장 | 이벤트
readtime: 49 min
author: wookshin
tags: [javascript]
---

<br/>

# 이벤트

<br/>

## 1. 이벤트 드리븐 프로그래밍

브라우저는 처리해야 할 특정 사건이 발생하면 이를 감지하여 이벤트(event)를 발생(trigger) 시킵니다.  
예를 들어, 클릭, 키보드 입력, 마우스 이동 등이 일어나면 브라우저는 이를 감지하여 특정한 타입의 이벤트를 발생시킵니다.

만약 애플리케이션이 특정 타입의 이벤트에 대해 반응하여 어떤 일을 하고 싶다면 해당하는 타입의 이벤트가 발생했을 때 호출될 함수를 브라우저에게 알려 호출을 위임합니다.  
이때 이벤트가 발생했을 때 호출될 함수를 **이벤트 핸들러(event handler)** 라 하고, 이벤트가 발생했을 때 브라우저에게 이벤트 핸들러의 호출을 위임하는 것을 **이벤트 핸들러 등록** 이라 합니다.

예를 들어, 사용자가 버튼을 클릭했을 때 함수를 호출하여 어떤 처리를 하고 싶다고 가정해봅시다.  
이때 문제는 "언제 함수를 호출해야 하는가" 입니다.  
사용자가 언제 버튼을 클릭할지 알 수 없으므로 언제 함수를 호출해야 할지 알 수 없기 때문입니다.

다행히 브라우저는 사용자의 버튼 클릭을 감지하여 클릭이벤트를 발생시킬 수 있습니다.  
그리고 특정 버튼 요소에서 클릭 이벤트가 발생하면 특정 함수(이벤트 핸들러)를 호출하도록 브라우저에게 위임(이벤트 핸들러 등록)할 수 있습니다.  
즉, 함수를 언제 호출할지 알 수 없으므로 개발자가 명시적으로 함수를 호출하는 것이 아니라 브라우저에게 함수 호출을 위임하는 것입니다.

이를 코드로 표현하면 다음과 같습니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button>Click me!</button>
    <script>
      const $button = document.querySelector("button");

      // 사용자가 버튼을 클릭하면 함수를 호출하도록 요청
      $button.onclick = () => {
        alert("button click");
      };
    </script>
  </body>
</html>
```

<br/>

위 예제를 살펴보면 버튼 요소 `$button` 의 `onclick` 프로퍼티에 함수를 할당했습니다.  
`Window`, `Document`, `HTMLElement` 타입의 객체는 `onclick` 과 같이 특정 이벤트에 대응하는 다양한 이벤트 핸들러 프로퍼티를 가지고 있습니다.  
이 이벤트 핸들러 프로퍼티에 함수를 할당하면 해당 이벤트가 발생했을 때 할당한 함수가 브라우저에 의해 호출됩니다.

이처럼 이벤트와 그에 대응하는 함수(이벤트 핸들러)를 통해 사용자와 애플리케이션은 상호작용(interaction)을 할 수 있습니다.  
이와 같이 프로그램의 흐름을 이벤트 중심으로 제어하는 프로그래밍 방식을 **이벤트 드리븐 프로그래밍(event-driven programming)** 이라 합니다.

<br/><br/>

## 2. 이벤트 타입

이벤트 타입(event type)은 이벤트의 종류를 나타내는 문자열입니다.  
예를 들어, 이벤트 타입 `click` 은 사용자가 마우스 버튼을 클릭했을 때 발생하는 이벤트를 나타냅니다.  
이벤트 타입은 약 200여 가지가 있습니다.  
다음에 소개하는 이벤트 타입은 사용 빈도가 높은 이벤트입니다.  
이벤트 타입에 대한 상세 목록은 MDN의 Event reference에서 확인할 수 있습니다.

<br/>

### 2.1 마우스 이벤트

| 이벤트 타입  | 이벤트 발생 시점                                                |
| ------------ | --------------------------------------------------------------- |
| `click`      | 마우스 버튼을 클릭했을 때                                       |
| `dbclick`    | 마우스 버튼을 더블 클릭했을 때                                  |
| `mousedown`  | 마우스 버튼을 눌렀을 때                                         |
| `mouseup`    | 누르고 있던 마우스 버튼을 놓았을 때                             |
| `mousemove`  | 마우스 커서를 움직였을 때                                       |
| `mouseenter` | 마우스 커서를 HTML 요소 안으로 이동했을 때(버블링되지 않습니다) |
| `mouseover`  | 마우스 커서를 HTML 요소 안으로 이동했을 때(버블링됩니다)        |
| `mouseleave` | 마우스 커서를 HTML 요소 밖으로 이동했을 때(버블링되지 않습니다) |
| `mouseout`   | 마우스 커서를 HTML 요소 밖으로 이동했을 때(버블링됩니다)        |

<br/>

### 2.2 키보드 이벤트

| 이벤트 타입 | 이벤트 발생 시점                                                                                                                                                                                                                                               |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `keydown`   | 모든 키를 눌렀을 때 발생합니다. ※ control, opinion, shift, tab, delete, enter, 방향 키와 문자, 숫자, 특수 문자 키를 눌렀을 때 발생합니다. 단, 문자, 숫자, 특수 문자, enter 키를 눌렀을 때는 연속적으로 발생하지만 그 외의 키를 눌렀을 때는 한 번만 발생합니다. |
| `keypress`  | 모든 키를 눌렀을 때 연속적으로 발생합니다. ※ control, opinion, shift, tab, delete, 방향 키 등을 눌렀을 때는 발생하지 않고 문자, 숫자, 특수 문자, enter 키를 눌렀을 때만 발생합니다. 폐지(deprecated)되었으므로 사용하지 않을 것을 권장합니다.                  |
| `keyup`     | 누르고 있던 키를 놓았을 때 한 번만 발생합니다. ※ control, opinion, shift, tab, delete, enter, 방향 키와 문자, 숫자, 특수 문자 키를 놓았을 때 발생합니다.                                                                                                       |

<br/>

### 2.3 포커스 이벤트

| 이벤트 타입 | 이벤트 발생 시점                                    |
| ----------- | --------------------------------------------------- |
| `focus`     | HTML 요소가 포커스를 받았을 때(버블링되지 않습니다) |
| `blur`      | HTML 요소가 포커스를 잃었을 때(버블링되지 않습니다) |
| `focusin`   | HTML 요소가 포커스를 받았을 때(버블링됩니다)        |
| `focusout`  | HTML 요소가 포커스를 잃었을 때(버블링됩니다)        |

<br/>

### 2.4 폼 이벤트

| 이벤트 타입 | 이벤트 발생 시점                                             |
| ----------- | ------------------------------------------------------------ |
| `submit`    | form 요소 내의 submit 버튼을 클릭했을 때                     |
| `reset`     | form 요소 내의 reset 버튼을 클릭했을 때(최근에는 사용 안 함) |

<br/>

### 2.5 값 변경 이벤트

| 이벤트 타입        | 이벤트 발생 시점                                                                                                                                                                                                                                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`            | input(text, checkbox, radio), select, textarea 요소의 값이 입력되었을 때                                                                                                                                                                                                                                                    |
| `change`           | input(text, checkbox, radio), select, textarea 요소의 값이 변경되었을 때 ※ change 이벤트는 input 이벤트와는 달리 HTML 요소가 포커스를 잃었을 때 사용자 입력이 종료되었다고 인식하여 발생합니다. 즉, 사용자가 입력을 하고 있을 때는 input 이벤트가 발생하고 사용자 입력이 종료되어 값이 변경되면 change 이벤트가 발생합니다. |
| `readystatechange` | HTML 문서의 로드와 파싱 상태를 나타내는 document.readyState 프로퍼티 값('loading', 'interactive', 'complete')이 변경될 때                                                                                                                                                                                                   |

<br/>

### 2.6 DOM 뮤테이션 이벤트

| 이벤트 타입        | 이벤트 발생 시점                                                 |
| ------------------ | ---------------------------------------------------------------- |
| `DOMContentLoaded` | HTML 문서의 로드와 파싱이 완료되어 **DOM 생성이 완료** 되었을 때 |

<br/>

### 2.7 뷰 이벤트

| 이벤트 타입 | 이벤트 발생 시점                                                                                               |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| `resize`    | 브라우저 윈도우(`window`)의 크기를 리사이즈할 때 연속적으로 발생합니다. ※ 오직 `window` 객체에서만 발생합니다. |
| `scroll`    | 웹페이지(`document`) 또는 HTML 요소를 스크롤할 때 연속적으로 발생합니다.                                       |

<br/>

### 2.8 리소스 이벤트

| 이벤트 타입 | 이벤트 발생 시점                                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| `load`      | `DOMContentLoaded` 이벤트가 발생한 이후, 모든 리소스(이미지, 폰트 등)의 로딩이 완료되었을 때(주로 `window` 객체에서 발생) |
| `unload`    | 리소스가 언로드될 때(주로 새로운 웹페이지를 요청한 경우)                                                                  |
| `abort`     | 리소스 로딩이 중단되었을 때                                                                                               |
| `error`     | 리소스 로딩이 실패했을 때                                                                                                 |

<br/><br/>

## 3. 이벤트 핸들러 등록

이벤트 핸들러(event handler 또는 event listener)는 이벤트가 발생했을 때 브라우저에 호출을 위임한 함수입니다.  
다시 말해, **이벤트가 발생하면 브라우저에 의해 호출될 함수가 이벤트 핸들러입니다.**

이벤트가 발생했을 때 브라우저에게 이벤트 핸들러의 호출을 위임하는 것을 이벤트 핸들러 등록이라 합니다.  
이벤트 핸들러를 등록하는 방법은 3가지입니다.

<br/>

### 3.1 이벤트 핸들러 어트리뷰트 방식

HTML 요소의 어트리뷰트 중에서 이벤트에 대응하는 이벤트 핸들러 어트리뷰트가 있습니다.  
이벤트 핸들러 어트리뷰트의 이름은 `onclick` 과 같이 `on` 접두사와 이벤트 종류를 나타내는 이벤트 타입으로 이루어져 있습니다.  
이벤트 핸들러 어트리뷰트 값으로 함수 호출문 등의 문(statement)을 할당하면 이벤트 핸들러가 등록됩니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button onclick="sayHi('Lee')">Click me!</button>
    <script>
      function sayHi(name) {
        console.log(`Hi! ${name}.`);
      }
    </script>
  </body>
</html>
```

<br/>

주의할 점은 이벤트 핸들러 어트리뷰트 값으로 함수 참조가 아닌 함수 호출무 등의 문을 할당한다는 것입니다.  
다음에 살펴볼 "이벤트 핸들러 프로퍼티 방식"에서는 DOM 노드의 이벤트 핸들러 프로퍼티에 함수 참조를 할당합니다.

이벤트 핸들러 등록이란 함수 호출을 브라우저에게 위임하는 것이라 했습니다.  
따라서 이벤트 핸들러를 등록할 떄 콜백 함수와 마찬가지로 함수 참조를 등록해야 브라우저가 이벤트 핸들러를 호출할 수 있습니다.  
만약 함수 참조가 아니라 함수 호출문을 등록하면 함수 호출문의 평가 결과가 이벤트 핸들러로 등록됩니다.  
함수를 반환하는 고차 함수 호출문을 이벤트 핸들러로 등록한다면 문제가 없겠지만 함수가 아닌 값을 반환하는 함수 호출문을 이벤트 핸들러로 등록하면 브라우저가 이벤트 핸들러를 호출할 수 없습니다.

하지만 위 예제에서는 이벤트 핸들러 어트리뷰트 값으로 함수 호출문을 할당했습니다.  
이때 **이벤트 핸들러 어트리뷰트 값은 사실 암묵적으로 생성될 이벤트 핸들러의 함수 몸체를 의미합니다.**  
즉, `onclick="sayHi('Lee')"` 어트리뷰트는 파싱되어 다음과 같은 함수를 암묵적으로 생성하고, 이벤트 핸들러 어트리뷰트 이름과 동일한 키 `onclick` 이벤트 핸들러 프로퍼티에 할당합니다.

```javascript
function onclick(event) {
  sayHi("Lee");
}
```

<br/>

이처럼 동작하는 이유는 이벤트 핸들러에 인수를 전달하기 위해서입니다.  
만약 이벤트 핸들러 어트리뷰트 값으로 함수 참조를 할당해야 한다면 이벤트 핸들러에 인수를 전달하기 곤란합니다.

```html
<!-- 이벤트 핸들러에 인수를 전달하기 곤란하다. -->
<button onclick="sayHi">Click me!</button>
```

<br/>

결국 이벤트 핸들러 어트리뷰트 값으로 할당한 문자열은 암묵적으로 생성되는 이벤트 핸들러의 함수 몸체입니다.  
따라서 이벤트 핸들러 어트리뷰트 값으로 다음과 같이 여러 개의 문을 할당할 수 있습니다.

```html
<button onclick="console.log('Hi! '); console.log('Lee');">Click me!</button>
```

<br/>

이벤트 핸들러 어트리뷰트 방식은 오래된 코드에서 간혹 이 방식을 사용한 것이 있기 때문에 알아둘 필요는 있지만 더는 사용하지 않는 것이 좋습니다.  
HTML과 자바스크립트는 관심사가 다르므로 혼재하는 것보다 분리하는 것이 좋습니다.

하지만 모던 자바스크립트에서는 이벤트 핸들러 어트리뷰트 방식을 사용하는 경우가 있습니다.  
CBD(Component Based Development) 방식의 Angular/React/Svelte/Vue.js 같은 프레임워크/라이브러리에서는 이벤트 핸들러 어트리뷰트 방식으로 이벤트를 처리합니다.  
CBD에서는 HTML, CSS, 자바스크립트를 관심시가 다른 개별적인 요소가 아닌, 뷰를 구성하기 위한 구성 요소로 보기 때문에 관심사가 다르다고 생각하지 않습니다.

```html
<!-- Angular -->
<button (click)="handleClick($event)">Save</button>

{ /* React */ }
<button onClick="{handleClick}">Save</button>

<!-- Svelte -->
<button on:click="{handleClick}">Save</button>

<!-- Vue.js -->
<button v-on:click="handleClick($event)">Save</button>
```

<br/>

### 3.2 이벤트 핸들러 프로퍼티 방식

`window` 객체와 `Document`, `HTMLElement` 타입의 DOM 노드 객체는 이벤트에 대응하는 이벤트 핸들러 프로퍼티를 가지고 있습니다.  
이벤트 핸들러 프로퍼티의 키는 이벤트 핸들러 어트리뷰트와 마찬가지로 `onclick` 과 같이 `on` 접두사와 이벤트의 종류를 나타내는 이벤트 타입으로 이루어져 있습니다.  
이벤트 핸들러 프로퍼티에 함수를 바인딩하면 이벤트 핸들러가 등록됩니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button>Click me!</button>
    <script>
      const $button = document.querySelector("button");

      // 이벤트 핸들러 프로퍼티에 이벤트 핸들러를 바인딩
      $button.onclick = function () {
        console.log("button click");
      };
    </script>
  </body>
</html>
```

<br/>

이벤트 핸들러를 등록하기 위해서는 이벤트를 발생시킬 객체인 **이벤트 타깃(event target)** 과 이벤트의 종류를 나타내는 문자열인 **이벤트 타입(event type)** 그리고 **이벤트 핸들러** 를 지정할 필요가 있습니다.  
예를 들어, 버튼 요소가 클릭되면 `handleClick` 함수를 호출하도록 이벤트 핸들러를 등록하는 경우 이벤트 타깃은 버튼 요소이고 이벤트 타입은 `click` 이며 이벤트 핸들러는 `handleClick` 함수입니다.

이벤트 핸들러는 대부분 이벤트를 발생시킬 이벤트 타깃에 바인딩합니다.  
하지만 반드시 이벤트 타깃에 이벤트 핸들러를 바인딩해야 하는 것은 아닙니다.  
이벤트 핸들러는 이벤트 타깃 또는 전파된 이벤트를 캐치할 DOM 노드 객체에 바인딩합니다.

앞서 살펴본 "이벤트 핸들러 어트리뷰트 방식"도 결국 DOM 노드 객체의 이벤트 핸들러 프로퍼티로 변환되므로 결과적으로 이벤트 핸들러 프로퍼티 방식과 동일하다고 할 수 있습니다.  
"이벤트 핸들러 프로퍼티 방식"은 "이벤트 핸들러 어트리뷰트 방식"의 HTML과 자바스크립트가 뒤섞이는 문제를 해결할 수 있습니다.  
하지만 이벤트 핸들러 프로퍼티에 하나의 이벤트 핸들러만 바인딩할 수 있다는 단점이 있습니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button>Click me!</button>
    <script>
      const $button = document.querySelector("button");

      // 이벤트 핸들러 프로퍼티 방식은 하나의 이벤트에 하나의 이벤트 핸들러만을 바인딩할 수 있다.
      // 첫 번째로 바인딩된 이벤트 핸들러는 두 번째 바인딩된 이벤트 핸들러에 의해 재할당되어
      // 실행되지 않는다.
      $button.onclick = function () {
        console.log("Button clicked 1");
      };

      // 두 번째로 바인딩된 이벤트 핸들러
      $button.onclick = function () {
        console.log("Button clicked 2");
      };
    </script>
  </body>
</html>
```

<br/>

### 3.3 addEventListener 메서드 방식

DOM Level 2에서 도입된 `EventTarget.prototype.addEventListener` 메서드를 사용하여 이벤트 핸들러를 등록할 수 있습니다.  
앞서 살펴본 "이벤트 핸들러 어트리뷰트 방식"과 "이벤트 핸들러 프로퍼티 방식"은 DOM Level 0부터 제공되던 방식입니다.

`addEventListener` 메서드의 첫 번째 매개변수에는 이벤트의 종류를 나타내는 문자열인 이벤트 타입을 전달합니다.  
이때 이벤트 핸들러 프로퍼티 방식과는 달리 `on` 접두사를 붙이지 않습니다.  
두 번째 매개변수에는 이벤트 핸들러를 전달합니다.  
마지막 매개변수에는 이벤트를 캐치할 이벤트 전파 단계(캡쳐링 또는 버블링)를 지정합니다.  
생략하거나 `false` 를 지정하면 버블링 단계에서 이벤트를 캐치하고, `true` 를 지정하면 캡쳐링 단계에서 이벤트를 캐치합니다.

"이벤트 핸들러 프로퍼티 방식"에서 살펴본 예제를 `addEventListener` 메서드를 사용하도록 수정해 봅시다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button>Click me!</button>
    <script>
      const $button = document.querySelector("button");

      // 이벤트 핸들러 프로퍼티 방식
      // $button.onclick = function () {
      //   console.log('button click');
      // };

      // addEventListener 메서드 방식
      $button.addEventListener("click", function () {
        console.log("button click");
      });
    </script>
  </body>
</html>
```

<br/>

이벤트 핸들러 프로퍼티 방식은 이벤트 핸들러 프로퍼티에 이벤트 핸들러를 바인딩하지만 `addEventListener` 메서드에는 이벤트 핸들러를 인수로 전달합니다.  
만약 동일한 HTML 요소에서 발생한 동일한 이벤트에 대해 이벤트 핸들러 프로퍼티 방식과 `addEventListener` 메서드 방식을 모두 사용하여 이벤트 핸들러를 등록하면 어떻게 동작할지 생각해봅시다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button>Click me!</button>
    <script>
      const $button = document.querySelector("button");

      // 이벤트 핸들러 프로퍼티 방식
      $button.onclick = function () {
        console.log("[이벤트 핸들러 프로퍼티 방식]button click");
      };

      // addEventListener 메서드 방식
      $button.addEventListener("click", function () {
        console.log("[addEventListener 메서드 방식]button click");
      });
    </script>
  </body>
</html>
```

<br/>

`addEventListener` 메서드 방식은 이벤트 핸들러 프로퍼티에 바인딩된 이벤트 핸들러에 아무런 영향을 주지 않습니다.  
따라서 버튼 요소에서 클릭 이벤트가 발생하면 2개의 이벤트 핸들러가 모두 호출됩니다.

동일한 HTML 요소에서 발생한 동일한 이벤트에 대해 이벤트 핸들러 프로퍼티 방식은 하나 이상의 이벤트 핸들러를 등록할 수 없지만 `addEventListener` 메서드는 하나 이상의 이벤트 핸들러를 등록할 수 있습니다.  
이때 이벤트 핸들러는 등록된 순서대로 호출됩니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button>Click me!</button>
    <script>
      const $button = document.querySelector("button");

      // addEventListener 메서드는 동일한 요소에서 발생한 동일한 이벤트에 대해
      // 하나 이상의 이벤트 핸들러를 등록할 수 있다.
      $button.addEventListener("click", function () {
        console.log("[1]button click");
      });

      $button.addEventListener("click", function () {
        console.log("[2]button click");
      });
    </script>
  </body>
</html>
```

<br/>

단, `addEventListener` 메서드를 통해 참조가 동일한 이벤트 핸들러를 중복 등록하면 하나의 이벤트 핸들러만 등록됩니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button>Click me!</button>
    <script>
      const $button = document.querySelector("button");

      const handleClick = () => console.log("button click");

      // 참조가 동일한 이벤트 핸들러를 중복 등록하면 하나의 핸들러만 등록된다.
      $button.addEventListener("click", handleClick);
      $button.addEventListener("click", handleClick);
    </script>
  </body>
</html>
```

<br/><br/>

## 4. 이벤트 핸들러 제거

`addEventListener` 메서드로 등록한 이벤트 핸들러를 제거하려면 `EventTarget.prototype.removeEventListener` 메서드를 사용합니다.  
`removeEventListener` 메서드에 전달할 인수는 `addEventListener` 메서드와 동일합니다.  
단, `addEventListener` 메서드에 전달한 인수와 `removeEventListener` 메서드에 전달한 인수가 일치하지 않으면 이벤트 핸들러가 제거되지 않습니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button>Click me!</button>
    <script>
      const $button = document.querySelector("button");

      const handleClick = () => console.log("button click");

      // 이벤트 핸들러 등록
      $button.addEventListener("click", handleClick);

      // 이벤트 핸들러 제거
      // addEventListener 메서드에 전달한 인수와 removeEventListener 메서드에
      // 전달한 인수가 일치하지 않으면 이벤트 핸들러가 제거되지 않는다.
      $button.removeEventListener("click", handleClick, true); // 실패
      $button.removeEventListener("click", handleClick); // 성공
    </script>
  </body>
</html>
```

<br/>

`removeEventListener` 메서드에 인수로 전달한 이벤트 핸들러는 `addEventListener` 메서드에 인수로 전달한 등록 이벤트 핸들러와 동일한 함수이어야 합니다.  
따라서 다음과 같이 무명 함수를 이벤트 핸들러로 등록한 경우 제거할 수 없습니다.  
이벤트 핸들러를 제거하려면 이벤트 핸들러의 참조를 변수나 자료구조에 저장하고 있어야 합니다.

```javascript
// 이벤트 핸들러 등록
$button.addEventListener("click", () => console.log("button click"));
// 등록한 이벤트 핸들러를 참조할 수 없으므로 제거할 수 없다.
```

<br/>

단, 기명 이벤트 핸들러 내부에서 `removeEventListener` 메서드를 호출하여 이벤트 핸들러를 제거하는 것은 가능합니다.  
이때 이벤트 핸들러는 단 한 번만 호출됩니다.  
다음 예제의 경우 버튼 요소를 여러 번 클릭해도 단 한 번만 이벤트 핸들러가 호출됩니다.

```javascript
// 기명 함수를 이벤트 핸들러로 등록
$button.addEventListener("click", function foo() {
  console.log("button click");
  // 이벤트 핸들러를 제거한다. 따라서 이벤트 핸들러는 단 한 번만 호출된다.
  $button.removeEventListener("click", foo);
});
```

<br/>

기명 함수를 이벤트 핸들러로 등록할 수 없다면 호출된 함수, 즉 함수 자신을 가리키는 `arguments.callee` 를 사용할 수도 있습니다.

```javascript
// 무명 함수를 이벤트 핸들러로 등록
$button.addEventListener("click", function () {
  console.log("button click");
  // 이벤트 핸들러를 제거한다. 따라서 이벤트 핸들러는 단 한 번만 호출된다.
  // arguments.callee는 호출된 함수, 즉 함수 자신을 가리킨다.
  $button.removeEventListener("click", arguments.callee);
});
```

<br/>

`arguments.callee` 는 코드 최적화를 방해하므로 `strict mode` 에서 사용이 금지됩니다.  
따라서 가급적 이벤트 핸들러의 참조를 변수나 자료구조에 저장하여 제거하는 편이 좋습니다.

이벤트 핸들러 프로퍼티 방식으로 등록한 이벤트 핸들러는 `removeEventListener` 메서드로 제거할 수 없습니다.  
이벤트 핸들러 프로퍼티 방식으로 등록한 이벤트 핸들러를 제거하려면 이벤트 핸들러 프로퍼티에 `null` 을 할당합니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button>Click me!</button>
    <script>
      const $button = document.querySelector("button");

      const handleClick = () => console.log("button click");

      // 이벤트 핸들러 프로퍼티 방식으로 이벤트 핸들러 등록
      $button.onclick = handleClick;

      // removeEventListener 메서드로 이벤트 핸들러를 제거할 수 없다.
      $button.removeEventListener("click", handleClick);

      // 이벤트 핸들러 프로퍼티에 null을 할당하여 이벤트 핸들러를 제거한다.
      $button.onclick = null;
    </script>
  </body>
</html>
```

<br/><br/>

## 5. 이벤트 객체

이벤트가 발생하면 이벤트에 관련한 다양한 정보를 담고 있는 이벤트 객체가 동적으로 생성됩니다.  
**생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달됩니다.**

```html
<!DOCTYPE html>
<html>
  <body>
    <p>클릭하세요. 클릭한 곳의 좌표가 표시됩니다.</p>
    <em class="message"></em>
    <script>
      const $msg = document.querySelector(".message");

      // 클릭 이벤트에 의해 생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달된다.
      function showCoords(e) {
        $msg.textContent = `clientX: ${e.clientX}, clientY: ${e.clientY}`;
      }

      document.onclick = showCoords;
    </script>
  </body>
</html>
```

<br/>

클릭 이벤트에 의해 생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달되어 매개변수 `e` 에 암묵적으로 할당됩니다.  
이는 브라우저가 이벤트 핸들러를 호출할 때 이벤트 객체를 인수로 전달하기 때문입니다.  
따라서 이벤트 객체를 전달받으려면 이벤트 핸들러를 정의할 때 이벤트 객체를 전달받을 매개변수를 명시적으로 선언해야 합니다.  
위 예제에서 `e` 라는 이름으로 매개변수를 선언했으나 다른 이름을 사용하여도 상관 없습니다.

이벤트 핸들러 어트리뷰트 방식으로 이벤트 핸들러를 등록했다면 다음과 같이 `event` 를 통해 이벤트 객체를 전달받을 수 있습니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      html,
      body {
        height: 100%;
      }
    </style>
  </head>
  <!-- 이벤트 핸들러 어트리뷰트 방식의 경우 event가 아닌 다른 이름으로는 이벤트 객체를
전달받지 못한다. -->
  <body onclick="showCoords(event)">
    <p>클릭하세요. 클릭한 곳의 좌표가 표시됩니다.</p>
    <em class="message"></em>
    <script>
      const $msg = document.querySelector(".message");

      // 클릭 이벤트에 의해 생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달된다.
      function showCoords(e) {
        $msg.textContent = `clientX: ${e.clientX}, clientY: ${e.clientY}`;
      }
    </script>
  </body>
</html>
```

<br/>

이벤트 핸들러 어트리뷰트 방식의 경우 이벤트 객체를 전달받으려면 이벤트 핸들러의 첫 번째 매개변수 이름이 반드시 `event` 이어야 합니다.  
만약 `event` 가 아닌 다른 이름으로 매개변수를 선언하면 이벤트 객체를 전달받지 못합니다.  
그 이유는 이벤트 핸들러 어트리뷰트 값은 사실 암묵적으로 생성되는 이벤트 핸들러의 함수 몸체를 의미하기 때문입니다.  
즉, `onclick="showCoords(event)"` 어트리뷰트는 파싱되어 다음과 같은 함수를 암묵적으로 생성하여 `onclick` 이벤트 핸들러 프로퍼티에 할당합니다.

```javascript
function onclick(event) {
  showCoords(event);
}
```

<br/>

이때 암묵적으로 생성된 `onclick` 이벤트 핸들러의 첫 번째 매개변수의 이름이 `event` 로 암묵적으로 명명되기 때문에 `event` 가 아닌 다른 이름으로는 이벤트 객체를 전달받지 못합니다.

<br/>

### 5.1 이벤트 객체의 상속 구조

이벤트가 발생하면 이벤트 타입에 따라 다양한 타입의 이벤트 객체가 생성됩니다.  
이벤트 객체는 다음과 같은 상속 구조를 갖습니다.

![ui_events_interface_inheritance](/assets/images/ui_events_interface_inheritance.png) <br/>

<br/>

위 그림의 `Event`, `UIEvent`, `MouseEvent` 등 모두는 생성자 함수입니다.  
따라서 다음과 같이 생성자 함수를 호출하여 이벤트 객체를 생성할 수 있습니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      // Event 생성자 함수를 호출하여 foo 이벤트 타입의 Event 객체를 생성한다.
      let e = new Event("foo");
      console.log(e);
      // Event {isTrusted: false, type: "foo", target: null, ...}
      console.log(e.type); // "foo"
      console.log(e instanceof Event); // true
      console.log(e instanceof Object); // true

      // FocusEvent 생성자 함수를 호출하여 focus 이벤트 타입의 FocusEvent 객체를 생성한다.
      e = new FocusEvent("focus");
      console.log(e);
      // FocusEvent {isTrusted: false, relatedTarget: null, view: null, ...}

      // MouseEvent 생성자 함수를 호출하여 click 이벤트 타입의 MouseEvent 객체를 생성한다.
      e = new MouseEvent("click");
      console.log(e);
      // MouseEvent {isTrusted: false, screenX: 0, screenY: 0, clientX: 0, ... }

      // KeyboardEvent 생성자 함수를 호출하여 keyup 이벤트 타입의 KeyboardEvent 객체를
      // 생성한다.
      e = new KeyboardEvent("keyup");
      console.log(e);
      // KeyboardEvent {isTrusted: false, key: "", code: "", ctrlKey: false, ...}

      // InputEvent 생성자 함수를 호출하여 change 이벤트 타입의 InputEvent 객체를 생성한다.
      e = new InputEvent("change");
      console.log(e);
      // InputEvent {isTrusted: false, data: null, inputType: "", ...}
    </script>
  </body>
</html>
```

<br/>

이처럼 이벤트가 발생하면 암묵적으로 생성되는 이벤트 객체도 생성자 함수에 의해 생성됩니다.  
그리고 생성된 이벤트 객체는 생성자 함수와 더불어 생성되는 프로토타입으로 구성된 프로토타입 체인의 일원이 됩니다.

이벤트 객체 중 일부는 사용자의 행위에 의해 생성된 것이고 일부는 자바스크립트 코드에 의해 인위적으로 생성된 것입니다.  
예를 들어, `MouseEvent` 타입의 이벤트 객체는 사용자가 마우스를 클릭하거나 이동했을 때 생성되는 이벤트 객체이며, `CustomEvent` 타입의 이벤트 객체는 자바스크립트 코드에 의해 인위적으로 생성한 이벤트 객체입니다.

`Event` 인터페이스는 DOM 내에서 발생한 이벤트에 의해 생성되는 이벤트 객체를 나타냅니다.  
`Event` 인터페이스에는 모든 이벤트 객체의 공통 프로퍼티가 정의되어 있고 `FocusEvent`, `MouseEvent`, `KeyboardEvent`, `WheelEvent` 같은 하위 인터페이스에는 이벤트 타입에 따라 고유한 프로퍼티가 정의되어 있습니다.  
즉, 다음 예제와 같이 이벤트 객체의 프로퍼티는 발생한 이벤트의 타입에 따라 달라집니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <input type="text" />
    <input type="checkbox" />
    <button>Click me!</button>
    <script>
      const $input = document.querySelector("input[type=text]");
      const $checkbox = document.querySelector("input[type=checkbox]");
      const $button = document.querySelector("button");

      // load 이벤트가 발생하면 Event 타입의 이벤트 객체가 생성된다.
      window.onload = console.log;

      // change 이벤트가 발생하면 Event 타입의 이벤트 객체가 생성된다.
      $checkbox.onchange = console.log;

      // focus 이벤트가 발생하면 FocusEvent 타입의 이벤트 객체가 생성된다.
      $input.onfocus = console.log;

      // input 이벤트가 발생하면 InputEvent 타입의 이벤트 객체가 생성된다.
      $input.oninput = console.log;

      // keyup 이벤트가 발생하면 KeyboardEvent 타입의 이벤트 객체가 생성된다.
      $input.onkeyup = console.log;

      // click 이벤트가 발생하면 MouseEvent 타입의 이벤트 객체가 생성된다.
      $button.onclick = console.log;
    </script>
  </body>
</html>
```

<br/>

![print_event_object](/assets/images/print_event_object.png) <br/>

<br/>

### 5.2 이벤트 객체의 공통 프로퍼티

`Event` 인터페이스, 즉 `Event.prototype` 에 정의되어 있는 이벤트 관련 프로퍼티는 `UIEvent`, `CustomEvent`, `MouseEvent` 등 모든 파생 이벤트 객체에 상속됩니다.  
즉, `Event` 인터페이스의 이벤트 관련 프로퍼티는 모든 이벤트 객체가 상속받는 공통 프로퍼티입니다.  
이벤트 객체의 공통 프로퍼티는 다음과 같습니다.

| 공통 프로퍼티      | 설명                                                                                                                                                                                                                                                                                | 타입          |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `type`             | 이벤트 타입                                                                                                                                                                                                                                                                         | `string`      |
| `target`           | 이벤트를 발생시킨 DOM 요소                                                                                                                                                                                                                                                          | DOM 요소 노드 |
| `currentTarget`    | 이벤트 핸들러가 바인딩된 DOM 요소                                                                                                                                                                                                                                                   | DOM 요소 노드 |
| `eventPhase`       | 이벤트 전파 단계 (0: 이벤트 없음, 1: 캡쳐링 단계, 2: 타깃 단계, 3: 버블링 단계                                                                                                                                                                                                      | `number`      |
| `bubbles`          | 이벤트를 버블링으로 전파하는지 여부. 다음 이벤트는 `bubbles: false`로 버블링하지 않습니다. (포커스 이벤트 `focus` / `blur`, 리소스 이벤트 `load` / `unload` / `abort` / `error`, 마우스 이벤트 `mouseenter` / `mouseleave`                                                          | `boolean`     |
| `cancelable`       | `preventDefault` 메서드를 호출하여 이벤트의 기본 동작을 취소할 수 있는지 여부. 다음 이벤트는 `cancelable: false`로 취소할 수 없습니다. (포커스 이벤트 `focus` / `blur`, 리소스 이벤트 `load` / `unload` / `abort` / `error`, 마우스 이벤트 `dbclick` / `mouseenter` / `mouseleave`) | `boolean`     |
| `defaultPrevented` | `preventDefault` 메서드를 호출하여 이벤트를 취소했는지 여부                                                                                                                                                                                                                         | `boolean`     |
| `isTrusted`        | 사용자의 행위에 의해 발생한 이벤트인지 여부. 예를 들어, `click` 메서드 또는 `dispatchEvent` 메서드를 통해 인위적으로 발생시킨 이벤트인 경우 `isTrusted` 는 `false` 입니다.                                                                                                          | `boolean`     |
| `timeStamp`        | 이벤트가 발생한 시각(1970/01/01/00:00:0부터 경과한 밀리초)                                                                                                                                                                                                                          | `number`      |

<br/>

예를 들어, 체크박스 요소의 체크 상태가 변경되면 현재 체크 상태를 출력해보도록 합시다.

```html
<!DOCTYPE html>
<html>
  <body>
    <input type="checkbox" />
    <em class="message">off</em>
    <script>
      const $checkbox = document.querySelector("input[type=checkbox]");
      const $msg = document.querySelector(".message");

      // change 이벤트가 발생하면 Event 타입의 이벤트 객체가 생성된다.
      $checkbox.onchange = (e) => {
        console.log(Object.getPrototypeOf(e) === Event.prototype); // true

        // e.target은 change 이벤트를 발생시킨 DOM 요소 $checkbox를 가리키고
        // e.target.checked는 체크박스 요소의 현재 체크 상태를 나타낸다.
        $msg.textContent = e.target.checked ? "on" : "off";
      };
    </script>
  </body>
</html>
```

<br/>

사용자의 입력에 의해 체크박스 요소의 체크 상태가 변경되면 `checked` 프로퍼티의 값이 변경되고 `change` 이벤트가 발생합니다.  
이때 `Event` 타입의 이벤트 객체가 생성됩니다.  
이벤트 객체의 `target` 프로퍼티는 이벤트를 발생시킨 객체를 나타냅니다.  
따라서 `target` 프로퍼티가 가리키는 객체는 `change` 이벤트를 발생시킨 DOM 요소 `$checkbox` 이고 이 객체의 `checked` 프로퍼티는 현재의 체크 상태를 나타냅니다.

이벤트 객체의 `currentTarget` 프로퍼티는 이벤트 핸들러가 바인딩된 DOM 요소를 가리킵니다.  
위 예제의 경우 이벤트를 발생시킨 DOM 요소와 이벤트 핸들러가 바인딩된 DOM 요소는 모두 `$checkbox` 입니다.  
따라서 이벤트 객체의 `target` 프로퍼티와 `currentTarget` 프로퍼티는 동일한 객체 `$checkbox` 를 가리킵니다.

```javascript
$checkbox.onchange = (e) => {
  // e.target은 change 이벤트를 발생시킨 DOM 요소 $checkbox를 가리키고
  // e.currentTarget은 이벤트 핸들러가 바인딩된 DOM 요소 $checkbox를 가리킨다.
  console.log(e.target === e.currentTarget); // true

  $msg.textContent = e.target.checked ? "on" : "off";
};
```

<br/>

이처럼 일반적으로 이벤트 객체의 `target` 프로퍼티와 `currentTarget` 프로퍼티는 동일한 DOM 요소를 가리키지만 나중에 살펴볼 이벤트 위임에서는 이벤트 객체의 `target` 프로퍼티와 `currentTarget` 프로퍼티가 서로 다른 DOM 요소를 가리킬 수 있습니다.

<br/>

### 5.3 마우스 정보 취득

`click`, `dbclick`, `mousedown`, `mouseup`, `mousemove`, `mouseenter`, `mouseleave` 이벤트가 발생하면 생성되는 `MouseEvent` 타입의 이벤트 객체는 다음과 같은 고유의 프로퍼티를 갖습니다.

- 마우스 포인터의 좌표 정보를 나타내는 프로퍼티: `screenX` / `screenY`, `clientX` / `clientY`, `pageX` / `pageY`, `offsetX` / `offsetY`
- 버튼 정보를 나타내는 프로퍼티: `altKey`, `ctrlKey`, `shiftKey`, `button`

<br/>

예를 들어, DOM 요소를 드래그하여 이동시키는 예제를 만들어봅시다.  
드래그는 마우스 버튼을 누른 상태에서 마우스를 이동하는 것으로 시작하고 마우스 버튼을 떼면 종료합니다.  
따라서 드래그는 `mousedown` 이벤트가 발생한 상태에서 `mousemove` 이벤트가 발생한 시점에 시작하고 `mouseup` 이벤트가 발생한 시점에 종료합니다.

드래그가 시작되면 드래그 시작 지점, 즉 `mousedown` 이벤트가 발생했을 때의 마우스 포인터 좌표와 드래그를 하고 있는 시점, 즉 `mousemove` 이벤트가 발생할 때마다의 마우스 포인터 좌표를 비교하여 드래그 대상의 이동 거리를 계산합니다.

`mouseup` 이벤트가 발생하면 드래그가 종료한 것입니다.  
이때 드래그 대상 요소를 이동시키는 이벤트 핸들러를 제거하여 이동을 멈춥니다.

마우스 포인터 좌표는 `MouseEvent` 타입의 이벤트 객체에서 제공합니다.  
`mousedown`, `mouseup`, `mousemove` 이벤트가 발생하면 생성되는 `MouseEvent` 타입의 이벤트 객체는 마우스 포인터의 좌표 정보를 나타내는 `screenX` / `screenY`, `clientX` / `clientY`, `pageX` / `pageY`, `offsetX` / `offsetY` 프로퍼티를 제공합니다.  
이 프로퍼티 중에서 `clientX` / `clientY` 는 뷰포트(viewport), 즉 웹페이지의 가시 영역을 기준으로 마우스 포인터 좌표를 나타냅니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .box {
        width: 100px;
        height: 100px;
        background-color: #fff700;
        border: 5px solid orange;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
    <script>
      // 드래그 대상 요소
      const $box = document.querySelector(".box");

      // 드래그 시작 시점의 마우스 포인터 위치
      const initialMousePos = { x: 0, y: 0 };
      // 오프셋: 이동할 거리
      const offset = { x: 0, y: 0 };

      // mousemove 이벤트 핸들러
      const move = (e) => {
        // 오프셋 = 현재(드래그하고 있는 시점) 마우스 포인터 좌표 - 드래그 시작 시점의 마우스 포인터 좌표
        offset.x = e.clientX - initialMousePos.x;
        offset.y = e.clientY - initialMousePos.y;

        // translate3d는 GPU를 사용하므로 absolute의 top, left를 사용하는 것보다 빠르다.
        // top, left는 레이아웃에 영향을 준다.
        $box.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
      };

      // mousedown 이벤트가 발생하면 드래그 시작 시점의 마우스 포인터 좌표를 저장한다.
      $box.addEventListener("mousedown", (e) => {
        // 이동 거리를 계산하기 위해 mousedown 이벤트가 발생(드래그를 시작)하면
        // 드래그 시작 시점의 마우스 포인터 좌표(e.clientX/e.clientY: 뷰포트 상에서 현재
        // 마우스의 포인터 좌표)를 저장해 둔다. 한번 이상 드래그로 이동한 경우 move에서
        // translate3d(${offset.x}px, ${offset.y}px, 0)으로 이동한 상태이므로
        // offset.x와 offset.y를 빼주어야 한다.
        initialMousePos.x = e.clientX - offset.x;
        initialMousePos.y = e.clientY - offset.y;

        // mousedown 이벤트가 발생한 상태에서 mousemove 이벤트가 발생하면
        // box 요소를 이동시킨다.
        document.addEventListener("mousemove", move);
      });

      // mouseup 이벤트가 발생하면 mousemove 이벤트를 제거해 이동을 멈춘다.
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
      });
    </script>
  </body>
</html>
```

<br/>

### 5.4 키보드 정보 취득

`keydown`, `keyup`, `keypress` 이벤트가 발생하면 생성되는 `KeyboardEvent` 타입의 이벤트 객체는 `altKey`, `ctrlKey`, `shiftKey`, `metaKey`, `key`, `keyCode` 같은 고유의 프로퍼티를 갖습니다.

예를 들어, `input` 요소의 입력 필드에 엔터 키가 입력되면 현재까지 입력 필드에 입력된 값을 출력하는 예제를 만들어봅시다.

```html
<!DOCTYPE html>
<html>
  <body>
    <input type="text" />
    <em class="message"></em>
    <script>
      const $input = document.querySelector("input[type=text]");
      const $msg = document.querySelector(".message");

      $input.onkeyup = (e) => {
        // e.key는 입력한 키 값을 문자열로 반환한다.
        // 입력한 키가 'Enter', 즉 엔터 키가 아니면 무시한다.
        if (e.key !== "Enter") return;

        // 엔터키가 입력되면 현재까지 입력 필드에 입력된 값을 출력한다.
        $msg.textContent = e.target.value;
        e.target.value = "";
      };
    </script>
  </body>
</html>
```

<br/>

`keyup` 이벤트가 발생하면 생성되는 `KeyboardEvent` 타입의 이벤트 객체는 입력한 키 값을 문자열로 반환하는 `key` 프로퍼티를 제공합니다.  
엔터 키의 경우 `key` 프로퍼티는 `Enter` 를 반환합니다.  
입력한 키와 `key` 프로퍼티 값의 대응 관계는 https://keycode.info를 참고하면 됩니다.

참고로 `input` 요소의 입력 필드에 한글을 입력하고 엔터 키를 누르면 `keyup` 이벤트 핸들러가 두 번 호출되는 현상이 발생합니다.  
이 같은 문제를 회피하려면 `keyup` 이벤트 대신 `keydown` 이벤트를 캐치합니다.

<br/><br/>

## 6. 이벤트 전파

DOM 트리 상에 존재하는 DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파됩니다.  
이를 이벤트 전파(event propagation)라고 합니다.  
예를 들어, 다음 예제를 살펴봅시다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
  </body>
</html>
```

<br/>

`ui` 요소의 두 번째 자식 요소인 li 요소를 클릭하면 클릭 이벤트가 발생합니다.  
이때 **생성된 이벤트 객체는 이벤트를 발생시킨 DOM 요소인 이벤트 타깃(event target)을 중심으로 DOM 트리를 통해 전파됩니다.**  
이벤트 전파는 이벤트 객체가 전파되는 방향에 따라 다음과 같이 3단계로 구분할 수 있습니다.

- 캡처링 단계(capturing phase): 이벤트가 상위 요소에서 하위 요소 방향으로 전파
- 타깃 단계(target phase): 이벤트가 이벤트 타깃에 도달
- 버블링 단계(bubbling phase): 이벤트가 하위 요소에서 상위 요소 방향으로 전파

예를 들어, 다음 예제와 같이 `ul` 요소에 이벤트 핸들러를 바인딩하고 `ul` 요소의 하위 요소인 `li` 요소를 클릭하여 이벤트를 발생시켜 봅시다.  
이때 이벤트 타깃(`event.target`)은 `li` 요소이고 커런트 타깃(`event.currentTarget`)은 `ul` 요소입니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
      const $fruits = document.getElementById("fruits");

      // #fruits 요소의 하위 요소인 li 요소를 클릭한 경우
      $fruits.addEventListener("click", (e) => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
      });
    </script>
  </body>
</html>
```

<br/>

`li` 요소를 클릭하면 클릭 이벤트가 발생하여 클릭 이벤트 객체가 생성되고 클릭된 `li` 요소가 이벤트 타깃이 됩니다.  
이때 클릭 이벤트 객체는 `window` 에서 시작해서 이벤트 타깃 방향으로 전파됩니다.  
이것이 캡처링 단계입니다.

이후 이벤트 객체는 이벤트를 발생시킨 이벤트 타깃에 도달합니다.  
이것이 타깃 단계입니다.

이후 이벤트 객체는 이벤트 타깃에서 시작해서 `window` 방향으로 전파됩니다.  
이것이 버블링 단계입니다.

이벤트 핸들러 어트리뷰트/프로퍼티 방식으로 등록한 이벤트 핸들러는 타깃 단계와 버블링 단계의 이벤트만 캐치할 수 있습니다.  
하지만 `addEventListener` 메서드 방식으로 등록한 이벤트 핸들러는 타깃 단계와 버블링 단계뿐만 아니라 캡처링 단계의 이벤트도 선별적으로 캐치할 수 있습니다.  
캡처링 단계의 이벤트를 캐치하려면 `addEventListener` 메서드의 3번째 인수로 `true` 를 전달해야 합니다.  
3번째 인수를 생략하거나 `false` 를 전달하면 타깃 단계와 버블링 단계의 이벤트만 캐치할 수 있습니다.

위 예제의 이벤트 핸들러는 버블링 단계의 이벤트를 캐치합니다.  
만약 이벤트 핸들러가 캡처링 단계의 이벤트를 캐치하도록 설정되어 있다면 이벤트 핸들러는 `window` 에서 시작해서 이벤트 타깃 방향으로 전파되는 이벤트 객체를 캐치하고, 이벤트를 발생시킨 이벤트 타깃과 이벤트 핸들러가 바인딩된 커런트 타깃이 같은 DOM 요소라면 이벤트 핸들러는 타깃 단계의 이벤트 객체를 캐치합니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
      const $fruits = document.getElementById("fruits");
      const $banana = document.getElementById("banana");

      // #fruits 요소의 하위 요소인 li 요소를 클릭한 경우
      // 캡처링 단계의 이벤트를 캐치한다.
      $fruits.addEventListener(
        "click",
        (e) => {
          console.log(`이벤트 단계: ${e.eventPhase}`); // 1: 캡처링 단계
          console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
          console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
        },
        true
      );

      // 타깃 단계의 이벤트를 캐치한다.
      $banana.addEventListener("click", (e) => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 2: 타깃 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLLIElement]
      });

      // 버블링 단계의 이벤트를 캐치한다.
      $fruits.addEventListener("click", (e) => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
      });
    </script>
  </body>
</html>
```

<br/>

**이처럼 이벤트는 이벤트를 발생시킨 이벤트 타깃은 물론 상위 DOM 요소에서도 캐치할 수 있습니다.**  
즉, DOM 트리를 통해 전파되는 이벤트는 이벤트 패스(이벤트가 통과하는 DOM 트리 상의 경로, `Event.prototype.composedPath` 메서드로 확인할 수 있습니다.)에 위치한 모든 DOM 요소에서 캐치할 수 있습니다.

대부분의 이벤트는 캡처링과 버블링을 통해 전파됩니다.  
하지만 다음 이벤트는 버블링을 통해 전파되지 않습니다.  
이 이벤트들은 버블링을 통해 이벤트를 전파하는지 여부를 나타내는 이벤트 객체의 공통 프로퍼티 `event.bubbles` 의 값이 모두 `false` 입니다.

- 포커스 이벤트: `focus` / `blur`
- 리소스 이벤트: `load` / `unload` / `abort` / `error`
- 마우스 이벤트: `mouseenter` / `mouseleave`

위 이벤트는 버블링되지 않으므로 이벤트 타깃의 상위 요소에서 위 이벤트를 캐치하려면 캡처링 단계의 이벤트를 캐치해야 합니다.  
하지만 위 이벤트를 상위 요소에서 캐치해야 할 경우는 그리 많지 않지만 반드시 위 이벤트를 상위 요소에서 캐치해야 한다면 대체할 수 있는 이벤트가 존재합니다.  
예를 들어, `focus` / `blur` 이벤트는 `focusin` / `focusout` 으로, `mouseenter` / `mouseleave` 는 `mouseover` / `mouseout` 으로 대체할 수 있습니다.  
`focusin` / `focusout`, `mouseover` / `mouseout` 은 버블링을 통해 전파됩니다.  
따라서 캡처링 단계에서 이벤트를 캐치해야 할 경우는 거의 없습니다.

다음 예제를 살펴봅시다.  
다음은 캡처링 단계의 이벤트와 버블링 단계의 이벤트를 캐치하는 이벤트 핸들러가 혼용되는 경우입니다.

<br/>

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    html, body { height: 100%; }
  </style>
<body>
  <p>버블링과 캡처링 이벤트 <button>버튼</button></p>
  <script>
    // 버블링 단계의 이벤트를 캐치
    document.body.addEventListener('click', () => {
      console.log('Handler for body.');
    });

    // 캡처링 단계의 이벤트를 캐치
    document.querySelector('p').addEventListener('click', () => {
      console.log('Handler for paragraph.');
    }, true);

    // 버블링 단계의 이벤트를 캐치
    document.querySelector('button').addEventListener('click', () => {
      console.log('Handler for button.');
    });
  </script>
</body>
</html>
```

<br/>

위 예제의 경우 `body`, `button` 요소는 버블링 단계의 이벤트만을 캐치하고 `p` 요소는 캡처링 단계의 이벤트만 캐치합니다.  
이벤트는 캡처링 - 타깃 - 버블링 단계로 전파되므로 만약 `button` 요소에서 클릭 이벤트가 발생하면 먼저 캡처링 단계를 캐치하는 `p` 요소의 이벤트 핸들러가 호출되고, 그후 버블링 단계의 이벤트를 캐치하는 `button`, `body` 요소의 이벤트 핸들러가 순차적으로 호출됩니다.  
따라서 다음과 같이 출력됩니다.

```md
Handler for paragraph.
Handler for button.
Handler for body.
```

<br/>

만약 `p` 요소에서 클릭 이벤트가 발생하면 캡처링 단계를 캐치하는 `p` 요소의 이벤트 핸들러가 호출되고 버블링 단계를 캐치하는 `body` 요소의 이벤트 핸들러가 순차적으로 호출됩니다.  
따라서 다음과 같이 출력됩니다.

```md
Handler for paragraph.
Handler for body.
```

<br/><br/>

## 7. 이벤트 위임

사용자가 내비게이션 아이템(`li` 요소)을 클릭하여 선택하면 현재 선택된 내비게이션 아이템에 `active` 클래스를 추가하고 그 외의 모든 내비게이션 아이템의 `active` 클래스는 제거하는 다음 예제를 살펴봅시다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      #fruits {
        display: flex;
        list-style-type: none;
        padding: 0;
      }

      #fruits li {
        width: 100px;
        cursor: pointer;
      }

      #fruits .active {
        color: red;
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <nav>
      <ul id="fruits">
        <li id="apple" class="active">Apple</li>
        <li id="banana">Banana</li>
        <li id="orange">Orange</li>
      </ul>
    </nav>
    <div>선택된 내비게이션 아이템: <em class="msg">apple</em></div>
    <script>
      const $fruits = document.getElementById("fruits");
      const $msg = document.querySelector(".msg");

      // 사용자 클릭에 의해 선택된 내비게이션 아이템(li 요소)에 active 클래스를 추가하고
      // 그 외의 모든 내비게이션 아이템의 active 클래스를 제거한다.
      function activate({ target }) {
        [...$fruits.children].forEach(($fruit) => {
          $fruit.classList.toggle("active", $fruit === target);
          $msg.textContent = target.id;
        });
      }

      // 모든 내비게이션 아이템(li 요소)에 이벤트 핸들러를 등록한다.
      document.getElementById("apple").onclick = activate;
      document.getElementById("banana").onclick = activate;
      document.getElementById("orange").onclick = activate;
    </script>
  </body>
</html>
```

<br/>

위 예제를 살펴보면 모든 내비게이션 아이템(`li` 요소)이 클릭 이벤트에 반응하도록 모든 내비게이션 아이템에 이벤트 핸들러인 `activate` 를 등록했습니다.  
만일 내비게이션 아이템이 100개라면 100개의 이벤트 핸들러를 등록해야 합니다.  
이 경우 많은 DOM 요소에 이벤트 핸들러를 등록하므로 성능 저하의 원인이 될뿐더러 유지 보수에도 부적합한 코드를 생산하게 합니다.

**이벤트 위임(event delegation)은 여러 개의 하위 DOM 요소에 각각 이벤트 핸들러를 등록하는 대신 하나의 상위 DOM 요소에 이벤트 핸들러를 등록하는 방법을 말합니다.**  
이벤트는 이벤트 타깃은 물론 상위 DOM 요소에서도 캐치할 수 있습니다.  
이벤트 위임을 통해 상위 DOM 요소에 이벤트 핸들러를 등록하면 여러 개의 하위 DOM 요소에 이벤트 핸들러를 등록할 필요가 없습니다.  
또한 동적으로 하위 DOM 요소를 추가하더라도 일일이 추가된 DOM 요소에 이벤트 핸들러를 등록할 필요가 없습니다.

이벤트 위임을 사용하여 위 예제를 수정해 봅시다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      #fruits {
        display: flex;
        list-style-type: none;
        padding: 0;
      }

      #fruits li {
        width: 100px;
        cursor: pointer;
      }

      #fruits .active {
        color: red;
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <nav>
      <ul id="fruits">
        <li id="apple" class="active">Apple</li>
        <li id="banana">Banana</li>
        <li id="orange">Orange</li>
      </ul>
    </nav>
    <div>선택된 내비게이션 아이템: <em class="msg">apple</em></div>
    <script>
      const $fruits = document.getElementById("fruits");
      const $msg = document.querySelector(".msg");

      // 사용자 클릭에 의해 선택된 내비게이션 아이템(li 요소)에 active 클래스를 추가하고
      // 그 외의 모든 내비게이션 아이템의 active 클래스를 제거한다.
      function activate({ target }) {
        // 이벤트를 발생시킨 요소(target)가 ul#fruits의 자식 요소가 아니라면 무시한다.
        if (!target.matches("#fruits > li")) return;

        [...$fruits.children].forEach(($fruit) => {
          $fruit.classList.toggle("active", $fruit === target);
          $msg.textContent = target.id;
        });
      }

      // 이벤트 위임: 상위 요소(ul#fruits)는 하위 요소의 이벤트를 캐치할 수 있다.
      $fruits.onclick = activate;
    </script>
  </body>
</html>
```

<br/>

이벤트 위임을 통해 하위 DOM 요소에서 발생한 이벤트를 처리할 때 주의할 점은 상위 요소에 이벤트 핸들러를 등록하기 때문에 이벤트 타깃, 즉 이벤트를 실제로 발생시킨 DOM 요소가 개발자가 기대한 DOM 요소가 아닐 수도 있다는 것입니다.  
위 예제의 경우 `ul#fruits` 요소에 바인딩된 이벤트 핸들러는 자기 자신은 물론 `ul#fruits` 요소의 하위 요소 중에서 클릭 이벤트를 발생시킨 모든 DOM 요소에 반응합니다.  
따라서 이벤트에 반응이 필요한 DOM 요소(위 예제의 경우, `'#fruits > li'` 선택자에 의해 선택되는 DOM 요소)에 한정하여 이벤트 핸들러가 실행되도록 이벤트 타깃을 검사할 필요가 있습니다.

`Element.prototype.matches` 메서드는 인수로 전달된 선택자에 의해 특정 노드를 탐색 가능한지 확인합니다.

```javascript
function activate({ target }) {
  // 이벤트를 발생시킨 요소(target)이 ul#fruits의 자식 요소가 아니라면 무시한다.
  if (!target.matches('#fruits > li')) return;
  ...
```

<br/>

일반적으로 이벤트 객체의 `target` 프로퍼티와 `currentTarget` 프로퍼티는 동일한 DOM 요소를 가리키지만 이벤트 위임을 통해 상위 DOM 요소에 이벤트를 바인딩한 경우 이벤트 객체의 `target` 프로퍼티와 `currentTarget` 프로퍼티가 다른 DOM 요소를 가리킬 수 있습니다.  
위 예제에서는 다음과 같이 `$fruits` 요소에 이벤트를 바인딩했습니다.

```javascript
$fruits.onclick = activate;
```

<br/>

이때 이벤트 객체의 `currentTarget` 프로퍼티는 언제나 변함없이 `$fruits` 요소를 가리키지만 이벤트 객체의 `target` 프로퍼티는 실제로 이벤트를 발생시킨 DOM 요소를 가리킵니다.  
`$fruits` 요소도 클릭 이벤트를 발생시킬 수 있으므로 이 경우 이벤트 객체의 `currentTarget` 프로퍼티와 `target` 프로퍼티는 동일한 `$fruits` 요소를 가리키지만 `$fruits` 요소의 하위 요소에서 클릭 이벤트가 발생한 경우 이벤트 객체의 `currentTarget` 프로퍼티와 `target` 프로퍼티는 다른 DOM 요소를 가리킵니다.

<br/><br/>

## 8. DOM 요소의 기본 동작 조작

<br/>

### 8.1 DOM 요소의 기본 동작 중단

DOM 요소는 저마다 기본 동작이 있습니다.  
예를 들어, `a` 요소를 클릭하면 `href` 어트리뷰트에 지정된 링크로 이동하고, `checkbox` 또는 `radio` 요소를 클릭하면 체크 또는 해제됩니다.

이벤트 객체의 `preventDefault` 메서드는 이러한 DOM 요소의 기본 동작을 중단시킵니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <a href="https://www.google.com">go</a>
    <input type="checkbox" />
    <script>
      document.querySelector("a").onclick = (e) => {
        // a 요소의 기본 동작을 중단한다.
        e.preventDefault();
      };

      document.querySelector("input[type=checkbox]").onclick = (e) => {
        // checkbox 요소의 기본 동작을 중단한다.
        e.preventDefault();
      };
    </script>
  </body>
</html>
```

<br/>

### 8.2 이벤트 전파 방지

이벤트 객체의 `stopPropagation` 메서드는 이벤트 전파를 중지시킵니다.  
다음 예제를 살펴봅시다.

```html
<!DOCTYPE html>
<html>
  <body>
    <div class="container">
      <button class="btn1">Button 1</button>
      <button class="btn2">Button 2</button>
      <button class="btn3">Button 3</button>
    </div>
    <script>
      // 이벤트 위임. 클릭된 하위 버튼 요소의 color를 변경한다.
      document.querySelector(".container").onclick = ({ target }) => {
        if (!target.matches(".container > button")) return;
        target.style.color = "red";
      };

      // .btn2 요소는 이벤트를 전파하지 않으므로 상위 요소에서 이벤트를 캐치할 수 없다.
      document.querySelector(".btn2").onclick = (e) => {
        e.stopPropagation(); // 이벤트 전파 중단
        e.target.style.color = "blue";
      };
    </script>
  </body>
</html>
```

<br/

위 예제를 살펴보면 상위 DOM 요소인 `container` 요소에 이벤트를 위임했습니다.  
따라서 하위 DOM 요소에서 발생한 클릭 이벤트를 상위 DOM 요소인 `container` 요소가 캐치하여 이벤트를 처리합니다.  
하지만 하위 요소 중에서 `btn2` 요소는 자체적으로 이벤트를 처리합니다.  
이때 `btn2` 요소는 자신이 발생시킨 이벤트가 전파되는 것을 중단하여 자신에게 바인딩된 이벤트 핸들러만 실행되도록 합니다.

이처럼 `stopPropagation` 메서드는 하위 DOM 요소의 이벤트를 개별적으로 처리하기 위해 이벤트의 전파를 중단시킵니다.

<br/><br/>

## 9. 이벤트 핸들러 내부의 this

<br/>

### 9.1 이벤트 핸들러 어트리뷰트 방식

다음 예제의 `handleClick` 함수 내부의 `this` 는 전역 객체 `window` 를 가리킵니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button onclick="handleClick()">Click me</button>
    <script>
      function handleClick() {
        console.log(this); // window
      }
    </script>
  </body>
</html>
```

<br/>

이벤트 핸들러 어트리뷰트의 값으로 지정한 문자열은 사실 암묵적으로 생성되는 이벤트 핸들러의 문이라고 했습니다.  
따라서 `handleClick` 함수는 이벤트 핸들러에 의해 일반 함수로 호출됩니다.  
일반 함수로서 호출되는 함수 내부의 `this` 는 전역 객체를 가리킵니다.  
따라서 `handleClick` 함수 내부의 `this` 는 전역 객체 `window` 를 가리킵니다.

단, 이벤트 핸들러를 호출할 때 인수로 전달한 `this` 는 이벤트를 바인딩한 DOM 요소를 가리킵니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button onclick="handleClick(this)">Click me</button>
    <script>
      function handleClick(button) {
        console.log(button); // 이벤트를 바인딩한 button 요소
        console.log(this); // window
      }
    </script>
  </body>
</html>
```

<br/>

위 예제에서 `handleClick` 함수에 전달한 `this` 는 암묵적으로 생성된 이벤트 핸들러 내부의 `this` 입니다.  
즉, 이벤트 핸들러 어트리뷰트 방식에 의해 암묵적으로 생성된 이벤트 핸들러 내부의 `this` 는 이벤트를 바인딩한 DOM 요소를 가리킵니다.  
이는 이벤트 핸들러 프로퍼티 방식과 동일합니다.

<br/>

### 9.2 이벤트 핸들러 프로퍼티 방식과 addEventListener 메서드 방식

이벤트 핸들러 프로퍼티 방식과 `addEventListener` 메서드 방식 모두 이벤트 핸들러 내부의 `this` 는 이벤트를 바인딩한 DOM 요소를 가리킵니다.  
즉, 이벤트 핸들러 내부의 `this` 는 이벤트 객체의 `currentTarget` 프로퍼티와 같습니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button class="btn1">0</button>
    <button class="btn2">0</button>
    <script>
      const $button1 = document.querySelector(".btn1");
      const $button2 = document.querySelector(".btn2");

      // 이벤트 핸들러 프로퍼티 방식
      $button1.onclick = function (e) {
        // this는 이벤트를 바인딩한 DOM 요소를 가리킨다.
        console.log(this); // $button1
        console.log(e.currentTarget); // $button1
        console.log(this === e.currentTarget); // true

        // $button1의 textContent를 1 증가시킨다.
        ++this.textContent;
      };

      // addEventListener 메서드 방식
      $button2.addEventListener("click", function (e) {
        // this는 이벤트를 바인딩한 DOM 요소를 가리킨다.
        console.log(this); // $button2
        console.log(e.currentTarget); // $button2
        console.log(this === e.currentTarget); // true

        // $button2의 textContent를 1 증가시킨다.
        ++this.textContent;
      });
    </script>
  </body>
</html>
```

<br/>

화살표 함수로 정의한 이벤트 핸들러 내부의 `this` 는 상위 스코프의 `this` 를 가리킵니다.  
화살표 함수는 함수 자체의 `this` 바인딩을 갖지 않습니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button class="btn1">0</button>
    <button class="btn2">0</button>
    <script>
      const $button1 = document.querySelector(".btn1");
      const $button2 = document.querySelector(".btn2");

      // 이벤트 핸들러 프로퍼티 방식
      $button1.onclick = (e) => {
        // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
        console.log(this); // window
        console.log(e.currentTarget); // $button1
        console.log(this === e.currentTarget); // false

        // this는 window를 가리키므로 window.textContent에 NaN(undefined + 1)을 할당한다.
        ++this.textContent;
      };

      // addEventListener 메서드 방식
      $button2.addEventListener("click", (e) => {
        // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
        console.log(this); // window
        console.log(e.currentTarget); // $button2
        console.log(this === e.currentTarget); // false

        // this는 window를 가리키므로 window.textContent에 NaN(undefined + 1)을 할당한다.
        ++this.textContent;
      });
    </script>
  </body>
</html>
```

<br/>

클래스에서 이벤트 핸들러를 바인딩하는 경우 `this` 에 주의해야 합니다.  
다음 예제를 살펴봅시다.  
다음 예제는 이벤트 핸들러 프로퍼티 방식을 사용하고 있으나 `addEventListener` 메서드 방식을 사용하는 경우와 동일합니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button class="btn">0</button>
    <script>
      class App {
        constructor() {
          this.$button = document.querySelector(".btn");
          this.count = 0;

          // increase 메서드를 이벤트 핸들러로 등록
          this.$button.onclick = this.increase;
        }

        increase() {
          // 이벤트 핸들러 increase 내부의 this는 DOM 요소(this.$button)를 가리킨다.
          // 따라서 this.$button은 this.$button.$button과 같다.
          this.$button.textContent = ++this.count;
          // -> TypeError: Cannot set property 'textContent' of undefined
        }
      }

      new App();
    </script>
  </body>
</html>
```

<br/>

위 예제의 `increase` 메서드 내부의 `this` 는 클래스가 생성할 인스턴스를 가리키지 않습니다.  
이벤트 핸들러 내부의 `this` 는 이벤트를 바인딩한 DOM 요소를 가리키기 때문에 `increase` 메서드 내부의 `this` 는 `this.$button` 을 가리킵니다.  
따라서 `increase` 메서드를 이벤트 핸들러로 바인딩할 때 `bind` 메서드를 사용해 `this` 를 전달하여 `increase` 메서드 내부의 `this` 가 클래스가 생성할 인스턴스를 가리키도록 해야 합니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button class="btn">0</button>
    <script>
      class App {
        constructor() {
          this.$button = document.querySelector(".btn");
          this.count = 0;

          // increase 메서드를 이벤트 핸들러로 등록
          // this.$button.onclick = this.increase;

          // increase 메서드 내부의 this가 인스턴스를 가리키도록 한다.
          this.$button.onclick = this.increase.bind(this);
        }

        increase() {
          this.$button.textContent = ++this.count;
        }
      }

      new App();
    </script>
  </body>
</html>
```

<br/>

또는 클래스 필드에 할당한 화살표 함수를 이벤트 핸들러로 등록하여 이벤트 핸들러 내부의 `this` 가 인스턴스를 가리키도록 할 수도 있습니다.  
다만 이때 이벤트 핸들러 `increase` 는 프로토타입 메서드가 아닌 인스턴스 메서드가 됩니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button class="btn">0</button>
    <script>
      class App {
        constructor() {
          this.$button = document.querySelector(".btn");
          this.count = 0;

          // 화살표 함수인 increase를 이벤트 핸들러로 등록
          this.$button.onclick = this.increase;
        }

        // 클래스 필드 정의
        // increase는 인스턴스 메서드이며 내부의 this는 인스턴스를 가리킨다.
        increase = () => (this.$button.textContent = ++this.count);
      }
      new App();
    </script>
  </body>
</html>
```

<br/><br/>

## 10. 이벤트 핸들러에 인수 전달

함수에 인수를 전달하려면 함수를 호출할 때 전달해야 합니다.  
이벤트 핸들러 어트리뷰트 방식은 함수 호출문을 사용할 수 있기 때문에 인수를 전달할 수 있지만 이벤트 핸들러 프로퍼티 방식과 `addEventListener` 메서드 방식의 경우 이벤트 핸들러를 브라우저가 호출하기 때문에 함수 호출문이 아닌 함수 자체를 등록해야 합니다.  
따라서 인수를 전달할 수 없습니다.  
그러나 인수를 전달할 방법이 전혀 없는 것은 아닙니다.  
다음 예제와 같이 이벤트 핸들러 내부에서 함수를 호출하면서 인수를 전달할 수 있습니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <label>User name <input type="text" /></label>
    <em class="message"></em>
    <script>
      const MIN_USER_NAME_LENGTH = 5; // 이름 최소 길이
      const $input = document.querySelector("input[type=text]");
      const $msg = document.querySelector(".message");

      const checkUserNameLength = (min) => {
        $msg.textContent =
          $input.value.length < min ? `이름은 ${min}자 이상 입력해 주세요` : "";
      };

      // 이벤트 핸들러 내부에서 함수를 호출하면서 인수를 전달한다.
      $input.onblur = () => {
        checkUserNameLength(MIN_USER_NAME_LENGTH);
      };
    </script>
  </body>
</html>
```

<br/>

또는 이벤트 핸들러를 반환하는 함수를 호출하면서 인수를 전달할 수도 있습니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <label>User name <input type="text" /></label>
    <em class="message"></em>
    <script>
      const MIN_USER_NAME_LENGTH = 5; // 이름 최소 길이
      const $input = document.querySelector("input[type=text]");
      const $msg = document.querySelector(".message");

      // 이벤트 핸들러를 반환하는 함수
      const checkUserNameLength = (min) => (e) => {
        $msg.textContent =
          $input.value.length < min ? `이름은 ${min}자 이상 입력해 주세요` : "";
      };

      // 이벤트 핸들러를 반환하는 함수를 호출하면서 인수를 전달한다.
      $input.onblur = checkUserNameLength(MIN_USER_NAME_LENGTH);
    </script>
  </body>
</html>
```

<br/>

`checkUserNameLength` 함수는 함수를 반환합니다.  
따라서 `$input.onblur` 에는 결국 `checkUserNameLength` 함수가 반환하는 함수가 바인딩됩니다.

<br/><br/>

## 11. 커스텀 이벤트

<br/>

### 11.1 커스텀 이벤트 생성

이벤트 객체는 `Event`, `UIEvent`, `MouseEvent` 같은 이벤트 생성자 함수로 생성할 수 있습니다.

이벤트가 발생하면 암묵적으로 생성되는 이벤트 객체는 발생한 이벤트의 종류에 따라 이벤트 타입이 결정됩니다.  
하지만 `Event`, `UIEvent`, `MouseEvent` 같은 이벤트 생성자 함수를 호출하여 명시적으로 생성한 이벤트 객체는 임의의 이벤트 타입을 지정할 수 있습니다.  
**이처럼 개발자의 의도로 생성된 이벤트를 커스텀 이벤트라 합니다.**

이벤트 생성자 함수는 첫 번째 인수로 이벤트 타입을 나타내는 문자열을 전달받습니다.  
이때 이벤트 타입을 나타내는 문자열은 기존 이벤트 타입을 사용할 수도 있고, 기존 이벤트 타입이 아닌 임의의 문자열을 사용하여 새로운 이벤트 타입을 지정할 수도 있습니다.  
이 경우 일반적으로 `CustomEvent` 이벤트 생성자 함수를 사용합니다.

```javascript
// KeyboardEvent 생성자 함수로 keyup 이벤트 타입의 커스텀 이벤트 객체를 생성
const keyboardEvent = new KeyboardEvent("keyup");
console.log(keyboardEvent.type); // keyup

// CustomEvent 생성자 함수로 foo 이벤트 타입의 커스텀 이벤트 객체를 생성
const customEvent = new CustomEvent("foo");
console.log(customEvent.type); // foo
```

<br/>

생성된 커스텀 이벤트 객체는 버블링되지 않으며 `preventDefault` 메서드로 취소할 수도 없습니다.  
즉, 커스텀 이벤트 객체는 `bubbles` 와 `cancelable` 프로퍼티의 값이 false 로 기본 설정됩니다.

```javascript
// MouseEvent 생성자 함수로 click 이벤트 타입의 커스텀 이벤트 객체를 생성
const customEvent = new MouseEvent("click");
console.log(customEvent.type); // click
console.log(customEvent.bubbles); // false
console.log(customEvent.cancelable); // false
```

<br/>

커스텀 이벤트 객체의 `bubbles` 또는 `cancelable` 프로퍼티를 `true` 로 설정하려면 이벤트 생성자 함수의 두 번째 인수로 `bubbles` 또는 `cancelable` 프로퍼티를 갖는 객체를 전달합니다.

```javascript
// MouseEvent 생성자 함수로 click 이벤트 타입의 커스텀 이벤트 객체를 생성
const customEvent = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
});

console.log(customEvent.bubbles); // true
console.log(customEvent.cancelable); // true
```

<br/>

커스텀 이벤트 객체에는 `bubbles` 또는 `cancelable` 프로퍼티뿐만 아니라 이벤트 타입에 따라 가지는 이벤트 고유의 프로퍼티 값을 지정할 수 있습니다.  
예를 들어, `MouseEvent` 생성자 함수로 생성한 마우스 이벤트 객체는 마우스 포인터의 좌표 정보를 나타내는 마우스 이벤트 객체 고유의 프로퍼티 `screenX` / `screenY`, `clientX` / `clientY`, `pageX` / `pageY`, `offsetX` / `offsetY` 와 버튼 정보를 나타내는 프로퍼티 `altKey`, `ctrlKey`, `shiftKey`, `button` 을 갖습니다.  
이러한 이벤트 객체 고유의 프로퍼티 값을 지정하려면 다음과 같이 이벤트 생성자 함수의 두 번째 인수로 프로퍼티를 전달합니다.

```javascript
// MouseEvent 생성자 함수로 click 이벤트 타입의 커스텀 이벤트 객체를 생성
const mouseEvent = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 50,
  clientY: 100,
});

console.log(mouseEvent.clientX); // 50
console.log(mouseEvent.clientY); // 100

// KeyboardEvent 생성자 함수로 keyup 이벤트 타입의 커스텀 이벤트 객체를 생성
const keyboardEvent = new KeyboardEvent("keyup", { key: "Enter" });

console.log(keyboardEvent.key); // Enter
```

<br/>

이벤트 생성자 함수로 생성한 커스텀 이벤트는 `isTrusted` 프로퍼티의 값이 언제나 `false` 입니다.  
커스텀 이벤트가 아닌 사용자의 행위에 의해 발생한 이벤트에 의해 생성된 이벤트 객체의 `isTrusted` 프로퍼티 값은 언제나 `true` 입니다.

```javascript
// InputEvent 생성자 함수로 foo 이벤트 타입의 커스텀 이벤트 객체를 생성
const customEvent = new InputEvent("foo");
console.log(customEvent.isTrusted); // false
```

<br/>

### 11.2 커스텀 이벤트 디스패치

생성된 커스텀 이벤트는 `dispatchEvent` 메서드로 디스패치(dispatch, 이벤트를 발생시키는 행위) 할 수 있습니다.  
`dispatchEvent` 메서드에 이벤트 객체를 인수로 전달하면서 호출하면 인수로 전달한 이벤트 타입의 이벤트가 발생합니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button class="btn">Click me</button>
    <script>
      const $button = document.querySelector(".btn");

      // 버튼 요소에 click 커스텀 이벤트 핸들러를 등록
      // 커스텀 이벤트를 디스패치하기 이전에 이벤트 핸들러를 등록해야 한다.
      $button.addEventListener("click", (e) => {
        console.log(e); // MouseEvent {isTrusted: false, screenX: 0, ...}
        alert(`${e} Clicked!`);
      });

      // 커스텀 이벤트 생성
      const customEvent = new MouseEvent("click");

      // 커스텀 이벤트 디스패치(동기 처리). click 이벤트가 발생한다.
      $button.dispatchEvent(customEvent);
    </script>
  </body>
</html>
```

<br/>

일반적으로 이벤트 핸들러는 비동기(asynchronous) 처리 방식으로 동작하지만 `dispatchEvent` 메서드는 이벤트 핸들러를 동기(synchronous) 처리 방식으로 호출합니다.  
다시 말해, `dispatchEvent` 메서드를 호출하면 커스텀 이벤트에 바인딩된 이벤트 핸들러를 직접 호출하는 것과 같습니다.  
따라서 `dispatchEvent` 메서드로 이벤트를 디스패치하기 이전에 커스텀 이벤트를 처리할 이벤트 핸들러를 등록해야 합니다.

기존 이벤트 타입이 아닌 임의의 이벤트 타입을 지정하여 이벤트 객체를 생성하는 경우 일반적으로 `CustomEvent` 이벤트 생성자 함수를 사용합니다.

```javascript
// CustomEvent 생성자 함수로 foo 이벤트 타입의 커스텀 이벤트 객체를 생성
const customEvent = new CustomEvent("foo");
console.log(customEvent.type); // foo
```

<br/>

이때 `CustomEvent` 이벤트 생성자 함수에는 두 번째 인수로 이벤트와 함께 전달하고 싶은 정보를 담은 `detail` 프로퍼티를 포함하는 객체를 전달할 수 있습니다.  
이 정보는 이벤트 객체의 `detail` 프로퍼티(`e.detail`)에 담겨 전달됩니다.

```html
<!DOCTYPE html>
<html>
  <body>
    <button class="btn">Click me</button>
    <script>
      const $button = document.querySelector(".btn");

      // 버튼 요소에 foo 커스텀 이벤트 핸들러를 등록
      // 커스텀 이벤트를 디스패치하기 이전에 이벤트 핸들러를 등록해야 한다.
      $button.addEventListener("foo", (e) => {
        // e.detail에는 CustomEvent 함수의 두 번째 인수로 전달한 정보가 담겨 있다.
        alert(e.detail.message);
      });

      // CustomEvent 생성자 함수로 foo 이벤트 타입의 커스텀 이벤트 객체를 생성
      const customEvent = new CustomEvent("foo", {
        detail: { message: "Hello" }, // 이벤트와 함께 전달하고 싶은 정보
      });

      // 커스텀 이벤트 디스패치
      $button.dispatchEvent(customEvent);
    </script>
  </body>
</html>
```

<br/>

기존 이벤트 타입이 아닌 임의의 이벤트 타입을 지정하여 커스텀 이벤트 객체를 생성한 경우 반드시 `addEventListener` 메서드 방식으로 이벤트 핸들러를 등록해야 합니다.  
이벤트 핸들러 어트리뷰트/프로퍼티 방식을 사용할 수 없는 이유는 'on + 이벤트 타입'으로 이루어진 이벤트 핸들러 어트리뷰트/프로퍼티가 요소 노드에 존재하지 않기 때문입니다.  
예를 들어, `'foo'`라는 임의의 이벤트 타입으로 커스텀 이벤트를 생성한 경우 `'onfoo'` 라는 핸들러 어트리뷰트/프로퍼티가 요소 노드에 존재하지 않기 때문에 이벤트 핸들러 어트리뷰트/프로퍼티 방식으로는 이벤트 핸들러를 등록할 수 없습니다.

<br/><br/><br/><br/><br/>
