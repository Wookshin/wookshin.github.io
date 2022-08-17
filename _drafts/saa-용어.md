### AWS Storage Gatewayfile gate

- Volume Gateway 
    - uses iSCSI
    - 볼륨 게이트웨이는 NFS가 아니라 iSCSI를 사용하여 Snapshot 형태로 백업.
    - 캐시 모드(로컬에 캐시를, 원본은 S3에): 기본 데이터가 Amazon S3에 저장되는 반면, 자주 엑세스하는 데이터는 엑세스 지연 시간을 줄이기 위해 로컬로 캐시에 보존
    - 저장 모드(로컬에 원본을, 비동기로 S3 백업): 기본 데이터가 로컬로 저장되고 엑세스 지연 시간을 줄이기 위해 전체 데이터 세트가 온프레미스에서 제공되고, Amazon S3에는 비동기식으로 백업됨.
- File Gateway 
    - uses NFS, SMB
    - 파일 게이트웨이는 파일을 Amazon S3의 개체로 저장하고 검색할 수 있는 가상 온프레미스 파일 서버를 제공함.
    - 온프레미스 애플리케이션 및 객체 기반 워크로드를 위해 S3에 파일 스토리지가 필요한 Amazon EC2 상주 애플리케이션에 사용할 수 있음. 플랫 파일에만 사용되며 S3에 직접 저장됨.
    - 파일 게이트웨이는 로컬 캐싱을 통해 Amazon S3의 데이터에 대한 SMB 또는 NFS 기반 엑세스를 제공함.


### AWS DataSync vs AWS Storage Gateway

- AWS DataSync를 사용하여 기존 데이터를 Amazon S3으로 마이그레이션한 다음 AWS Storage Gateway의 File Gateway 구성을 사용하여 마이그레이션된 데이터에 대한 엑세스 및 사내 파일 기반 애플리케이션의 지속적인 업데이트를 유지한다.
- DataSync와 File Gateway를 함께 사용하면 사내 인프라를 최소화하는 동시에 사내 애플리케이션을 클라우드 스토리지에 원활하게 연결할 수 있다.
- AWS DataSync를 사용하면 AWS 스토리지 서비스에 대한 온라인 데이터 전송을 자동화하고 가속화할 수 있다.
- AWS DataSync를 사용한 초기 데이터 전송 단계 후 File Gateway는 마이그레이션된 데이터에 대한 짧은 지연 시간 엑세스를 사내 애플리케이션에 제공한다.
- NFS 공유와 함께 DataSync를 사용하면 소스 사내 스토리지의 POSIX 메타데이터가 보존되고 파일 게이트웨이를 사용하여 파일에 엑세스할 때 소스 스토리지의 사용 권한이 적용된다.
- 데이터 복제는 Data Sync를 사용하고, 자동화 및 가속화는 Configure a Sync job(동기화)으로 구성한다.
- DataSync는 암호화를 보장하기에 기밀성도 보장한다.
- DayaSync : 데이터 이전(on-premises <--> AWS storage) 작업 원활하게 도움
- Storage Gateway : 옮겨 놓은 데이터에 연결하여 사용하는 환경일 때

<br/>

### AWS Snowball: 

- AWS 컴퓨팅 및 스토리지 기능을 엣지 환경으로 가져오고 AWS와 데이터를 주고 받을 수 있도록, 안전하고 견고한 디바이스를 제공하는 서비스.
- 완전 오프라인 마이그레이션 서비스
- 스노우볼로 마이그레이션을 하게되면 AWS에서 마이그레이션을 위한 데이터 저장용 스토리지 박스를 택배로 보내줌.

<br/>

### S3 Transfer Acceleration vs CloudFront

- S3 Transfer Acceleration
    - 기가바이트 단위의 대용량 데이터 전송 (기가바이트 ~ 테라바이트)
    - Transfer Acceleration을 사용하는 이유는 무엇입니까?
        - 전 세계 각지에서 중앙의 버킷으로 업로드하는 고객이 있는 경우
        - 전 세계에 정기적으로 수 기가바이트에서 수 테라바이트의 데이터를 전송할 경우
        - Amazon S3에 업로드할 때 인터넷을 통해 사용 가능한 대역폭을 충분히 활용할 수 없는 경우
- CloudFront
    - 저용량 데이터 전송 (기가바이트 이내)
- 둘다 전세계에서 사용 가능

<br/>

### CloudFront는 어떻게 라이브 스트리밍(비디오)을 지원할 수 있는가?

- CloudFront를 사용하여 모든 HTTP 오리진을 사용하여 VOD(주문형 비디오) 또는 라이브 스트리밍 비디오를 제공할 수 있음.
- 클라우드에서 비디오 워크플로를 설정할 수 있는 한 가지 방법은 CloudFront를 AWS Media Services와 함께 사용하는 것임.
- CloudFront가 Video streaming을 지원하는게 아님. 그냥 CloudFront에서 Video Streaming 할 수 있다는 것임. 왜냐면 요즘 Video Streaming은 잘게 나눠진 정적 파일들을 http을 통해 제공함. 물론 일반 Web 서버에서도 Video streaming을 할 수 있음.
- CloudFront에 http/https 말고 Streaming 전용 프로토콜(예:RTMP)을 지원하는 것은 아님. 
- 요즘 일반적으로 사용하는 Video streaming 포맷인 MPEG DASH, Apple HLS, Microsoft Smooth Streaming, CMAF 등은 몇초 단위의 작은 연속된 파일들의 그룹으로 구성됨. 모두 정적 파일임. http를 통해 file download 되는 방식으로 아무 web서버에서도 서비스 가능함. 
- 물론 mp4 파일을 올려놓고 streaming 서비스를 할 수는 없음. AWS Media Services가 필요함.
- AWS Media Services 역할은 일반 mp4 파일이나 카메라로부터 streaming 되는 video data를 web서버(CloudFront도 web서버임)에 의해 streaming 서비스할 수 있는 DASH나 HLS 포맷으로 convert 해주는 역할임(ffmpeg으로도 다됨)
- 즉, CloudFront + Media Services를 사용했을 때 저희에게 익숙한 Video Streaming Sass가 됨.

<br/>

### DynamoDB vs Amazon Aurora Global DB

- 둘다 SQL 사용 가능. 그러나 DynamoDB는 ACID 보장 못함.
- Aurora의 경우 SQL 사용 가능하며, 다른 지역에 쉽게 복제함으로 고가용성을 보장하고, 데이터 저장소로 이용되며, ACID를 준수하며, MySQL보다 5배 빠르다.
- DynamoDB global tables의 경우 NoSQL이며, Not ACID이다.

<br/>

### AWS Global Accelerator

- **Amazon Web Service의 글로벌 네트워크 인프라를 사용하여 사용자 트래픽의 성능을 최대 60% 개선하는 네트워킹 서비스**임.
- 인터넷이 혼잡한 경우 AWS Global Accelerator는 경로를 최적화하여 패킷 손실, 지터 및 대기 시간을 일관적으로 낮게 유지함.
- **글로벌 사용자에게 제공**하는 애플리케이션의 가용성과 성능을 향상하는 데 도움이 되는 네트워킹 서비스.
- **고정 IP 주소를 통해 고정된 진입점을 제공**하고, 서로 다른 AWS 리전 및 가용 영역별로 특정 IP 주소를 관리하는 복잡성을 없앰.
- 애플리케이션 상태, 사용자의 위치 및 고객이 구성하는 정책의 변경에 즉각적으로 대응하여 항상 성능에 기반한 최적의 엔드포인트로 사용자 트래픽을 라우팅함.
- 속도 비교 도구를 사용하여 사용자 위치에서 성능 혜택을 테스트할 수 있음. 다른 AWS 서비스와 마찬가지로 AWS Global Accelerator는 장기 약정 또는 최소 요금이 필요 없고 사용량에 따라 비용을 지불하는 셀프 서비스.
- AWS Global Accelerator와 Amazon CloudFront는 **AWS 글로벌 네트워크와 전 세계의 엣지 로케이션을 사용하는 별도의 서비스**임. CloudFront는 캐시 가능한 콘텐츠(예: 이미지 및 비디오)와 동적 콘텐츠(예: API 가속 및 동적 사이트 제공)의 성능을 모두 향상함. Global Accelerator는 엣지에서 패킷을 하나 이상의 AWS 리전에서 실행되는 애플리케이션으로 프록시하여 TCP 또는 UDP를 통해 광범위한 애플리케이션의 성능을 향상시킴. Global Accelerator는 **게임(UDP), IoT(MQTT) 또는 VoIP(Voice over IP)와 같은 비 HTTP 사용 사례**와 **특히 고정 IP 주소** 또는 **결정적이고 빠른 지역 장애 조치가 필요한 HTTP 사용 사례**에 **적합함**.
- **CloudFront는 HTTP 프로토콜을 처리하도록 설계된 반면, Global Accelerator는 게임(UDP, TCP), IoT(MQTT) 또는 VoIP와 같은 non-HTTP Use Cases**와 
특히 **정적 IP 주소** 또는 **신속한 Reginal Failover가 필요한 HTTP Use Cases에도 적합함**.
- AWS Global Accelerator 는 Caching 도구가 아니라 balancing 도구임. 
- endpoint에 health check 할 서비스들을 연결하고 상태 check하면서 요청을 분기하는 기능임.  **Global Accelerator의 endpoint가 될 수 있는 서비스는 ALB, NLB, EC2 등이 있음**. RTMP는 굉장히 긴~~~ stateful 한 서비스임. 중간에 서버 바뀌면 안됨. ALB, NLB, Global Accelerator의 balancing은 stateless 요청에 특화되어 있음.
- Edge Location를 사용하여 대기 시간(latency)를 단축하고 AWS N/W으로 빠르게 전환함.
- 지연 시간 기반 라우팅 제공(R53 지연 시간 라우팅이 내장됨)
- Cross Region LB로 작동함(cf. Load Balancer는 Single Region에서 AZ간 균형을 조정함)

