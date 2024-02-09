# 엘리멘트 포스터 네비게이션 구현

---

썸네일 이미지를 클릭하면 메인 이미지와 배경이 바뀔 수 있도록 코드 로직을 작성해주세요.

---






### 요구사항

1. [이벤트 처리 방식을 사용하여 클릭 이벤트를 걸어주세요.](#click-event)
    1. 이벤트 위임
    2. 반복문
2. 이미지와 색상의 데이터는 `data.js` 에서 불러와주세요.
3. 각 li 항목들을 클릭하면 배경 색상과 메인 비주얼 이미지를 변경해주세요.
    1. 배경색 변경 ( colorB의 기본값은 `#000` 으로 한다 )
    2. 이미지 변경
4. 비주얼이 변경되면 상단에 비주얼에 맞는 이름으로 변경해주세요.
5. 함수를 분리시켜주세요.
    1. `setBgColor` 함수
    2. `setImage` 함수
    3. `setNameText` 함수
6. 가독성이 좋은 코드로 리팩토링 해주세요.

---
[개발 일지](https://grey-whale-932.notion.site/MISSION-02-f706bd7146f84833b74f63919ffdd803?pvs=4)

### 클릭 이벤트
* nav에 이벤트를 걸어 안의 li가 <b>이벤트 위임</b> 받아 동작하도록 설정
* `const target = e.target.closest('li');`
  : e.target 은 직접 클릭된 대상을 가리키는데 여기서 가장 가까운 li 요소를 할당받는 변수를 선언   

* `target.classList.add('is-active)`
  : 선택된 target에 'is-active' 클래스를 추가

* nav 안에서 li가 아닌 대상을 클릭할 시 e.target에 li가 잡히지 않아 target값에 null이 할당되고 target을 사용하는 코드에서 에러를 발생시킴
 ⇒ <b>`if(!target) return;`</b> 
  : 조건문으로 !target (아무값이 없다면 true가 되서 조건문 실행됨) 일때 retrun; 으로 함수 종료   
     
* 함수가 실행될때마다 addClass(target,’is-acitve’) 함수로 인해 선택된 li들이 모두 is-active 클래스를 달게됨. 그것을 방지하기 위해 handleNav 함수 실행시 마다 모든 li에 ‘is-active’을 삭제한 뒤에 addClass 가 실행되도록 함.


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





### data 불러오기
이미지와 색상의 데이터는 `data.js` 에서 불러오기
모듈 프로그래밍을 이용한 다른 파일에 있는 객체 불러오기
```javascript
export const data = [
  ...
];
```
```javascript
import {data} from './data.js'
```


### 배경 색상과 메인 비주얼 이미지를 변경해주세요.


### 상단에 비주얼에 맞는 이름으로 변경
