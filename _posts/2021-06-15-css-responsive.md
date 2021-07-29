---
title: 반응형 웹 디자인(Responsive Web Design)
subtitle: CSS responsive 에 대하여
readtime: 30 min
author: wookshin*
---

<br/>

# 반응형 웹 디자인(Responsive Web Design)
<br/>

**_반응형 웹 디자인이란 무엇이고, 어떻게 구현할 수 있는지 알아봅니다._**  
<br/>
**_해당 포스트는 MDN Responsive design 페이지를 번역한 후 해당 내용을 가공한 포스트입니다._**  
 - [MDN Responsive design 페이지 이동하기](https://developer.mozilla.org/ko/docs/Learn/CSS/CSS_layout/Responsive_Design)

<br/>
<br/>

## 1. 반응형 웹 디자인이란?
과거에는 특정 스크린 사이즈를 타겟으로 웹 디자인을 설계하여 웹 페이지를 만들었습니다.  
만약 디자이너 예상과는 다른 스크린 사이즈로 웹 페이지를 접속하면 페이지는 보기 안좋게 출력되었죠.  

<br/>

***원치 않았던 스크롤바***  
![nonresponsive](/assets/images/nonresponsive.jpg) <br/>

<br/>

***사라진 여백의 미***  
![nonresponsive2](/assets/images/nonresponsive2.png) <br/>

다양한 기기가 나오면서 다양한 스크린 사이즈가 나오게 되었고,  
유저가 어떤 스크린을 사용하든 웹 개발자는 접근성 좋은 페이지를 만들기 위해 노력했습니다.  
그렇게 자연스럽게 반응형 웹 디자인(Responsive Web Design)이라는 개념이 나타났습니다.  
**반응형 웹 디자인은 다양한 스크린 사이즈 및 해상도에 따라 웹 페이지의 레이아웃을 그에 맞게 변경하는 일련의 작업 방식**이라고 할 수 있습니다.

<br/>
<br/>

## 2. 과거의 웹사이트 레이아웃
예전에는 웹사이트를 디자인할 때 2가지 옵션을 사용했습니다.  

첫째, 유동적인(liquid) 사이트를 만듭니다.  
liquid는 액체라는 뜻이 있습니다.  
액체가 용기 모양에 따라 변하듯 페이지 내 컨텐츠는 페이지(브라우저 크기)에 따라 확대되기도 축소되기도 합니다.  

***liquid layout***  
<img src = "/assets/images/liquidlayout.png" width="60%">

<br/>
<br/>

둘째, 픽셀 크기가 고정되어 있는 고정 폭(fixed width) 사이트를 만듭니다.  

***fixed layout***  
![fixedlayout](/assets/images/fixedlayout.gif) <br/>

<br/>

유동적인(liquid) 사이트의 단점은 디자인된 화면보다 더 작은 화면에서 페이지를 보게 되면 컨텐츠는 찌부가 됩니다.  
그리고 더 큰 화면에서 페이지를 보게 되면 긴 문장의 경우 읽기 불편할 정도의 긴 길이가 되어버립니다.  
- 소스코드 : https://github.com/mdn/css-examples/blob/master/learn/rwd/liquid-width.html
- 예제 : https://mdn.github.io/css-examples/learn/rwd/liquid-width.html

<br/>

고정 폭(fixed width) 사이트의 단점은 디자인된 화면보다 더 작은 화면에서 페이지를 보게 되면 스크롤 막대가 생기는 불편함이 있습니다.  
그리고 더 큰 화면에서 페이지를 보게 되면 가장자리에 의도치 않은 여백이 생길 수도 있습니다.  
- 소스코드 : https://github.com/mdn/css-examples/blob/master/learn/rwd/fixed-width.html
- 예제 : https://mdn.github.io/css-examples/learn/rwd/fixed-width.html

<br/>
<br/>

***추억의 스카이, 애니콜, 모토로라...***  
![featurephone](/assets/images/featurephone.png) <br/>

피처폰의 등장으로 모바일 웹이 현실화되기 시작했습니다.  
모바일을 수용하고자 하는 회사들은 서로 다른 URL을 사용하여 그들의 사이트의 특별한 모바일 버전을 만들기도 했습니다.(종종 m.example.com 또는 example.mobi 식)  

<br/>

***왼쪽은 데스크탑, 오른쪽은 모바일***
![mobilepage](/assets/images/mobilepage.png) <br/>
<br/>

위처럼 구현 했을 때 단점이 무엇일까요?  

첫째, 두 가지 별도 버전을 개발하고 최신 상태로 유재해야 합니다. (공포의 횡전개...)  

둘째, 이러한 모바일 사이트들을 경험해보면 종종 매우 축소된 기능을 제공합니다.(데스크탑 버전에는 있는 기능인데 모바일에서는 없어서 열심히 찾다가 결국 고객센터로부터 PC를 이용해달라는 말을 들어야되는 화나는 상황)

<br/>
<br/>

## 3. 유연한 레이아웃(Flexible layout)
유동적인(liquid) 혹은 고정 폭(fixed-width) 방법의 단점을 해결하기 위해 여러가지 방안이 등장했습니다.  
2004년 Cameron Adams는 Resolution dependent layout이란 포스트를 올렸는데요.  
이 포스트에서는 여러 다른 화면의 해상도에 대응하는 디자인 설계방법을 묘사합니다.  
간단히 요약하자면 **javascript를 통해 화면 해상도를 알아내서 그에 알맞는 CSS를 로드하자** 입니다.  
<br/>
<br/>

## 4. 반응형 디자인(Responsive design)
Responsive design 용어는 2010년 Ethan Marcotte에 의해 만들어진 신조어입니다.  
그는 반응형 디자인을 구현하기 위해 3가지 기술을 조합한다고 설명합니다.  
<br/>

**첫째, fluid grids를 사용한다.**  
fluid grids란 화면 크기에 따라 컬럼의 크기가 유동적으로 바뀌는 Grid입니다.  
- 예제 : https://mdn.github.io/learning-area/css/css-layout/grids/fluid-grid-calc.html
<br/>

**둘째, fluid images의 사용한다.**  
fluid images는 매우 간단한 기술입니다.  
width는 배율(%)로 설정하고, max-width를 100%로 설정만 하면 됩니다.  
만약 이미지를 포함하고 있는 컨테이너가 작아지면 이미지도 작아지지만, 컬럼보다 더 커지진 않습니다.  
이미지보다 컨테이너가 클 때 발생하는 모자이크 현상도 방지할 수 있습니다.  
- 예제 : https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/not-responsive.html
<br/>

**셋째, 미디어 쿼리(media query)를 사용한다.**  
Cameron Adams가 JS를 활용해 해상도를 파악했던 것처럼 미디어 쿼리는 해상도에 따라 레이아웃만을 변경해줄 수 있습니다.    
놀라운 것은 JS가 아닌 오직 CSS만을 사용하면 됩니다!  
모든 스크린 사이즈에 하나의 레이아웃으로만 대응하지 않아도 됩니다.  
스크린 사이즈에 따라 여러 레이아웃을 사용하여 원하는 레이아웃으로 보여줄 수 있게 됩니다.     
예를 들어 사이드바의 경우 작은 스크린에서는 재배치시킬 수 있습니다.  
- 예제 : https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/not-responsive.html
<br/>
  
**반응형 웹 디자인이란 특별히 구별되어있는 기술이 아니라고 이해하는게 중요**합니다.  
단지 웹 디자인일 뿐이고, 여러 기술들을 모아놓은 집합에 불과합니다.  

즉, <b>컨텐츠를 보여주는 디바이스에 대응할 수 있는 레이아웃을 만드는 일련의 방법들(a set of best practices)</b> 입니다.  

위 Ethan Marcotte의 최초 반응형 디자인 설명에서 flexible grids와 미디어 쿼리는 10년이 지난 지금도 반응형 디자인의 기본 뼈대가 됩니다.
Modern CSS Layout 방법은 본질적으로 반응형이며 웹 플랫폼에는 반응형 웹을 쉽게 구축할 수 있는 새로운 것들이 많이 있습니다.  

지금부터 하나씩 알아보실까요?

<br/>
<br/>

## 5. 미디어 쿼리(Media Queries)
미디어 쿼리가 있기에 반응형 디자인이 있을 수 있었습니다.  
미디어 쿼리 레벨 3 명세는 2009년에 W3C 권장 후보가 되었고, 이는 여러 브라우저에서 구현할 준비가 되었음을 의미했습니다.  

<br/>

여기서 잠시 TMI 하나 공유하겠습니다!  

***

***W3C 기술문서의 표준화 제정 단계***    
 - W3C 기술문서의 표준화 제정 단계는 웹 기술을 표준화 하기 위해서 W3C의 워킹그룹이 따라야 하는 여러 절차와 요구사항입니다.  
그리고 각 단계들은 공개된 문서가 최종 권고안으로 발전하기까지 어느 상태에 있는지 알려줍니다.  

1. Working Draft (WD) : 초안  
W3C가 그 멤버 뿐만 아니라 대중, 다른 기술단체 등 여러 커뮤니티에 검토를 받기 위해 공개한 문서입니다.    
전부는 아니겠지만 Working Draft는 Recommendation로 발전하기 위한 첫 단계입니다.    

2. Candidate Recommendation (CR) : 후보권고안  
광범위하게 검토를 받았고 워킹그룹의 기술적인 요구사항을 만족했다고 믿는 문서로서, W3C는 더 많은 구현 경험을 얻기 위해 이 문서를 공개합니다.    

3. Proposed Recommendation (PR) : 제안권고안  
광범위한 기술적인 구현과 검토가 끝난 거의 완성된 문서로서, 최종 승인을 얻기 위해 자문위원회에 보냅니다.  

4. W3C Recommendation(REC) : 권고안  
모든 합의를 끝낸 후 W3C멤버들과 감독에게 승인을 받은 문서로서, W3C는 이 문서가 널리 쓰이기를 권장합니다.  
W3C Recommendation는 다른 기관이 공개한 표준과 비슷합니다.  
  
<br/>
  
***기술문서의 발전 순서***  
1. Working Draft를 공개합니다.  
2. Working Draft에 대해 최종 검토합니다.(Last Call)  
3. 문서에 대한 내용을 실제로 구현합니다. (Candidate Recommendation)  
4. 만약 다음 단계로 가기 위한 기준을 이미 통과했다면, 이 단계를 건너 뛸 수 있습니다.   
5. Recommendation 최종 승인을 얻기 위해 검토합니다. (Proposed Recommendation)  
6. 최종 문서인 Recommendation을 공개합니다.  

 <br/>

 - 출처 : https://wit.nts-corp.com/2013/10/16/280


***
<br/>

미디어 쿼리는 접속하는 화면 크기에 따라 CSS를 선택적으로 적용할 수 있도록 합니다.  
예를 들어 하기 미디어 쿼리가 동작하는 방식은 이렇습니다.  

현재 웹 페이지를 보는 미디어가 스크린이면서(그 외 타입은 all, print가 있습니다) viewport가 800px 이상이라면,  
container class인 요소에 margin CSS가 적용됩니다. 
```css
@media screen and (min-width: 800px) {
  .container {
    margin: 1em 2em;
  }
}
```
<br/>
여러번의 미디어 쿼리를 넣는 것도 가능합니다.
480px 이하, 480-800px 사이, 800px 이상으로 조건을 줄 수 있습니다.  

레이아웃이 변경되는 부분을 중단점(breakpoints)이라고 부릅니다.  
흔히 미디어 쿼리가 사용되는 예는 페이지에 접속한 스크린 사이즈가 작을 때 싱글 컬럼 레이아웃으로 보여주는 것입니다.  
 - 예제 : https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

<br/>
<br/>

## 6. Flexible grids    
반응형 사이트는 단지 중단점(breakpoints)만을 통해 레이아웃을 변경하지 않습니다.  
Flexible Grids를 활용합니다.  

Flexible Grids를 활용하면 모든 가능한 기기 사이즈를 타겟으로 할 필요도 없고 완벽한 픽셀을 구현할 필요도 없습니다.  
사실상 수많은 사이즈의 기기를 대응하는 건 불가능합니다.  
데스크탑을 사용하는 사용자가 브라우저를 매번 풀사이즈로 사용하지 않기 때문입니다.      
<br/>

***이런 케이스까지 고려해야되나...ㅠㅠ***  
![multiplebrowser](/assets/images/multiplebrowser.jpg) <br/>
<br/>
<br/>

Flexible Grids를 사용하면 스크린 사이즈가 길면 컬럼 길이는 길어지고, 스크린 사이즈가 줄어들면 컬럼 길이도 줄어듭니다.  
컨텐츠가 보기 안 좋아질 때쯤 중단점을 더해 디자인을 바꾸면 됩니다.  
<br/>

***디바이스 크기에 따라 적절한 컬럼 크기로 변하는 flexible grids***  
![flexiblegrid](/assets/images/flexiblegrid.png) <br/>
<br/>

반응형 디자인 초기에는 Flexible Grids를 구현하기 위해 floats 속성을 사용해야 했습니다.  
각 요소에 퍼센티지 길이를 줌으로 만들어낼 수 있었고, 전체 길이는 100%를 넘지 않도록 했습니다.  

```css
 div:nth-of-type(1) {
    width: 48%;
    float: left;
  }

  div:nth-of-type(2) {
    width: 48%;
    float: right;
  }   
```
<br/>

위처럼 구현한 것이 Flexible Grids의 원조 구현방식입니다.  
이와 관련해 Marcotte는 한가지 공식을 제시했습니다.  

```js
target / context = result
```
<br/>

전체 길이에서 타겟 길이 부분을 비율(%)로 변경하는 공식입니다.   
예를 들어 타겟 컬럼이 60px이고 전체 길이가 960px이라면, 60을 960으로 나눈 후 소수점 2자리를 오른쪽으로 옮깁니다.  
그리고 계산된 값을 너비로 설정합니다.   
```css
.col {
  width: 6.25%; /* 60 / 960 = 0.0625 */
}
```
- 소스코드 : https://github.com/mdn/learning-area/blob/master/css/css-layout/grids/fluid-grid.html
- 예제 : https://mdn.github.io/learning-area/css/css-layout/grids/fluid-grid.html
- skeleton 튜토리얼 : http://getskeleton.com/
- skeleton 구현방식 : https://github.com/dhg/Skeleton/blob/master/css/skeleton.css
<br/>

이같은 접근은 요즘 웹에서 많이 찾아볼 수 있습니다.  
비록 요즘 모던한 사이트들은 float 기반 Flexible Grids를 사용하지 않더라도 이 내용을 이해하는 것은 충분히 가치가 있을 것입니다.  
- 소스코드 : https://github.com/mdn/css-examples/blob/master/learn/rwd/float-based-rwd.html
- 예제 : https://mdn.github.io/css-examples/learn/rwd/float-based-rwd.html
- 과거의 Flexible Grids 구현 방식 : https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Legacy_Layout_Methods

<br/>
<br/>

## 7. 현대적인 레이아웃 기술들 (Modern layout technologies)
Multiple-column layout, Flexbox, Grid와 같은 요즘 기술들은 기본적으로 반응형이 내장되어 있습니다.  
이 기술들은 여러분이 Flexible Grids를 만들거라고 가정하고 더 쉬운 방법을 제공해줍니다.  
<br/>

**1) 다중 컬럼화(Multicol)**  
다중 컬럼화를 구현하는 가장 오래된 방식으로 column-count가 있습니다.  
이것은 컨텐츠를 우리가 원하는 컬럼 수 만큼 나누어줍니다.  
브라우저는 화면의 크기에 따라 컬럼의 크기를 계산합니다.  
```css
.container {
  column-count: 3;

```
<br/>