<br/>

### SNS vs SQS

- SNS → Lambda도 가능은 함. SNS는 pub-sub 방식인데 이는 SNS가 subscriber(Lambda)에게 message를 Push하는 방식임. 만약 subscriber가 message를 못받으면 message lose가 발생함. 특히 Lambda는 EC2 내의 application처럼 늘 활성화되어 있는 것이 아니라 call 받고 활성화되는 것이라 warm-up 으로 활성화 단계에서 지연이 발생하곤 함. 그래서 SNS -> Lambda 방식은 쓰면 안좋음
- SNS → SQS → Lambda 방식을 많이 쓰는 이유는 SQS는 SNS와 달리 produce consume 방식, 즉, SQS가 message를 Lambda(consumer)에게 push하는 것이 아니라 Lambda가 SQS의 queue를 polling해서 가져가는 방식임. Lambda가 상황이 될 때 하나씩 꺼내가는 것임.

- SNS와 SQS의 조합
    - SNS는 SQS가 못하는 걸 합니다. 메세지를 필터링,해석 해서 여러 subscriber(메세지 받을 놈)에게 보낼 수 있습니다. 즉, SQS는 application type별로 여러개의 queue를 만들고 SNS는 메세지를 해석해서 알맞는 queue에 메세지를 push 해 주는거죠.  
    - 그럼 SNS에게 직접 Application에 보내면 더 좋을 것 같죠.
    - SNS는 real-time 을 위해 publish subscriber 방식을 따릅니다. Application이 listner열어서 늘 message 받을 준비하고 있어야 하죠. 놓치면 data lose 발생할 수 있습니다. SQS를 produce consume 방식입니다. 메세지를 queue에 꽤 오래 보관하고 consumer가 알아서 받아가는 방식입니다. 
    - 그래서 이런 류의 문제는 항상  AWS Service -> SNS -> SQS -> application   이런 구조인 것입니다.

<br/>

### Placement group

- **Cluster**
    - cluster: AZ 안에 instance들을 근접하게 패킹한다.
    - 짧은 네트워크 지연 시간
    - 높은 네트워크 처리량
    - packs instances close together inside an Availability Zone. This strategy enables workloads to archieve the low-latency network performance necessary for tightly-coupled node-to-node communication that is typical of HPC applications.
- **Partition**
    - partition: instance를 논리적 파티션에 분산하여 한 파티션에 있는 인스턴스 그룹이 다른 파티션 인스턴스 그룹과 HW를 공유할 수 없다.
    - 하둡, Cassandra, Kafka 등에 필요
    - Spreads your instances across logical partitions such that groups of instances in one partition do not share the underlying hardware with groups of instances in different partitions. This strategy is typically used by large distributed and replicated workloads, such as Hadoop, Cassandra, and Kafka.
- **Spread**
    - 분산: 소규모 인스턴스그룹을 다른 HW로 분산하여 상호관련 오류를 낮춘다.
    - strictly places a small group of instances across distinct uderlying hardware to reduce correlated failures.
> https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/placement-groups.html

<br/>

### VPC Endpoint

- VPC 내부 인스턴스와 VPC 외부 S3 간에 **인터넷을 경유하지 않고, AWS 내부 네트워크를 통해 통신할 수 있도록 함으로써 비용을 절감함**.
- VPC Endpoint란 **VPC 내부에서 VPC 외부로 접속하기 위한 연결점을 제공하는 서비스**로 두 가지가 있음.
    - 인터페이스 엔드포인트
        - AWS 리소스 및 타사 서비스로 연결할 때 사용하며, **AWS PrivateLink로 구현**함.
        - 그 외 모든 AWS 리소스(유료 서비스) 지원되는 서비스로 향하는 트래픽의 진입점 역할을 하는 프라이빗 IP 주소가 할당된 탄력적인 네트워크 인터페이스
    - 게이트웨이 엔드포인트
        - VPC에 존재하지 않는 **S3, Dynamo DB를 연결**할 때 사용함.
        - 무료임! 
        - Gateway VPC endpoint will provide a secure privateLINK that allows access to AWS resources. Replace the NAT gateway with a gateway VPC endpoint
- VPC endpoints는 AWS의 많은 서비스들을 VPC에서 인터넷을 경유하지 않고 안정적이고 보안이 보장된 AWS 망을 태워 서비스하는 개념임. **NAT or Internet Gateway를 거칠때보다 비용이 저렴**하기 때문에 AWS 서비스들은 endpoint를 통해서 서비스 받게 하는게 좋음.
- Endpoint 중 기본으로는 interface(EC2에 한정)를 쓰고 S3와 DynamoDB만 Gateway(서브넷 단위로 한정)를 쓸 수 있음. Interface는 ENI를 타 VPC의 ELB에 연결하는 것만으로 Endpoint가 형성되며 이를 privatelink라고 함.

<br/>

### AWS PirvateLink

- AWS PirvateLink는 퍼블릭 인터넷에 트래픽을 노출하지 않고도 VPC, AWS 서비스 및 온프레미스 네트워크 간에 안전한 비공개 연결을 제공함. AWS PrivateLink를 사용하면 여러 계정과 VPC에 걸쳐 손쉽게 서비스에 연결하여 네트워크 아키텍처를 상당히 간소화할 수 있음.

<br/>

### S3 스토리지 클래스
- S3 Standard > S3 Standard IA > S3 One Zone IA > Amazon Glacier, Deep Archive(사용량에 따른 비용 및 가용성 고려 필요)
- Amazon S3 인텔리전트 티어링: 스토리지의 두 엑세스 티어 사이에서 자동으로 객체 이동

<br/>

### 완전 관리형 서비스

- Dynamo DB, Aurora, Lambda, Fargate, API Gateway, SQS, SNS, Step Functions, Kinesis, Redshift 등
- API Gateway
    - 완전 관리형 API 프론트엔드
    - 인증, 사용률 조정
- SQS
    - 완전 관리형 메시지 큐 - 1:1, 폴링
    - 가시성 제한시간, 배달하지 못한 편지 대기열
    - 짧은 폴링 vs 긴 폴링
- SNS
    - 완전 관리형 Pub/Sub - 1:N, 푸시
    - 구독자: 이메일, 문자, Lambda, SQS
- Kinesis
    - 저장 Stream
    - 자동 적재 Fire hose
    - 실시간 분석 Analytics
    - 영상분석 Video Stream
- Step Functions
    - 워크플로 관리
- Dynamo DB
    - 서버리스, 키밸류(+문서) NoSQL
    - 리전간 복제: DynamoDB 글로벌 테이블
- Aurora
    - MySQL 호환 / PostgresQL 호환 고성능 관계형 데이터베이스
    - 3AZ 6개 데이터 복제본 -> 최대 15 read replica
- Lambda
    - 서버리스 컴퓨팅
    - 최대 15분간 코드 실행
- Redshift
    - 완전 관리형 데이터웨어하우스

<br/>

### Amazon FSx for Lustre

- 1밀리초 미만의 대기 시간, 최대 수백 GB/초의 처리량, 수백만 IOPS를 제공하는 공유 스토리지
- 3rd party file system을 FSx라고 하며, Windows FSx와 Linux Cluster(=Lustre)를 위한 FSx가 있음.
- 같은 이름이지만 Windows FSx는 Windows workload의 공용파일시스템 처리를 위해 SMB, AD 등을 지원하는 특징으로 쓰임
- Lustre FSx는 Linux workload의 고성능 지원하기 위한 파일시스템으로 활용
- 주의할 점은 fargate에는 Lustre 미지원함.

<br/>

### AWS Step Function vs AWS Batch

