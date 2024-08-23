---
title: ExpressionTextBox와 ModelItem의 바인딩 관계
subtitle: "#WorkflowFoundation #ExpressionTextBox #ModelItem #Binding"
readtime: 12 min
author: wookshin
tags: [dotnet]
comments: true
---

<br/>

# ExpressionTextBox와 ModelItem의 바인딩 관계

안녕하세요, Workflow Foundation (WF)의 신비로운 세계를 탐험하는 여러분! 

오늘 다룰 주제는 `ExpressionTextBox`와 `ModelItem`의 바인딩 관계입니다. 

무슨 소린지 모르겠다고요? 그럼 이 포스트를 통해 이 둘의 관계가 얼마나 중요하고 흥미로운지 알게 될 겁니다. 

일단 커피 한잔을 준비하고 앉으세요. 시작해 봅시다!

<br/>

## 1. 들어가기 전에: ExpressionTextBox와 ModelItem이 무엇인가요?

#### ExpressionTextBox

`ExpressionTextBox`는 Windows Workflow Foundation에서 제공하는 특별한 텍스트 박스 컨트롤입니다.  

"그래서 특별한 게 뭐야?" 라고 물으신다면, 이 텍스트 박스는 단순한 문자열을 넘어 표현식(expression)을 입력받을 수 있다는 점입니다. 

예를 들어, `"Hello, " + Name` 같은 VB 표현식을 그대로 입력받아, 런타임에서 그 값을 처리할 수 있습니다.

<br/>

#### ModelItem

`ModelItem`은 디자인 타임에 워크플로우 모델을 표현하는 객체입니다. 

이 객체는 액티비티나 속성, 그리고 메타데이터를 포함하며, 디자이너에서 이들을 어떻게 표현할지를 관리합니다. 

<br/>

#### 그럼 이 둘이 왜 중요한가요?

단순히 말해서, `ExpressionTextBox`와 `ModelItem`의 바인딩은 디자이너의 UI와 액티비티 코드 사이의 **다리 역할**을 합니다. 

예를 들어, `Assign` 액티비티의 `To` 속성에 어떤 값이 설정되어 있는지 바로 확인하고 싶다면, 이를 위한 UI 요소로 `ExpressionTextBox`를 사용하면 됩니다.

<br/><br/>

## 2. 어떻게 작동하는지 보여주세요!

아래에 간단한 예를 준비했습니다. 

이 예에서는 `Assign` 액티비티의 디자이너를 사용할 건데, 이 액티비티는 변수에 값을 할당하는 기본적인 워크플로우 액티비티입니다.

<br/>

#### AssignDesigner.xaml

```xaml
<sap:ActivityDesigner x:Class="CustomActivities.AssignDesigner"
                      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
                      xmlns:sap="clr-namespace:System.Activities.Presentation;assembly=System.Activities.Presentation">
    <StackPanel>
        <TextBlock Text="Assign To:" />
        <sapv:ExpressionTextBox Expression="{Binding Path=ModelItem.To, Mode=TwoWay, Converter={StaticResource ArgumentToExpressionConverter}, ConverterParameter=Out }"
                                UseLocationExpression="True" OwnerActivity="{Binding Path=ModelItem}" />
    </StackPanel>
</sap:ActivityDesigner>
```

<br/>

#### AssignDesigner.xaml.cs

```csharp
public partial class AssignDesigner
{
    public AssignDesigner()
    {
        InitializeComponent();
    }
}
```

이렇게 하면 `Assign` 액티비티의 `To` 속성이 `ExpressionTextBox`와 바인딩됩니다. 이제 이 TextBox에 표현식을 입력하면, 그 값이 실제 워크플로우 모델의 `To` 속성에 반영되죠.

<br/>

#### AssignActivity.cs

```csharp
using System;
using System.Activities;

namespace CustomActivities
{
    [Designer(typeof(AssignDesigner))] // AssignDesigner를 지정
    public sealed class AssignActivity : CodeActivity
    {
        // To 속성: 변수에 할당될 값 혹은 표현식
        public InArgument<string> To { get; set; }

        // CodeActivity 클래스에서 Execute 메서드를 오버라이드해야 함
        protected override void Execute(CodeActivityContext context)
        {
            // To 속성에서 실제 값을 가져옴
            string toValue = context.GetValue(this.To);

            // 실제 작업 로직 (여기서는 단순히 콘솔에 출력)
            Console.WriteLine($"Assigning value: {toValue}");
        }
    }
}
```

