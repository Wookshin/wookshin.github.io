---
title: ActivityDesigner와 CodeActivity 이해하기
subtitle: "#WorkflowFoundation #ActivityDesigner #CodeActivity"
readtime: 10 min
author: wookshin
tags: [windows-WF]
comments: true
---

<br/>

# ActivityDesigner와 CodeActivity 이해하기

<br/>

## 1. ActivityDesigner와 CodeActivity의 관계

#### CodeActivity

`CodeActivity`는 Windows Workflow Foundation (WF)에서 액티비티를 구현하기 위한 기본 클래스 중 하나입니다. 이 클래스를 상속받아 `Execute` 메서드를 오버라이딩하면, 워크플로우에서 실행될 로직을 정의할 수 있습니다.

```csharp
public class MyCodeActivity : CodeActivity
{
    protected override void Execute(CodeActivityContext context)
    {
        // 로직 구현
    }
}
```
<br/>

#### ActivityDesigner

`ActivityDesigner`는 워크플로우 액티비티를 시각적으로 표현하고 편집하는 인터페이스를 제공합니다. 이는 주로 XAML을 사용하여 정의됩니다.

```xml
<sap:ActivityDesigner x:Class="MyNamespace.MyCodeActivityDesigner">
    <!-- UI 정의 -->
</sap:ActivityDesigner>
```

<br/>

#### 관계의 핵심

1. **표현성과 사용성**: `CodeActivity`가 로직을 담당하는 반면, `ActivityDesigner`는 사용자에게 이를 어떻게 표현할지 결정합니다.
2. **디자인과 런타임 연계**: `ActivityDesigner`는 `CodeActivity`의 속성과 바인딩되어, 디자인 시간의 변경이 런타임에도 반영됩니다.
3. **재사용성과 확장성**: `CodeActivity`와 `ActivityDesigner`는 독립적으로 확장하고 재사용할 수 있습니다.

<br/>

"디자인 시간의 변경이 런타임에도 반영됩니다"는 워크플로우 디자이너에서 편집한 액티비티의 속성이나 설정이 실제 실행 시점(런타임)의 워크플로우에도 적용된다는 의미입니다.  

- **디자인 시간(Design-time)**: 워크플로우를 구성하거나 수정하는 시점을 말하며, 여기서는 액티비티의 속성을 설정하거나 편집할 수 있습니다.  
- **런타임(Runtime)**: 워크플로우가 실제로 실행되는 시점을 말합니다.  

예를 들어, CodeActivity의 어떤 속성을 ActivityDesigner를 통해 변경했다면, 그 변경사항은 워크플로우가 실제로 실행될 때 해당 CodeActivity 인스턴스에 반영됩니다.  
이는 디자이너에서의 편집과 실제 실행 사이에 일관성을 유지하게 해줍니다.

<br/>

## 2. ActivityDesigner와 CodeActivity의 연결 방법

#### DesignerAttribute 사용

`.NET`의 `DesignerAttribute`를 사용하여 `CodeActivity`에 대한 디자이너를 지정할 수 있습니다.

```csharp
[Designer(typeof(MyCodeActivityDesigner))]
public class MyCodeActivity : CodeActivity
{
    protected override void Execute(CodeActivityContext context)
    {
        // 로직 구현
    }
}
```

이렇게 하면, `MyCodeActivity`에 대한 디자이너로 `MyCodeActivityDesigner`가 지정됩니다.

<br/>

#### 확인 절차

1. `DesignerAttribute`를 `CodeActivity`에 추가합니다.
2. 워크플로우 디자이너에서 해당 액티비티를 드래그 앤 드롭하면, 지정된 `ActivityDesigner`가 표시됩니다.

<br/>

## 3. 예시: 간단한 로그 작성 액티비티

#### CodeActivity 구현

```csharp
public class LogActivity : CodeActivity
{
    public InArgument<string> Message { get; set; }

    protected override void Execute(CodeActivityContext context)
    {
        string message = Message.Get(context);
        Console.WriteLine(message);
    }
}
```

<br/>

#### ActivityDesigner 구현

```xml
<sap:ActivityDesigner x:Class="MyNamespace.LogActivityDesigner">
    <TextBox Text="{Binding ModelItem.Message, Mode=TwoWay}" />
</sap:ActivityDesigner>
```

<br/>

#### 연결

```csharp
[Designer(typeof(LogActivityDesigner))]
public class LogActivity : CodeActivity
{
    // 코드 생략
}
```

<br/>

이제 `LogActivity`를 워크플로우 디자이너에 추가하면, `LogActivityDesigner`가 자동으로 로드되어 메시지를 입력할 수 있는 텍스트 박스를 제공합니다.

<br/><br/>

## 4. 마치며

`ActivityDesigner`와 `CodeActivity`의 적절한 조합과 연결은 워크플로우의 디자인 타임과 런타임을 이어주는 중요한 역할을 합니다.  
이 둘을 정확하게 연결하고 활용하면, 워크플로우 개발 과정이 훨씬 더 효율적이고 사용자 친화적이 될 수 있습니다.  

특히, `.NET`의 `DesignerAttribute`를 사용하여 두 컴포넌트를 쉽게 연결할 수 있고, 이를 통해 사용자는 워크플로우 디자이너 내에서 직관적으로 액티비티를 편집할 수 있습니다.  
이런 접근 방식은 워크플로우 애플리케이션의 개발과 유지 보수를 크게 단순화할 수 있습니다.

<br/><br/><br/><br/><br/>
