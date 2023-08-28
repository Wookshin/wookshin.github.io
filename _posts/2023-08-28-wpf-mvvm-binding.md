---
title: WPF MVVM 패턴, 그리고 Binding
subtitle: WPF 시리즈
readtime: 15 min
author: wookshin
tags: [dotnet]
comments: true
---

<br/>

# WPF MVVM 패턴, 그리고 Binding

안녕하세요! 오늘은 WPF (Windows Presentation Foundation)에서 Binding과 MVVM (Model-View-ViewModel) 패턴에 대한 이해를 도와드릴 예정입니다.  
이 글을 통해 MVVM 패턴이 무엇인지, Binding이 어떻게 작동하는지, 그리고 MVVM과 어떻게 연결되는지 알아보겠습니다.

<br/>

## 1. MVVM 패턴 소개

MVVM은 Model, View, ViewModel의 약자로, 세 부분으로 나뉩니다.

- **Model**: 데이터와 비즈니스 로직을 담당합니다.
- **View**: UI (User Interface)를 담당합니다.
- **ViewModel**: View와 Model을 연결하는 로직을 담당합니다.

<br/>

## 2. 왜 MVVM이 필요한가?

MVVM 패턴은 큰 프로젝트나 복잡한 UI를 가진 애플리케이션에서 매우 유용합니다.  
예를 들어, 여러 개발자가 같은 프로젝트에 참여하고 있다면, MVVM을 사용하면 UI와 로직을 분리하여 작업할 수 있습니다.  
이렇게 하면 코드의 재사용성이 높아지고 유지보수가 쉬워집니다.

<br/>

#### 예시: 쇼핑몰 앱

- **Model**: 상품 데이터, 가격, 재고 등
- **View**: 상품 목록, 가격 표시, 장바구니 등의 UI
- **ViewModel**: 상품을 장바구니에 추가하는 로직, 가격 계산 등

만약 MVVM을 사용하지 않는다면, 상품을 장바구니에 추가할 때마다 UI 코드 내에서 모든 것을 처리해야 할 것입니다.  
이는 코드가 복잡해지고, 다른 개발자가 이해하기 어렵게 만듭니다.

<br/><br/>

## 3. MVVM 구현 예제 코드

#### Model

```csharp
public class Product
{
    public string Name { get; set; }
    public double Price { get; set; }
}
```

<br/>

#### ViewModel

ObservableCollection을 통해 위 Model을 관리하고 있습니다.

```csharp
public class ShoppingCartViewModel : INotifyPropertyChanged
{
    private ObservableCollection<Product> _products;
    public ObservableCollection<Product> Products
    {
        get { return _products; }
        set
        {
            _products = value;
            OnPropertyChanged("Products");
        }
    }

    public event PropertyChangedEventHandler PropertyChanged;

    protected virtual void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }

    public ICommand AddToCartCommand { get; private set; }

    public ShoppingCartViewModel()
    {
        Products = new ObservableCollection<Product>();
        AddToCartCommand = new RelayCommand(AddProductToCart);
    }

    private void AddProductToCart(object parameter)
    {
        // Add product to cart logic
    }
}
```

<br/>

#### View (Xaml 코드)

```xml
<ListView ItemsSource="{Binding Products}">
    <ListView.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <TextBlock Text="{Binding Name}" />
                <TextBlock Text="{Binding Price}" />
            </StackPanel>
        </DataTemplate>
    </ListView.ItemTemplate>
</ListView>
<Button Command="{Binding AddToCartCommand}" Content="Add to Cart" />
```

<br/>

#### Data Context 설정

바인딩의 소스는 일반적으로 DataContext를 통해 설정됩니다.  
이는 XAML 파일의 루트 요소 또는 특정 UI 요소에서 설정할 수 있습니다.

```xml
<Window x:Class="YourNamespace.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="MainWindow" Height="350" Width="525">
    <Window.DataContext>
        <local:ShoppingCartViewModel/>
    </Window.DataContext>
    
    <!-- Your UI here -->
</Window>
```

<br/><br/>

## 4. 갑자기 나타난 DataContext란 무엇인가?

`DataContext`는 WPF (Windows Presentation Foundation)에서 중요한 역할을 하는 프로퍼티 중 하나입니다.  
이 프로퍼티는 바인딩의 기본 소스가 되며, 어떤 객체가 UI와 어떻게 연결될 것인지를 정의합니다.  
`DataContext`는 상속될 수 있는 프로퍼티입니다. 즉, 부모 요소의 `DataContext` 설정이 자식 요소로 전파될 수 있습니다.

<br/>

#### 작동 원리

1. **바인딩의 기본 소스 설정**: WPF 바인딩 시스템에서는 `Binding` 객체의 `Source` 프로퍼티를 명시적으로 설정하지 않으면 자동으로 해당 요소의 `DataContext`를 바인딩 소스로 사용합니다.

