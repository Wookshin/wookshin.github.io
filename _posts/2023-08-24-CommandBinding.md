---
title: CommandBinding in .NET - 간단하게 이해하기
subtitle: CommandBinding에 대해 알아보기
readtime: 10 min
author: wookshin
tags: [dotnet]
comments: true
---

<br/>

# CommandBinding in .NET: 간단하게 이해하기

.NET에서 GUI 애플리케이션을 개발하면서, 사용자의 액션을 감지하고 적절한 로직을 수행하는 것은 중요한 부분입니다.  
`CommandBinding`은 이러한 과정을 더 효율적이고 관리하기 쉽게 만들어주는 매커니즘 중 하나입니다.  
이 글에서는 `CommandBinding`이 무엇인지, 왜 사용해야 하는지에 대해 알아보고 간단한 예제 코드도 살펴보겠습니다.

<br/>

## 1. CommandBinding이란?

`CommandBinding`은 명령과 해당 명령을 처리할 로직을 연결해주는 역할을 합니다.  
일반적으로 버튼 클릭이나 키보드 단축키 등의 사용자 액션을 하나의 명령으로 추상화하여, 이 명령을 실제로 처리하는 로직과 연결시키는 방법입니다.

<br/><br/>

## 2. 왜 사용하는가?

<br/>

### 코드의 재사용성

하나의 명령을 여러 UI 요소에 쉽게 바인딩할 수 있습니다. 예를 들어, "저장" 명령을 툴바 버튼과 메뉴 아이템에 동시에 연결할 수 있습니다.

<br/>

### 느슨한 결합 (Loose Coupling)

UI 컨트롤과 실제 비즈니스 로직을 분리함으로써, 더 유지보수하기 좋은 코드를 작성할 수 있습니다.

<br/>

### 테스트 용이성
명령 로직을 분리함으로써, 단위 테스트가 더 쉬워집니다.

<br/><br/>

## 3. 예제 코드

<br/>

```csharp
```csharp
using System;
using System.Windows;
using System.Windows.Input;

namespace CommandBindingExample
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            // CommandBinding 객체 생성
            CommandBinding commandBinding = new CommandBinding();
            // Command에 ApplicationCommands.New 연결
            commandBinding.Command = ApplicationCommands.New;
            // 이 명령이 실행될 때 호출될 이벤트 핸들러 지정
            commandBinding.Executed += NewCommand_Executed;
            // 명령을 실행할 수 있는지 판단하는 이벤트 핸들러 지정
            commandBinding.CanExecute += NewCommand_CanExecute;
            // Window에 CommandBinding 추가
            this.CommandBindings.Add(commandBinding);
        }

        private void NewCommand_Executed(object sender, ExecutedRoutedEventArgs e)
        {
            MessageBox.Show("새 문서를 생성합니다.");
        }

        private void NewCommand_CanExecute(object sender, CanExecuteRoutedEventArgs e)
        {
            // 여기서는 예시로 항상 true를 반환. 실제로는 조건을 확인해야 함.
            e.CanExecute = true;
        }
    }
}
```

<br/>

### 추가 예시 1: "저장" 명령을 여러 곳에서 사용하기

"저장" 기능을 여러 곳에서 사용하고 싶다면, "저장" 버튼과 메뉴 아이템, 그리고 단축키 (Ctrl+S) 등에 같은 "저장" 명령을 연결할 수 있습니다.

```csharp
private void SaveCommand_Executed(object sender, ExecutedRoutedEventArgs e)
{
    // 저장 로직
}
```

<br/>

### 추가 예시 2: "복사/잘라내기/붙여넣기" 기능 구현

복사, 잘라내기, 붙여넣기와 같은 명령들도 여러 곳에서 재사용됩니다.  
텍스트 박스뿐만 아니라, 그리드나 리스트 등에서도 사용될 수 있습니다.

```csharp
private void CopyCommand_Executed(object sender, ExecutedRoutedEventArgs e)
{
    // 복사 로직
}

private void CutCommand_Executed(object sender, ExecutedRoutedEventArgs e)
{
    // 잘라내기 로직
}

private void PasteCommand_Executed(object sender, ExecutedRoutedEventArgs e)
{
    // 붙여넣기 로직
}
```

<br/>

### 추가 예시 3: 사용자의 입력 유효성 검사

CanExecute 이벤트를 활용하면 명령을 실행할 수 있는 상태인지 미리 검사할 수 있습니다.  
예를 들어, "삭제" 버튼이 있고 선택된 항목이 없을 때는 버튼을 비활성화하려면 다음과 같이 할 수 있습니다.

```csharp
private void DeleteCommand_CanExecute(object sender, CanExecuteRoutedEventArgs e)
{
    e.CanExecute = selectedItem != null;
}

private void DeleteCommand_Executed(object sender, ExecutedRoutedEventArgs e)
{
    // 삭제 로직
}
```

<br/><br/><br/><br/><br/>
