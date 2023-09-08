---
title: AppDomain 탐구 - .NET에서의 신비로운 섬 🏝️
subtitle: .NET 시리즈
readtime: 14 min
author: wookshin
tags: [dotnet]
comments: true
---

<br/>

# AppDomain 탐구 - .NET에서의 신비로운 섬 🏝️

안녕하세요, .NET 개발자 여러분! 

오늘은 .NET의 중심부에서 작동하는 신비한 섬, 바로 `AppDomain`에 대해 깊이 들어가볼 생각입니다. 

지금부터 여러분은 이 작은 섬에서 어떻게 여행을 즐길 수 있는지 알게 될 겁니다. 준비됐나요? 🚀

<br/>

## 1. AppDomain이란 무엇인가요? 🤔

쉽게 말해, `AppDomain`은 .NET 프로세스 내에서 코드를 실행하고 관리하는 작은 '섬'입니다. 

이 섬은 완전히 독립적인 세계를 형성하며, 각 섬은 나름의 법률과 규칙, 자원을 갖고 있습니다. 

즉, 어셈블리, 변수, 보안 설정 등이 각각의 `AppDomain` 내에서 격리됩니다.

<br/>

## 2. 격리되었다는 것은 무엇인가요? 🤔

"격리되었다"는 `AppDomain` 내에서 코드가 실행되는 동안 해당 코드가 다른 `AppDomain`의 리소스나 상태에 영향을 미치지 않는다는 것을 의미합니다. 

이것이 가능한 이유는 각 `AppDomain`이 독립적인 메모리 공간, 로딩된 어셈블리, 설정, 그리고 보안 규칙을 가지고 있기 때문입니다.

<br/>

#### 격리의 이점:

1. **보안**: 하나의 `AppDomain`에서 실행되는 코드가 다른 `AppDomain`의 리소스에 접근하는 것을 제한할 수 있습니다.
2. **안정성**: 한 `AppDomain`에서 문제가 발생하더라도 다른 `AppDomain`에는 영향을 미치지 않습니다.
3. **리소스 관리**: `AppDomain`을 언로드하면 그 안에서 사용되던 리소스를 효과적으로 해제할 수 있습니다.

<br/>

#### 격리의 예시:

웹 서버에서 여러 사용자의 코드를 동적으로 로드하고 실행하는 상황을 생각해보세요. 

각 사용자의 코드를 별도의 `AppDomain`에 로드하면, 한 사용자의 코드에서 문제가 발생해도 다른 사용자에게는 영향을 미치지 않습니다. 

또한, 보안을 강화하여 특정 사용자의 코드가 시스템에 무분별하게 접근하는 것을 제한할 수 있습니다.


<br/><br/>

## 3. AppDomain.CurrentDomain은 무엇인가요? 🤔

`AppDomain.CurrentDomain`은 현재 코드가 실행되고 있는 `AppDomain` 객체에 대한 참조를 반환합니다. 

대부분의 .NET 애플리케이션은 기본적으로 하나의 `AppDomain`에서 시작되므로, 따로 설정하지 않으면 `AppDomain.CurrentDomain`은 그 시작되는 `AppDomain`을 참조하게 됩니다.

예를 들어 현재 `AppDomain`의 정보와 어셈블리 목록을 출력하려면 다음과 같이 할 수 있습니다:

```csharp
// 현재 AppDomain의 정보 출력
Console.WriteLine($"Current AppDomain: {AppDomain.CurrentDomain.FriendlyName}");

// 현재 AppDomain에 로드된 어셈블리 목록 출력
Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();
foreach (Assembly assembly in assemblies)
{
    Console.WriteLine(assembly.FullName);
}
```

<br/><br/>

## 4. AppDomain으로 무엇을 할 수 있을까요? 🛠️

#### 4.1 어셈블리 로딩하기

`AppDomain.CurrentDomain.Load`를 사용하면 특정 어셈블리를 명시적으로 로드할 수 있습니다. 마치 섬에 특별한 손님을 초대하는 것과 같아요!

```csharp
Assembly loadedAssembly = AppDomain.CurrentDomain.Load("SpecialGuest");
```

<br/>

#### 4.2 로드된 어셈블리 확인하기

어떤 손님이 섬에 와 있는지 궁금하다면, `AppDomain.CurrentDomain.GetAssemblies`를 사용해 확인할 수 있습니다.

```csharp
Assembly[] currentGuests = AppDomain.CurrentDomain.GetAssemblies();
foreach (Assembly guest in currentGuests)
{
    Console.WriteLine(guest.FullName);
}
```

#### 4.3 새로운 섬(AppDomain) 만들기

새로운 섬을 창설하려면 어떻게 해야 할까요? `AppDomain.CreateDomain`을 사용하면 새로운 `AppDomain`을 생성할 수 있습니다.

```csharp
AppDomain newIsland = AppDomain.CreateDomain("NewIsland");
```

<br/>

#### 4.4 섬 간에 메시지 전달하기

섬 간에 메시지를 전달하려면 어떻게 해야 할까요? 이것도 가능합니다!

```csharp
newIsland.DoCallBack(() => Console.WriteLine("Hello from the New Island!"));
```

<br/><br/>

## 5. 활용 예제: 실생활에서 AppDomain 적용하기 🚀

#### 예제 1: 플러그인 시스템

```csharp
AppDomain pluginDomain = AppDomain.CreateDomain("PluginDomain");
pluginDomain.Load("MyPlugin");
```

