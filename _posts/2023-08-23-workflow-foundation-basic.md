---
title: 워크플로우 파운데이션(WF) 소개 - 단순하게 알아보기
subtitle: Workflow Foundation
readtime: 10 min
author: wookshin
tags: [dotnet]
comments: true
---

<br/>

# 워크플로우 파운데이션(Workflow Foundation - WF) 소개: 단순하게 알아보기

워크플로우 파운데이션 (WF)는 여러 작업을 자동화하고 관리할 수 있게 도와주는 도구입니다.  
간단하게 설명하자면, 일상에서의 '레시피'와 같은 것입니다.  
빵을 굽기 위해선 먼저 재료를 준비하고, 반죽을 만든 후, 오븐에 굽는 등의 단계가 있죠. WF는 이런 단계를 컴퓨터가 이해할 수 있도록 도와주는 프로그램입니다.

<br/>

## 1. 워크플로우(Workflow)란 무엇인가?

워크플로우는 일련의 작업이나 단계를 정해진 순서나 규칙에 따라 수행하는 것을 의미합니다.  
예를 들어, 휴가를 신청할 때 양식을 작성하고, 상사의 승인을 받고, 인사팀에 제출하는 등의 단계가 있을 것입니다.  
WF는 이러한 일련의 단계를 컴퓨터 프로그램에서 쉽게 만들고 관리할 수 있게 도와줍니다.

<br/><br/>

## 2. 기본 개념 쉽게 알아보기

1. **액티비티(Activity):** 이는 워크플로우의 각 단계를 나타냅니다. 예를 들어, '상사에게 메일 보내기'나 '데이터베이스에 정보 저장하기' 같은 것이 될 수 있습니다.  
2. **워크플로우 런타임:** 이는 워크플로우가 실제로 실행되는 '장소'입니다. 여기서 각 단계가 어떻게, 언제 실행될지를 관리합니다.  
3. **호스트 프로세스:** 이는 워크플로우를 실행시키는 주체, 즉 '오븐'과 같은 것입니다. 여기서 워크플로우가 실제로 작동하게 됩니다.

<br/><br/>

## 3. 간단한 코드 예시

<br/>

#### 3-1. Say Hello 만들기

이 코드는 "Hello, World!"라고 출력하는 간단한 액티비티입니다.

```csharp
using System.Activities;

namespace HelloWorld
{
    public class SayHello : CodeActivity
    {
        protected override void Execute(CodeActivityContext context)
        {
            Console.WriteLine("Hello, World!");
        }
    }
}
```

<br/>

WorkflowInvoker.Invoke 메서드를 사용하여 SayHello 액티비티를 실행시킵니다.

```csharp
using System.Activities;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            WorkflowInvoker.Invoke(new SayHello());
        }
    }
}
```

<br/>

#### 3-2. 입력을 받아 출력하기

이 코드는 입력을 받는 액티비티입니다.

```csharp
using System.Activities;

namespace HelloWorld
{
    public class GetUserInput : CodeActivity<string>
    {
        public InArgument<string> Question { get; set; }

        protected override string Execute(CodeActivityContext context)
        {
            Console.Write(Question.Get(context));
            return Console.ReadLine();
        }
    }
}
```

<br/>

사용자로부터 입력을 받아 "Hello, [입력받은 이름]"을 출력합니다.

```csharp
using System.Activities;
using System.Collections.Generic;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            IDictionary<string, object> inputs = new Dictionary<string, object>
            {
                { "Question", "What is your name?" }
            };

            IDictionary<string, object> outputs = WorkflowInvoker.Invoke(new GetUserInput(), inputs);

            Console.WriteLine($"Hello, {outputs["Result"]}");
        }
    }
}

```

<br/><br/>

## 4. InArgument의 활용 (액티비티에 값 넘기기)

보통은 IDictionary<string, object> 타입의 딕셔너리를 사용하여 액티비티에 값을 전달합니다.  
액티비티에선 InArgument를 사용하여 전달받은 값을 활용합니다.  
이 딕셔너리의 키는 액티비티에서 정의한 InArgument의 이름과 일치해야 하며, 값은 해당 InArgument가 기대하는 타입의 값을 가지고 있어야 합니다.

<br/>

예를 들어, 액티비티 클래스에서 다음과 같이 InArgument<string> 타입의 Question 변수를 정의했다면,

```csharp
public InArgument<string> Question { get; set; }
```

워크플로우를 호출할 때는 다음과 같이 딕셔너리를 사용해서 값을 전달할 수 있습니다.

```csharp
IDictionary<string, object> inputs = new Dictionary<string, object>
{
    { "Question", "What is your name?" }
};
```

그리고 이 딕셔너리를 WorkflowInvoker.Invoke 메서드에 전달하면, 액티비티 내부에서 Question.Get(context)를 사용해 이 값을 가져와 사용할 수 있습니다.

```csharp
IDictionary<string, object> outputs = WorkflowInvoker.Invoke(new GetUserInput(), inputs);
```

딕셔너리의 키("Question"이라는 문자열)는 InArgument의 변수 이름("Question")과 일치해야 하고, 값의 타입은 InArgument가 정의된 타입과 일치해야 합니다.  
이런 방식으로 InArgument를 통해 워크플로우 액티비티에 값을 전달할 수 있습니다.

<br/><br/>

## 5. 결론

워크플로우 파운데이션은 여러 작업을 순서대로 자동화하고 효율적으로 만들어주는 도구입니다.  
복잡한 것 같아도 기본적으로는 우리가 일상에서 경험하는 '단계'와 '순서'를 컴퓨터가 이해할 수 있게 번역해주는 것이죠.

<br/><br/><br/><br/><br/>