- AWS Batch란?
    - 모든 규모에서 완벽하게 관리되는 일괄 처리
    - 개발자, 과학자 및 엔지니어가 AWS에서 수십만 개의 배치 컴퓨팅 작업을 쉽고 효율적으로 실행할 수 있도록 지원함.
    - 제출된 배치 작업의 볼륨 및 특정 리소스 요구사항에 따라 최적의 컴퓨팅 리소스 양과 유형(예: CPU 또는 메모리 최적화 인스턴스)을 동적으로 프로비저닝함.
- AWS Step Function 이란?
    - 시각적 워크플로우를 사용하여 분산된 응용프로그램을 구축함.
    - AWS Step Functions를 사용하면 시각적 워크플로우를 사용하여 분산 애플리케이션 및 마이크로 서비스의 구성요소를 쉽게 조정할 수 있음.
- 문제에서 Multi step Process를 하나하나 나열하며 강조한다면 Step Function을 사용해야 한다.(서버리스, 마이크로서비스, 오케스트레이션)

<br/>

### Amazon Athena

- 표준 SQL을 사용하여 Amazon S3에 있는 데이터를 직접 간편하게 분석할 수 있는 대화형 쿼리 서비스임.
- Athena는 서버리스 서비스이므로 설정하거나 관리할 인프라가 없으며 실행한 쿼리에 대해서만 비용을 지불하면 되며 자동으로 확장되어 쿼리를 병렬로 실행하여 대규모 데이터 집합과 복잡한 쿼리에서도 빠르게 결과를 얻을 수 있음.

<br/>

### OAI, Signed URL

- CloudFront에 OAI를 생성하여 배포와 연계하고, S3에서 OAI를 사용해 CloudFront가 파일에 엑세스할 수 있도록 구성하면, 그 이후로는 사용자가 S3 버킷에 직접 엑세스하지 못하고 CloudFront를 통해서만 파일에 엑세스할 수 있음.
- Signed URL은 CloudFront로 배포되는 파일의 사용을 제한하는 기능임. 특정 날짜가 지나면 파일을 받지 못하게 하거나 특정 날짜 이후에 파일을 받게 하거나, 특정 IP에서만 파일을 받을 수 있도록 할 수 있음.
- Athena는 Amazon S3에 저장된 비정형, 반정형 및 정형 데이터를 분석하는 데 도움을 줍니다. 예를 들면 CSV, JSON 또는 컬럼 방식 데이터 형식(예: Apache Parquet 및 Apache ORC)이 해당됩니다. Athena를 사용하면 데이터를 집계하거나 Athena로 로드할 필요 없이 ANSI SQL을 사용한 임의 쿼리를 실행할 수 있습니다.
- Athena는 S3에 저장된 로그 데이터를 분석하는 데 널리 사용되며 EMR 및 Redshift와 비교했을  때 인프라를 설정할 필요가 없으며 단순히 스캔한 데이터만 지불합니다.

<br/>

### AWS Config

- AWS Config는 AWS 계정에 있는 AWS 리소스의 구성을 자세히 보여줌.
    - 리소스 관리
    - 감사, 보안 및 규정 준수
    - 구성 변경 관리 및 문제 해결
    - 보안 분석
- 가장 적은 노력으로 Conpliance와 관련된 목표를 달성 → AWS Config

<br/>

### AMI

- Amazon Machine Image(AMI)는 다른 인스턴스를 시작하는 데 사용할 수 있는 인스턴스 보관 사본임.
- Amazon Elastic Block Store(EBS)가 지원하는 Amazon EC2 인스턴스가 있는 경우 사용자 지정 AMI를 사용하여 한 인스턴스의 여러 사본을 시작하거나 사용자 지정 AMI를 백업 솔루션으로 사용할 수 있음.
- 기본적으로 인스턴스에서 AMI를 생성하면 인스턴스에 연결된 각 EBS 볼륨의 스냅샷도 만들어짐.
- 즉, 연결된 여러 EBS 볼륨과 함께 AMI가 시작될 수 있으며 따라서 인스턴스의 구성과 해당 인스턴스에 연결된 모든 EBS 볼륨의 상태를 복제할 수 있음

<br/>

### 볼륨 게이트웨이

- 볼륨 게이트웨이는 온프레미스 애플리케이션에 클라우드에서 지원하는 iSCSI 블록 스토리지 볼륨을 제공함.
- 볼륨 게이트웨이는 Amazon S3에서 온프레미스 데이터를 자동으로 저장 및 관리하며, 캐시 모드 또는 저장 모드로 작동함.
- 볼륨 게이트웨이의 캐시 모드에서는 기본 데이터가 Amazon S3에 저장되는 반면, 자주 엑세스하는 데이터는 엑세스 지연 시간을 줄이게 하기 위해 로컬로 캐시에 보존함.

<br/>

### Amazon DynamoDB Accelerator(DAX)

- DAX는 Amazon DynamoDB를 위한 가용성이 뛰어난 완전 관리형인 메모리 Cache로서, 초당 요청 수가 몇 백만 개인 경우에도 몇 밀리초에서 몇 마이크로초까지 최대 10배의 성능을 제공함.

<br/>

### S3 vs S3 Glacier vs EC2 instance store

- S3 (simple storage service)는 정적 웹 콘텐츠와 미디어 저장 및 배포를 함(모든 파일 유형, 객체 수 무제한, 단인 파일 5TB까지, 전체 버킷 사이즈 무제한)
- S3 Glacier는 저렴한 비용으로 데이터를 백업, 검색, 복원함(S3보다 저렴함)
- EC2 instance store는 OS 부팅용만 사용하는 것이 아님. highest feasible I/O performance는 EC2 instance store로 구현할 수 있음

<br/>

### CloudFront vs ElasticCache vs EBS vs Storage Gateway

- CloudFront는 정적/동적 웹 콘텐츠, 비디오 스트림 및 API를 안전하게 대규모로 전송할 수 있는 콘텐츠 전송 네트워크(CDN) 서비스임.
- ElasticCache는 유연한 실시간 사용 사례를 지원하는 완전 관리형인 메모리 캐싱 서비스임.
- EBS는 EC2 Instance에 장착하여 사용할 수 있는 가상 저장 장치, 추가 HDD 같은 것임.
- Storage Gateway는 온프레미스를 클라우드 기반 스토리지와 연결하여, 온프레미스와 IT 환경과 AWS의 스토리지를 사용하는 서비스임.

<br/>

### QuickSight

- 언제든 어느 디바이스 에서나 자신의 데이터를 사용해 손쉽게 시각화를 구축함.

<br/>

### Amazon Route 53 라우팅 정책

- 레코드를 생성할 때 라우팅 정책을 선택하게 되는데, 이는 Amazon Route 53이 쿼리에 응답하는 방식을 결정함.
- 단순 라우팅 정책(Simple routing policy)는 도메인에 대해 특정 기능을 수행하는 하나의 리소스만 있는 경우(예: example.com 웹 사이트의 콘텐츠를 제공하는 웹 서버)에 사용함.
- 장애 조치 라우팅 정책(Failover routing policy)는 액티브-패시브 장애 조치를 구성하려는 경우에 사용함.
- 지리 위치 라우팅 정책(Geolocation routing policy)는 사용자의 위치에 기반하여 트래픽을 라우팅하려는 경우에 사용함.
- 지리 근접 라우팅 정책(Geoproximity routing policy)는 리소스의 위치를 기반으로 트래픽을 라우팅하고 필요에 따라 한 위치의 리소스에서 다른 위치의 리소스로 트래픽을 보내려는 경우에 사용함.
- 지연 시간 라우팅 정책(Latency routing policiy)는 여러 AWS 리전에 리소스가 있고 왕복 시간이 적은 최상의 지연 시간을 제공하는 리전으로 트래픽을 라우팅하려는 경우에 사용함.
- 다중 응답 라우팅 정책(Multivalue answer routing policy)는 Route 53이 DNS 쿼리에 무작위로 선택된 최대 8개의 정상 레코드로 응답하게 하려는 경우에 사용함.
- 가중치 기반 라우팅 정책(Weighted rouing policy)는 사용자가 지정하는 비율에 따라 여러 리소스로 트래픽을 라우팅하려는 경우에 사용함.

<br/>

### IAM

- IAM 을 통해 인증 및 인가 관련 서비스를 적용할 수 있음.
- IAM 에서 기억해야할 개념은 Policy, User, User Group, Role 임. 
- Policy는 User, User Group, Role 에 부여할 수 있고, Role 은 User 및 User Group 뿐만 아니라 AWS의 각종 서비스에들에 부여할 수 있음.

<br/>

### EC2 - S3 통신 (VPC Endpoint)

