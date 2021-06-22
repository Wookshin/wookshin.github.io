---
title: CSS responsive 에 대하여
subtitle: CSS responsive 에 대하여
readtime: 30 min
author: jill
---

Responsive Design

1. 개요
예전에 웹 디자인은 특정 스크린 사이즈를 타겟으로 만들어졌다. 
디자이너 예상과 다른 스크린 사이즈로 접속하면 보여지는 결과가 좋지 않았다.(원치 않는 스크롤바, 부족한 여백의 미)
다양한 스크린 사이즈가 나오면서 Responsive Web Design(RWD)라는 개념이 나타났다.
RWD는 다른 스크린 사이즈, 해상도에 따라 웹 페이지의 레이아웃을 그에 맞게 변경하는 일련의 작업 방식이다.

2. 예전 웹사이트 레이아웃
예전에 웹사이트를 디자인할 때 2가지 옵션이 존재했다.
첫째, 유동적인(liquid) 사이트를 만든다. 브라우저 창을 채우기 위해 stretch 된다.
둘째, 픽셀 크기가 고정되어 있는 fixed width 사이트를 만든다.
유동적인 사이트는 디자이너의 화면보다 더 작은 화면에서는 찌부가 되고, 더 큰 화면에서는 읽을 수 없을 정도로 길이가 긴 라인을 만들어냅니다.
- 소스코드 : https://github.com/mdn/css-examples/blob/master/learn/rwd/liquid-width.html
- 예제 : https://mdn.github.io/css-examples/learn/rwd/liquid-width.html

고정 폭 사이트는 작은 화면 상에 수평 스크롤 막대가 생기는 위험이 있고, 더 큰 화면상에서는 웹디자인 가장자리에 많은 흰색 공간이 생길 위험이 있습니다. 
- 소스코드 : https://github.com/mdn/css-examples/blob/master/learn/rwd/fixed-width.html
- 예제 : https://mdn.github.io/css-examples/learn/rwd/fixed-width.html

모바일 웹이 첫 번째 피처폰의 등장으로 현실화되기 시작했고, 모바일을 수용하고자 하는 회사들은 일반적으로 (종종 m.example.com 또는 example.mobi 식) 서로 다른 URL을 사용하여 그들의 사이트의 특별한 모바일 버전을 만들기도 했습니다.
이는 해당 사이트의 두 가지 별도 버전을 개발하고 최신 상태로 유재해야 한다는 것을 의미했습니다.
게다가, 이러한 모바일 사이트들을 경험해보면 종종 매우 축소된 기능을 제공합니다. 전체 기능이 있는 데스크탑 버전의 정보에 접근할 수 없는 경우가 생기기 때문에 상당한 좌절감을 안겨줍니다.

3. Flexible layout before responsive design
liquid or fixed-width 방법의 단점을 해결하기 위해 여러가지 방안이 등장했습니다.
2004년 Cameron Adams는 Resolution dependent layout이란 포스트를 올렸습니다.
여러 다른 화면의 해상도에 대응하는 디자인 설계방법을 묘사합니다. 
이 접근은 js로 화면 해상도를 알아내 알맞는 CSS를 load하자 입니다.

4. Responsive design
Responsive design 용어는 2010년 Ethan Marcotte에 의해 만들어진 신조어입니다. 
그는 3가지 기술을 조합한다고 설명합니다.
첫째, fluid grids의 사용. 화면 크기에 따라 한 Row의 컬럼수가 많아졌다 줄어들었다 하는 Grid. 
둘째, fluid images의 사용. 매우 간단한 기술입니다. max-width를 100%로 설정하기! 만약 이미지를 포함하고 있는 컬럼이 작아지면 이미지도 작아지지만, 컬럼보다 더 커지진 않습니다. 이미지보다 컬럼이 클 때 모자이크 현상도 방지합니다.
셋째, media query의 사용. Cameron Adams가 JS를 활용해 resolution을 파악했던 것처럼 미디어 쿼리는 레이아웃 타입에 따라 변경해줍니다. 오직 CSS만을 사용해서!
모든 스크린 사이즈에 하나의 레이아웃만 대응하는 것이 아니라, 여러 레이아웃이 대응할 수 있도록 합니다. 예를 들어 사이드바의 경우 작은 스크린에서는 재배치시킬 수 있습니다.

