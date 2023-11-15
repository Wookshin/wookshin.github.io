---
title: 정규표현식으로 시간 절약하기
subtitle: 당신의 하루에 몇 시간을 더하세요
readtime: 6 min
author: wookshin
tags: [etc]
comments: true
---

<br/>

# 정규표현식으로 시간 절약하기

## 1. 정규표현식 소개

정규표현식(Regular Expression)은 문자열에서 특정 패턴을 찾거나 대체하는 데 사용되는 강력한 도구입니다.  
다양한 프로그래밍 언어와 텍스트 편집기에서 지원되며, 데이터 검증, 검색 및 데이터 분석에 유용하게 사용됩니다.

<br/><br/>

## 2. 패턴 알아보기

### 집합으로 찾기
- 집합은 대괄호 []를 사용하여 문자의 그룹을 정의합니다. 예를 들어, [abc]는 'a', 'b', 또는 'c' 중 하나와 일치합니다.
  * `[abc]`: 'a', 'b', 'c' 중 하나의 문자와 일치
  * `[a-z]`: 소문자 알파벳 중 어떤 문자 하나와 일치
  * `[A-Za-z]`: 대소문자를 모두 포함한 알파벳 중 어떤 문자 하나와 일치

<br/>

### 반복 찾기
- 반복 메타 문자는 문자가 몇 번 나타나는지 지정합니다. 예를 들어, a*는 'a'가 0번 이상 반복되는 모든 문자열과 일치합니다.
  * `*`: 앞의 문자/패턴이 0회 이상 반복
  * `+`: 앞의 문자/패턴이 1회 이상 반복
  * `?`: 앞의 문자/패턴이 0회 또는 1회 반복
  * `{n}`: 앞의 문자/패턴이 n회 반복
  * `{n,}`: 앞의 문자/패턴이 n회 이상 반복
  * `{n,m}`: 앞의 문자/패턴이 n회에서 m회까지 반복

<br/>

### 역참조 활용하기
- 역참조는 이미 일치한 문자열을 다시 참조합니다. 예를 들어, (a)b\1는 'a' 다음에 'b'가 오고, 그 다음 다시 'a'가 오는 문자열과 일치합니다.
  * `(pattern)`: 패턴을 그룹화
  * `\1`, `\2` ...: 첫 번째, 두 번째, ... 그룹화된 패턴에 일치하는 문자열을 참조

<br/>

### 조건 달기
- 조건문은 특정 조건에 따라 다른 패턴을 일치시킵니다. 예를 들어, (?(1)a|b)는 1번 그룹이 존재하면 'a'와, 그렇지 않으면 'b'와 일치합니다.
  * `|`: 또는(OR) 연산자, 여러 패턴 중 하나와 일치
  * `(pattern1|pattern2)`: pattern1 또는 pattern2 중 하나와 일치

<br/><br/>

## 3. 패턴 활용 예제들

### 집합으로 찾기
1) `[abc]`

```
abcdefg
```

2) `a[abc]`

```
aa ab ac ad
```

3) `[^abc]`

```
defabc
```

4) `[0-5]`

```
1234567890
```

5) `[^bcdfghjklmnpqrstvwxyz]`

```
abcdefghijklmnopqrstuvwxyz
```

6) `^[bcdfghjklmnpqrstvwxyz]`

```
apple
bus
cat
english
```

7) `K[3-4][A-Z0-9]`

```
K1234ABCD-123456  K1234ABCD-EFGHIJ
```

<br/>

### 반복 찾기
1) `K[3-4][A-Z0-9]*`

```
K3234ABCD-123456
K4234ABCD-EFGHIJ
K5234ABCD-EFGHIJ
```

2) `https?`

```
http://naver.com
https://naver.com
```

3) `[1-9][0-9][0-9]\.`

```
10.3sec
120.2sec
250.1sec
5.3sec
1000.3sec
```

4) `[0-9]{3,}\.`

```
10.3sec
120.2sec
250.1sec
5.3sec
1000.3sec
```

5) `\d{3}`

```
123
111
222
334
444
```

<br/>

### 역참조 활용하기
1) `(\d)\1\1`

```
123
111
222
334
444
```

2) `(\w+),\1`

```
USER_ID,USER_NAME,USER_PWD,USER_PWD,USER_DEPT 
```

3) `(Chae) (Shinwook)` → `\2 \1`

```
Chae Shinwook
```

<br/>

### 조건 달기
1) `apple|orange`

```
apple
pear
strawberry
orange
```
  
2) `.*\.(jpg|png)$`

```
image.jpg
everySmile.jpeg
myFace.png
oops.xml
```

3) `(yes)?(?(1) indeed| no)`

```
yes indeed
yes no
indeed
no
no indeed
```

4) `(Error)?(?(1) Code: [0-9]{3}|No Error)`

```
Error Code: 404
No Error
Error Code: XYZ
```


<br/><br/><br/><br/><br/>
