---
title: Selenium Implicit vs Explicit - 웹 요소 기다리기
subtitle: "#Selenium #IWebDriver #Implicit #Explicit"
readtime: 10 min
author: wookshin
tags: [dotnet]
comments: true
---

<br/>

# Selenium Implicit vs Explicit : 웹 요소 기다리기

<br/>

## 1. Implicit waits와 Explicit waits의 특징

#### Implicit waits

- 웹드라이버는 **지정된 시간 동안 웹 요소가 나타날 때까지 기다립니다**.
- 해당 시간 내에 요소가 발견되면 실행을 계속합니다. 만약 요소가 발견되지 않으면, **타임아웃 예외를 발생시킵니다**.
- 한 번 설정되면 **웹드라이버의 생명주기 동안 유지됩니다**.

<br/>

#### Explicit waits

- **특정 조건이 만족될 때까지 기다리도록 설계된 것입니다**. 예를 들면, 요소가 클릭 가능해질 때까지 기다리는 것과 같은 조건을 부여합니다.
- `WebDriverWait`와 `ExpectedConditions` 클래스를 사용하여 구현됩니다.
- **더 유연하며, 특정 조건에 따라 대기하는 것이 가능합니다**.

<br/>

이 두 방법은 웹 요소의 상태를 대기하는 방식에서 차이가 있습니다.  
Implicit waits는 웹드라이버가 전체 생명주기에 걸쳐 일정 시간 동안 요소를 찾을 수 있도록 해줍니다.  
반면에, Explicit waits는 조건별로 웹 요소가 충족될 때까지 대기할 수 있어 더 세밀한 제어가 가능합니다.

<br/><br/>

## 2. Implicit waits 활용 예시

<br/>

#### 예시 1: 페이지 로딩 후 특정 요소 찾기

```csharp
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;

class ImplicitWaitExample1
{
    static void Main()
    {
        IWebDriver driver = new ChromeDriver();
        
        // 10초 동안 implicit wait 설정
        driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
        
        driver.Navigate().GoToUrl("https://example.com");
        
        // 요소가 존재할 때까지 최대 10초 동안 기다립니다.
        IWebElement element = driver.FindElement(By.Id("sampleElement"));
        
        driver.Quit();
    }
}
```

<br/>

#### 예시 2: 여러 요소 찾기

```csharp
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.ObjectModel;

class ImplicitWaitExample2
{
    static void Main()
    {
        IWebDriver driver = new ChromeDriver();
        
        // 10초 동안 implicit wait 설정
        driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
        
        driver.Navigate().GoToUrl("https://example.com");
        
        // 여러 요소가 존재할 때까지 최대 10초 동안 기다립니다.
        ReadOnlyCollection<IWebElement> elements = driver.FindElements(By.ClassName("sampleClass"));
        
        driver.Quit();
    }
}
```

<br/>

## 3. Explicit waits 활용 예시

<br/>

#### 예시 1: 요소가 클릭 가능할 때까지 기다리기

```csharp
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;

class ExplicitWaitExample1
{
    static void Main()
    {
        IWebDriver driver = new ChromeDriver();
        
        driver.Navigate().GoToUrl("https://example.com");
        
        WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        
        // 요소가 클릭 가능할 때까지 최대 10초 동안 기다립니다.
        IWebElement element = wait.Until(ExpectedConditions.ElementToBeClickable(By.Id("sampleElement")));
        element.Click();
        
        driver.Quit();
    }
}
```

<br/>

#### 예시 2: 요소가 표시될 때까지 기다리기

```csharp
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;

class ExplicitWaitExample2
{
    static void Main()
    {
        IWebDriver driver = new ChromeDriver();
        
        driver.Navigate().GoToUrl("https://example.com");
        
        WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        
        // 요소가 표시될 때까지 최대 10초 동안 기다립니다.
        IWebElement element = wait.Until(ExpectedConditions.VisibilityOfElementLocated(By.Id("sampleElement")));
        
        driver.Quit();
    }
}
```

<br/>

이 두 방법 중 어떤 것을 사용할지는 테스트의 요구사항과 상황에 따라 결정해야 합니다.  
하지만 일반적으로 Explicit waits는 조건별로 대기 시간을 설정할 수 있어 더 유연한 선택이 될 수 있습니다.

<br/><br/>

## 4. 마치며

이상으로 Selenium에서 사용되는 두 가지 주요 대기 전략, **Implicit waits**와 **Explicit waits**에 대해 알아보았습니다.  
두 방법은 각각의 장점과 적용 시나리오가 있으며, 웹 자동화 테스트에서 빈번하게 사용됩니다.

- **Implicit waits**는 설정이 간단하고 웹드라이버의 생명주기 동안 일관되게 적용되기 때문에 빠르게 테스트를 작성할 수 있습니다.
  
- **Explicit waits**는 조건에 따른 더 세밀한 제어가 가능하므로 복잡한 웹 애플리케이션에 효율적으로 대응할 수 있습니다.

<br/>

어느 방법이 더 좋다고 단정지을 수는 없으며, 테스트의 요구사항과 복잡성에 따라 적절한 대기 전략을 선택하는 것이 중요합니다.  
테스트 자동화의 성공은 디테일에 있습니다.  
단순히 코드를 실행하는 것이 아니라, 실제 사용자 경험을 얼마나 정확하게 반영하는가가 중요한데, 이를 위해서는 대기 전략을 잘 활용하는 것이 빠질 수 없는 요소입니다.  

<br/><br/><br/><br/><br/>