column-width 속성을 활용해 최소 너비(minimum width)를 지정할 수 있습니다.  
브라우저는 컨텐츠를 감당할 충분한 너비의 컬럼을 만든 다음, 모든 컬럼 사이에 남은 공간을 공유합니다.  
나누어진 컬럼들은 남은 공간 크기에 따라 너비가 달라집니다.  
```css
.container {
  column-width: 10em;
}
```

<img src="/assets/images/multicol.png" width="70%"/>
<br/>
<br/>

**2) Flexbox**  
Flexbox의 FlexItem들은 그들의 컨테이너 내 공간을 나누어 가집니다.  
flex-grow, flex-shrink 속성 값을 바꿈으로 FlexItem들이 공간을 얼마나 차지하게 할지 결정할 수 있습니다.  

아래의 예시에 FlexItem들은 Flexbox내에서 동일한 공간을 차지합니다.  
```css
.container {
  display: flex;
}

.item {
  flex: 1;
}
```
<img src="/assets/images/flexbox.png" width="70%"/>
<br/>

- 사진 출처 : https://velog.io/@leeeeunz/TIL-12.-CSS-Flexbox
- 소스코드 : https://github.com/mdn/css-examples/blob/master/learn/rwd/flex-based-rwd.html
- 예제 : https://mdn.github.io/css-examples/learn/rwd/flex-based-rwd.html
- 추천 포스트 : https://studiomeal.com/archives/197
<br/>
<br/>

