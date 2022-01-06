---
title: REST API
subtitle: 모던 자바스크립트 Deep Dive | 44장 | REST API
readtime: 15 min
author: wookshin
tags: [javascript]
---

<br/>

# REST API

REST(REpresentational State Transfer)는 HTTP/1.0과 1.1의 스펙 작성에 참여했고 아파치 HTTP 서버 프로젝트의 공동 설립자인 로이 필딩(Roy fielding)의 2000년 논문에서 처음 소개되었습니다.  
발표 당시의 웹이 HTTP를 제대로 사용하지 못하고 있는 상황을 보고 HTTP의 장점을 최대한 활용할 수 있는 아키텍처로서 REST를 소개했고 이는 HTTP 프로토콜을 의도에 맞게 디자인하도록 유도하고 있습니다.  
REST의 기본 원칙을 성실히 지킨 서비스 디자인을 "RESTful"이라고 표현합니다.

즉, REST는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처고, REST API는 REST를 기반으로 서비스 API를 구현한 것을 의미합니다.

<br/>

## 1. REST API의 구성

REST API는 자원(resource), 행위(verb), 표현(representations)의 3가지 요소로 구성됩니다.  
REST는 자체 표현 구조(self-descriptiveness)로 구성되어 REST API만으로 HTTP 요청의 내용을 이해할 수 있습니다.

| 구성 요소             | 내용                           | 표현 방법        |
| --------------------- | ------------------------------ | ---------------- |
| 자원(resource)        | 자원                           | URI(엔드포인트)  |
| 행위(verb)            | 자원에 대한 행위               | HTTP 요청 메서드 |
| 표현(representations) | 자원에 대한 행위의 구체적 내용 | 페이로드         |

<br/><br/>

## 2. REST API 설계 원칙

REST에서 가장 중요한 기본적인 원칙은 두 가지입니다.  
**URL는 리소스를 표현** 하는 데 집중하고 **행위에 대한 정의는 HTTP 요청 메서드** 를 통해 하는 것이 RESTful API를 설계하는 중심 규칙입니다.

<br/>

#### _1. URI는 리소스를 표현해야 합니다._

URI는 리소스를 표현하는 데 중점을 두어야 합니다.  
리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용합니다.  
따라서 이름에 get 같은 행위에 대한 표현이 들어가서는 안됩니다.

```js
# bad
GET /getTodos/1
GET /todos/show/1

# good
GET /todos/1
```

<br/>

#### _2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현합니다._

HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적(리소스에 대한 행위)을 알리는 방법입니다.  
주로 5가지 요청 메서드(GET, POST, PUT, PATCH, DELETE 등)를 사용하여 CRUD를 구현합니다.

| HTTP 요청 메서드 | 종류           | 목적                  | 페이로드 |
| ---------------- | -------------- | --------------------- | -------- |
| GET              | index/retrieve | 모든/특정리소스 취득  | X        |
| POST             | create         | 리소스 생성           | O        |
| PUT              | replace        | 리소스의 전체 교체    | O        |
| PATCH            | modify         | 리소스의 일부 수정    | O        |
| DELETE           | delete         | 모든/특정 리소스 삭제 | X        |

<br/>

리소스에 대한 행위는 HTTP 요청 메서드를 통해 표현하며 URI에 표현하지 않습니다.  
예를 들어, 리소스를 취득하는 경우에는 GET, 리소스를 삭제하는 경우에는 DELETE를 사용하여 리소스에 대한 행위를 명확히 표현합니다.

```js
# bad
GET /todos/delete/1

# good
DELETE /todos/1
```

<br/><br/>

## 3. JSON Server를 이용한 REST API 실습

HTTP 요청을 전송하고 응답을 받으려면 서버가 필요합니다.  
JSON Server를 사용해 가상 REST API 서버를 구축하여 HTTP 요청을 전송하고 응답을 받는 실습을 진행해봅시다.

<br/>

### 3.1 JSON Server 설치

JSON Server는 json 파일을 사용하여 가상 REST API 서버를 구축할 수 있는 툴입니다.  
사용법은 매우 간단합니다.  
먼저 npm을 사용하여 JSON Server를 설치합시다.

> **npm**  
> npm(node package manager)은 자바스크립트 패키지 매니저입니다.  
> Node.js에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할과 패키지 설치 및 관리를 위한 CLI(Command Line Interface)를 제공합니다.  
> 자신이 작성한 패키지를 공개할 수도 있고 필요한 패키지를 검색하여 재사용할 수도 있습니다.  
> npm에 대한 자세한 내용은 다음 URL을 참고하시면 됩니다.  
> 모듈화와 npm: https://poiemaweb.com/nodejs-npm

<br/>

터미널에서 다음과 같이 명령어를 입력하여 JSON Server를 설치합니다.

```console
$ mkdir json-server-exam && cd json-server-exam
$ npm init -y
$ npm install json-server --save-dev
```

<br/>

### 3.2 db.json 파일 생성

프로젝트 루트 폴더(/json-server-exam)에 다음과 같이 db.json 파일을 생성합니다.  
db.json 파일은 리소스를 제공하는 데이터베이스 역할을 합니다.

```json
{
  "todos": [
    {
      "id": 1,
      "content": "HTML",
      "completed": true
    },
    {
      "id": 2,
      "content": "CSS",
      "completed": false
    },
    {
      "id": 3,
      "content": "Javascript",
      "completed": true
    }
  ]
}
```

<br/>

### 3.3 JSON Server 실행

터미널에서 다음과 같이 명령어를 입력하여 JSON Server를 실행합니다.  
JSON Server가 데이터베이스 역할을 하는 db.json 파일의 변경을 감지하게 하려면 watch 옵션을 추가합니다.

```console
## 기본 포트(3000) 사용 / watch 옵션 적용
$ json-server --watch db.json
```

<br/>

기본 포트는 3000입니다.  
포트를 변경하려면 port 옵션을 추가합니다.

```console
## 기본 포트(3000) 사용 / watch 옵션 적용
$ json-server --watch db.json
```

<br/>

위와 같이 매번 명령어를 입력하는 것이 번거로우니 package.json 파일의 scripts를 다음과 같이 수정하여 JSON Server를 실행하여 봅시다.  
package.json 파일에서 불필요한 항목은 삭제했습니다.

```json
{
  "name": "json-server-exam",
  "version": "1.0.0",
  "scripts": {
    "start": "json-server --watch db.json"
  },
  "devDependencies": {
    "json-server": "^0.16.1"
  }
}
```

<br/>

터미널에서 npm start 명령어를 입력하여 JSON Server를 실행합니다.  

```console
PS D:\Code\rest-api> npm start

> rest-api@1.0.0 start D:\Code\rest-api
> json-server --watch db.json


  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/todos

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...
```

<br/>

### 3.4 GET 요청

<br/>

### 3.5 POST 요청

<br/>

### 3.6 PUT 요청

<br/>

### 3.7 PATCH 요청

<br/>

### 3.8 DELETE 요청

<br/><br/><br/><br/><br/>