위처럼 responsive web desing이란 어떤 구별되어있는 기술이 아니라고 이해하는게 중요합니다. 이거는 웹디자인 or a set of best practices 접근을 묘사하는 용어입니다. 즉, 컨텐트를 보여주는 디바이스에 대응할 수 있는 레이아웃을 만드는데 필요한 a set of best practices입니다. 위 Ethan Marcotte의 최초 설명에서 RWD는 flexible grids (using floats) 그리고 미디어 쿼리를 의미했는데 10년이 지난 지금도 이 개념이 RWD의 기본이 됩니다.
Modern CSS Layout 방법은 본질적으로 responsive이며 웹 플랫폼에는 반응형 웹을 쉽게 구축할 수 있는 새로운 것들이 많이 있습니다. 

5. 미디어 쿼리(Media Queries)
반응형 디자인은 미디어 쿼리 덕분에 나타날 수 있었습니다. 
미디어 쿼리 레벨 3 명세는 2009년 권장 후보가 되었고, 이는 여러 브라우저에서 구현할 준비가 되었음을 의미했습니다. 미디어 쿼리는 화면 크기에 따라 CSS를 선택적으로 적용할 수 있도록 합니다. 
예를 들어 하기 미디어 쿼리의 경우 하기처럼 동작합니다.
현재 웹 페이지가 스크린 미디어이고(printed document가 아니고) viewport가 800픽셀 이상이라면 .container selector를 활용해 CSS가 적용된다. 
```css
@media screen and (min-width: 800px) {
  .container {
    margin: 1em 2em;
  }
}
```
여러개의 미디어 쿼리를 넣는 것이 가능합니다. 레이아웃이 변경되는 부분을 breakpoints라고 말합니다. 
흔히 미디어 쿼리가 사용되는 경우는 작은 스크린 사이즈 일 때 싱글 컬럼 레이아웃을 생성하는 것입니다. 

6. Flexible grids
반응형 사이트는 단지 breakpoints만을 통해 레이아웃을 변경하지 않습니다. flexible grids를 활용합니다.
flexible grid란 모든 가능한 기기 사이즈를 타겟으로 할 필요도 없고 완벽한 픽셀을 구현할 필요도 없습니다. 
사실상 수많은 사이즈의 기기를 대응하는 건 불가능합니다. 적어도 데스크탑을 사용하는 사용자가 Full 사이즈로 브라우저를 사용하는게 아니기 때문이죠.

Flexible grid를 사용함으로 저희는 컨텐트가 보기 안좋아질 타이밍에 브레이크포인트를 더해 디자인을 바꾸면 됩니다. 예를 들어 스크린 사이즈가 길어져서 라인의 길이가 읽기 힘들어질정도로 길어지거나, 상자가 좁아지면서 각 행에 두 개의 단어들이 찌그러지는 경우말이죠.

반응형 디자인 초기에는 오직 floats만을 사용해 레이아웃을 구현할 수 있었습니다.Flexible folated layouts는 각 요소에 퍼센티지 길이를 줌으로 만들어낼 수 있었고, 전체 길이는 100%를 넘지 않도록 했습니다. 이것이 오리지날 fluid grids이며 Marcotte는 한가지 공식을 제시했습니다.
```js
target / context = result
```
예를 들어 우리의 타겟 컬럼이 60 pixel이고, context(or container)가 960 pixel이라면 우리는 CSS를 활용해 60을 960으로 나누어 소수점 2자리를 오른쪽으로 옮깁니다.
```css
.col {
  width: 6.25%; /* 60 / 960 = 0.0625 */
}
```
이같은 접근은 요즘 웹에서 많이 찾아볼 수 있습니다. 비록 모던한 사이트를 float-based flexible grid를 사용하지 않더라도, 이것을 이해하는 건 충분히 가치가 있습니다.
- 소스코드 : https://github.com/mdn/css-examples/blob/master/learn/rwd/float-based-rwd.html
- 예제 : https://mdn.github.io/css-examples/learn/rwd/float-based-rwd.html

