var slides1 = document.querySelector('.wrapper1'),
show1 = document.querySelector('.mini-container1'),
	show1 = document.querySelector('.mini-container1'),
  slide1 = document.querySelectorAll('.mini1'),
  prevBtn1 = document.querySelector('.p1'),
  nextBtn1 = document.querySelector('.n1'),
  currentIdx1 = 0,
  slideCount1 = slide1.length,//기존 슬라이드 개수(8)
  slideWidth1 = 250,//슬라이드 이미지 넓이
  slideMargin1 = 40,//좌,우 마진있어서 * 2함
  position1 = 0,

  move1 = 0,
  AllSlideCount1 = slideCount1 * 3, //전체 슬라이드 개수

	showWidth1 = (slideWidth1+slideMargin1) * slideCount1 + 'px',//4개까지 커버 가능
	showOverWidth1= (slideWidth1+slideMargin1) * 4 + 'px',//5개 이상일 경우
  newWidth1 = (slideWidth1+slideMargin1) * AllSlideCount1  + 'px';//wrapper 너비
/*------------------------------------------------------------------*/

	makeClone1();

function makeClone1(){
   /* 복제&추가 */
   for(var i =0; i<slideCount1; i++){//기존 슬라이드 뒤에 복제본 추가
      //a.cloneNode()->a요소 복제/a.cloneNode(true)->a요소의 자식까지 복제
      var cloneSlide1 = slide1[i].cloneNode(true);
      cloneSlide1.classList.add('clone');
      //기존의 요소 뒤에 추가 ->appendChild
      //a.appendChild(b) -> a요소 뒤에 b추가
      slides1.appendChild(cloneSlide1);
   }
   for(var i = slideCount1-1; i>=0; i--){//기존 슬라이드 앞에 복제본 추가
      var cloneSlide1 = slide1[i].cloneNode(true);
      cloneSlide1.classList.add('clone');
      //기존의 요소 앞에 추가 ->appendChild
      //a.prepend(b) -> a요소 앞에 b추가
      slides1.prepend(cloneSlide1);
   }
   
   //전체 슬라이드의 길이를 구해 wrapper의 길이로 넣어야 가로로 정렬이 됨
   slides1.style.width = newWidth1;
   position1 = -((slideWidth1+slideMargin1+5) * slideCount1);//290 * 8 = 2320
  //중간 슬라이드가 보이는 화면 중앙에 있어야 이전버튼을 누르더라도 슬라이드가 보임
  slides1.style.transform = 'translateX('+ position1 +'px)';//x축 -2320px
   //생성된 슬라이드의 개수에 따라 보여지는 창의 너비가 달라짐
   
  
  if(slideCount1 < 5 ){//5개 미만인 경우
	  show1.style.width = showWidth1;
  }else{//5개 이상일 경우 화면이 너무 커지면 흘러넘침
	  show1.style.width=showOverWidth1;
  }
}

/*------------------------------------------------------------------*/

/* 버튼 */
nextBtn1.addEventListener('click', function () {//다음->왼쪽으로 이동->x축 마이너스로 이동
   moveSlide1(currentIdx1 + 1);//currentIdx 는 양수가 됨
});

prevBtn1.addEventListener('click', function () {//이전->x축 플러스로 이동
   moveSlide1(currentIdx1 - 1);//currentIdx 는 음수가 됨
});

/* 무한루프 */
function moveSlide1(num1){
	 currentIdx1 = num1;
	  
	  /* 좌,우 이동방향 */	
	  /* 다음은 -, 이전은 + 로 이동 */
	  move1 = position1 + (-(slideWidth1 +slideMargin1+4) * currentIdx1) ;
	  slides1.style.transform = 'translateX(' + move1 + 'px)';
	  /* transform='translate'는 명시된 거리만큼 이동함
	  	여기서는 이미 postion만큼 이동한 상태여서 그런지 position의 위치에서 플러스로 더 이동하지 않고
	  	0에서부터 이동하는 것처럼 동작되어서 position을 더한 값을 거리로 잡음 */
	  
      /* 다시 돌아옴 */
      if(currentIdx1 == slideCount1 || currentIdx1 == -slideCount1){//4이거나 -4인 경우
         slides1.style.transform = 'translateX('+ position1 +'px)';
            currentIdx1 = 0;
      }
}
/*-----------------------------------------------------------------------------------------*/
var slides = document.querySelector('.wrapper2'),
  slide = document.querySelectorAll('.mini2'),
  show = document.querySelector('.mini-container2'),
  prevBtn = document.querySelector('.p2'),
  nextBtn = document.querySelector('.n2'),
  currentIdx = 0,
  slideCount = slide.length,//기존 슬라이드 개수(4)
  slideWidth = 250,//슬라이드 이미지 넓이
  slideMargin = 40,//좌,우 마진있어서 * 2함
  position = 0,

  move = 0,
  AllSlideCount = slideCount * 3, //전체 슬라이드 개수