- S3는 VPC 외부 서비스로, VPC 내부에서 호스팅되는 EC2 인스턴스와 기본적으로 통신이 불가함.
- 통신이 가능하려면, 인터넷 게이트웨이가 연결된 퍼블릭 서브넷을 통해 인터넷을 경유한 통신을 하거나, VPC endpoint(Interface/Gateway)를 통한 AWS 네트워크 내부 통신이 가능함.
- 아마존 내부의 서비스를 인터넷을 통하지 않고 이용하기 위해서는 VPC Endpoint 가 필요함.

<br/>

### VPN vs VPC Peering vs TGW(Transit Gateway) vs Internet Gateway vs VPC Endpoint Interface

- AWS VPC 와 On-premise의 연결 → VPN or DX (Direct Connect)
    - VPN은 사용자의 intranet과 VPC간의 네트워크를 암호화하여 인터넷 위에서 구성하는 반면, DX는 인터넷을 포함하지 않고 전용 private 네트워크 연결을 사용함. 전송중에 데이터를 암호화하지 않음.
- AWS VPC와 AWS VPC의 1:1 연결 → VPC Peering
- 다수의 AWS VPC들과 On-premise 간의 연결 → TGW(Transit Gateway)
- AWS VPC 내부 인스턴스와 AWS VPC 외부 서비스의 연결 → Internet Gateway, NAT Gateway(인터넷 경유 필요) / VPC Endpoint Interface, VPC Endpoint Gateway (인터넷 경유 필요 없음)

<br/>

### Redis vs MEMCached

- Redis 
    - 자동 Failover 기능이 있는 Multi AZ
    - 읽기 크기를 조정하기 위한 읽기 복제본
    - 높은 가용성을 가지고 있음
    - AOF를 사용한 데이터 내구성 지속
    - 백업 및 복원 기능
- MEMCached
    - 파티션 분할을 위한 다중 노드 data(데이터 전송)
    - 고가용성(복제) 없음
    - 비지속적
    - 백업 및 복원 없음
    - 멀티 스레드 아키텍처

<br/>

### Spot Fleet 

- 스팟 인스턴스 + 온디맨드(예약가능)
- 스팟플릿은 사용자가 지정한 기준에 따라 시작되는 스팟 인스턴스의 집합이며 선택적으로 온디맨드 인스턴스 집합임. 
- 스팟플릿은 사용자의 요구 사항을 충족하는 스팟 용량 풀을 선택하고 플릿에 대한 목표 용량을 충족하는 스팟 인스턴스를 시작함. 기본적으로 스팟 집합은 플릿에서 스팟 인스턴스가 종료된 후 교체 인스턴스를 시작하여 목표 용량을 유지하도록 설정되어음. 
- 스팟 플릿을 인스턴스가 종료된 후에는 유지되지 않는 일회성 요청으로 제출할 수 있음. 스팟 플릿 요청에 온디맨드 인스턴스 요청을 포함할 수 있음.

<br/>

### S3 Intelligent-Tiering

- S3 Intelligent-Tiering 스토리지 클래스는 엑세스 패턴이 변경될 때 운영 오버헤드나 성능에 대한 영향없이 데이터를 가장 비용 효율적인 엑세스 계층으로 자동 이동하여 스토리지 비용을 최적화하도록 설계됨.

<br/>

### Cross-Region replication

- AWS 리전에서 S3 객체의 복사본을 더 쉽게 만들 수 있도록 오늘 교차 리전 복제를 시작함. 이 기능을 사용하여 지리적으로 다양한 복제 및 중요한 고객에 대한 인접성을 포함.
- 활성화되면 특정 S3 버킷에 업로드된 모든 객체가 다른 AWS 리전에 있는 지정된 대상 버킷에 자동으로 복제됨.
- 몇 분 안에 이 기능을 활성화하고 사용할 수 있음. S3의 기존 버전 관리 기능위에 구축되었음. 
- Cross region replication can be enabled to replicate data across multiple regions. Also, key requirement for cross-region replication is the bucket should have versioning enabled.

<br/>

### Transit gateway

- 대규모 vpc 피어링의 허브임. 최대 5000개 VPC와 온프레미스간 연결
- 연결이 4개 이하는 VPN으로 가능하지만, 5개 이상부턴 Transit gateway가 필요하다고 보면 됨.
- 대규모 VPC ↔ transit gateway ↔ pn ↔ onpremis
- 결국 transit gateway도 VPN을 활용함.
- AWS Transit Gateway를 사용하면 여러 VPC 간의 연결을 간소화할 수 있으며 단일 VPN 연결로 AWS Transit Gateway에 연결된 모든 VPC에 연결할 수도 있습니다. 
- 또한 AWS Transit Gateway를 사용하면 여러 VPN 터널에서 ECMP (동일 비용 다중 경로) 라우팅 지원을 통해 IPsec VPN 처리량을 확장할 수 있습니다. 단일 VPN 터널의 최대 처리량은 여전히 1.25Gbps입니다. 
- ECMP 사용 Transit Gateway에 대한 VPN 터널을 여러 개 설정하면 기본 제한인 1.25Gbps 이상으로 확장할 수 있습니다.

<br/>

### IOPS

- ~250 → sc1
- ~500 → st1
- ~16000 → gp2, gp3
- ~64000 → io1, io2

<br/>

### Gateway Endpoint

- S3 버킷에 저장된 민감한 데이터를 안전하면서 데이터 전송 비용 최적화된 액세스 방법은? 
- First, Gateway Endpoint used for S3 and DynamoDB.
- And  Gateway Endpoint allows data communication within the VPC not via internet
- So,   Gateway Endpoint for S3 has lower cost.

<br/>

### AWS Glue

- 데이터를 쉽게 탐색, 준비, 그리고 조합할 수 있도록 지원하는 서버리스 데이터 통합 서비스
- AWS Glue는 추출, 변환, 로드(ETL) 작업을 위한 서버리스 데이터 준비 서비스입니다. 이를 통해 데이터 엔지니어, 데이터 분석가, 데이터 사이언티스트 및 ETL 개발자가 데이터를 쉽게 추출, 정리, 보강, 정규화 및 로드할 수 있습니다. AWS Glue는 데이터 분석을 시작하는 데 걸리는 시간을 몇 달에서 몇 분으로 줄여줍니다. 시각적 및 코드 기반 인터페이스를 모두 제공하여 데이터를 쉽게 준비할 수 있습니다. 데이터 엔지니어와 ETL 개발자는 AWS Glue Studio를 사용하여 몇 번의 클릭만으로 ETL 작업을 생성, 실행 및 모니터링할 수 있습니다. 데이터 분석가와 데이터 사이언티스트는 AWS Glue DataBrew를 사용하여 코드를 작성하지 않고도 데이터를 시각적으로 정리하고 정규화할 수 있습니다.

<br/>

### AWS CloudTrail 데이터 이벤트 vs 관리 이벤트

- 데이터 이벤트: AWS 계정의 리소스나 리소스 내에서 수행 된 작업(예 : GetObject, DelelteObject, PutObject 등) -> CRUD로 이해
- 관리 이벤트: AWS 계정의 리소스에서 수행되는 관리 작업(예: Amazon s3 버킷 생성, AWS IAM 리소스 생성 및 관리 등) -> 관리 목적의 생성 작업으로 이해

<br/>

### Glacier 보관 시간

- glacier(Amazon S3 Glacier Flexible Retrieval): 1 min -12 hours
    - Expedite: 1 min- 5 min
    - Standard: 3 hours - 5 hours
    - Bulk: 5 hours - 12 hours
- deep archive: 12 hours - 48 hours
- Glacier Instant Retrieval: millisecond
- 12시간 넘어가면 Deep Archive, 수분~12시간 이면 Glacier(Flexible Retrieval), 밀리세컨드이면 Glacier(Instant Retrieval)이나 스탠다드

<br/>

### Kinesis vs Athena

- Ahtena는 실시간으로 분석하지 않는다.
- With Kinesis you run the analytics on the data stream in near real time.
- With Athena you analyze the data after it has been persisted (not near real time).
- Athena: run SQL queries on files in S3. Big Data tool for OLAP (Online Analytical Processing). 
    - Use case: You store gigabytes of data in S3 as files (for example parquet, but also JSON, CSV, etc.) and you want to run a query on it. You can have data with all e-store transactions and prepare a summary report at the end of the month.
- Kinesis Data Analytics: run SQL queries on a data stream. It may be a windowed query. 
    - Use case: With a stream of e-store transactions, get the transaction count or summary value over the last hour. The output can be produced every transaction or every minute, so the output is a new stream of (summary) values.

<br/>

### Transit Gateway

- Each AWS Transit Gateway is a network transit hub to interconnect VPCs in the same region, consolidating Amazon VPC routing configuration in one place. 
- This solution simplifies management of connections between an Amazon VPC and your networks over a private connection that can reduce network costs, increase bandwidth throughput, and provide a more consistent network experience than internet-based connections.

