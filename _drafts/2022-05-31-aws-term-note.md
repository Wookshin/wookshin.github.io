---
title: AWS SAA 준비 - 용어 정리
subtitle: 용어를 정리하자
readtime: 15 min
author: wookshin
tags: [aws]
comments: true
---

<br/>

# AWS SAA 준비 - 용어 정리

<br/>

## 1. Storage Gateway

<br/>

### 1) Storage Gateway란?

- 온프레미스를 클라우드 기반 스토리지와 연결하여, 온프레미스와 IT 환경과 AWS의 스토리지를 사용하는 서비스이다.
- 파일 기반, 볼륨 기반 및 테이프 기반 솔루션 제공한다.

<br/>

### 2) Storage Gateway 특징

- 내구성 및 보안: 클라우드 스토리지 서비스를 통한 내구성과 보안 활용 가능하다.
- 확장성: 요구 사항에 따라 확장 및 축소가 가능하며, 선결제 및 하드웨어 추가 없이 스토리지 용량 프로비저닝 가능하다.
- 짧은 지연시간: 온프레미스에서 AWS로 낮은 지연 시간으로 액세스 가능하다.
- 전송 최적화: 압축, 암호화 및 대역폭 관리가 기본적으로 제공되어 네트워크 대역폭을 최적화 가능하다.
- 간편성: 온프레미스 표준 스토리지 프로토콜(NFS, SMB 등)과 쉽게 통합되므로 애플리케이션을 변경할 필요 없다.

<br/>

### 3) Storage Gateway 작동방식

- File Gateway: NFS/SMB 프로토콜을 사용하여 Amazon S3에서 객체를 저장 및 검색
- Volume Gateway: iSCSI를 통해 Amazon S3에 객체를 저장하고, 캐싱 및 저장하는 용도로 EBS 사용
- Tape Gateway: 클라우드 기반 가상 테이프 스토리지를 통해 데이터 백업

> 출처 - [Amazon Storage Gateway란?](https://tech.cloud.nongshim.co.kr/2021/03/19/%EC%86%8C%EA%B0%9C-amazon-storage-gateway%EB%9E%80/)

<br/><br/>

## 2. NAT 게이트웨이

<br/>

### 1) NAT 게이트웨이란?

프라이빗 서브넷의 인스턴스를 인터넷 또는 기타 AWS 서비스에 연결하는 한편, 인터넷에서 해당 인스턴스와의 연결을 시작하지 못하게 할 수 있다.
NAT 게이트웨이는 프라이빗 서브넷의 인스턴스에서 인터넷 또는 다른 AWS 서비스로 트래픽을 전달한 다음 응답을 인스턴스로 다시 보냅니다.

<br/>

###

<br/>

### 3) 

<br/>

#### 출처 

- [공부하는 블로그 - NAT GATEWAY](https://hyeyeon13.tistory.com/20)

<br/><br/>

##

<br/><br/>


<br/><br/><br/><br/><br/>