showWidth = (slideWidth+slideMargin) * slideCount + 'px',
showOverWidth= (slideWidth+slideMargin) * 4 + 'px',//5개 이상일 경우
  newWidth = (slideWidth+slideMargin) * AllSlideCount  + 'px';//wrapper 너비
/*------------------------------------------------------------------*/

	makeClone();

function makeClone(){
   /* 복제&추가 */
   for(var i =0; i<slideCount; i++){//기존 슬라이드 뒤에 복제본 추가
      //a.cloneNode()->a요소 복제/a.cloneNode(true)->a요소의 자식까지 복제
      var cloneSlide = slide[i].cloneNode(true);
      cloneSlide.classList.add('clone');
      //기존의 요소 뒤에 추가 ->appendChild
      //a.appendChild(b) -> a요소 뒤에 b추가
      slides.appendChild(cloneSlide);
   }
   for(var i = slideCount-1; i>=0; i--){//기존 슬라이드 앞에 복제본 추가
      var cloneSlide = slide[i].cloneNode(true);
      cloneSlide.classList.add('clone');
      //기존의 요소 앞에 추가 ->appendChild
      //a.prepend(b) -> a요소 앞에 b추가
      slides.prepend(cloneSlide);
   }
   
   //전체 슬라이드의 길이를 구해 wrapper의 길이로 넣어야 가로로 정렬이 됨
   slides.style.width = newWidth;
   position = -((slideWidth+slideMargin+5) * slideCount);//290 * 4 = 1160
  //중간 슬라이드가 보이는 화면 중앙에 있어야 이전버튼을 누르더라도 슬라이드가 보임
  slides.style.transform = 'translateX('+ position +'px)';//x축 -1160px
   
   if(slideCount < 5 ){//5개 미만인 경우
	  show.style.width = showWidth;
  }else{//5개 이상일 경우 화면이 너무 커지면 흘러넘침
	  show.style.width=showOverWidth;
  }
  
}

/*------------------------------------------------------------------*/

/* 버튼 */
nextBtn.addEventListener('click', function () {//다음->왼쪽으로 이동->x축 마이너스로 이동
   moveSlide(currentIdx + 1);//currentIdx 는 양수가 됨
});

prevBtn.addEventListener('click', function () {//이전->x축 플러스로 이동
   moveSlide(currentIdx - 1);//currentIdx 는 음수가 됨
});

/* 무한루프 */
function moveSlide(num){
	 currentIdx = num;
	  
	  /* 좌,우 이동방향 */	
	  /* 다음은 -, 이전은 + 로 이동 */
	  move = position + (-(slideWidth +slideMargin+4) * currentIdx) ;
	  slides.style.transform = 'translateX(' + move + 'px)';
	  /* transform='translate'는 명시된 거리만큼 이동함
	  	여기서는 이미 postion만큼 이동한 상태여서 그런지 position의 위치에서 플러스로 더 이동하지 않고
	  	0에서부터 이동하는 것처럼 동작되어서 position을 더한 값을 거리로 잡음 */
	  
      /* 다시 돌아옴 */
      if(currentIdx == slideCount || currentIdx == -slideCount){//4이거나 -4인 경우
         slides.style.transform = 'translateX('+ position +'px)';
            currentIdx = 0;
      }
}
/*---------------------------------------------------------------------------------------------*/
var slides3 = document.querySelector('.wrapper3'),
show3 = document.querySelector('.mini-container3'),
	show3 = document.querySelector('.mini-container3'),
  slide3 = document.querySelectorAll('.mini3'),
  prevBtn3 = document.querySelector('.p3'),
  nextBtn3 = document.querySelector('.n3'),
  currentIdx3 = 0,
  slideCount3 = slide3.length,//기존 슬라이드 개수(8)
  slideWidth3 = 250,//슬라이드 이미지 넓이
  slideMargin3 = 40,//좌,우 마진있어서 * 2함
  position3 = 0,

  move3 = 0,
  AllSlideCount3 = slideCount3 * 3, //전체 슬라이드 개수

	showWidth3 = (slideWidth3+slideMargin3) * slideCount3 + 'px',//4개까지 커버 가능
	showOverWidth3= (slideWidth3+slideMargin3) * 4 + 'px',//5개 이상일 경우
  newWidth3 = (slideWidth3+slideMargin3) * AllSlideCount3  + 'px';//wrapper 너비