<br/>

`AssignActivity`에 어트리뷰트를 추가하여 디자이너를 명시적으로 지정할 수도 있습니다.

이제 `AssignActivity` 액티비티를 워크플로우 디자이너에 드래그 앤 드롭할 때 `AssignDesigner`가 사용되며, `To` 속성은 디자이너의 `ExpressionTextBox`와 바인딩 될 것입니다.

<br/><br/>

## 3. 뒤에서 무슨 일이 일어나고 있는가요?

바인딩은 세 가지 주요 속성을 통해 이루어집니다:

1. **OwnerActivity**: 이 속성은 `ExpressionTextBox`가 어떤 `ModelItem`, 즉 어떤 액티비티에 속해 있는지를 나타냅니다. 즉, 표현식의 주인공은 누구인가요?

2. **Converter**: `ArgumentToExpressionConverter` 같은 데이터 변환기를 이용해서, `ModelItem`의 속성 값을 `ExpressionTextBox`가 이해할 수 있는 형식으로 변환해 줍니다.

3. **ConverterParameter**: "In", "Out" 같은 추가 정보를 전달해, 데이터 변환기가 어떤 방식으로 변환을 진행할지 알려줍니다.

<br/><br/>

## 4. ModelItem이 특정 액티비티랑 연결되었는지를 어떻게 알아?

`ModelItem`은 Windows Workflow Foundation (WF)의 디자인 타임에 액티비티의 모델을 나타내는 객체입니다. 

그러므로, 액티비티 디자이너 (예: `AssignDesigner`)가 로드될 때, 해당 액티비티 (예: `AssignActivity`)를 대표하는 `ModelItem` 인스턴스가 자동으로 생성됩니다.

일반적으로 `ModelItem`은 디자이너의 `DataContext`에 자동으로 설정됩니다. 

이는 WPF (Windows Presentation Foundation)의 데이터 바인딩 메커니즘을 사용하여 이루어집니다. 

따라서, `ExpressionTextBox`의 `OwnerActivity` 속성에 `{Binding Path=ModelItem}`과 같은 바인딩 표현식을 사용하면, `ModelItem`은 자동으로 해당 액티비티 (`AssignActivity` 등)와 연결됩니다.

<br/>

#### 확인 방법

1. **디버깅**: 디자이너 코드에서 디버깅을 통해 `ModelItem`의 속성과 값들을 확인할 수 있습니다.
  
2. **코드에서 명시적으로 액세스**: 디자이너의 코드 뒷면 (Code-behind)에서 `this.ModelItem` 또는 다른 메커니즘을 통해 `ModelItem`에 액세스할 수 있습니다. 이를 통해 어떤 액티비티 모델이 연결되어 있는지 확인할 수 있습니다.

3. **DataContext 확인**: WPF 디자이너에는 데이터 컨텍스트가 자주 사용되므로, 이를 통해 현재 `ModelItem`이 무엇인지 확인할 수 있습니다. 

4. **이벤트 로깅**: 액티비티 디자이너가 로드될 때 이벤트를 로깅하도록 코드를 작성하여, 어떤 `ModelItem`이 생성되는지 로그를 통해 확인할 수 있습니다.

5. **리플렉션**: 더 복잡한 경우에는 .NET의 리플렉션을 사용하여 런타임에 `ModelItem` 객체를 조사할 수도 있습니다.

6. **디자이너 내 UI 요소**: 디자이너 내에 현재 연결된 `ModelItem` 정보를 표시하는 UI 요소를 추가할 수도 있습니다.

이러한 방법들을 통해 `ModelItem`과 `AssignActivity`가 제대로 연결되었는지 확인할 수 있습니다.

<br/><br/>

## 5. 마무리

이렇게 해서 `ExpressionTextBox`와 `ModelItem`의 신비로운 바인딩에 대한 여행을 마치게 되었습니다. 

어떤가요, 꽤 흥미로우시죠? 이 두 요소 사이의 마법 같은 바인딩을 이해하고 나면, 여러분의 워크플로우 애플리케이션은 훨씬 더 강력해질 것입니다.

<br/><br/><br/><br/><br/>
