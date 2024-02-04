
const user = {
  id:'asd@naver.com',
  pw:'spdlqj123!@'
}

/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/


/* --------------------- 1. email 정규표현식을 사용한 validation --------------------- */

const idField = document.querySelector('#userEmail');

idField.addEventListener('input',handleCheckID);


function handleCheckID(){
  if(emailReg(this.value) === true){
    console.log('id 형식 부합');
    this.classList.remove('is--invalid');
  } else{
    console.log('id 형식 x');
    this.classList.add('is--invalid');
  }
}

function emailReg(text){
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase())
}




/* ----------------------- 2. pw 정규표현식을 사용한 validation ---------------------- */

const passwordField = document.querySelector('#userPassword');

passwordField.addEventListener('input',handleCheckPassword);

function handleCheckPassword(){
  if(pwReg(this.value) === true){
    console.log('pw 형식 부합');
    this.classList.remove('is--invalid');
  } else{
    console.log('pw 형식 x');
    this.classList.add('is--invalid');
  }
}

function pwReg(text){
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase())
}


/* ------------------- 3. input의 id와 pw를 user의 해당 프로퍼티와 비교 ------------------ */
function idCheck (){
  console.log('click');
      if (idField.value === user.id){
        console.log('아이디가 일치합니다!');
        return true;
      } else {
        console.log('아이디가 틀립니다!');
        return false;
}}


let pwCheck = ()=>{
  console.log('click');
      if (passwordField.value === user.pw){
        console.log('비밀번호가 일치합니다!');
        return true;
      } else {
        console.log('비밀번호가 틀립니다!');
        return false;
}}



/* ----------------------- 4. 두 값이 모두 일치한다면 다음페이지로 이동 ----------------------- */
const submit = document.querySelector('.btn-login');
submit.addEventListener('click',handleSubmit);
submit.addEventListener('click',login);

function handleSubmit(e){
  e.preventDefault();
  console.log('제출!');
}


function login(){
  if(idField.value === ''){
    alert('아이디를 입력해주세요')
  } else if (passwordField.value === ''){
    alert('비밀번호를 입력해주세요')
  } else {
    if(idCheck() == true && pwCheck() == true){
      window.location.href = 'welcome.html'
    } else {
      alert('아이디와 비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요!');
    }
  }
}