/*------------------------------------------------------------------*/

	makeClone3();

function makeClone3(){
   /* 복제&추가 */
   for(var i =0; i<slideCount3; i++){//기존 슬라이드 뒤에 복제본 추가
      //a.cloneNode()->a요소 복제/a.cloneNode(true)->a요소의 자식까지 복제
      var cloneSlide3 = slide3[i].cloneNode(true);
      cloneSlide3.classList.add('clone');
      //기존의 요소 뒤에 추가 ->appendChild
      //a.appendChild(b) -> a요소 뒤에 b추가
      slides3.appendChild(cloneSlide3);
   }
   for(var i = slideCount3-1; i>=0; i--){//기존 슬라이드 앞에 복제본 추가
      var cloneSlide3 = slide3[i].cloneNode(true);
      cloneSlide3.classList.add('clone');
      //기존의 요소 앞에 추가 ->appendChild
      //a.prepend(b) -> a요소 앞에 b추가
      slides3.prepend(cloneSlide3);
   }
   
   //전체 슬라이드의 길이를 구해 wrapper의 길이로 넣어야 가로로 정렬이 됨
   slides3.style.width = newWidth3;
   position3 = -((slideWidth3+slideMargin3+5) * slideCount3);//290 * 8 = 2320
  //중간 슬라이드가 보이는 화면 중앙에 있어야 이전버튼을 누르더라도 슬라이드가 보임
  slides3.style.transform = 'translateX('+ position3 +'px)';//x축 -2320px
   //생성된 슬라이드의 개수에 따라 보여지는 창의 너비가 달라짐
   
  
  if(slideCount3 < 5 ){//5개 미만인 경우
	  show3.style.width = showWidth3;
  }else{//5개 이상일 경우 화면이 너무 커지면 흘러넘침
	  show3.style.width=showOverWidth3;
  }
}

/*------------------------------------------------------------------*/

/* 버튼 */
nextBtn3.addEventListener('click', function () {//다음->왼쪽으로 이동->x축 마이너스로 이동
   moveSlide3(currentIdx3 + 1);//currentIdx 는 양수가 됨
});

prevBtn3.addEventListener('click', function () {//이전->x축 플러스로 이동
   moveSlide3(currentIdx3 - 1);//currentIdx 는 음수가 됨
});

/* 무한루프 */
function moveSlide3(num3){
	 currentIdx3 = num3;
	  
	  /* 좌,우 이동방향 */	
	  /* 다음은 -, 이전은 + 로 이동 */
	  move3 = position3 + (-(slideWidth3 +slideMargin3+4) * currentIdx3) ;
	  slides3.style.transform = 'translateX(' + move3 + 'px)';
	  /* transform='translate'는 명시된 거리만큼 이동함
	  	여기서는 이미 postion만큼 이동한 상태여서 그런지 position의 위치에서 플러스로 더 이동하지 않고
	  	0에서부터 이동하는 것처럼 동작되어서 position을 더한 값을 거리로 잡음 */
	  
      /* 다시 돌아옴 */
      if(currentIdx3 == slideCount3 || currentIdx3 == -slideCount3){//4이거나 -4인 경우
         slides3.style.transform = 'translateX('+ position3 +'px)';
            currentIdx3 = 0;
      }
}





