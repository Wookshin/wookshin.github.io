---
title: Microsoft UI Automation Framework - 트리 구조로 UI 자동화의 세계를 탐험하다!
subtitle: .NET 시리즈
readtime: 10 min
author: wookshin
tags: [dotnet]
comments: true
---

<br/>

# Microsoft UI Automation Framework: 트리 구조로 UI 자동화의 세계를 탐험하다!

안녕하세요, 여러분! 

왠지 모르게 수동으로 하는 일들이 너무 귀찮아지는 그런 날이 있죠? 

그런 당신을 위해 자동화의 신세계를 열어줄 놀라운 프레임워크를 소개하려고 합니다. 

바로 Microsoft의 UI Automation Framework입니다. 

복잡한 코드나 별도의 라이브러리 없이도 윈도우 응용 프로그램을 마음껏 조종할 수 있습니다. 

어떻게 가능한지 함께 알아봐요.

<br/><br/>

## 1. UI Automation Framework 이해하기

UI Automation Framework는 사용자 인터페이스를 자동화할 수 있도록 도와주는 라이브러리입니다. 

이것은 단순히 마우스 클릭이나 키보드 입력을 프로그래밍 방식으로 제어할 수 있게 해주는 것 뿐만 아니라, 사용자 인터페이스의 구성 요소를 읽을 수도 있습니다.

<br/>

### 핵심 개념들

#### **Automation Element**
이것은 사용자 인터페이스의 구성 요소를 나타냅니다. 버튼 하나도, 또는 전체 응용 프로그램 창도 될 수 있습니다.

<br/>

#### **Control Patterns**
이는 UI 구성 요소를 분류하고 제어하는 데 사용됩니다. 예를 들어, 버튼과 체크박스는 `InvokePattern`을 지원하여 프로그래밍 방식으로 '클릭'할 수 있게 해줍니다.

<br/>

#### **Tree Walker**
이것은 UI Automation 트리 구조를 순회할 수 있게 해주는 객체입니다.

<br/>

#### **Tree Scope**
이것은 특정 automation element에서 시작하는 하위 트리의 범위를 설명합니다.

<br/><br/>

## 2. UI Automation 트리 구조

UI Automation 트리 구조를 간단하게 시각화하면 아래와 같이 나타낼 수 있습니다.

```
                        [RootElement]
                               |
                  -----------------------------
                 |               |             |
         [Application 1]   [Application 2] [Application 3]
                 |               |             |
            ---------       ------------    -------------
           |        |      |     |     |    |     |      |  
       [Button] [Label] [Button][Text][Label][Menu][Button]  
           |                                          |
        -------                                    -------
       |       |                                  |       |
    [Text]  [Image]                            [Item1]  [Item2]
```

- **RootElement**: UI Automation 트리의 루트 요소입니다. 모든 UI 요소는 이 루트 요소 아래에 위치합니다.
- **Application 1, 2, 3**: 실행 중인 각 애플리케이션의 최상위 UI 요소입니다.
- **Button, Label, Text, Menu, Item1, Item2**: 각 애플리케이션 내의 UI 요소들을 나타냅니다.

<br/>

### 핵심 개념들

#### 컨트롤뷰 (Control View)
이 뷰에서는 `Button`, `Menu`, `Item1`, `Item2`와 같이 사용자와 상호작용할 수 있는 UI 요소만 볼 수 있습니다.

<br/>

#### 컨텐트뷰 (Content View)
이 뷰에서는 `Text`, `Label`, `Item1`, `Item2`와 같이 사용자에게 정보를 표시하는 요소만을 볼 수 있습니다.

<br/>

#### 로우뷰 (Raw View)
이 뷰에서는 트리의 모든 요소를 볼 수 있으므로, 위에 표현한 모든 노드가 포함됩니다. 이 뷰는 모든 UI 요소를 포함하고 있어, 가장 세밀한 단위의 작업이 가능합니다. 단, 이 뷰는 일반적인 상호작용에는 사용되지 않습니다.

<br/>

코드를 통해 이러한 트리 구조를 탐색하게 되면, 원하는 UI 요소를 찾아 그것과 상호작용하는 것이 가능합니다. 

이는 복잡한 자동화 작업에서 아주 중요한 기능입니다.

<br/><br/>

## 3. 예제 코드들

#### 예제 코드 1: 노트패드 열고 텍스트 입력하기

먼저, 노트패드를 자동으로 열고 "Hello, World!"라고 입력해보겠습니다.

