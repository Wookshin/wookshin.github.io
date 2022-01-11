## Introduction

### 펜툴 활용법과 주석 색깔 바꾸는법

OneNote를 활용하자.
실제 노트를 활용하자.

### HTML

w3C가 HTML5 표준을 정의하면, 각 브라우저사에서 해당 표준을 구현함.
그래서 h1 태그를 줬을 때 큰 글자가 나올 수 있게 됨.

기본으로는 utf-8 사용함.

```html
<meta charset="utf-8" />
```

MDN에서 HTML tag 확인하기  
https://developer.mozilla.org/en-US/docs/Web/HTML/Element

하기 사이트에서 tag가 알맞는지 확인해줌  
https://validator.w3.org

웹 사이트 구조(꼭 읽기!)  
https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure

웹 사이트들은 커다란 박스로 구성되어있고 각 박스는 작은 박스로 구성되어 있음.  
웹사이트를 봤을 때 박스별로 나누어 구분하는 연습을 해보자.

위키피디아 사이트 박스로 구분해보기

현업 선배의 팁

- 뭐든지 나누어 보세요
- 큰 그림을 먼저 보자

semantic 하게

BOX  
header, nav, aside, main, section, article, footer, div, span, form

ITEM (사용자에게 보여지는)  
a video button input labe img audio map canvas table

Block vs Inline

태그를 배울 때 MDN에 들어가서 어떤 attributes가 있는지 확인하자.

label과 input은 보통 같이 사용한다.
둘다 inline 형식.
label for와 input id를 연결해준다.

<br/>

### CSS

Cascading!

- Author style - 우리가 작성하는 style sheet
- User Style - 사용자가 선택한 style sheet
- Browser - 브라우저가 정의한 style sheet

!important
bad smell.. 최고 우선순위로 선택된다.

selectors

- universal \*
- type Tag
- ID #id
- Class .class
- State :
- Attribute []

https://flukeout.github.io

display와 position에 대해서

Block-level, Inline-level

display

- inline : 물건
- inline-block : 상자인데 한줄에 배열되는 상자
- block : 상자인데 한줄씩 차지하는 상자

position

- static : 기본값. HTML 정의된 순서대로 브라우저에서 자연스레 보여짐. left, top을 줘도 안먹음.
- relative : 원래 있어야 되는 자리에서 상대적으로 이동됨.
- absolute : 내 아이템에 가장 가까이 있는 박스(상자) 안에서 위치가 변경됨.
- fixed : 상자 안에서 완전히 벗어나서 윈도우 안에서 움직임.
- sticky : 원래 있어야 되는 자리에 있으면서 스크롤링 되어도 원래 있던 자리에 붙어있음.

can i use 사이트

Flexbox

2가지만 이해하면 됩니다.

1. container와 item에 적용될 수 있는 속성값이 있습니다.

- container : display, flex-direction, flex-wrap, flex-flow, justify-content, align-items, align-content
- item : order, flex-grow, flex-shrink, flex, align-self

2. main axis 중심축과 cross axis 반대축이 있습니다.

자동 태그 생성
div.container>div.item.item${$}\*3

```html
<div class="container">
  <div class="item item1">1</div>
  <div class="item item2">2</div>
  <div class="item item3">3</div>
</div>
```

<br/>

100% vs 100vh

- 100% : container가 포함되어있는 부모의 높이 100%를 채우겠다.
- 100vh : 보이는 view의 100% 다 쓰겠다.

color tool (material io) 꿀 도구

- https://material.io/resources/color/#!/?view.left=0&view.right=0

flex-direction: row-reverse;
-> 오른쪽에서 왼쪽으로.
flex-direction: column;
-> 위에서 아래로
flex-direction: column-reverse;
-> 아래에서 위로

flex-wrap: nowrap;
-> 한줄에 쭉 붙어있다.
flex-wrap: wrap;
-> 다음 라인으로 넘어간다.
flex-wrap: wrap-reverse;
-> 위에서부터 거꾸로 라인 넘어간다.

flex-flow: column nowrap
-> short hand

justify-content: flex-start;
-> 왼쪽에서 오른쪽으로. 혹은 위에서 아래로.
justify-content: flex-end;
-> 오른쪽에서 왼쪽으로. 혹은 아래에서 위로.
※ column-reverse 는 아이템 순서도 바꿔주는 반면 flex-end는 아이템 위치만 밑으로 내려준다.
justify-content: center;
justify-content: space-around;
-> 각 아이템마다 space를 넣어준다.
justify-content: space-evenly;
-> 똑같은 space 할당
justify-content: space-between;
-> 왼쪽과 오른쪽은 유지하고, 중간의 space만 똑같이 할당

align-items: center;
-> 반대축에서 items을 가운데로 배치합니다.  
align-items: baseline;
-> 아이템들이 균등하게 가운데로 옵니다.

align-content

flexbox complete guide

- https://css-tricks.com/snippets/css/a-guide-to-flexbox/

<br/>

order: 2;
-> 순서 우선순위 지정(잘 안씀)

flex-grow: 1;
-> container를 꽉 채운다. 기본값은 0. (공간을 안채울려고한다.)

flex-shrink:1;
-> container가 줄어들면 어느정도로 줄어들지 정의함.

flex-basis: auto;
-> grow와 shrink에 지정된 만큼

flex-basis: 60%;
-> 넌 항상 60%야.

align-self: center;
-> 아이템 하나만 특정한 위치에 배치할거다.

Flexbox Froggy 게임

- https://flexboxfroggy.com/

<br/>

### 반응형 웹디자인

Content is like water.
컨텐츠가 유동적으로 변해야한다.

Media Queries를 통해 구현 가능

구지 px를 나누자면

- mobile: 320px-480px
- tablet: 768px-1024px
- desktop: 1024px~

<br/>

#### Emmet

- !: html 템플릿
- div: div 태그
- div.class : class 이름의 div태그
- div#id : id 이름의 div태그
- div>ul>li : div 자손 ul 자손 li
- div>ul+ol : div 자손 ul-ol 형제
- ul>li\*5 : li 5번 반복
- div>ul>li^ol : ol은 li의 부모의 형제로 위치
- div>(header>ul>li\*2>a)+footer>p : 그룹화하기
- p{hello} : 텍스트입력하기
- p.class${item $} : 자동 숫자 넣기
- p>lorem : 더미 데이터 넣기
- p>lorem4 : 4개의 단어 더미 넣기

<br/>

#### javascript

js 배경

async/defer

- async : 병렬로 js를 fetch함. 대신 fetch하자마자 바로 execute 함.
- defer : 병렬로 js를 fetch함. DOMContentLoaded가 되었을 때 execute 함.

async 는 순서가 지켜지지 않음.
defer 는 순서가 지켜져서 실행됨.

'use strict'; 는 필수! 