<br/>

### AWS Athena vs Redshift Spectrum

- AWS Athena와 Redshift Spectrum 중 어느 것을 선택해야 합니까?
- 결정에 영향을 줄 수 있는 큰 요소는 데이터가 저장되는 위치입니다. 이미 Redshift 를 사용하고 있다면 Spectrum을 사용하여 S3에서 데이터를 쿼리하는 것은 쉬운 일이 될 수 있습니다. 특히 복잡한 조인과 더 큰 집계가 포함된 초대형 데이터 세트에 대해 쿼리를 실행하는 경우에는 더욱 그렇습니다. Redshift Spectrum은 AWS에서 제공하는 풀링 리소스에 의존하지 않기 때문에 보다 일관된 쿼리 성능을 제공할 수도 있습니다. 물론 추가 노드가 필요하거나 컴퓨팅 성능을 높이기 위해 다른 클러스터를 가동해야 하는 경우에는 결국 더 많은 비용을 지출하게 될 수 있습니다. 반면에 데이터의 대부분이 Amazon S3에 있는 경우, 그리고 소수의 사용자에 대한 쿼리를 활성화하는 것이 목표이므로 Athena를 사용하는 것이 더 직관적이고 빠르고 비용 효율적입니다. BryteFlow가 S3에 동기화하는 실시간 데이터에 대한 실시간 대시보드용 시각화 소프트웨어와 함께 Athena를 사용하는 고객이 있습니다. 기본 테이블 스캔 및 소규모 집계를 포함하는 임시 쿼리를 실행하는 경우에는 더욱 그렇습니다.
- Redshift : Built for running complex queries that can involve multiple data sources
- Join Query : Redshift is faster than Athena due to the ability to easily handle traditional joins and relational workloads.
- Complicated analytical queries and joins means Redshift.
- Complex query means Redshift and processing can be done by EMR or AWS Glue ETL Job.

<br/>

### CloudFront 필드 레벨 암호화

- Amazon CloudFront를 사용하면 HTTPS를 통해 오리진 서버에 대한 종단 간 보안 연결을 적용할 수 있습니다. 필드 레벨 암호화는 추가 보안 레이어를 추가하여 시스템 처리 전체에서 특정 데이터를 보호하고 특정 애플리케이션만 이를 볼 수 있도록 합니다
- Field-level encryption allows you to enable your users to securely upload sensitive information to your web servers. 
- The sensitive information provided by your users is encrypted at the edge, close to the user, and remains encrypted throughout your entire application stack. 
- This encryption ensures that only applications that need the data - and have the credentials to decrypt it - are able to do so.

<br/>

### 미리 서명된 URL 사용

- 모든 객체 및 버킷은 기본적으로 프라이빗입니다. 그러나 미리 서명된 URL을 사용하여 선택적으로 객체를 공유하거나 고객/사용자가 AWS 보안 자격 증명이나 권한 없이 버킷에 객체를 업로드하는 것을 허용할 수 있습니다.

<br/>

### Amazon MQ

- Amazon MQ는 클라우드에서 메시지 브로커를 쉽게 설정하고 운영할 수 있도록 지원하는 Apache ActiveMQ 및 RabbitMQ용 관리형 메시지 브로커 서비스입니다. 
- ActiveMQ 및 RabbitMQ 콘솔과 메시징용 업계 표준 API 및 프로토콜(JMS, NMS, AMQP 1.0 및 0.9.1, STOMP, MQTT, WebSocket 등)에 직접 액세스할 수 있습니다. 

<br/>

### RAID 0

- RAID 0 어레이를 생성하면 단일 Amazon EBS 볼륨에서 프로비저닝할 때보다 파일 시스템의 성능이 더 향상됩니다. I/O 성능이 무엇보다 중요할 경우 RAID 0를 사용하세요. RAID 0를 사용할 경우 I/O가 스트라이프의 볼륨에 분산됩니다. 

<br/>

### NAT Gateway 요금

- 1.NAT 게이트웨이 시간당 요금
- 2.NAT 게이트웨이 데이터 처리 요금
- 3.데이터 전송 요금(EC2 -> NAT)
- 비싸다..인터넷을 경유하지 않고 S3에 접근할 수 있는 VPC 엔드포인트를 사용하자.

<br/>

### S3 aws:PrincipalOrgID

- For example, let’s say you have an Amazon S3 bucket policy and you want to restrict access to only principals from AWS accounts inside of your organization. To accomplish this, you can define the aws:PrincipalOrgID condition and set the value to your organization ID in the bucket policy. Your organization ID is what sets the access control on the S3 bucket. Additionally, when you use this condition, policy permissions apply when you add new accounts to this organization without requiring an update to the policy

<br/>

### DataSync, Storage Gateway, Backup, Transfer Family, Database Migration

- DataSync: 파일시스템간 데이터 동기화 (온프레미스-클라우드, 클라우드-클라우드, 온프레미스-온프레미스는 X)
- Storage Gateway: 온프레미스의 Application이 클라우드의 스토리지를 활용할수 있음
- Backup: 클라우드의 스토리지 백업수행.
- Transfer Family: 클라우드의 스토리지를 파일서버로 사용 (SFTP, FTP)
- Database Migration Service: 동일기종 및 이기종 데이터베이스간 Migration (온프레미스-클라우드, 클라우드-클라우드, 온프레미스-온프레미스는 X)

<br/>

### Fargate

- AWS Fargate는 별도로 인스턴스를 생성 관리하지 않고, 완전한 매니지드 서비스의 형태로 도커 컨테이너를 실행시킬 수 있는 아마존의 서비리스 컨테이너 상품이다. Docker 이미지가 리파지터리에 푸시되어 있다면, 클러스터 → 작업 정의 → 서비스의 순서로 생성하여 완전히 24시간 서비스 가능한 애플리케이션을 기동할 수 있다.
- 1) By default, Fargate tasks are spread across Availability Zones. With all other tasks, default task placement strategies depend on whether you are running tasks manually or within a service.
- 2) Fargate ensures Availability Zone spread while removing the complexity of managing EC2 infrastructure and works to ensure that Tasks in a Replica Service are balanced across Availability Zones. For RunTask launches with a Fargate launch type Fargate will look to spread Task placement across all available Availability Zones ensuring even distribution of the Task Definition Family that the Task belongs to.

<br/>

### Route53 Geoproximity routing policy

- Geoproximity routing policy의 "redirect traffic from one region's resources to another" 기능은 한 region에 특정 S3 bucket에 요청이 많아 HDD 바늘이 너무 바쁘게 움직이고 있으면
user 입장에서는 먼 region임에도 불구하고 HDD 바늘이 쉬고 있는 region의 동일한 bucket으로 redirect 해준다는 의미인가봐요.

<br/>

### Amazon Timestream, Neptune

- Amazon Timestream is a fast, scalable, and serverless time series database service for IoT 
- Neptune is a managed(not serverless) database for 'GRAPHS'.

<br/>

### Lambda@Edge

- Amazon CloudFront의 기능 중 하나로서 애플리케이션의 사용자에게 더 가까운 위치에서 코드를 실행하여 성능을 개선하고 지연 시간을 단축할 수 있게 해 줍니다. Lambda@Edge를 사용하면 전 세계 여러 위치에 있는 인프라를 프로비저닝하거나 관리하지 않아도 됩니다. 

<br/>

### 통신 요금

- 동일 AWS 리전 내 여러 가용 영역에 걸쳐 Amazon EC2, Amazon RDS, Amazon Redshift, Amazon DynamoDB Accelerator(DAX), Amazon ElastiCache 인스턴스, 탄력적 네트워크 인터페이스 또는 VPC 피어링 연결에서 ‘송신’ 및 ‘수신’되는 데이터는 각 방향에 대해 GB당 0.01 USD가 부과됩니다.
- 동일 가용 영역에서 Amazon EC2, Amazon RDS, Amazon Redshift, Amazon ElastiCache 인스턴스 및 Elastic Network Interface 간에 전송되는 데이터는 무료입니다.
- 동일 AWS 리전에서 Amazon S3, Amazon EBS direct API*, Amazon Glacier, Amazon DynamoDB, Amazon SES, Amazon SQS, Amazon Kinesis, Amazon ECR, Amazon SNS 또는 Amazon SimpleDB 및 Amazon EC2 인스턴스 간에 직접적으로 전송되는 데이터(엔드포인트 참조)는 무료입니다.
- EC2, RDS 등은 동일 리전 내라도 AZ 간 전송 시 유료
- S3는 동일 리전 내에서는 데이터 전송 시 무료

<br/>

### AWS Elastic Beanstalk

