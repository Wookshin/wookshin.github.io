---
title: 제어문
subtitle: 모던 자바스크립트 Deep Dive | 8장 | 제어문
readtime: 10 min
author: wookshin
---

<br/>

# 제어문

<br/>

제어문(control flow statement)은 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용합니다.  
일반적으로 코드는 위에서 아래 방향으로 순차적으로 실행됩니다.  
제어문을 사용하면 코드의 실행 흐름을 인위적으로 제어할 수 있습니다.

하지만 코드의 실행 순서가 변경된다는 것은 단순히 위에서 아래로 순차적으로 진행하는 직관적인 코드의 흐름을 혼란스럽게 만듭니다.  
따라서 제어문은 코드의 흐름을 이해하기 어렵게 만들어 가독성을 해치는 단점이 있습니다.  
가독성이 좋지 않은 코드는 오류를 발생시키는 원인이 됩니다.  
나중에 살펴볼 forEach, map, filter, reduce 같은 고차 함수를 사용한 함수형 프로그래밍 기법에서는 제어문의 사용을 억제하여 복잡성을 해결하려고 노력합니다.

<br/>

## 1. 블록문

블록문(block statement/compount statement)은 0개 이상의 문을 중괄호로 묶은 것으로, 코드 블록 또는 블록이라고 부르기도 합니다.  
자바스크립트는 블록문을 하나의 실행 단위로 취급합니다.  
블록문은 단독으로 사용할 수도 있으나 일반적으로 제어문이나 함수를 정의할 때 사용하는 것이 일반적입니다.

문의 끝에는 세미콜론을 붙이는 것이 일반적입니다.  
하지만 블록문은 언제나 문의 종료를 의미하는 자체 종결성을 갖기 때문에 블록문의 끝에는 세미콜론을 붙이지 않는다는 것에 주의하길 바랍니다.

```javascript
// 블록문
{
  var foo = 10;
}

// 제어문
var x = 1;
if (x < 10) {
  x++;
}

// 함수 선언문
function sum(a, b) {
  return a + b;
}
```

<br/>

## 2. 조건문

조건문(conditional statement)은 주어진 조건식(conditional expression)의 평가 결과에 따라 코드 블록(블록문)의 실행을 결정합니다.  
조건식은 불리언 값으로 평가될 수 있는 표현식입니다.  
자바스크립트는 if...else문과 switch 문으로 두 가지 조건문을 제공합니다.

### 2.1 if...else문

if...else문은 주어진 조건식(불리언 값으로 평가될 수 있는 표현식)의 평가 결과, 즉 논리적 참 또는 거짓에 따라 실행할 코드 블록을 결정합니다.  
조건식의 평가 결과가 true일 경우 if 문의 코드 블록이 실행되고 false일 경우 else 문의 코드 블록이 실행됩니다.

if 문의 조건식은 불리언 값으로 평가되어야 합니다.  
만약 if 문의 조건식이 불리언 값이 아닌 값으로 평가되면 자바스크립트 엔진에 의해 암묵적으로 불리언 값으로 강제 변환되어 실행할 코드 블록을 결정합니다.

```javascript
var num = 2;
var kind;

// if 문
if (num > 0) {
  kind = "양수"; // 음수를 구별할 수 없다
}
console.log(kind); // 양수

// if...else 문
if (num > 0) {
  kind = "양수";
} else {
  kind = "음수"; // 0은 음수가 아니다.
}
console.log(kind); // 양수

// if...else if 문
if (num > 0) {
  kind = "양수";
} else if (num < 0) {
  kind = "음수";
} else {
  kind = "영";
}
console.log(kind); // 양수
```

대부분의 if...else 문은 삼항 조건 연산자로 바꿔 쓸 수 있습니다.

```javascript
// x가 짝수이면 result 변수에 문자열 '짝수'를 할당하고, 홀수이면 문자열 '홀수'를 할당한다.
var x = 2;
var result;

if (x % 2) {
  // 2 % 2는 0이다. 이때 0은 false로 암묵적 강제 변환된다.
  result = "홀수";
} else {
  result = "짝수";
}

console.log(result); // 짝수
```