**3) CSS grid**  
CSS Grid Layout에서 fr 단위는 grid 컬럼(track)간에 사용 가능한 여백을 나누어 갖게끔 합니다.  
다음 예시는 1fr 사이즈의 3개의 컬럼(track)을 가지는 grid container를 만듭니다. 
```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```
<img src="/assets/images/cssgrid.png"/>
<br/>

- 소스코드 : https://github.com/mdn/css-examples/blob/master/learn/rwd/grid-based-rwd.html
- 예제 : https://mdn.github.io/css-examples/learn/rwd/grid-based-rwd.html
- 추천 포스트 : https://studiomeal.com/archives/533
<br/>
<br/>

## 8. 반응형 이미지(Responsive images)
반응형 이미지에 대한 가장 간단한 접근 방식은 반응 설계에 대한 Marcotte의 초기 기사에서 설명한 대로입니다.  
기본적으로 필요한 정도의 가장 큰 크기의 이미지를 촬영하여 필요에 따라 축소시키면 됩니다.  
이는 오늘날에도 여전히 사용되는 접근 방식이며, 대부분의 스타일시트에는 다음과 같은 CSS가 있습니다.

```css
img {
  max-width: 100%;
}
```
<br/>

**하지만 이 접근법에는 명백한 단점이 있습니다.**  
이미지는 고유 크기보다 훨씬 작게 표시될 수 있지만, 큰 사이즈로 다운받게 된다면 이것은 **대역폭 낭비**입니다.  