2. **계층적 상속**: `DataContext`는 계층적으로 상속됩니다. 부모 요소에 `DataContext`가 설정되면, 그 설정은 자식 요소에게 상속됩니다. 이를 통해 ViewModel의 하위 객체를 UI의 하위 요소와 쉽게 바인딩할 수 있습니다.

3. **값 변경 알림**: `DataContext`는 일반적으로 `INotifyPropertyChanged` 인터페이스를 구현한 객체에 바인딩됩니다. 이렇게 하면 데이터가 변경될 때 UI에 자동으로 알릴 수 있습니다.

<br/>

#### 예제

예를 들어, 아래와 같이 `MainWindow` 클래스에 `DataContext`를 설정할 수 있습니다.

```csharp
public MainWindow()
{
    InitializeComponent();
    this.DataContext = new YourViewModel();
}
```

이렇게 하면, XAML에서는 다음과 같이 간단하게 프로퍼티에 접근할 수 있습니다.

```xaml
<TextBlock Text="{Binding YourProperty}" />
```

여기서 `YourProperty`는 `YourViewModel` 클래스 내에 정의된 프로퍼티입니다.

<br/>

#### 주의 사항

- `DataContext`가 변경되면 해당 요소와 그 하위 요소의 모든 바인딩이 업데이트됩니다. 따라서 `DataContext`를 자주 변경하는 것은 성능 문제를 야기할 수 있습니다.
- 부모 요소와 자식 요소가 다른 `DataContext`를 가질 경우, 자식 요소의 바인딩은 부모의 `DataContext`를 상속받지 않습니다. 이 경우 자식 요소는 명시적으로 `DataContext`를 설정해야 합니다.

이러한 방식으로 `DataContext`는 WPF의 바인딩 메커니즘에서 중심 역할을 하며, ViewModel과 View를 효과적으로 연결해 줍니다.

<br/><br/>

## 5. Binding이란?

Binding은 View와 ViewModel 사이의 데이터 연결을 담당합니다.  
Binding을 통해 ViewModel의 변경사항이 자동으로 View에 반영되고, 반대로 View의 변경사항도 ViewModel에 자동으로 반영됩니다.

<br/><br/>

## 6. Binding의 내부 동작 방식 

Binding이 어떻게 동작하는지를 이해하려면 여러 WPF의 특성과 기술을 알아야 합니다.  
이 중에서도 두 가지 주요 기술이 있습니다: `DependencyProperty`와 `INotifyPropertyChanged`.

<br/>

#### DependencyProperty

`DependencyProperty`는 WPF에서 제공하는 특별한 종류의 프로퍼티입니다. 이 프로퍼티는 자동으로 값의 변경을 감지하고, 변경이 일어나면 연결된 UI 요소를 업데이트합니다.

<br/>

#### 예시 코드 (Xaml)

```xml
<TextBlock x:Name="textBlock1" Text="{Binding ElementName=textBox1, Path=Text}" />
<TextBox x:Name="textBox1" Text="Hello, WPF!" />
```

이 코드에서 `TextBlock`의 `Text` 프로퍼티는 `TextBox`의 `Text` 프로퍼티에 바인딩됩니다.  
`Text` 프로퍼티는 `DependencyProperty`이므로, `TextBox`의 텍스트가 변경되면 `TextBlock`도 자동으로 업데이트됩니다.

<br/>

#### INotifyPropertyChanged

`INotifyPropertyChanged` 인터페이스는 ViewModel에서 주로 사용되며, 프로퍼티의 값이 변경될 때 `PropertyChanged` 이벤트를 발생시켜 UI에 알려줍니다.

<br/>

#### 예시 코드 (ViewModel)

```csharp
public class MainViewModel : INotifyPropertyChanged
{
    private string _userName;
    public string UserName
    {
        get { return _userName; }
        set
        {
            _userName = value;
            OnPropertyChanged("UserName");
        }
    }

    public event PropertyChangedEventHandler PropertyChanged;

    protected virtual void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

<br/>

#### 예시코드 (Xaml)

```xml
<TextBlock Text="{Binding UserName}" />
```

이 코드에서 ViewModel의 `UserName` 프로퍼티가 변경되면 `PropertyChanged` 이벤트가 발생하고, 이에 따라 바인딩된 `TextBlock`의 `Text` 프로퍼티가 업데이트됩니다.
이렇게 `DependencyProperty`와 `INotifyPropertyChanged`를 이용하면, WPF에서 데이터 바인딩이 어떻게 내부적으로 동작하는지 이해할 수 있습니다.

<br/><br/>

## 7. 마치며

WPF의 데이터 바인딩은 코드와 UI의 분리, 자동 업데이트, 표준화 및 재사용성 등 여러 목적을 위해 설계되었습니다.  
내부 동작 방식은 복잡해 보이지만, 이를 이해하고 적절히 활용한다면 강력하고 효율적인 애플리케이션을 개발할 수 있습니다.  
이 글을 통해 바인딩의 목적과 내부 동작 방식에 대한 깊은 이해를 얻었길 바랍니다.


<br/><br/><br/><br/><br/>