```javascript
var x = 2;

// 0은 false로 취급된다.
var result = x % 2 ? "홀수" : "짝수";
console.log(result); // 짝수
```

위 예제는 두 가지 경우의 수('홀수' 또는 '짝수')를 갖는 경우입니다.  
만약 경우의 수가 세 가지('양수', '음수', '영')라면 다음과 같이 바꿔 쓸 수 있습니다.

```javascript
var num = 2;

// 0은 false로 취급된다.
var kind = num ? (num > 0 ? "양수" : "음수") : "영";

console.log(kind); // 양수
```

num > 0 ? '양수' : '음수'는 표현식입니다.  
즉, 삼항 조건 연산자는 값으로 평가되는 표현식을 만듭니다.  
따라서 삼항 조건 연산자 표현식은 값처럼 사용할 수 있기 때문에 변수에 할당할 수 있습니다.  
하지만 if...else 문은 표현식이 아닌 문입니다.  
따라서 if...else 문은 값처럼 사용할 수 없기 때문에 변수에 할당할 수 없습니다.

<br/>

### 2.2 switch문

switch 문은 주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 case 문으로 실행 흐름을 옮깁니다.  
case 문은 상황(case)을 의미하는 표현식을 지정하고 콜론으로 마칩니다.  
그리고 그 뒤에 실행할 문들을 위치시킵니다.

switch 문의 표현식과 일치하는 case 문이 없다면 실행 순서는 default 문으로 이동합니다.  
default 문은 선택사항으로, 사용할 수도 있고 사용하지 않을 수도 있습니다.

```javascript
// 월을 영어로 변환한다. (11 → 'November')
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = "January";
  case 2:
    monthName = "February";
  case 3:
    monthName = "March";
  case 4:
    monthName = "April";
  case 5:
    monthName = "May";
  case 6:
    monthName = "June";
  case 7:
    monthName = "July";
  case 8:
    monthName = "August";
  case 9:
    monthName = "September";
  case 10:
    monthName = "October";
  case 11:
    monthName = "November";
  case 12:
    monthName = "December";
  default:
    monthName = "Invalid month";
}

console.log(monthName); // Invalid month
```

그런데 위 예제를 실행해 보면 'Nobemner'가 출력되지 않고 'Invalid month'가 출력됩니다.  
이는 switch의 표현식의 평가 결과와 일치하는 case 문으로 실행 흐름이 이동하여 문을 실행한 것은 맞지만 문을 실행한 후 switch 문을 탈출하지 않고 switch 문이 끝날 때까지 이후의 모든 case 문과 default 문을 실행했기 때문입니다.  
이를 폴스루(fall through)라고 합니다.

이러한 결과가 나온 이유는 case 문에 해당하는 문의 마지막에 break 문을 사용하지 않았기 때문입니다.  
break 키워드로 구성된 break 문은 코드 블록에서 탈출하는 역할을 합니다.  
break 문이 없다면 case 문의 표현식과 일치하지 않더라도 실행 흐름이 다음 case 문으로 연이어 이동합니다.

```javascript
// 월을 영어로 변환한다. (11 → 'November')
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = "January";
    break;
  case 2:
    monthName = "February";
    break;
  case 3:
    monthName = "March";
    break;
  case 4:
    monthName = "April";
    break;
  case 5:
    monthName = "May";
    break;
  case 6:
    monthName = "June";
    break;
  case 7:
    monthName = "July";
    break;
  case 8:
    monthName = "August";
    break;
  case 9:
    monthName = "September";
    break;
  case 10:
    monthName = "October";
    break;
  case 11:
    monthName = "November";
    break;
  case 12:
    monthName = "December";
    break;
  default:
    monthName = "Invalid month";
}

console.log(monthName); // November
```

default 문에는 break 문을 생략하는 것이 일반적입니다.  
default 문은 switch 문의 맨 마지막에 위치하므로 default 문의 실행이 종료되면 switch 문을 빠져나갑니다.  
따라서 별도로 break 문이 필요 없습니다.