모바일 사용자는 브라우저 창에서 실제로 볼 수 있는 크기인 몇 배나 되는 이미지를 다운로드 할 수 있습니다.  
또한 모바일에서는 데스크톱과 동일한 이미지 가로 세로 비율을 원하지 않을 수 있습니다.  

예를 들어, 모바일용은 정사각형 이미지가 더 적합할 수도 있지만 데스크탑용 전체 이미지를 보여주게 됩니다.    
이미지를 축소하는 것으로는 이러한 작업을 수행할 수 없습니다.  

**picture 요소와 img 요소의 srcset, sizes 속성은 위 문제를 해결합니다.**  
"hints"와 함께 여러 크기의 이미지를 제공할 수 있으며,  
브라우저는 각 장치에 가장 적합한 이미지를 선택하여 사용자가 사용 중인 장치에 적합한 이미지 크기를 다운로드하도록 합니다.(WOW!)    
또한 완전히 다른 이미지를 다른 화면 크기로 제공할 수 있습니다.  
<br/>

```css
<img srcset="elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 600px) 480px,
            800px"
     src="elva-fairy-800w.jpg"
     alt="Elva dressed as a fairy">
```
<br/>

srcset 속성은 선택할 이미지의 후보 리스트입니다.  
elva-fairy-480w는 이미지의 이름이고, 480w는 이미지의 실제 너비입니다.  
sizes 속성에서 미디어 조건에 따라 알맞은 이미지가 선택됩니다.  
(max:width: 600px) 미디어 조건에 의해 디바이스 길이가 600px이하라면 480px에 적합한 이미지를 srcset 속성에서 찾아 로드합니다.  
위 예제의 경우 elva-fairy-480w가 로드됩니다.    

 - 자세한 내용 : https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
 - picture와 img srcset, sizes 차이 : https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/