<br/>

#### 예제 2: 격리된 테스트 환경

```csharp
AppDomain testDomain = AppDomain.CreateDomain("TestDomain");
testDomain.ExecuteAssembly("MyTestAssembly.dll");
```

<br/>

#### 예제 3: 리소스 정리

```csharp
AppDomain.Unload(unwantedDomain);
```

<br/><br/>

## 6. AppDomain 메시지 교환 방법

#### AppDomain 간의 관계

`AppDomain` 간의 관계를 시각화하면, 각각은 독립적인 '섬'처럼 생각할 수 있습니다. 

이 '섬들'은 같은 '대양' (프로세스) 내에 위치해 있지만, 각기 다른 자원과 규칙을 가지고 있습니다.

```
   +---------------+             +---------------+             +---------------+
   |  AppDomain 1  |-------------|  AppDomain 2  |-------------|  AppDomain 3  |
   |               |             |               |             |               |
   |  + Assembly A |             |  + Assembly B |             |  + Assembly C |
   |  + Assembly B |             |  + Assembly D |             |  + Assembly A |
   +---------------+             +---------------+             +---------------+
```

<br/>

#### 메시지 교환 방법

`AppDomain` 간에 직접적인 메시지 교환이 일반적으로는 어렵습니다. 그러나 .NET은 몇 가지 방법을 제공합니다.

##### 첫째, **Serialization**

객체를 직렬화하여 바이트 스트림으로 만든 다음, 그 스트림을 다른 `AppDomain`에 전달하여 역직렬화할 수 있습니다.

<br/>

##### 둘째, **MarshalByRefObject**

이 클래스를 상속받은 객체를 다른 `AppDomain`으로 전달할 수 있습니다. 이렇게 하면 원격 프로시를 통해 메시지를 교환할 수 있습니다.

#### MarshalByRefObject 사용 예시

```csharp
// MarshalByRefObject를 상속받는 클래스
public class Messenger : MarshalByRefObject
{
    public void SendMessage(string message)
    {
        Console.WriteLine($"Received message: {message}");
    }
}

// 메인 코드
class Program
{
    static void Main(string[] args)
    {
        // 새로운 AppDomain 생성
        AppDomain newDomain = AppDomain.CreateDomain("NewDomain");

        // Messenger 객체를 새로운 AppDomain에 생성
        Messenger messenger = (Messenger)newDomain.CreateInstanceAndUnwrap(
            typeof(Messenger).Assembly.FullName,
            typeof(Messenger).FullName);

        // 메시지 전송
        messenger.SendMessage("Hello from the default AppDomain!");
        
        // AppDomain 언로드
        AppDomain.Unload(newDomain);
    }
}
```

이 예시에서는 `MarshalByRefObject`를 상속받은 `Messenger` 클래스를 사용하여 메시지를 전송합니다. 이를 통해 다른 `AppDomain`에 있는 객체와 통신이 가능합니다.

이와 같이 `AppDomain`은 격리된 실행 공간을 제공하지만, 몇 가지 방법으로 이 공간을 넘어 다른 `AppDomain`과 통신할 수 있습니다.

<br/>

##### 셋째, AppDomain에서 Callback 사용하기

.NET에서는 `AppDomain.DoCallBack` 메서드를 통해 다른 `AppDomain`에서 코드를 실행할 수 있습니다. 

이 방법은 특히, 코드가 존재하는 `AppDomain`을 변경해야 할 때 유용합니다. 

`DoCallBack`은 해당 `AppDomain`의 컨텍스트에서 지정한 delegate를 실행합니다.

<br/>

#### Callback 코드 예시

아래 예시 코드는 새로운 `AppDomain`을 생성하고, `DoCallBack`을 사용하여 그 `AppDomain`에서 메시지를 출력합니다.

```csharp
// 메인 코드
class Program
{
    static void Main(string[] args)
    {
        // 새로운 AppDomain 생성
        AppDomain newIsland = AppDomain.CreateDomain("NewIsland");

        // DoCallBack을 이용하여 새로운 AppDomain에서 코드 실행
        newIsland.DoCallBack(() => Console.WriteLine("Hello from the New Island!"));

        // AppDomain 언로드
        AppDomain.Unload(newIsland);
    }
}
```

이 코드를 실행하면 "Hello from the New Island!"라는 메시지가 출력됩니다. 

이 메시지는 `newIsland`라는 이름의 새로운 `AppDomain`에서 실행되었습니다.

`DoCallBack` 메서드를 사용하면, 쉽게 다른 `AppDomain`에서 코드를 실행할 수 있습니다. 

이 기능은, 예를 들어, 다른 `AppDomain`에서 어떤 초기화 작업을 수행하거나 상태를 확인해야 할 때 유용하게 사용될 수 있습니다.

<br/><br/>

## 7. 결론: AppDomain, 작은 섬에서의 큰 여행 🏝️

오늘 여러분은 `AppDomain`이라는 작은 섬에서 어떻게 큰 여행을 즐길 수 있는지 배웠습니다. 

이런 신비한 섬들은 .NET의 세계를 더욱 풍요롭게 만들어 주며, 여러분의 코드도 마찬가지로 더욱 안정적이고 확장 가능하게 만들어 줄 것입니다.

다음 여행에서 뵙겠습니다, 여행자 여러분! 🚀🏝️👋

<br/><br/><br/><br/><br/>
