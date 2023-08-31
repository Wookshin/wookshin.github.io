---
title: Workflow 디자이너와 액티비티의 신비로운 연결고리 해석하기
subtitle: WF(Workflow Foundation) 시리즈
readtime: 12 min
author: wookshin
tags: [dotnet]
comments: true
---

<br/>

# Workflow 디자이너와 액티비티의 신비로운 연결고리 해석하기

안녕하세요, 여러분! 

오늘은 그 누구도 쉽게 설명하지 않는, 워크플로우 디자이너와 액티비티가 어떻게 서로를 알아보는지에 대해 이야기하려고 합니다. 

왜 이게 중요하냐고요? 워크플로우의 세계에서 디자이너와 액티비티의 관계는 마법과도 같은 존재입니다. 

이것만 잘 이해해도, 워크플로우를 조종하는 마법사가 될 수 있습니다! 

자, 그럼 시작해보죠!

<br/><br/>

## 1. 액티비티와 디자이너, 어떻게 만나는가?

일단 기본적으로 액티비티와 디자이너는 일대일 매핑으로 만나곤 합니다. 

간단한 예를 들어 볼까요?

<br/>

```csharp
[Designer(typeof(MyActivityDesigner))]
public class MyActivity : Activity
{
    // ...
}
```

아주 간단하죠? `MyActivity`라는 액티비티가 있고, 이것은 `MyActivityDesigner` 디자이너와 매핑되어 있습니다.

<br/><br/>

## 2. 디자이너와 액티비티가 서로 어떻게 소통하는가?

사실 이 부분이 중요한데요, 디자이너가 로딩되는 순간은 워크플로우에 액티비티가 추가되는 그 순간입니다. 

이때 `ModelItem`이라는 아이템이 디자이너와 액티비티를 이어주는 역할을 합니다.

<br/>

#### ModelItem은 무엇인가요?

`ModelItem`은 현재 디자이너에 연결된 액티비티의 정보를 담고 있습니다.

디자이너 내에서 이 `ModelItem`을 사용하면 현재 바인딩된 액티비티에 액세스할 수 있습니다. 이게 어떻게 쓰이냐고요? 

예를 들면 다음과 같습니다:

```csharp
private void ActivityDesigner_Loaded(object sender, RoutedEventArgs e)
{
    if (ModelItem.ItemType == typeof(LogActivity))
    {
        // UI를 LogActivity에 맞게 변경
    }
    else if (ModelItem.ItemType == typeof(ErrorLogActivity))
    {
        // UI를 ErrorLogActivity에 맞게 변경
    }
}
```

<br/><br/>

## 3. 일대일 매핑과 다대일 매핑

#### 일대일 매핑 (One-to-One Mapping)

일대일 매핑이란, 하나의 액티비티가 하나의 디자이너와 연결되는 것을 의미합니다. 

이는 아주 간단하고 직관적인 방법입니다.

예를 들어, 내가 만든 `MyActivity`라는 액티비티가 있다고 해보겠습니다. 

이 액티비티에 디자이너를 적용하려면 아래와 같이 코드를 작성하면 됩니다.

<br/>

```csharp
[Designer(typeof(MyActivityDesigner))]
public class MyActivity : Activity
{
    // ...
}
```

이렇게 하면 `MyActivity` 액티비티는 `MyActivityDesigner` 디자이너와 연결됩니다. 간단하죠?

<br/>

#### 다대일 매핑 (Many-to-One Mapping)

다대일 매핑은 하나의 디자이너가 여러 액티비티에 적용되는 경우를 의미합니다. 

예를 들어, `LogActivity`와 `ErrorLogActivity`라는 두 액티비티가 있고 이 두 액티비티가 같은 UI를 공유한다고 가정해보겠습니다.

<br/>

#### LogActivity와 ErrorLogActivity 클래스

```csharp
using System;
using System.Activities;

namespace CustomActivities
{
    public class LogActivity : CodeActivity
    {
        public InArgument<string> Message { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            string message = context.GetValue(this.Message);
            Console.WriteLine($"Log: {message}");
        }
    }

    public class ErrorLogActivity : CodeActivity
    {
        public InArgument<string> ErrorMessage { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            string message = context.GetValue(this.ErrorMessage);
            Console.WriteLine($"Error: {message}");
        }
    }
}
```

<br/>

#### 공통 디자이너 클래스

이 디자이너는 `LogActivity`와 `ErrorLogActivity` 둘 다에 사용됩니다.

```csharp
using System.Windows;
using System.Activities.Presentation.Metadata;
using System.Activities.Presentation;

namespace CustomActivities
{
    public partial class CommonLogDesigner
    {
        public CommonLogDesigner()
        {
            InitializeComponent();
        }
    }
}
```

<br/>

#### 디자이너 로드 이벤트 핸들러

디자이너가 로딩될 때 `ModelItem`을 체크하여 UI를 동적으로 업데이트하도록 설정합니다.

```csharp
private void ActivityDesigner_Loaded(object sender, RoutedEventArgs e)
{
    if (ModelItem.ItemType == typeof(LogActivity))
    {
        // Update UI for LogActivity
    }
    else if (ModelItem.ItemType == typeof(ErrorLogActivity))
    {
        // Update UI for ErrorLogActivity
    }
}
```

<br/><br/>

## 4. 액티비티, 디자이너, ModelItem 관계를 정리해줘!

디자이너가 로딩되는 시점은 일반적으로 워크플로우 디자이너에 액티비티를 드래그 앤 드롭하여 추가했을 때나, 프로그래밍 방식으로 액티비티를 워크플로우에 추가했을 때입니다.

`ModelItem`은 이러한 시점에서 현재의 액티비티 인스턴스에 바인딩됩니다. 

따라서 디자이너의 로직 내에서 `ModelItem`을 사용하면 현재 디자이너에 바인딩된 액티비티의 속성이나 메서드에 액세스할 수 있습니다. 

이것은 디자이너가 액티비티의 상태를 렌더링하거나 수정하는 데 매우 유용합니다.

예를 들어, 위에서 보여준 다대일 매핑 예시에서의 `ActivityDesigner_Loaded` 메서드에서 `ModelItem.ItemType`을 체크하면, 현재 디자이너에 어떤 타입의 액티비티가 바인딩되어 있는지 알 수 있습니다. 

이 정보를 바탕으로 디자이너의 UI를 동적으로 업데이트할 수 있습니다.

<br/><br/>

## 5. 마무리

디자이너와 액티비티, 그리고 그들을 연결하는 미스터리한 `ModelItem`이 이번 블로그의 핵심입니다. 

이 세 가지만 잘 이해했다면, 여러분도 이제 워크플로우의 마법사입니다! 

<br/><br/><br/><br/><br/>