<br/>
<br/>

## 9. 반응형 폰트(Responsive typography)  
초기에는 반응형 폰트(responsive typography)에 대해 특별히 연구되진 않았습니다.   
기본적으로 반응형 폰트를 구현하기 위해선 미디어 쿼리를 사용하여 글씨 크기를 조절합니다.  

하기 예제에서는 h1 태그에 폰트 사이즈를 4rem으로 할당합니다.  
4rem은 기본 font size의 4배 값을 의미합니다. 매우 큰 폰트이지요!  
그러므로 큰 화면에서만 4rem을 사용하도록 미디어 쿼리를 넣어줍니다.  

하기 CSS에 의하여 h1 태그 폰트 사이즈는 2rem으로 설정되며,  
미디어쿼리를 사용하여 화면 크기가 1200px 이상일때는 4rem으로 설정될 것입니다.  
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
<br/>

미디어 쿼리를 통해 폰트 사이즈를 변경할 수 있듯 미디어 쿼리는 레이아웃 변경뿐만 아니라 다양하게 사용될 수 있습니다.  
적재적소에 사용한다면 사이트를 더욱 매력적으로 유용하게 만들 수 있습니다.  
<br/>

### 반응형 폰트를 위해 viewport 단위를 사용하자!
**반응형 폰트를 구현하기 위한 매우 흥미로운 방법은 viewport 단위인 vw를 활용하는 겁니다.**  
1vw는 viewport width의 1%를 의미합니다.  
만약 fontsize를 vw로 지정하면, 이는 viewport 사이즈가 변경될 때마다 폰트사이즈도 변경되게 됩니다.  
```css
h1 {
  font-size: 6vw;
}
```
<br/>
<br/>