- 개발자가 손쉽게 AWS 클라우드에서 애플리케이션을 신속하게 배포하고 관리할 수 있음.
- 개발자가 애플리케이션을 업로드하기만 하면 Elastic Beanstalk가 자동으로 용량 프로비저닝, 부하 분산, Auto-Scaling, 애플리케이션 상태 모니터링 등의 배포 세부 정보를 처리함.

<br/>

### AWS Shield Standard vs AWS Shield Advanced

- AWS Shield Standard는 L3/L4 공격으로부터 보호합니다. (무료 서비스)
- AWS Shield Advanced는 L3/L4 +L7에서 보호합니다.
    - 프리미엄 가격이 책정되며 전담 DDoS 대응 팀에 연중무휴 24시간 액세스할 수 있습니다.
    - DDoS(분산 서비스 거부) 공격으로부터 보호합니다.
    - EC2, Cloudfront, Global Accelerator, Route 53, ELB에 적용할 수 있습니다.

<br/>

### AWS Cost Explorer

- 시간에 따른 AWS 비용과 사용량을 시각화, 이해 및 관리할 수 있는 손쉬운 인터페이스를 제공합니다.
- 비용 및 사용량 데이터를 분석하는 사용자 지정 보고서를 작성하여 신속하게 시작합니다. 
- 데이터를 높은 수준으로 분석(예: 모든 계정의 총 비용 및 사용량)하거나 비용 및 사용량 데이터를 자세히 분석하여 추세를 식별하고 비용 동인을 파악하고 이상을 탐지합니다
- 최대 지난 12개월간의 데이터를 보고, 이후 12개월 동안 지출할 것으로 예상되는 금액을 예측하며, 구매할 예약 인스턴스에 대한 추천을 받을 수 있습니다. 

<br/>

### AWS Budgets (예산 예측~~~)
- 유동적인 예산 및 예측 기능을 사용해 계획 및 비용 제어 과정 개선
- 기업과 조직은 클라우드 비용을 계획하고 예상해야 합니다. 하지만 클라우드 환경은 빠르게 바뀌고 있으므로 사용량의 변화에 따라 예측 프로세스와 도구도 적절하게 조정해야 합니다. 
- AWS 예산 사용 시에는 사용자 지정 예산을 설정할 수 있으며, 시간별 비용/사용량을 지속적으로 파악하여 비용이나 사용량이 임계값을 초과하면 신속하게 대응할 수 있습니다.
- AWS 예산에서는 사용자 지정 예산을 설정하여 난이도가 각기 다른 여러 사용 사례의 비용과 사용량을 추적할 수 있습니다

<br/>

### S3 Object Lock

- 파일들을 write-once-read-many (WORM)방식으로 관리할 때 사용함.
- Versioning 옵션은 필수.

<br/>

### Lambda step function

- Please notice Lambda step function is not just Lambda, it is Lambda functions in parallel.

<br/>

### AWS Lightsail

- 가상 프라이빗 서버(VPS) 공급자로, Lightsail은 개발자에게 클라우드에서 웹사이트와 웹 애플리케이션을 배포하고 관리할 수 있는 컴퓨팅, 스토리지 및 네트워킹 용량 및 기능을 제공합니다. 
- Lightsail에는 프로젝트를 빠르게 시작하는 데 필요한 모든 것(가상 머신, 컨테이너, 데이터베이스, CDN, 로드 밸런서, DNS 관리 등)이 포함되어 있습니다.

<br/>

### Direct Connect Location

- AWS에서는 각 리전 마다 한 개 이상의 AWS Direct Connect Location(이하, DX Location)을 지정하여 각 AZ에 있는 자원들을 빠른 네트워크 환경에서 연결할 수 있습니다. 
- DX Location은 망 중립성을 제공하는 로컬 데이터 센터 사업자 중 AWS에서 지정하는 데이터 센터 상면 공급 사업자입니다. 해당 사업자의 상면에 AWS에서 네트워크 장비들을 설치하고, 
백엔드로 AWS 모든 가용 영역(AZ)과 고속 전용 회선을 통해 연결해 놓은 곳을 의미합니다.
- 좀 더 쉽게 말씀 드리면, AWS 리전 내 만들어진 모든 클라우드 자원과 단일 회선 연동을 통해 연결될수 있도록 해 주는 브로커 역할을 수행합니다. 전 세계에 리전별로 다수의 AWS DX Location이 운영되고 있습니다.
- AWS Direct Connect 서비스를 구성하기 위해서는 몇 가지 단계를 거쳐야 합니다. 첫 번째 단계는 전용 회선을 여러분의 데이터 센터에서 DX Location까지 연결 하는 것이고, 그 다음에는 AWS 관리 콘솔에서 연결 설정을 수행하는 것입니다.

<br/>

### Amazon Macie

- 전관리형 데이터 보안 및 데이터 프라이버시 서비스로, 기계 학습 및 패턴 일치를 활용하여 AWS에서 민감한 데이터를 검색하고 보호합니다.
 
<br/>

### Amazon GuardDuty
 
- AWS 계정, 워크로드, S3에 저장된 데이터를 지속적으로 모니터링하고 보호할 할 수 있는 위협 탐지 서비스를 제공합니다.
- GuardDuty는 AWS CloudTrail Events, VPC Flow Log 및 도메인 이름 시스템(DNS) 로그에 있는 계정 및 네트워크 활동에서 지속적으로 생성되는 메타데이터 스트림을 분석합니다. 
- 또한 GuardDuty는 알려진 악의적 IP 주소, 이상 항목 탐지, 기계 학습(ML)과 같은 통합 위협 인텔리전스를 사용하여 위협을 보다 정확하게 식별합니다. 

<br/>

### Amazon Inspector
 
- Amazon Elastic Compute Cloud(EC2) 및 컨테이너 워크로드에서 소프트웨어 취약성과 의도하지 않은 네트워크 노출을 지속적으로 스캔하는 자동화된 취약성 관리 서비스입니다.

<br/>

### Amazon Inspector vs Amazon GuardDuty

- Amazon Inspector는 소프트웨어 취약성 및 의도하지 않은 네트워크 노출에 대해 AWS 워크로드를 지속적으로 스캔하는 자동화된 취약성 관리 서비스입니다.
    - 신속하게 취약성 발견
    - 패치 수정 우선순위 지정 (소프트웨어 패치, EC2)
    - 규정 준수 요구 사항 충족
    - 더 빠르게 제로 데이 취약성 식별
    - Amazon EC2 및 ECR 모두에 대한 취약성 관리 솔루션을 하나의 완전관리형 서비스
    - 클릭 한 번으로 AWS 워크로드에서 소프트웨어 취약성과 의도하지 않은 네트워크 노출을 즉시 발견
- Amazon GuardDuty는 AWS 계정 및 워크로드에서 악의적 활동을 모니터링하고 상세한 보안 결과를 제공하여 가시성 및 해결을 촉진하는 위협 탐지 서비스입니다.
    - 무단 활동 차단
    - 지속적인 모니터링 및 분석 지원
    - 포렌식 간소화
    - Amazon Simple Storage Service(S3) 내 비정상적인 데이터 액세스, 악의적인 것으로 알려진 IP 주소에서의 API 호출 등으로부터 계정 및 데이터를 보호합니다.

<br/>

### AWS Shield, AWS WAF, Amazon Inspector, Amazon GuardDuty

- AWS Shield  : 디도스(DDoS) 보호 서비스
- AWS WAF : 방화벽
- Amazon Inspector : 지속적인 내부 취약성 관리
- Amazon GuardDuty : 외부 침입으로부터 AWS 계정을 보호
- → Inspector 는 EC2만을 위한 것 같고, GuardDuty는 전체 환경을 위한 것 같음

<br/>

### Amazon Aurora Serverless

- Amazon Aurora Serverless는 Amazon Aurora의 온디맨드 Auto Scaling 구성입니다. 애플리케이션 요구 사항을 기반으로 자동으로 시작 및 종료하고 용량을 확장 또는 축소합니다. Aurora Serverless를 사용하면 데이터베이스 용량을 관리하지 않고도 클라우드에서 데이터베이스를 실행할 수 있습니다.
- 데이터베이스 용량을 수동으로 관리하면 시간이 오래 걸리고 데이터베이스 리소스 사용이 비효율적이 될 수 있습니다. Aurora Serverless를 사용하면 간단하게 데이터베이스 엔드포인트를 생성하고 선택적으로 원하는 데이터베이스 용량 범위를 지정하며 애플리케이션을 연결할 수 있습니다. 데이터베이스가 활성 상태일 때 사용하는 데이터베이스 용량을 초당 요금으로 지불하고 Amazon RDS 관리 콘솔에서 클릭 몇 번으로 표준 및 서버리스 구성 간에 마이그레이션할 수 있습니다.

<br/>

### 인스턴스 프로파일 (instance profile)