7. Modern layout technologies
Multiple-column layout, flexbox, grid와 같은 모던 레이아웃 방법은 기본적으로 반응형입니다. 이것들은 여러분이 flexible grid를 만든다고 가정하고 더 쉬운 방법을 제공해줍니다.

1) Multicol
가장 오래된 레이아웃 방식으로 column-count가 있습니다. 이거는 content를 우리가 원하는 만큼 나누어줍니다. 브라우저는 화면의 크기에 따라 변경되는 크기를 계산합니다. 
```css
.container {
  column-count: 3;
}
```
저희는 column-width를 활용해 minimum width를 지정할 수 있습니다. 그럼 브라우저는 컨테이너에 편안하게 들어갈 수 있는 만큼의 너비의 열을 만든 다음, 모든 열 사이에 남은 공간을 공유합니다. 그러므로 컬럼들은 얼마나 공간이 남았냐느에 따라 달라집니다. 
```css
.container {
  column-width: 10em;
}
```

2) Flexbox
Flexbox에서 flex item들은 그들의 컨테이너 내 공간에 따라 아이템들끼리 공간을 나누어 가집니다. flex-grow, flex-shrink 속성 값을 바꿈으로 우리는 flex 아이템들이 그들간의 공간을 얼마나 차지하게 할지 결정할 수 있습니다.

아래의 예시에 flex item들은 flex container에서 동일한 공간을 차지합니다.
```css
.container {
  display: flex;
}

.item {
  flex: 1;
}
```
- 소스코드 : https://github.com/mdn/css-examples/blob/master/learn/rwd/flex-based-rwd.html
- 예제 : https://mdn.github.io/css-examples/learn/rwd/flex-based-rwd.html

3) CSS grid
CSS Grid Layout에서 fr 단위는 grid track간에 이용가능한 여백을 나누어 갖게끔 합니다. 다음 예시는 1fr 사이즈의 3개의 track을 가지는 grid container를 만듭니다. 
```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```
- 소스코드 : https://github.com/mdn/css-examples/blob/master/learn/rwd/grid-based-rwd.html
- 예제 : https://mdn.github.io/css-examples/learn/rwd/grid-based-rwd.html

8. Responsive images
반응 이미지에 대한 가장 간단한 접근 방식은 반응 설계에 대한 Marcotte의 초기 기사에서 설명한 대로입니다. 기본적으로 필요한 가장 큰 크기의 이미지를 촬영하여 축소할 수 있습니다. 이는 오늘날에도 여전히 사용되는 접근 방식이며, 대부분의 스타일시트에는 다음과 같은 CSS가 있습니다.
```css
img {
  max-width: 100%;
}
```

이 접근법에는 명백한 단점이 있습니다. 이미지는 고유 크기보다 훨씬 작게 표시될 수 있습니다. 대역폭 낭비입니다. 모바일 사용자는 브라우저 창에서 실제로 볼 수 있는 크기의 몇 배나 되는 이미지를 다운로드할 수 있습니다. 또한 모바일에서는 데스크톱과 동일한 이미지 가로 세로 비율을 원하지 않을 수 있습니다. 예를 들어, 모바일용 정사각형 이미지가 있지만 바탕 화면의 가로 이미지와 동일한 장면을 보여주게 됩니다. 또는 모바일에서 더 쉽게 이해할 수 있는 다른 이미지를 모두 표시할 수 있습니다. 이미지를 축소하는 것으로는 이러한 작업을 수행할 수 없습니다.

<picture> 요소와 <img>의 srcset, sizes 속성은 위 두가지 문제를 해결합니다. "hints"(이미지가 가장 적합한 화면 크기와 해상도를 설명하는 메타 데이터)와 함께 여러 크기를 제공할 수 있으며, 브라우저는 각 장치에 가장 적합한 이미지를 선택하여 사용자가 사용 중인 장치에 적합한 이미지 크기를 다운로드하도록 합니다.
또한 완전히 다른 이미지를 다른 화면 크기로 제공할 수 있습니다.
 - 자세한 내용 : https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