```csharp
using System;
using System.Diagnostics;
using System.Threading;
using System.Windows.Automation;

namespace RPAMagic
{
    class Program
    {
        static void Main(string[] args)
        {
            // 노트패드 실행
            Process.Start("notepad.exe");

            // 약간의 대기 시간
            Thread.Sleep(2000);

            // 노트패드 창을 찾습니다.
            AutomationElement notepad = AutomationElement.RootElement.FindFirst(TreeScope.Children, new PropertyCondition(AutomationElement.NameProperty, "Untitled - Notepad"));

            // 텍스트 입력
            SendKeys("Hello, World!");

            // SendKeys 메소드
            static void SendKeys(string keys)
            {
                System.Windows.Forms.SendKeys.SendWait(keys);
            }
        }
    }
}
```

<br/>

#### 예제 코드 2: 계산기 앱으로 계산하기

```csharp
// ... (기존 using 문장들)
using System.Windows.Automation;

// ...

// 계산기 실행
Process.Start("calc.exe");
Thread.Sleep(1000);  // 대기

// 계산기 창 찾기
AutomationElement calcWindow = AutomationElement.RootElement.FindFirst(TreeScope.Children, new PropertyCondition(AutomationElement.NameProperty, "Calculator"));

// "1" 버튼 찾기
AutomationElement button1 = calcWindow.FindFirst(TreeScope.Descendants, new PropertyCondition(AutomationElement.NameProperty, "1"));

// 버튼 클릭
InvokePattern invokePattern = button1.GetCurrentPattern(InvokePattern.Pattern) as InvokePattern;
invokePattern.Invoke();
```

<br/>

#### 예제 코드 3: 파일 탐색기에서 폴더 열기

```csharp
// ... (기존 using 문장들)
using System.Windows.Automation;

// ...

// 파일 탐색기 실행
Process.Start("explorer.exe");
Thread.Sleep(2000);  // 대기

// 파일 탐색기 창 찾기
AutomationElement explorerWindow = AutomationElement.RootElement.FindFirst(TreeScope.Children, new PropertyCondition(AutomationElement.NameProperty, "File Explorer"));

// 주소창 찾기
AutomationElement addressBar = explorerWindow.FindFirst(TreeScope.Descendants, new PropertyCondition(AutomationElement.AutomationIdProperty, "addressBar"));

// 주소창에 텍스트 입력
ValuePattern valuePattern = addressBar.GetCurrentPattern(ValuePattern.Pattern) as ValuePattern;
valuePattern.SetValue("C:\\Users");
```

<br/>

#### 예제 코드 4: TreeWalker로 모든 자식 요소 탐색하기

```csharp
using System;
using System.Windows.Automation;

namespace TreeWalkingExample
{
    class Program
    {
        static void Main(string[] args)
        {
            AutomationElement rootElement = AutomationElement.RootElement;
            TreeWalker walker = TreeWalker.ControlViewWalker;
            WalkTheTree(walker, rootElement);
        }

        static void WalkTheTree(TreeWalker walker, AutomationElement element)
        {
            AutomationElement childElement = walker.GetFirstChild(element);
            while (childElement != null)
            {
                Console.WriteLine(childElement.Current.Name);
                WalkTheTree(walker, childElement);
                childElement = walker.GetNextSibling(childElement);
            }
        }
    }
}
```

이 코드는 Control View 기반으로 만든 TreeWalker 객체를 사용하여, UI Automation Tree의 모든 자식 요소를 재귀적으로 탐색하고 출력합니다.

<br/>

#### 예제 코드 5: 특정 프로그램의 UI 요소만 탐색하기

```csharp
AutomationElement targetProgram = AutomationElement.RootElement.FindFirst(TreeScope.Children, new PropertyCondition(AutomationElement.NameProperty, "Your Program Name"));
TreeWalker walker = TreeWalker.ControlViewWalker;
WalkTheTree(walker, targetProgram);
```

이렇게하면 특정 프로그램의 UI 요소만을 대상으로 Tree를 탐색할 수 있습니다.

<br/><br/>

## 4. 마무리

이렇게하면 특정 프로그램의 UI 요소만을 대상으로 Tree를 탐색할 수 있습니다.

단순히 버튼을 클릭하거나 텍스트를 입력하는 것에서 그치지 않고, 트리 구조를 이해하고 이를 활용하면 더욱 다양하고 복잡한 작업을 자동화할 수 있습니다.

매우 흥미롭지 않나요? 당신이 지루한 일상에서 벗어나 새로운 가능성을 찾을 수 있기를 바랍니다. 

다음에 또 뵙겠습니다! 🚀

<br/><br/><br/><br/><br/>
