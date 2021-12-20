---
title: 쿠버네티스(kubernetes, k8s) 용어 정리
subtitle: 쿠버네티스(kubernetes, k8s) 용어 정리
readtime: 7 min
author: wookshin
tags: [tool]
---

<br/>

# 쿠버네티스(kubernetes, k8s) 용어 정리
<br/>

**_쿠버네티스에서 활용되는 용어를 정리합니다._**  
<br/>
<br/>
<br/>

## 쿠버네티스
갓 구글 형님이 만드셨다.  
업계 표준 컨테이너 기술입니다.  
그리스어로 "조타수"라는 뜻입니다.  
k8s라 쓰고 kubernetes라 읽습니다.  

도커 Orchestration입니다.  
 - Clustering  
 - Auto-placement
 - Auto-restart
 - 무중단 배포

데이터 센터 OS와 비슷하다.
데이터 센터는 컴퓨터의 집합입니다.  
OS는?
 - Hardware 추상화 layer (CPU/MEM/Network)
 - 요청한 자원 할당/분배 (resource management)
 - 프로세스 스케줄링 (scheduling)
 - User Interface (GUI, CUI)
 
여러 서버들의 자원을 할당시키고 조정하는 OS처럼 k8s는 여러 컨테이너를 관리합나디ㅏ. 

CRI(Container Runtime Interface)통해 통신합니다.

<br/>

## 서버를 바라보는 방식! 
애완동물에서 가축으로 변했습니다.  
애완동물처럼 서버 하나하나를 소중히 다뤘던 예전과 달리,  
현재는 가축처럼 관리를 하게 되었습니다.  
죽으면 죽는대로(?) 더 추가하고 빼고 기타 등등  

<br/>

## 네임스페이스
 - 논리적인 클러스터 (namespace)
 - 개별적인 Access control 정책 / 네트워크 정책

<br/>

## 리소스
 - 모든 것이 리소스
 - Pod
 - Node
 - Service

<br/>

## 앱 정의서
 - 리소스 (YAML 형식)

<br/>

## Desired State

<br/>

## 라벨 & 셀렉터

<br/>

## 아키텍처

<br/>

## 쿠버네티스의 장점
 - 컨테이너 스케줄링이 편리해집니다. 
 - 확장성이 좋아집니다. 
 - 모니터링이 쉬워집니다. 
 - 장애에 견고해 집니다.
 - Hybrid / 멀티 클라우드 구현
 - 배포 방식이 획기적으로 간편해 집니다.
 - MicroService
  - Service Discovery
  - Load Balancing
  - Traffic Control
 - Machine Learning Platform
  - Auto Scaling
  - Resource Management
  - Node Selection

<br/>

## k3s
**1. 설치가 쉽다.**  
쿠버네티스 클러스터를 처음부터 설치하기란 굉장히 어렵습니다. 퍼블릭 클라우드에서 제공해주는 managed 서비스가 아닌 이상 bare metal 서버부터 시작하는 것은 많은 시간과 노력이 듭니다. 물론 kubeadm과 같이 손쉽게 설치하는 툴이 있지만 그래도 k3s 만큼 설치가 쉬운 방법은 흔치 않습니다.

**2. 가볍다.**  
k3s는 etcd, cloud manager 등 무겁지만 안정성 있는 컴포넌트들을 다 제거하고 프로덕션에는 맞진 않지만 가벼운 컴포넌트들로 대체하여 굉장히 적은 리소스 위에서도 클러스터를 구축할 수 있게 해줍니다.

**3. 대부분의 기능이 다 들어 있다.**  
가볍다고 중요한 기능이 빠져있진 않습니다. 쿠버네티스 위에서 학습, 개발, 테스트시 필요한 모든 기능들은 다 탑재되어 있어 학습용으로 안성 맞춤입니다. 다만 몇몇 실습에서는 클라우드 플랫폼에서 제공하는 기능들이 필요한 경우가 있습니다. (autoscaling 등)

<br/>

## k3s 설치
https://k3s.io/

```sh
 sudo apt-get update
 curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik  --disable metrics-server --node-name master --docker"  INSTALL_K3S_VERSION="v1.17.7+k3s1" sh -s -
 mkdir ~/.kube
 sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
 sudo chown -R $(id -u):$(id -g) ~/.kube
 echo "export KUBECONFIG=~/.kube/config" >> ~/.bashrc
 source ~/.bashrc
 
 # 설치 확인
 kubectl cluster-info
 # Kubernetes master is running at https://127.0.0.1:6443
 # CoreDNS is running at https://127.0.0.1:6443/api/v1/namespaces/ kube-system/services/kube-dns:dns/proxy
 # 
 # To further debug and diagnose cluster problems, use 'kubectl  cluster-info dump'.
```

<br/>

## kubectrl run
```sh
 kubectl run mynginx --image nginx --restart Never
```

mynginx라는 이름의 Pod를 nginx 라는 이미지를 이용하여 생성하라는 의미를 가집니다. 여기서 --restart Never라는 옵션이 궁금할 수 있는데 일단은 Pod를 만들기 위해서 사용하는 옵션이라고 이해하고 넘어가길 바랍니다.

도커 명령 비교: docker run

<br/>

## kubectl get
방금 실행한 Pod를 확인하기 위해서 get 명령을 사용합니다.  
```sh
 kubectl get pod
 # NAME      READY   STATUS    RESTARTS   AGE
 # mynginx   1/1     Running   0          2s
```