9. Responsive typography
초기에는 responsive typography에 대해 연구되지 않았습니다. 기본적으로 미디어 쿼리를 사용하여 스크린의 크기에 따라 글씨 크기를 조절합니다. 

다음 예제에서는 heading에 4rem을 부여합니다. 이는 base font size의 4배를 의미합니다. 매우 큰 글씨체죠! 우리는 큰 화면에 이같은 큰 글씨 크기를 사용하길 원합니다. 그래서 기본적으론 2rem으로 설정하고 미디어쿼리를 사용하여 화면 크기가 1200px 이상일때는 4rem으로 설정합니다.
```css
html {
  font-size: 1em;
}

h1 {
  font-size: 2rem;
}

@media (min-width: 1200px) {
  h1 {
    font-size: 4rem;
  }
}
```
- 소스코드 : https://github.com/mdn/css-examples/blob/master/learn/rwd/type-rwd.html
- 예제 : https://mdn.github.io/css-examples/learn/rwd/type-rwd.html

이처럼 미디어쿼리는 layout뿐만 아니라 다양하게 사용될 수 있습니다. 사이트를 더욱 매력적으로 유용하게 만들 수 있죠.

Using viewport units for responsive typography
매우 흥모리운 방식은 viewport 단위인 vw를 활용하는 겁니다. 1vw는 viewport width의 1%를 의미합니다. 만약 fontsize를 vw로 지정하면, 이는 viewport 사이즈에 항상 연관되게 됩니다.
```css
h1 {
  font-size: 6vw;
}
```
문제는 vw만 사용했을 때 zoom in/out 시 글씨 크기가 변하지 않습니다. 그러므로 viewport units을 혼자 사용하면 안됩니다. 

해결방법은 calc를 사용하는 겁니다. em, rem같은 고정된 size를 더해주면 zoom in/out도 가능해집니다.
```css
h1 {
  font-size: calc(1.5rem + 3vw);
}
```
즉, 모바일용으로 설정하고 미디어 쿼리에서 다시 정의하지 않고 제목에 대한 글꼴 크기를 한 번만 지정하면 됩니다. 그런 다음 뷰포트의 크기를 늘리면 글꼴이 점차 증가합니다.

- 소스코드 : https://github.com/mdn/css-examples/blob/master/learn/rwd/type-vw.html
- 예제 : https://mdn.github.io/css-examples/learn/rwd/type-vw.html

10. The viewport meta tag
반응형 페이지의 HTML 소스를 보면, head 부분에 <meta> tag를 보통 보실 수 있습니다. 

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

이 메타태그는 모바일 브라우저에게 그들의 viewport 너비를 device 너비로 세팅하라고 말합니다. 그리고 저희가 의도한 모바일 최적화의 문서를 보여주기 위해 문서의 scale 사이즈를 100%로 맞춥니다.

이게 왜 필요할까요? 왜냐하면 모바일 브라우저는 그들의 viewport 너비를 거짓말하는 경향이 있습니다.

첫 아이폰이 출시되고 사람들은 작은 핸드폰 화면크기로 웹사이트를 둘러보기 시작할 때 대부분 사이트들은 모바일 최적화가 되어있지 않았습니다. 그래서 모바일 브라우저는 viewport 너비를 960 pixels로 맞추고 그 너비에 페이지를 렌더링했고, 그것은 마치 데스크탑 레이아웃의 zoomed-out 버전과 같은 결과를 보였습니다. 다른 모바일 브라우저도(구글 안드로이드) 동일했구요. 사용자는 본인이 흥미로워하는 부분으로 확대하거나 이동할 수 있었지만 이것은 나빠보였습니다. 오늘날 반응형 디자인이 아닌 사이트를 불행히 방문하게 된다면 이런 현상을 보실 수 있습니다.

문제는 미디어 쿼리와 breakpoints를 사용한 여러분의 반응형 디자인이 모바일 브라우저에 적용이 안될수도 있다는 것입니다. 보통 480px viewport 너비나 그보다 작을때 레이아웃을 변경하는데, 
