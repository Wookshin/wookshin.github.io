---
title: Chrome Extension으로 웹 페이지의 XPath 정보 가져오기
subtitle: Chrome Extension 시리즈
readtime: 6 min
author: wookshin
tags: [etc]
comments: true
---

<br/>

# Chrome Extension으로 웹 페이지의 XPath 정보 가져오기

안녕하세요! 

오늘은 Google Chrome Extension을 만들어 웹 페이지의 HTML 요소에 마우스를 올리면 그 요소의 XPath 정보를 얻을 수 있는 신기한 툴을 만들어 볼 거에요.  

XPath는 XML 문서의 특정 부분을 찾을 수 있도록 해주는 언어입니다.  

웹 스크래핑이나 웹 테스팅에서 자주 사용되죠.

<br/>

## 1. Chrome Extension이란?

Chrome Extension은 Google Chrome 브라우저의 기능을 확장시키는 작은 프로그램입니다. 

예를 들어, 광고 차단, 비밀번호 관리, 화면 캡쳐 등 다양한 기능을 추가할 수 있어요.

<br/><br/>

## 2. 단계별 가이드

#### 2-1. Manifest 파일 생성 (`manifest.json`)

Chrome Extension을 만들기 위해 가장 먼저 필요한 것은 `manifest.json` 파일입니다. 

이 파일은 확장 프로그램의 메타데이터를 담고 있어요.

```json
{
  "manifest_version": 3,  // Manifest 파일의 버전. Chrome Extension v3를 사용하므로 3으로 설정.
  "name": "XPath Finder",  // 확장 프로그램의 이름
  "version": "1.0",        // 확장 프로그램의 버전
  "permissions": ["activeTab"], // 필요한 권한. 현재 활성 탭에 접근하기 위해 "activeTab"을 설정.
  "background": {          // 메인 웹 페이지와 팝업 페이지 간 소통 역할을 해주는 백그라운드 스크립트 설정
    "service_worker": "service-worker.js",
    "type": "module"
  },
  "content_scripts": [     // 메인 웹 페이지에서 동작하는 컨텐트 스크립트 설정
    {
      "matches": ["<all_urls>"], // 모든 URL에 적용
      "js": ["content.js"] // 메인 웹 페이지에서 context.js를 수행 
    }
  ],
  "action": {              // 팝업 UI 설정
    "default_popup": "popup.html"
  }
}
```

<br/>

#### 2-2. Content Script (`content.js`)

`content.js`는 웹 페이지에 주입되어 실행되는 JavaScript 파일입니다. 

이 스크립트를 통해 웹 페이지의 DOM 요소에 접근할 수 있어요.

마우스를 웹 페이지의 요소에 올리면 그 요소가 빨간색 테두리로 강조됩니다. 

요소를 클릭하면 XPath 정보가 확장 프로그램으로 전달됩니다.

```javascript
let isActive = false;
console.log(isActive);

// Xpath 얻어오기
function getXPath(element) {
  let xpath = '';
  for (; element && element.nodeType === 1; element = element.parentNode) {
    let id = Array.from(element.parentNode.children).indexOf(element) + 1;
    id = id > 1 ? `[${id}]` : '';
    xpath = `/${element.tagName}${id}${xpath}`;
  }
  return xpath.length ? `/${xpath}` : '';
}

// mouseover, mouseout 이벤트 시, Element Hightlight 기능 On/Off
document.addEventListener('mouseover', function(e) {
  if (isActive) {
    // Highlight element
    e.target.style.border = "2px solid red";
  }
});

document.addEventListener('mouseout', function(e) {
  if (isActive) {
    // Remove highlight
    e.target.style.border = "";
  }
});

// Click 시, Xpath를 가져와 Background Service에 전달
document.addEventListener('click', function(e) {
  if (isActive) {
    isActive = false;
    e.target.style.border = "";
    e.preventDefault();
    e.stopPropagation();
    
    const xpath = getXPath(e.target);
    // Send XPath to background script or popup
    chrome.runtime.sendMessage({action:'xpathToBackground', xpath: xpath});
  }
}, true);

// Chrome Extension(popup 페이지)에서 activate 요청 시, activate 활성화
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "activate") {
    isActive = !isActive;
  }
});

```

<br/>

#### 2-3. Background Script (`service-worker.js`)

Background Script는 확장 프로그램이 실행되는 동안 지속적으로 실행되는 스크립트입니다. 

웹 페이지와 팝업 페이지가 소통할 수 있도록 중간 다리 역할을 합니다.  

여기서는 XPath 정보를 받아 처리할 거에요.

```javascript
let latestXPath = '';

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // 메인 웹페이지에서 xpath를 전달해주면, 해당 이벤트를 처리하는 이벤트 핸들러 
  if (message.action = 'xpathToBackground') {
    latestXPath = message.xpath;
    console.log(`Received XPath: ${message.xpath}`);

    // 업데이트된 xpath 정보를 Chrome Extension Popup 페이지에 전달 
    chrome.runtime.sendMessage({action: "updateXPath", xpath: latestXPath});
  }
});
```

<br/>

#### 2-4. Popup UI (`popup.html`)

Popup UI는 사용자가 확장 프로그램 아이콘을 클릭했을 때 나타나는 작은 창입니다. 

여기에는 활성화 버튼(Activate)이 있을 거에요.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./popup.css" />
  </head>

  <body>
    <h1>Data Crowling</h1>
    <div><button id="activate">Activate</button></div>
    <div id="result-xpath"></div>
    <script src="./popup.js" type="module"></script>
  </body>
</html>
```

<br/>

#### 2-5. Popup UI Javscript (`popup.js`)

Popup UI에서 동작하는 Javascript 파일입니다. 

사용자가 activate 버튼을 누르면, 메인 웹페이지로 activate 요청을 보냅니다.

Background(service-worker.js)로부터 update된 Xpath 정보를 받아 화면에 출력하는 기능도 있습니다.

```js
document.getElementById('activate').addEventListener('click', function() {
    // Send message to content script to activate feature
    
    console.log('activate button clicked');

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "activate"});
    });
});

// Listen for updates to XPath from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateXPath") {
    // Update the UI or take other actions
    console.log(`Received updated XPath: ${message.xpath}`);
    document.getElementById('result-xpath').innerHTML = message.xpath;
  }
});
```

<br/><br/>

## 3. 예시: 온라인 쇼핑몰에서 상품 정보 가져오기

예를 들어, 온라인 쇼핑몰에서 특정 상품의 정보를 자동으로 추출하려면 어떻게 할까요? 

이 확장 프로그램을 사용하면 상품의 이름, 가격, 이미지 등을 가리키는 XPath를 쉽게 얻을 수 있습니다. 

그런 다음, 이 XPath를 사용하여 웹 스크래핑 프로그램을 만들 수 있어요.

<br/><br/>

## 4. 마무리

이렇게 간단하게 Chrome Extension을 만들어 웹 페이지의 XPath 정보를 쉽게 얻을 수 있습니다. 

이 기능은 웹 개발뿐만 아니라 데이터 분석, 웹 스크래핑 등 다양한 분야에서 유용하게 사용될 수 있어요.

지금까지 Chrome Extension으로 웹 페이지의 XPath 정보를 가져오는 방법에 대해 알아봤습니다. 

<br/><br/><br/><br/><br/>
