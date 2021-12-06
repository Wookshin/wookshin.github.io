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
이때 `x` 변수를 찾아야 `x`에 값을 할당할 수 있기 때문에 자바스크립트 엔진은 x 변수가 어디에서 선언되었는지 스코프 체인을 통해 검색하기 시작합니다.  

자바스크립트 엔진은 먼저 `foo` 함수의 스코프에서 x 변수의 선언을 검색합니다.  
foo 함수의 스코프에는 x 변수의 선언이 없으므로 검색해 실패할 것이고, 자바스크립트 엔진은 x 변수를 검색하기 위해 foo 함수 컨텍스트의 상위 스코프(위 예제의 경우 전역 스코프)에서 x 변수의 선언을 검색합니다.  

전역 스코프에도 x 변수의 선언이 존재하지 않기 때문에 ReferenceError를 발생시킬 것 같지만 자바스크립트 엔진은 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성합니다.  
이때 전역 객체의 x 프로퍼티는 마치 전역 변수처럼 사용할 수 있습니다.  
이러한 현상을 **암묵적 전역(implicit glogbal)**이라 합니다.  

<br/><br/>

## 2. strict mode의 적용

<br/><br/>

## 3. 전역에 strict mode를 적용하는 것은 피하자

<br/><br/>

## 4. 함수 단위로 strict mode를 적용하는 것도 피하자

<br/><br/>

## 5. strict mode가 발생시키는 에러

<br/>

### 5.1 암묵적 전역

<br/>

### 5.2 변수, 함수, 매개변수의 삭제

<br/>

### 5.3 매개변수 이름의 중복

<br/>

### 5.4 with 문의 사용

<br/><br/>

## 6. strict mode 적용에 의한 변화

<br/>

### 6.1 일반 함수의 this

<br/>

### 6.2 arguments 객체

<br/><br/><br/><br/><br/>