- [AMS] 인스턴스 프로파일은 인스턴스가 시작될 때 EC2 인스턴스에 역할 정보를 전달하는 데 사용할 수 있는 IAM 역할의 컨테이너입니다.
- 우선 DynamoDB 테이블에 대한 액세스를 허용하는 적절한 정책으로 IAM Role을 생성함. 이어 IAM Role을 EC2 인스턴스에 할당하기 위해 Instance Profile을 생성. IAM Role을 인스턴스에 연결하는 경우 Instance Profile 이름 목록을 기준으로 역할을 선택

<br/>

### Redshift Spectrum

- Amazon S3에 있는 엑사바이트 규모의 데이터에 대해 쿼리를 수행
- Redshift Spectrum 쿼리는 대량 병렬 처리를 채택해 큰 데이터 집합에 대해 매우 빠르게 실행

<br/>

### AWS Site-to-Site VPN vs AWS Client VPN

-  AWS Site-to-Site VPN enables you to securely connect your on-premises network or branch office site to your Amazon Virtual Private Cloud (Amazon VPC). 
- AWS Client VPN enables you to securely connect users to AWS or on-premises networks.
- client VPN은 사용자와 AWS 또는 사용자와 on-premise 연결
- AWS site-to-site VPN : on-premise와 VPC 연결

<br/>

### Amazon SQS 임시대기열

- https://aws.amazon.com/blogs/compute/simple-two-way-messaging-using-the-amazon-sqs-temporary-queue-client/
- https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-temporary-queues.html

<br/>

### S3 수명주기 정책

- S3에서 글래시어로 이동하는 건 필수 보관일 기준이 없음. 1일 뒤에도 이동 가능. 
- S3에서 S3 IA 혹은 One Zone-IA 이동시에는 필수 보관 기준일 30일 있음.
- 객체를 S3 Standard 스토리지 클래스에서 S3 Standard-IA로 또는 S3 Standard-IA 스토리지 클래스에서 S3 One Zone-IA로 전환하기 전에 객체를 S3 Standard 스토리지 클래스에 30일 이상 보관해야 합니다. 예를 들어, 생성 후 1일이 지난 객체를 S3 Standard-IA 스토리지 클래스로 전환하도록 요구하는 수명 주기 규칙을 생성할 수 없습니다
- S3 Standard-IA 및 S3 One Zone-IA 스토리지 클래스의 스토리지 요금은 최소 30일을 기준으로 하고 있습니다.
- 최소 스토리지 기간은 S3 Glacier Flexible Retrieval 스토리지 클래스의 경우 90일, S3 Glacier Deep Archive의 경우 180일입니다. 삭제한 객체가 최소 스토리지 기간보다 오래 아카이브되는 경우 Amazon S3 Glacier에 아카이브된 데이터를 삭제해도 요금이 부과되지 않습니다. 최소 기간 내에 아카이브된 객체를 삭제하거나 덮어쓸 경우 Amazon S3은 비례 할당으로 계산된 조기 삭제 요금을 부과합니다. 

<br/>

### 정책, 역할, 유저 생성 과정

- create policy 
    - policy 에 "CloudFormation actions only" = "CloudFormation stack and launch stacks" permission 부여
- create role (using Dial IAM role)
    - 위의 policy를 role에 "attach"
- create user group
    - 위의 role을 user group에 "assume"
- create user
    - 위의 user group에 user를 "add"

<br/>

### AWS App Mesh

- 마이크로서비스간의 통신, 장애 서비스의 격리, 배포전략 도구 등으로 사용
- AWS App Mesh는 애플리케이션 수준의 네트워킹을 통해 서비스에서 여러 유형의 컴퓨팅 인프라와 원활하게 통신할 수 있도록 하는 서비스 메시입니다. App Mesh는 애플리케이션에 대한 엔드 투 엔드 가시성과 고가용성을 제공합니다.

<br/>

### Amazon S3 Standard-Infrequent Access(S3 Standard-IA)

- S3 Standard-IA는 자주 액세스하지 않지만 필요할 때 빠르게 액세스해야 하는 데이터에 적합합니다. S3 Standard-IA는 S3 Standard의 뛰어난 내구성, 높은 처리량 및 짧은 대기 시간을 저렴한 GB당 스토리지 요금과 GB당 검색 요금으로 제공합니다.

<br/>

### Amazon SES vs Amazon SNS

- Amazon SES는 이메일을 통해 커뮤니케이션을 전송해야 하는 애플리케이션을 위한 서비스입니다. 그리고 사용자 지정 이메일 헤더 필드와 여러 MIME 유형을 지원합니다.
반면에 Amazon Simple Notification Service(Amazon SNS)는 메시징 지향 애플리케이션입니다. 여기에서는 타이밍이 중요한 "푸시" 알림을 요청하고 수신하는 구독자가 여러 명으로, HTTP, Amazon SQS, 이메일 등의 전송 프로토콜을 직접 선택할 수 있습니다. Amazon SNS 알림의 본문은 UTF-8 스트링 8,192자로 제한되고, 멀티미디어 콘텐츠는 지원하지 않습니다.
- Amazon Simple Email Service(SES)는 개발자가 모든 애플리케이션 안에서 이메일을 보낼 수 있는 경제적이고, 유연하며, 확장 가능한 이메일 서비스입니다. Amazon SES를 빠르게 구성하여 트랜잭션, 마케팅 또는 대량 이메일 커뮤니케이션을 포함한 다수의 이메일 사용 사례를 지원할 수 있습니다.

<br/>

### Secret Manager

- Secrets Manager는 코드의 암호를 포함해 하드 코딩된 자격 증명을 Secrets Manager에서 프로그래밍 방식으로 보안 암호를 검색하도록 하는 API 호출로 바꿀 수 있습니다. 이렇게 하면 보안 암호가 코드에 더 이상 존재하지 않기 때문에 코드를 검사하는 누군가에 의해 보안 암호가 손상되지 않도록 방지할 수 있습니다. 또한 사용자가 지정한 일정에 따라 Secrets Manager가 자동으로 보안 암호를 교체하도록 구성할 수 있습니다. 따라서 단기 보안 암호로 장기 보안 암호를 교체할 수 있어 손상 위험이 크게 줄어듭니다.
- 애플리케이션, 서비스 및 IT 리소스에 대한 액세스를 보호하는 데 도움이 되는 보안 정보 관리 서비스
- 수명 주기 동안 데이터베이스 자격 증명, API 키 및 기타 보안 정보를 손쉽게 교체, 관리 및 검색
- 데이터베이스 자격 증명, 온프레미스 리소스 자격 증명, SaaS 애플리케이션 자격 증명, 타사 API 키 및 Secure Shell(SSH) 키와 같은 보안 정보를 관리할 수 있음.

<br/>

### Amazon EC2 Auto Scaling 대상 추적 조정 정책(Target tracking scaling policies)

- 조정 지표를 선택하고 목표값을 설정 가능함.
- CloudWatch 지표와 Target Value에 대해 이상적인 utilization 이나 throughput level을 설정해놓으면, EC2 Auto Scaling이 설정한 값에 맞추어 알아서 scale out / in을 진행해줌.


<br/>

### CNAME vs Alias (A record)

- CNAME : 호스트 이름이 다른 호스트 이름으로 라우팅 될 수 있다. 예를 들어, app.example.com 도메인이 test.anything.com으로 향할 수 있다.루트 도메인 이름이 아닌 경우에만 가능해서 example.com 앞에 뭔가가 붙어있어야만 한다. 
- Alias (A record) : 호스트 이름이 특정 AWS 리소스(LB, CloudFront 등)로 라우팅 될 수 있다. Alias record는 루트 및 비루트 도메인 모두 작동한다. example.com을 별칭 레코드를 사용하여 AWS 리소스로 향하도록 할 수 있다.
- CNAME is for the real DNS servers we all know and love. ALIAS is DNS but for AWS specifically. special record for AWS. 
- 핵심 도메인 이름 호스팅을 AWS로 바꾸었다고 했으므로, ALIAS를 사용해야하고 도메인 이름 참조하는 URL을 통해 엑세스 해야하므로 CloudFront 필요

<br/>

### AWS Certificate Manager(ACM)

- AWS 웹 사이트와 애플리케이션을 보호하는 퍼블릭 및 프라이빗 SSL/TLS X.509 인증서와 키를 만들고, 저장하고, 갱신하는 복잡성을 처리합니다. ACM에서 직접 발급하거나 서드 파티 인증서를 ACM 관리 시스템으로 가져오는 방법으로 통합 AWS 서비스에 대한 인증서를 제공할 수 있습니다.

<br/>

### SSL termination

