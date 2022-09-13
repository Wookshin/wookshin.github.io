
## 0. 작업 트리(Work Tree)와 인덱스(Index) 개념

- 작업 트리 : 우리가 흔히 말하는 폴더. 작업하는 폴더.
- 인덱스 : 커밋을 실행하기 전의 저장소와 작업 트리 사이에 존재하는 공간
- 작업트리 >>(등록)>> 인덱스 >>(커밋)>> 저장소
- Git의 '커밋'작업은 '작업 트리'에 있는 변경 내용을 저장소에 바로 기록하는 것이 아니라 그 사이 공간인 '인덱스'에 파일 상태를 기록(stage-스테이징)하게 되어 있다. 따라서 저장소에 변경 사항을 기록하기 위해서는, 기록하고자 하는 모든 변경 사항들이 '인덱스'에 존재해야 한다.

> https://backlog.com/git-tutorial/kr/intro/intro1_4.html
 
<br/>

## 1. 최신 커밋 수정하기
 
- git commit --amend -m "변경할 메시지"
- git add <누락된 파일> & git commit --amend

<br/>

## 2. 이전에 작성한 커밋 지우기 (revert)

- revert : 해당 커밋의 내용을 원복시키고 싶을 때 사용함.
- 커밋이 이미 공개된 경우에는 함부로 삭제할 수 없기 때문에, 특정 커밋의 내용을 지우는 새로운 커밋을 만들어 보다 안전하게 처리함.

> https://backlog.com/git-tutorial/kr/stepup/stepup7_2.html
> https://backlog.com/git-tutorial/kr/stepup/stepup7_2.html

## 3. 커밋을 버리고 특정 버전으로 다시 되돌아가기 (reset)

- reset : 더 이상 필요 없어진 커밋들을 버릴 수 있다. 명령어 실행 시 어떤 모드로 실행할 지 지정하여 'HEAD' 위치와 인덱스, 작업 트리 내용을 함께 되돌릴지 여부를 선택할 수 있다.
- soft : HEAD 변경
- mixed : HEAD, 인덱스 변경
- hard : HEAD, 인덱스, 작업트리 변경

- HEAD란? : 현재 브랜치를 가리키는 포인터이며, 브랜치는 브랜치에 담긴 커밋 중 가장 마지막 커밋을 가리킴. 지금의 HEAD가 가리키는 커밋은 바로 다음 커밋의 부모가 됨. 단순하게 생각하면 HEAD는 "현재 브랜치 마지막 커밋의 스냅샷"임.
- 인덱스란? : 바로 다음에 커밋할 것들. git commit 명령을 실행했을 때 Git이 처리할 것들이 있는 곳. Staging Area.

- 실습 
> https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-Reset-%EB%AA%85%ED%99%95%ED%9E%88-%EC%95%8C%EA%B3%A0-%EA%B0%80%EA%B8%B0

> https://backlog.com/git-tutorial/kr/stepup/stepup6_3.html
> https://backlog.com/git-tutorial/kr/stepup/stepup7_3.html

<br/>

## 4. 3 Way Merge

- git은 merge를 할 때 각 브랜치의 마지막 커밋 두 개, 브랜치의 공통 조상 커밋 총 3개의 커밋을 비교하여 새로운 커밋을 만들어 병합을 수행한다.

> https://wonyong-jang.github.io/git/2021/02/05/Github-Merge.html

## 5. Squash and Merge 활용하기 