break 문을 생략한 폴스루가 유용한 경우도 있습니다.  
다음 예제와 같이 폴스루를 활용해 여러 개의 case 문을 하나의 조건으로 사용할 수도 있습니다.  
다음은 윤년인지 판별해서 2월의 일수를 계산하는 예제입니다.

```javascript
var year = 2000; // 2000년은 윤년으로 2월이 29일이다.
var month = 2;
var days = 0;

switch (month) {
  case 1:
  case 3:
  case 5:
  case 7:
  case 8:
  case 10:
  case 12:
    days = 31;
    break;
  case 4:
  case 6:
  case 9:
  case 11:
    days = 30;
    break;
  case 2:
    // 윤년 계산 알고리즘
    // 1. 연도가 4로 나누어떨어지는 해(2000, 2004, 2008, 2012, 2016, 2020...)는 윤년이다.
    // 2. 연도가 4로 나누어떨어지더라도 연도가 100으로 나누어떨어지는 해(2000, 2100, 2200...)는 평년이다.
    // 3. 연도가 400으로 나누어떨어지는 해(2000, 2400, 2800...)는 윤년이다.
    days = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
    break;
  default:
    console.log("Invalid month");
}

console.log(days); // 29
```

<br/>

## 3. 반복문

반복문(loop statement)은 조건식의 평가 결과가 참인 경우 코드 블록을 실행합니다.  
그 후 조건식을 다시 평가하여 여전히 참인 경우 코드 블록을 다시 실행합니다.  
이는 조건식이 거짓일 때까지 반복됩니다.

자바스크립트는 세 가지 반복문인 for 문, while 문, do...while 문을 제공합니다.

### 3.1 for문

for 문은 조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행합니다.  
가장 일반적으로 사용되는 for 문의 형태는 다음과 같습니다.

for (변수 선언문 또는 할당문; 조건식; 증감식) {
조건식이 참인 경우 반복 실행될 문;
}

```javascript
for (var i = 0; i < 2; i++) {
  console.log(i);
}
```

for 문의 변수 선언문, 조건식, 증감식은 모두 옵션이므로 반드시 사용할 필요는 없습니다.  
단, 어떤 식도 선언하지 않으면 무한루프가 됩니다.  
무한루프란 코드 블록을 무한히 반복 실행하는 문입니다.

```javascript
// 무한루프
for (;;) { ... }
```

### 3.2 while문

while 문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행합니다.  
for 문은 반복 횟수가 명확할 때 주로 사용하고 while 문은 반복 횟수가 불명확할 때 주로 사용합니다.

while 문은 조건문의 평가 결과가 거짓이 되면 코드 블록을 실행하지 않고 종료합니다.  
만약 조건식의 평가 결과가 불리언 값이 아니면 불리언 값으로 강제 변환하여 논리적 참, 거짓을 구별합니다.

```javascript
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
while (count < 3) {
  console.log(count); // 0 1 2
  count++;
}
```

조건식의 평가 결과가 언제나 참이면 무한루프가 됩니다.

```javascript
// 무한루프
while (true) { ... }
```

무한루프에서 탈출하기 위해서는 코드 블록 내에 if 문으로 탈출 조건을 만들고 break 문으로 코드 블록을 탈출합니다.

```javascript
var count = 0;

// 무한루프
while (true) {
  console.log(count);
  count++;
  // count가 3이면 코드 블록을 탈출한다.
  if (count === 3) break;
} // 0 1 2
```

### 3.3 do...while문

do...while 문은 코드 블록을 먼저 실행하고 조건식을 평가합니다.  
따라서 코드 블록은 무조건 한 번 이상 실행됩니다.

```javascript
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
do {
  console.log(count);
  count++;
} while (count < 3); // 0 1 2
```

<br/>

## 4. break문

switch 문과 while 문에서 살펴보았듯이 break 문은 코드 블록을 탈출합니다.  
좀 더 정확히 표현하자면 코드 블록을 탈출하는 것이 아니라 레이블 문, 반복문(for, for...in, for...of, while, do...while) 또는 switch 문의 코드 블록을 탈출합니다.  
레이블 문, 반복문, switch 문의 코드 블록 외에 break 문을 사용하면 SyntaxError(문법 에러)가 발생합니다.

