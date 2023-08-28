---
title: 빠르게 배우는 Selenium과 .NET - 3가지 실용적인 예제로 알아보기
subtitle: Selenium 시리즈
readtime: 10 min
author: wookshin
tags: [dotnet]
comments: true
---

<br/>

# 빠르게 배우는 Selenium과 .NET : 3가지 실용적인 예제로 알아보기

<br/>

## 1. Selenium이 무엇인지?

Selenium은 웹 애플리케이션의 자동화 테스트를 위한 프레임워크입니다.  
웹 브라우저의 동작을 자동화하여 웹 페이지의 다양한 요소들과 상호작용하는 테스트 케이스를 작성할 수 있습니다.  
Selenium은 여러 프로그래밍 언어(Java, C#, Python, Ruby 등)에서 지원되며 다양한 웹 브라우저와 플랫폼에서 실행될 수 있습니다.

<br/><br/>

## 2. Selenium을 왜 사용하는지

#### 1) 브라우저 자동화

자동 로그인, 폼 제출, 클릭 등의 웹 브라우저 작업을 자동화할 수 있습니다.

<br/>

#### 2) 크로스 브라우저 테스트

여러 웹 브라우저와 버전에서 웹 애플리케이션의 동작을 검증할 수 있습니다.

<br/>

#### 3) 지속적 통합

CI/CD 파이프라인에 포함하여 빌드 및 배포 프로세스 중 자동화된 UI 테스트를 수행할 수 있습니다.  
명령 로직을 분리함으로써, 단위 테스트가 더 쉬워집니다.

<br/><br/>

## 3. .NET에서 Selenium의 활용하는 예제 3가지

<br/>

#### 1) 로그인 페이지 테스트

```csharp
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

class LoginTest
{
    static void Main()
    {
        using (var driver = new ChromeDriver())
        {
            driver.Navigate().GoToUrl("https://example.com/login");

            var usernameInput = driver.FindElement(By.Id("username"));
            var passwordInput = driver.FindElement(By.Id("password"));
            var loginButton = driver.FindElement(By.Id("loginButton"));

            usernameInput.SendKeys("testuser");
            passwordInput.SendKeys("password123");
            loginButton.Click();

            // 로그인 후의 페이지 상태나 요소들을 확인
        }
    }
}
```

<br/>

#### 2) 웹 페이지의 특정 요소 존재 검증

```csharp
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

class ElementExistTest
{
    static void Main()
    {
        using (var driver = new ChromeDriver())
        {
            driver.Navigate().GoToUrl("https://example.com");

            bool isElementPresent = driver.FindElements(By.Id("targetElement")).Count > 0;

            if (isElementPresent)
            {
                Console.WriteLine("Element exists!");
            }
            else
            {
                Console.WriteLine("Element not found!");
            }
        }
    }
}
```

<br/>

#### 3) 웹 페이지에서 데이터 스크래핑

```csharp
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

class DataScrapingTest
{
    static void Main()
    {
        using (var driver = new ChromeDriver())
        {
            driver.Navigate().GoToUrl("https://example.com/products");

            var productName = driver.FindElement(By.CssSelector(".product-name")).Text;
            var productPrice = driver.FindElement(By.CssSelector(".product-price")).Text;

            Console.WriteLine($"Product Name: {productName}");
            Console.WriteLine($"Product Price: {productPrice}");
        }
    }
}
```

<br/>

위의 코드들은 Selenium을 .NET 환경에서 사용하는 간단한 예제들입니다.  
실제 활용시에는 더 복잡한 시나리오나 예외 처리 등을 고려하여 코드를 작성해야 합니다.

<br/><br/>

## 4. 마치며

Selenium은 웹 테스팅에 있어서 강력한 도구입니다.  
웹 애플리케이션의 다양한 요소와 상호작용하며 테스트를 자동화하면 개발 및 배포 과정을 더욱 안정적으로 만들 수 있습니다.  
.NET에서도 쉽게 활용할 수 있어, 많은 개발자들에게 추천되는 툴입니다.

<br/><br/><br/><br/><br/>
