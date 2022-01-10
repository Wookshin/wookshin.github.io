## HTML Markup

어떤 기능을 만들어야되는지 명세서를 정확히 작성하자.
어떻게 모듈화해서 만들어나갈지 계획하는 것이 정말 중요하다.
계획하고, 구분하고, 나누는 것.

Logo, Buttons, Items 3개로 구분함.

button.btn 이라고 입력하면 btn 클래스의 button element 생성 가능.

button.btn\*6 이라고 입력하면 button element 6개 생김.

button 내부에 img 태그 생성.

정적인 애들을 만들고 동적인 애들을 만들어야 더 수월하다.

ul 태그 안에 item들을 li로 생성

<br/>

## CSS

변수로 정의한 css
간편한 유지보수를 위해 변수 사용!

```css
:root {
  /* color */
  --color-black: #3f454d;
  --color-white: #ffffff;
  --color-blue: #3b88c3;
  --color-yellow: #fbbe28;
  --color-pink: #fd7f84;
  --color-light-grey: #dfdfdf;
}
```

나란히 배열하기 위해 flex를 사용.
수직적으로 배열하기 위해 flex-direction을 colum으로 사용.
아이템들의 중앙 정렬을 위해 justify-content, align-items에 center 값 부여.

화면 중앙으로 이동시키기 위해 body의 height 값을 100vh 부여.

logo가 클릭 가능함을 보이기 위해 cursor에 pointer 부여.

마우스를 올렸을 때 logo가 커지면 재밌으니까 logo:hover에 transform: scale(1.1); 부여

그냥 커지게 하지말고 천천히 커지게 하기 위해 logo에 transition 사용 (transition: transform 300ms ease;)

btn 색깔을 공통으로 만들기 위해 배경색을 투명으로 지정. (background-color: transparent;)

border랑 outline이 못생기게 나오므로 none으로 설정.
border: none; outline: none;

btn에도 logo처럼 애니메이션 주기

버튼에 사이즈를 변수로 주기.

```css
/* size */
--size-button: 60px;

.imgBtn {
  width: var(--size-button);
  height: var(--size-button);
}
```

애니메이션 300ms 값도 변수 처리.

```css
/* animation */
--animation-duration: 300ms;
```

base-space 변수를 생성하여 btn의 오른쪽 마진으로 준다.
오른쪽에 마진을 주던가 맨아래 마진을 주는게 일반적인듯.

```css
/* size */
--base-space: 8px;

.btn {
  margin-right: var(--base-space);
}
```

버튼 크기는 padding을 주어 늘린다.
calc도 활용.

```css
.colorBtn {
  font-size: var(--button-font-size);
  padding: calc(var(--base-space) * 2);
}
```

둥그스럽게 하기 위해 border-radius 4px 부여.

아이템을 담는 items이 일정한 크기로 있어야하기 때문에 width, height를 고정.
반응형으로 하기위해 %로 부여.

```css
.items {
  width: 60%;
  height: 60%;
}
```

ul 태그로 되어있기 때문에 list-style:none 부여하고, padding-left를 0로 부여한다.

```css
.items {
  list-style: none;
  padding-left: 0;
}
```

items가 아닌 페이지 전체에 대해 스크롤링이 발생하는 것을 방지하기 위해 items 전체 안에서 스크롤링이 되도록 overflow-y: scroll 부여.
