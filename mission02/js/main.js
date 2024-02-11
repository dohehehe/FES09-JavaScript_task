
/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

// 모듈 
import {data} from './data.js'
import {AudioPlayer} from './audio.js'


const nav = getNode('.nav');
const li = nav.querySelectorAll('li');

const visualImg = getNode('.visual img');
const nickName = getNode('h1');

nav.addEventListener('click', handleNav);


// 클릭 이벤트 함수
function handleNav(e){

  const target = e.target.closest('li');

  if(!target) return;

  const list = [...li];
  
  list.forEach((li)=>{
    removeClass(li, 'is-active');
  })

  addClass(target,'is-active');

  const index = target.dataset.index;



  // 함수 실행
  setBgColor(index);
  setImage(target);
  setNameText(index);

  // 첫번째 오디오 시도 함수 실행
  // playAudio(index);


  // (두번째 오디오 시도 _ 진행중) AudioPlayer 클래스를 통한 구현
  // 다른 오디오가 진행 중일때 멈추고 새로 할당 받은 오디오 재생이 안됨

      // let source = `./assets/audio/${data[index - 1].audio}`

      // let audioPlayer = new AudioPlayer(source);

      // console.log(audioPlayer.isPlaying());
      // if(!audioPlayer.isPlaying()){
      //   audioPlayer.pause();
      // }

      // audioPlayer.play();
}



// 배경색 바꾸는 함수
      function setBgColor (index){

        let colorA = data[index-1].color[0];
        let colorB = data[index-1].color[1];

        if(!colorB) colorB = '#000';

        setCss('body', 'background', 
          `linear-gradient(to bottom, ${colorA}, ${colorB})`);
      }


// visualImg 변경 함수
      function setImage (target){
        const targetImg = target.querySelector('img');

        attr(visualImg, 'src', targetImg.src);
        attr(visualImg, 'alt', targetImg.alt);
      }


// h1 텍스트 변경 함수 
      function setNameText (index){
        nickName.textContent = data[index-1].name;
      }




// (첫번째 오디오 시도 _ 성공) 오디오 플레이 함수 

      // let currentAudio;
      // function playAudio(index) {
        
      //     if (currentAudio) {
      //         currentAudio.pause(); 
      //     }

      //     let audio = new Audio(`./assets/audio/${data[index - 1].audio}`);
      //     audio.play();

      //     currentAudio = audio; 
      // }
























