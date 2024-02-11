# 엘리멘트 포스터 네비게이션 구현

---

썸네일 이미지를 클릭하면 메인 이미지와 배경이 바뀔 수 있도록 코드 로직을 작성해주세요.

---






## 요구사항

1. [x] [이벤트 처리 방식을 사용하여 클릭 이벤트를 걸어주세요](#클릭-이벤트)
    1. 이벤트 위임
    2. 반복문
2. [x] [이미지와 색상의 데이터는 `data.js` 에서 불러와주세요](#data-불러오기)
3. [x] [각 li 항목들을 클릭하면 배경 색상과 메인 비주얼 이미지를 변경해주세요](#클릭-이벤트에-따른-데이터-변경)
    1. [배경색 변경 ( colorB의 기본값은 `#000` 으로 한다 )](#배경-색상-변경)
    2. [이미지 변경](#이미지와-대체텍스트-변경)
4. [x] [비주얼이 변경되면 상단에 비주얼에 맞는 이름으로 변경해주세요](#상단-이름-변경)
5. [x] [함수를 분리시켜주세요](#관심사에-따른-함수-분리)
    1. `setBgColor` 함수
    2. `setImage` 함수
    3. `setNameText` 함수
6. [ ] 변경되는 비주얼에 맞게 해당 오디오를 재생시켜주세요
7. [ ] 가독성이 좋은 코드로 리팩토링 해주세요

<br>

---

## 클릭 이벤트
><span style="color:gray; font-size:0.7rem">이벤트 처리 방식을 사용하여 클릭 이벤트를 걸기 - 이벤트 위임과 반복문을 사용하여</span>

```javascript
const nav = getNode('.nav');
const li = nav.querySelectorAll('li');

const visualImg = getNode('.visual img');
const nickName = getNode('h1');

nav.addEventListener('click', handleNav);


function handleNav(e){

  const target = e.target.closest('li');

  if(!target) return;

  const list = [...li];

  list.forEach((li)=>{
    removeClass(li, 'is-active');
  })

  addClass(target,'is-active');

  const index = target.dataset.index;
}
```


* nav에 이벤트를 걸어 안의 li가 <b>이벤트 위임</b> 받아 동작하도록 설정
* `const target = e.target.closest('li');`    
  : e.target 은 직접 클릭된 대상을 가리키는데 여기서 가장 가까운 li 요소를 할당받는 변수를 선언   

* `target.classList.add('is-active)`   
  : 선택된 target에 'is-active' 클래스를 추가

* nav 안에서 li가 아닌 대상을 클릭할 시 e.target에 li가 잡히지 않아 target값에 null이 할당되고 target을 사용하는 코드에서 에러를 발생시킴   
 ⇒ `if(!target) return;`   
: 조건문으로 !target (아무값이 없다면 true가 되서 조건문 실행됨) 일때 retrun; 으로 함수 종료   
     
* 함수가 실행될때마다 addClass(target,’is-acitve’) 함수로 인해 선택된 li들이 모두 is-active 클래스를 달게됨
   ``` javascript
  const list = [...li];

  list.forEach((li)=>{
    removeClass(li, 'is-active');
  })
  ```      
  ⇒ querySelectorAll로 선택된 li들은 유사 배열이므로 spread syntax를 사용해 배열로 변환   
 ⇒ forEach <b>반복문</b>을 돌려 각각의 li를 선택해 'is-acitve'를 모두 제거   
 ⇒ 그 후 에 선택된 target에만 'is-acitv'클래스를 더하기 ( *순서 중요* )   

<br>
<br>
<br>
<br>
<br>

## data 불러오기
> <span style="color:gray; font-size:0.7rem">이미지와 색상의 데이터는 `data.js` 에서 불러오기  </span>
```javascript
export const data = [
  ...
];
```
```javascript
import {data} from './data.js'
```
* <b>모듈 프로그래밍</b>을 이용한 다른 파일에 있는 객체 불러오기


<br>
<br>
<br>
<br>
<br>

## 클릭 이벤트에 따른 데이터 변경
### 배경 색상 변경
```javascript
function handleNav(e){
  ...
  const index = target.dataset.index;
  ...
}
```
```javascript
function setBgColor (index){

let colorA = data[index-1].color[0];
let colorB = data[index-1].color[1];

if(!colorB) colorB = '#000';

setCss('body', 'background', 
        `linear-gradient(to bottom, ${colorA}, ${colorB})`);
}
```

* `<li class="is-active" data-index="1">...</li>`   
`const index = target.dataset.index;`   
: li에 사용된 비표준 속성 'data-index'에 할당된 번호를 data 배열에서 원하는 데이터가 있는 배열의 순서로 사용

* `let colorA = data[index-1].color[0];`   
: 배열의 순서는 0부터 시작하므로 [index-1]로 data 배열 내에서 원하는 객체가 있는 위치를 정확히 잡는다. 그리고 해당 객체의 color 프로퍼티 키를 선택. color 키는 배열이므로 첫번째 값을 잡기 위해 [0]으로 불러옴. *(colorB도 동일)*

* `if(!colorB) colorB = '#000';`   
: colorB의 기본 값을 #000 으로 설정

<br>
<br>
<br>

### 이미지와 대체텍스트 변경
```javascript
function setImage (target){
  const targetImg = target.querySelector('img');

  attr(visualImg, 'src', targetImg.src);
  attr(visualImg, 'alt', targetImg.alt);
}
```
* `const targetImg = target.querySelector('img');`   
: border를 클릭했을 시 setImage 함수가 원하는 대로 작동하지 않는 문제를 해결하기 위해 새로운 변수 선언 *([자세히 보기](https://grey-whale-932.notion.site/MISSION-02-f706bd7146f84833b74f63919ffdd803#e3bdfcb7f07f4e4e9210cf7930767b52))*


<br>
<br>
<br>

### 상단 이름 변경
```javascript
function setNameText (index){
 nickName.textContent = data[index-1].name;
}
```
* textContet 로 요소 내의 태그는 제외하고 오로지 텍스트만 수정 

<br>
<br>
<br>
<br>
<br>

## 관심사에 따른 함수 분리
```javascript
function handleNav(e){
  ...
  setBgColor(index);
  setImage(target);
  setNameText(index);
}

function setBgColor (index){...}
function setImage (target){...}
function setNameText (index){...}
```
* 각각의 관심사에 따른 함수를 분리
* 함수만 실행시켰을때는 외부 함수가 블록 스코프에 의해서 handleNav()함수 내부의 변수에 접근하지 못한다. 따라서 각 외부 함수의 인자로 handleNav의 변수를 지정 -> 매개변수로 받아 작동하도록 작성

<br>
<br>
<br>

---
[![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)](https://grey-whale-932.notion.site/MISSION-02-f706bd7146f84833b74f63919ffdd803?pvs=4)