```javascript
if (true) {
  break; // Uncaught SyntaxError: Illegal break statement
}
```

참고로 레이블 문(label statement)이란 식별자가 붙은 문을 말합니다.

```javascript
// foo라는 레이블 식별자가 붙은 레이블 문
foo: console.log("foo");
```

레이블 문은 프로그램의 실행 순서를 제어하는 데 사용합니다.  
사실 switch 문의 case 문과 default 문도 레이블 문입니다.  
레이블 문을 탈출하려면 break 문에 레이블 식별자를 지정합니다.

```javascript
// foo라는 식별자가 붙은 레이블 블록문
foo: {
  console.log(1);
  break foo; // foo 레이블 블록문을 탈출한다.
  console.log(2);
}

console.log("Done!");
```

중첩된 for 문의 내부 for 문에서 break 문을 실행하면 내부 for 문을 탈출하여 외부 for 문으로 진입합니다.  
이때 내부 for 문이 아닌 외부 for 문을 탈출하려면 레이블 문을 사용합니다.

```javascript
// outer라는 식별자가 붙은 레이블 for 문
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    // i + j === 3이면 outer라는 식별자가 붙은 레이블 for 문을 탈출한다.
    if (i + j === 3) break outer;
    console.log(`inner [${i}, ${j}]`);
  }
}

console.log("Done!");
```

break 문은 레이블 문뿐 아니라 반복문, switch 문에서도 사용할 수 있습니다.  
이 경우에는 break 문에 레이블 식별자를 지정하지 않습니다.  
break 문은 반복문을 더 이상 진행하지 않아도 될 때 불필요한 반복을 회피할 수 있어 유용합니다.

다음은 문자열에서 특정 문자의 인덱스(위치)를 검색하는 예입니다.

```javascript
var string = "Hello World.";
var search = "l";
var index;

// 문자열은 유사배열이므로 for 문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 문자열의 개별 문자가 'l'이면
  if (string[i] === search) {
    index = i;
    break; // 반복문을 탈출한다.
  }
}

console.log(index); // 2

// 참고로 String.prototype.indexOf 메서드를 사용해도 같은 동작을 한다.
console.log(string.indexOf(search)); // 2
```

<br/>

## 5. continue문

continue 문은 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킵니다.  
break 문처럼 반복문을 탈출하지는 않습니다.

다음은 문자열에서 특정 문자의 개수를 세는 예입니다.

```javascript
var string = "Hello World.";
var search = "l";
var count = 0;

// 문자열은 유사배열이므로 for 문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 'l'이 아니면 현 지점에서 실행을 중단하고 반복문의 증감식으로 이동한다.
  if (string[i] !== search) continue;
  count++; // continue 문이 실행되면 이 문은 실행되지 않는다.
}

console.log(count); // 3

// 참고로 String.prototype.match 메서드를 사용해도 같은 동작을 한다.
const regexp = new RegExp(search, "g");
console.log(string.match(regexp).length); // 3
```

위 예제의 for 문은 다음 코드와 동일하게 동작합니다.

```javascript
for (var i = 0; i < string.length; i++) {
  // 'l'이면 카운트를 증가시킨다.
  if (string[i] === search) count++;
}
```

위와 같이 if 문 내에서 실행해야 할 코드가 한 줄이라면 continue 문을 사용했을 때보다 간편하고 가독성도 좋습니다.  
하지만 if 문 내에서 실행해야 할 코드가 길다면 들여쓰기가 한 단계 더 깊어지므로 continue 문을 사용하는 편이 가독성이 더 좋습니다.

```javascript
// continue 문을 사용하지 않으면 if 문 내에 코드를 작성해야 한다.
for (var i = 0; i < string.length; i++) {
  // 'l'이면 카운트를 증가시킨다.
  if (string[i] === search) {
    count++;
    // code
    // code
    // code
  }
}

// continue 문을 사용하면 if 문 밖에 코드를 작성할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 'l'이 아니면 카운트를 증가시키지 않는다.
  if (string[i] !== search) continue;

  count++;
  // code
  // code
  // code
}
```

<br/>

<br/>
<br/>
<br/>