실행한 nginx Pod가 정상적으로 동작하는 것을 확인할 수 있습니다.

도커 명령 비교: docker ps

도커 ps 명령과는 조금 다르게 해당 Pod의 상태 정보를 조금 더 자세히 보고 싶다면 -o yaml 옵션을 통해 더 자세히 확인할 수 있습니다.

```sh
 # kubectl get pod $POD_NMAE -o yaml
 kubectl get pod mynginx -o yaml
```

<br/>

## kubectl describe
describe명령도 get 명령과 유사하게 Pod의 상태 정보를 보여 줍니다.  
get과는 조금 다르게 Event 기록을 확인할 수 있습니다.  

```sh
 kubectl describe pod mynginx
```

<br/>

## kubectl logs
docker logs 마찬가지로 컨테이너의 로그 정보를 확인할 수 있습니다.
```sh
 kubectl logs -f mynginx
```

<br/>

## kubectl exec
마찬가지로 도커의 exec 명령과 동일합니다. 한가지 차이점이 있다면 컨테이너에게 파라미터를 넘길 때, -- 로 구분합니다.

```sh
 kubectl exec mynginx -- apt-get update
```

쿠버네티스도 마찬가지로 -it를 이용하여 컨테이너 안으로 접근이 가능합니다.

```sh
 kubectl exec -it mynginx -- bash
 # root@mynginx:/#
```

도커 명령 비교: docker exec

<br/>

## kubectl cp
해당 실습페이지를 복사해 보겠습니다.

```sh
 kubectl cp mynginx:/etc/passwd /tmp/passwd
 ls /tmp
 # passwd
```

도커 명령 비교: docker cp

<br/>

## kubectl edit
실행된 Pod의 정보를 수정합니다. nginx 이미지의 태그를 latest에서 1.17.9로 수정해 보겠습니다.

```sh
 kubectl edit pod mynginx
 # edit Pod YAML file
 # image: nginx --> image: nginx:1.17.9
 
 # 확인
 kubectl get pod mynginx -oyaml
```

<br/>

## kubectl delete
생성한 Pod를 삭제하기 위해 delete 명령을 이용합니다.

```sh
 kubectl delete pod mynginx
 # pod mynginx deleted
 kubectl get pod
 # No resources found in default namespace.
```

도커 명령 비교: docker rm

<br/>

## kubectl auto completion
kubectl 명령을 매번 일일이 입력하는 것이 귀찮게 느껴질 수도 있습니다.  
쿠버네티스에서는 이를 해결하기 위해 자동으로 명령을 완성시켜주는 스크립트를 제공해 줍니다.   
아래 사이트에 들어가셔서 사용하시는 shell에 맞게 스크립트를 세팅하시기 바랍니다.  
https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion

예를 들어, bash shell인 경우,

```sh
 echo 'source <(kubectl completion bash)' >>~/.bashrc
 source ~/.bashrc
```

이제 kubectl까지만 입력하고 키를 입력하면 명령이 자동 완성 되는 것을 확인할 수 있습니다.

<br/>

## Namespace
쿠버네티스에는 namespace라는 개념이 있습니다. 논리적으로 쿠버네티스 클러스터를 나누는 역할을 합니다. namespace 별로 User 및 Network 접근 정책을 다르게 가져갈 수 있으며 관리의 단위를 한정 시켜줍니다. 현재 클러스터의 namespace를 확인하려면 다음과 같은 명령을 입력하면 됩니다.

```sh
 kubectl get namespace
 # NAME              STATUS   AGE
 # default           Active   60m
 # kube-public       Active   60m
 # kube-system       Active   60m
```

새로운 namespace를 생성하려면 다음과 같이 입력합니다.

```sh
 kubectl create namespace myns
 # namespace/myns created
 
 kubectl get namespace
 # NAME              STATUS   AGE
 # default           Active   9m35s
 # kube-system       Active   9m35s
 # kube-public       Active   9m35s
 # kube-node-lease   Active   9m35s
 # myns              Active   6s
```

새로운 namespace에 Pod를 생성하려면 다음과 같이 입력합니다.

```sh
 kubectl run mynginx --image nginx --restart Never --namespace myns
 # pod/mynginx created
 
 kubectl get pod -n myns # 축약하여 -n으로도 사용 가능합니다.
 # NAME      READY   STATUS    RESTARTS   AGE
 # mynginx   1/1     Running   0          23s
 
 # default namespace와 비교합니다.
 kubectl get pod
 # No resources found in default namespace.
```

<br/>

## Clean up
```sh
 kubectl delete pod --all
 kubectl delete pod --all -n myns
 kubectl delete ns myns
```

<br/>

## Do it more #1
kubectl exec mynginx -- curl localhost 라는 명령을 실행했을 때, 아래와 같은 html 파일이 응답되게 만들어 주세요.

```sh
 # curl localhost
 kubectl exec mynginx -- curl localhost
```

```html
 <html>
     <body>
         <h1>Hello world!</h1>
     </body>
 </html>
```

<br/>

## Do it more #2
kubectl CLI를 이용하여 default namespace의 mynginx Pod의 아래 정보를 확인해 주세요.

 - name
 - namespace
 - nodeName
 - creationTimestamp
 - kind
 - podIP
 - hostIP
 - restartPolicy

<br/>

##

<br/>

##

<br/>

##

<br/>

##

<br/>

##

<br/>

##

<br/>

##

<br/>

##

<br/>

##
