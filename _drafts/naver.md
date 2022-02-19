## 역할
 - 글로벌(네이버/라인) 검색 서비스 / 스마트 서비스 FE 개발
 - 네이버 서비스 설계 트러블 슈팅, 성능 분석, 코드 리뷰 등 기술 지원
 - innersource 개발
 - egjs opensource 라이브러리 개발

## 필요 역량
 - FE 개발 경험
 - Webpack / Babel
 - ES 5+ / Typescript
 - HTML 4+ / CSS 2.1+
 - Git

## 우대 사항
 - 오픈 소스 컨트리뷰션 및 활동
 - 기술 기반 블로그 및 커뮤니티 활동
 - Node.js 등 server-side 개발 경험
 - docker/k8s등 cloud 환경 개발 경험
 - 최신 기술 경험 (React/Angular/Vue.js)
 - 브라우저 동작 이해

## 채용하고 싶은 사람
 - Front-End에 관심 있는 개발자
 - 자신의 경험을 잘 나눌 수 있는 개발자
 - 새로운 업무나 기술을 배우는데 거리낌 없는 개발자
 - 동료와 협업하면서 업무를 함께 진행할 수 있는 개발자
 - 문제을 찾고 정의하여 해결하는 개발자
 - Self motivation이 가능한 개발자
 

## 키워드 
 - https://d2.naver.com/helloworld/991303
 - 책 - 프런트엔드 개발 시작하기 
 - LAPIN
 - 스토리북 페이지
 - PM2
 - 미구현 화면 컴포넌트 추가
 - 화면 컴포넌트 빌더 기능 개선
 - 디자인 시스템의 개선 및 고도화
 - 디자인 템플릿 페이지와 스토리북 연동
 - 클러스터...

## CFC
 - DOM Diff
 - 프레임워크에서 변화를 Vanilla JS에서 동기화하는 과정이 필요
 - 동기화 되는 과정은 매우 자주 발생하는 이벤트 

## 상태 복구
 - BFCache
 - History.scrollRestoration

## Cross Framework Component

## DOM 이슈
1. DOM 상태 정보의 접근 문제
 - DOM Diff가 가능해야 CFC(Dynamic DOM)을 만들 수 있음
  - 예를 들어, Flicking 안쪽의 Panel 엘리먼트를 알아야 변경 사항을 반영
  - DOM의 상태를 접근할 수 없어, 별도의 FlickingPanel 같은 컴포넌트로 해결
 
2. DOM의 변경 문제 
 - 컴포넌트의 렌더링 되는 엘리먼트를 지정 없이, div로 렌더링
 - DOM의 순서를 변경할 수 없어 별도의 방법을 찾아야함
  - CSS의 order로 변경(absolute 이면 이슈없음)
  - 이로 인해 브라우저 커버리지가 IE10+으로 낮아짐

## Scale Up
 - egjs의 컴포넌트들은 모두 CFC로 전환할 예정  

## Document
 - JSDoc -> docusaurus 
 - jsodc-to-mdx

## Demo
 - StoryBook
 - storybook-addon-preview

## TestCase
 - StoryBook + CodeceptJS + Playwright
 - 테스트 케이스 작성

## CFC하면서 새로운 고민이 생겼다
 - Server-side rendering
  - react/vue은 SSR일 경우 별도 라이프 사이클로 어렵지 않음
  - Angular / Svelte는 별도의 작업을 통해서 해결해야 함
 
## State Restore
 - Vanilla : 컴포넌트에 필요한 데이터와 HTML로 복구 가능
 - Framework : 상태 복구에 필요한 HTML은 데이터화하여 처리
 
## 다른 타입의 CFC
1. Reactive
 - Hook, Composition, Reactive, Directive, Store.writeable 

2. Static DOM
 - Dynamic DOM - DOM Sync

## 새로 생기고 발전하는 프레임워크
1. Vue2, Vue3 같이 적용
2. 신흥강자 Svelte
 - 프로토타입 직접 접근못함
 
## https://naver-career.gitbook.io/kr/service/search/reliability-platform/search-fe
