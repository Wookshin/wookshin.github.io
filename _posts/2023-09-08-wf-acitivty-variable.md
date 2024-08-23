---
title: A 액티비티에서 B 액티비티로 데이터 전달하기(Workflow Foundation)
subtitle: "#WorkflowFoundation #InArgument #OutArugment #Variables"
readtime: 5 min
author: wookshin
tags: [windows-WF]
comments: true
---

<br/>

# A 액티비티에서 B 액티비티로 데이터 전달하기(Workflow Foundation)

안녕하세요! 

오늘은 Windows Workflow Foundation (WF)에서 "어떻게 액티비티 간에 데이터를 전달할 수 있을까?"라는 궁금증에 대한 답을 찾아보려고 합니다.

<br/><br/>

## 1. 시작하기 전에: Windows Workflow Foundation (WF) 란?

Windows Workflow Foundation은 일련의 활동(Activities)을 조합하여 복잡한 업무 흐름을 모델링하는 .NET 프레임워크의 일부입니다. 

각 액티비티는 작은 단위의 실행 로직을 캡슐화합니다. 

이러한 액티비티들은 서로 데이터를 주고받을 필요가 있는데, 그 방법에는 주로 두 가지가 있습니다: **Arguments**와 **Variables**. 

<br/><br/>

## 2. 본론: 데이터 전달의 두 가지 방법

#### 첫째, Arguments 사용하기

- 액티비티는 **InArgument**, **OutArgument**, 그리고 **InOutArgument**를 정의할 수 있습니다.
- **InArgument**: 액티비티가 데이터를 입력으로 받을 때 사용합니다.
- **OutArgument**: 액티비티가 데이터를 출력할 때 사용합니다.
- **InOutArgument**: 데이터를 입력받아 수정 후 출력할 때 사용합니다.

<br/>

#### 둘째, Variables 사용하기

- 워크플로우는 여러 액티비티에서 공유할 수 있는 변수를 정의할 수 있습니다.
- 이 변수는 특정 스코프 내에서 모든 액티비티에서 접근이 가능합니다.

<br/><br/>

## 3. 코드로 보는 예시: Activity A와 Activity B 데이터 공유하기

#### 3.1 워크플로우에서 변수 정의하기

```csharp
Variable<string> sharedData = new Variable<string>("sharedData");
```

<br/>

#### 3.2 Activity A에서 변수 값을 설정하기

```csharp
public sealed class ActivityA : CodeActivity
{
    public OutArgument<string> OutputData { get; set; }

    protected override void Execute(CodeActivityContext context)
    {
        string result = "데이터를 보냅니다, Activity A에서!";
        context.SetValue(OutputData, result);
    }
}
```

<br/>

#### 3.3 Activity B에서 변수 값을 사용하기

```csharp
public sealed class ActivityB : CodeActivity
{
    public InArgument<string> InputData { get; set; }

    protected override void Execute(CodeActivityContext context)
    {
        string dataFromA = context.GetValue(InputData);
        Console.WriteLine("받은 데이터: " + dataFromA);
    }
}
```

<br/>

#### 3.4 워크플로우에서 액티비티 사용하기

```csharp
var workflow = new Sequence()
{
    Variables = { sharedData },
    Activities = 
    {
        new ActivityA()
        {
            OutputData = sharedData
        },
        new ActivityB()
        {
            InputData = sharedData
        }
    }
};
```

<br/><br/>

## 4. 마무리: 주요 개념 한눈에 보기

#### Activity (액티비티)

액티비티는 작은 단위의 실행 로직을 캡슐화한 것입니다. 워크플로우에서 수행될 하나의 작업이나 단계를 나타냅니다.

<br/>

#### Argument (인수)

액티비티는 데이터를 주고받을 때 인수를 사용합니다. **InArgument**는 데이터를 입력으로 받고, **OutArgument**는 데이터를 출력으로 내보냅니다. **InOutArgument**는 데이터를 입력으로 받아서 수정 후 출력합니다.

<br/>

#### Sequence (시퀀스)

시퀀스는 여러 액티비티를 순차적으로 실행할 수 있게 해주는 컨테이너입니다. 액티비티들이 순서대로 실행됩니다.

<br/>

#### Workflow (워크플로우)

워크플로우는 액티비티, 변수, 인수 등을 포함하여 하나의 논리적인 업무 흐름을 정의합니다. 워크플로우는 복잡한 업무 로직을 모델링하고 관리하는 도구입니다.

<br/>

#### Variables (변수)

워크플로우 내에서 정의된 변수는 해당 스코프 내의 모든 액티비티에서 공유되어 사용될 수 있습니다. 이를 통해 액티비티 간에 데이터를 주고받을 수 있습니다.

<br/>

이상으로, Windows Workflow Foundation에서 중요한 개념들에 대해 간략히 살펴봤습니다. 

이러한 개념들을 잘 활용하면, 복잡한 업무 흐름도 쉽게 구현하고 관리할 수 있을 것입니다. 

다음에 또 만나요! 👋

<br/><br/><br/><br/><br/>