- 평문을 encrypt해서 보내고(http -> https) https로 인입된 전문을 decrypt하여 평문화(https -> http)하는 역할을 말함.
- L7 load balancer 또는 revers proxy가 주로 하는 기능 중 하나임.
- AWS service 중에는 ALB나 API gateway가 SSL termination 역할을 할 수 있음. SSL termination은 당연히 SSL 인증서를 사용해야 하고 AWS Certificate Manager에 등록되어 있어야 함.

<br/>

### AWS Directory Service

- Managed Microsoft Active Directory in AWS
- AWS Directory Service는 다른 AWS 서비스에서 Microsoft Active Directory(AD)를 사용할 수 있는 몇 가지 방법을 제공함.

<br/>

### AWS Backup

- AWS 서비스 및 하이브리드 워크로드에서 데이터 보호를 중앙 집중화하고 자동화할 수 있습니다.  AWS Backup은 정책을 기반으로 대규모 데이터 보호를 간편하고 비용 효율적으로 수행할 수 있는 완전관리형 서비스입니다. 또한 AWS Backup은 데이터 보호에 대한 규정 준수 또는 비즈니스 정책을 지원하는 데 도움이 됩니다. 

<br/>

### Aurora Automated Backup

- RDS의 자동백업기능. 개별 DB를 백업하는 것이 아닌, DB인스턴스 전체를 백업함
- 매일매일 백업하고 기본 보존기간은 CLI로 생성시 1일, 콘솔로 생성시 7일, 최저 1~35일까지 가능. 그 이상의 기간을 사용하려면 AWS Backup 사용해야함
- 특정 시점으로 복원가능, 복원기간내로부터 최근 5분까지 특정시점을 지정하여 복원가능
- 사용자가 지정한 백업시간에 자동백업. 백업 중 스토리지 I/O 일시적 중단 가능.
- Multi-AZ사용시 Standby에서 백업 실시

<br/>

### 외부 전용 인터넷 게이트웨이

- 외부 전용 인터넷 게이트웨이는 IPv6 트래픽에만 사용됩니다
- https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/egress-only-internet-gateway.html

<br/>

### NAT 게이트웨이 핵심 포인트

- 항상 Public Subnet에 배치됩니다.
- AZ 장애가 발생하면 NAT 게이트웨이를 사용할 수 없게 되고 다른 가용 영역(AZ) 내의 리소스는 인터넷 액세스를 해제합니다. 무장애 아키텍처를 생성하려면 NAT 게이트웨이가 두 개 이상의 AZ(Availability Zone)에 구축
- IPV4 = NAT Gateway
- IPV6 = 외부 전용 인터넷 게이트웨이(Egress-only internet gateway)
- ip가 나왔다~~~ nlb 를 습관적으로 찾았으나 없다. 친구인 nat를 찾자

<br/>

### 대량 message 처리 및 여러 애플리케이션에 message를 분기하는 방법

- Kinesis Data Streams with multiple shards(partition key로 message분기) -> Application
- SNS -> SQS -> Application

<br/>

### EKS + S3 + DynamoDB 를 멀티리전으로 구성하려면,

- Deploy EKS, S3
- Cross Region Replication on S3
- Turn on DynamoDB Global table 
- Using Global Accelerator 
- Global Accelerator endpoint 에 EKS 의 특정 container(ingress pod등) 까지 지정이 가능한가? 찾아봤는데 아닌 것 같습니다. Global Accelerator endpoint 에는 ALB를 걸고 ALB의 endpoint에 EKS의 container들을 연결해야 합니다.

<br/>

### Amazon EFS

- Amazon EFS for Linux shared volume.(Linux 기반 공유 파일 저장소에 저장된 파일 액세스)
- AWS 컴퓨팅 시스템을 위한 공유 파일 시스템을 간편하고 빠르게 생성하고 구성한다. 프로비저닝, 배포, 패치 적용 또는 유지 관리가 필요하지 않음.

<br/>

### S3 Object Versioning

- Object Versioning은동일한 Amazon S3 버킷에 Object의 여러 변형을 유지하는 방법으로 Versioning은 의도하지 않은 사용자 작업 및 Application 오류로부터 모두 복구할 수 있는 기능을 제공함
- 즉, Object Versioning을 사용하여 Amazon S3 버킷에 저장된 모든 개체의 모든 버전을 보존, 검색 및 복원할 수 있습니다.
- versioning enable 상태에서 특정 content 삭제할 경우 latest version 은 삭제되고 이전 버전으로 복구하는 거라고 생각했는데 아니네요. delete 하는 경우 delete mark 처리하는 거네요. delete 이전의 상태로 복구가 되는 거네요.(git 처럼요)

<br/>

### 보안그룹(Security Group) vs ACL

- 보안그룹 : 인바운드 허용규칙 적용
- ACL : 안바운드, 아웃바안드 허용/차단규칙 적용
    - http 80, https 443 응답에 해당하는 아웃바운드 허용 포트 범위는 32768–65535

<br/>

### Bursting vs Provisioned

- EFS 의 대표적인 Throughput mode인 Bursting 과 Provisioned 의 큰 차이는 Bursting 을 표준 성능일 때는 credit을 모았다가 높은 성능을 낼때는 credit을 쓰는 방식이고(hybrid 자동차가 전기 충전했다가 전기쓰는 느낌) Provisioned는 필요한 성능치를 미리 설정하는 방식입니다.
- Bursting의 경우 정작 높은 성능을 내야할 때 credit이 없으면 표준 성능밖에 못낸다는 것입니다.
- "should be tuned for reading and writing at a fast rate of speed" 요구로 봤을 때 fast rate of speed 를 유지하려면 Provisioned가 맞는 것 같습니다.

<br/>

### Bation host

- https://velog.io/@nchime/Bastion-host

<br/>

### Kinesis Streams, Kinesis Data Firehose, Kinesis Data Analytics

- Kinesis streams can't store in Redshift. Redshift에 저장하는 애는 Lambda임.
- Redshift는 DW이고 조장소 이며, 분석 기능도 있는 듯.
- Kinesis streams can store in dynamo DB
- Kinesis streams는 버퍼처럼 동작하며 프로듀서가 Kinesis stream에 데이터를 전송하고 동시에 컨슈머가 데이터를 처리한다. 데이터를 저장하지 않음.
- Kinesis Data Firehose는 S3 및 Redshift와 같은 다른 Amazon 서비스로 스트리밍 데이터를 캡처하고 로드하는데 사용함. 스트림을 Elastic Map Reduce 및 Amazon Elasticsearch Service와 같은 데이터 처리 및 분석 도구에 로드할 수 있음. Firehose를 사용하여 S3와 Redshift에 동일한 데이터를 동시에 로드할 수 있음. Firehose는 초당 기가 바이트의 스트리밍 데이터로 확장할 수 있으며 데이터의 일괄 처리, 암호화 및 압축이 가능.
- Kinesis Data Analytics는 표준 SQL 질의로 실시간 데이터를 분석할 수 있음

<br/>

### bucket-owner-full-control

- AWS account A가 S3 bucket을 만들고, AWS account B가 그 bucket에 C라는 파일(S3 Object)을 upload 했다면 C파일은 B의 소유이고 B만 Fully control 한다. "bucket-owner-full-control"은 bucket 주인인 A가 C 포함 bucket의 모든 object들을 fully control 할 수 있게 함.

<br/>

### RPO vs RTO

- RPO : 복구 시점 목표
    - 손실된 데이터량을 시간으로 환산한 것
- RTO : 복구 시간 목표
    - 가동 중지 시간을 나타낸 것

<br/>

### CloudHSM

- HTTPS 연결 구축 시, 웹서버는 클라이언트와 핸드쉐이크를 진행한다. 이 프로세스의 한 부분으로서 서버는 암호 처리의 일부를 HSM에 넘긴다.
- 1) 클라이언트가 서버에 hello를 하면, 서버는 클라이언트에 서버 인증서와 함께 응답한다.
- 2) 클라이언트는 SSL/TLS 서버 인증서가 신뢰할만한 root 인증서에 의해 서명되었는지 확인하고, 서버 인증서로부터 공용키를 추출한다.
- 3) premaster secret key를 생성하여 서버의 공용키로 암호화하고, 이를 서버에 전달한다.
- 4) 클라이언트의 premaster secret key를 해독하기 위해 서버는 이를 HSM에 보낸다. HSM은 private key를 사용하여 premaster secret key를 해독하고, premaster secret key를 서버에 보낸다. 이제 클라이언트와 서버는 각각 premaster secret key와 hello 메시지로부터의 몇몇정보를 토대로 master secret key를 생성한다.
- 5) 핸드쉐이크 과정이 끝났다. 이제 세션이 유지되는 동안 서버와 클라이언트를 통하는 모든 메시지는 master secret key로 암호화되고 복호화된다.

> https://docs.aws.amazon.com/cloudhsm/latest/userguide/ssl-offload-overview.html

<br/>

### Scenarios for network interfaces

> https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/scenarios-enis.html

<br/>