**문제는 vw만 사용했을 때 zoom in/out 시 글씨 크기가 변하지 않습니다.**  
그러므로 viewport units을 혼자 사용하면 안됩니다.  
**calc를 사용하여 em, rem같은 고정된 size를 더해주면 zoom in/out도 가능해집니다.**  
```css
h1 {
  font-size: calc(1.5rem + 3vw);
}
```
<br/>
<br/>

이제는 반응형 폰트를 구현하기 위해 미디어 쿼리를 사용하지 않고 글꼴 크기를 한 번만 지정해주면 됩니다.  
viewport의 크기를 늘어나면 폰트 사이즈도 점차 증가합니다.  

- 소스코드 : https://github.com/mdn/css-examples/blob/master/learn/rwd/type-vw.html
- 예제 : https://mdn.github.io/css-examples/learn/rwd/type-vw.html

<br/>
<br/>

## 10. Viewport 메타 태그(The viewport meta tag)
반응형 페이지의 HTML 소스를 보면, head 부분에 하기 meta 태그를 보통 보실 수 있습니다. 

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```
<br/>

**이 메타태그는 모바일 브라우저에게 그들의 viewport 너비를 device 너비로 세팅하라고 말합니다.**  
그리고 저희가 의도한 모바일 최적화의 문서를 보여주기 위해 문서의 scale 사이즈를 100%로 맞춥니다.  

이게 왜 필요할까요?  
왜냐하면 **사실 모바일 브라우저는 거짓된 viewport 너비를 알려주고 있습니다.**  

첫 아이폰이 출시되고 사람들은 작은 핸드폰 화면크기로 웹사이트를 둘러보기 시작할 때 대부분 사이트들은 모바일 최적화가 되어있지 않았습니다.  
그래서 모바일 브라우저는 viewport 너비를 960px로 맞추고 그 너비에 페이지를 렌더링했고,  
그것은 마치 데스크탑 레이아웃의 zoomed-out 버전과 같은 결과를 보였습니다.  
다른 모바일 브라우저도(구글 안드로이드) 동일했구요.  
사용자는 본인이 흥미로워하는 부분으로 확대하거나 이동할 수 있었지만 이것은 상당히 불편한 접근방식 입니다.   
오늘날 반응형 디자인이 아닌 사이트를 (불행히도) 방문하게 된다면 이런 현상을 보실 수 있습니다.  

문제는 미디어 쿼리와 중단점을 사용한 반응형 디자인이 모바일 브라우저에 적용이 안될 수 도 있다는 것입니다.  
보통은 480px viewport 너비나 그보다 작을때 레이아웃을 변경하도록 중단점을 설정하는데,  
기본 viewport가 960px로 설정되었다면 절대로 모바일 버전의 좁은 화면의 레이아웃을 사용자에게 보여주지 못할 것입니다.  

**width=device-width를 세팅함으로써 웹브라우저의 기본 설정인 width=960px를 오버라이딩하여 실제 기기 너비가 브라우저 너비가 되도록 해야 미디어 쿼리가 잘 동작할 것입니다.**

**그래서 HTML 문서 위에 항상 meta viewport 태그를 넣는게 좋습니다.:D**    

<br/>
<br/>

## 11. Summary
**반응형 디자인이란 보여지는 환경에 대응하여 사용자가 페이지를 보기 좋게끔 하는 웹 디자인입니다.**  

반응형 디자인이란 기본적으로 웹사이트를 어떻게 구축하는지에 대한 CSS, HTML 기술들을 포함합니다.(개념은 심플하쥬?)  
스마트폰으로 여러 사이트를 둘러보세요.  
아마도 데스크탑 버전으로 보여지는 사이트를 만나기란 쉽지 않을겁니다.  
이제 왠만한 웹은 반응형 디자인으로 이동되었기 때문이죠.  

**반응형 디자인은 이제는 옵션이 아니라 필수라고 생각됩니다.**   


<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>