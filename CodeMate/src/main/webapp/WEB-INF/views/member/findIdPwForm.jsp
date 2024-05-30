<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/share.css" type="text/css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/findIdPw.css" type="text/css">
</head>
<body>
	<div class="page-container">
		<div class="page-main">
			<!-- 헤더 -->
			<div id="login_logo">
				<a href="${pageContext.request.contextPath}/main/main.do"
					class="logo"> <img id="logo_pic_login"
					src="${pageContext.request.contextPath}/images/로고1.png" height="80"
					width="80"> CODEMATE
				</a>
			</div>
			<h2>계정 찾기</h2>
			<!-- 찾기 창 슬라이드 -->
			<div class="slider-container">
				<div class="slider-wrapper" id="sliderWrapper">
					
					<!-- 아이디 찾기 -->
					<div class="slide">
						<form class="idForm">
							<input type="text" id="phoneInput" placeholder="전화번호" required>
							<input type="email" id="emailInput" placeholder="이메일 주소" required>
							<button type="submit">아이디 찾기</button>
							<a class="canc" href="${pageContext.request.contextPath}/member/loginForm.do">취소하기</a>
						</form>
						<div class="result"></div>
					</div>
					
					<!-- 비밀번호 찾기 -->
					<div class="slide">
					<form class="pwForm">
							<input type="text" id="idInput" placeholder="아이디" required>
							<input type="text" id="phoneInput" placeholder="전화번호" required>
							<input type="email" id="emailInput" placeholder="이메일 주소" required>
							<button type="submit">비밀번호 찾기</button>
							<a class="canc">취소하기</a>
						</form>
						<div class="result"></div>
					</div>
				</div><!-- end of sliderWrapper -->
				
			</div><!-- end of slider-container -->
			<div id="btn">
			<button id="Id">
				아이디찾기
				</button>
				<button id="Pw">
				비밀번호 찾기
				</button>
				<hr id="btnHr" size="2px">
			</div>
	</div><!-- end of pagemain -->
	</div>
	<script>
    document.addEventListener("DOMContentLoaded", function () {
        var sliderWrapper = document.getElementById("sliderWrapper");
        var IdButton = document.getElementById("Id");
        var PwButton = document.getElementById("Pw");
        var slides = document.querySelectorAll(".slide");
        var slideIndex = 0;
        var totalSlides = slides.length;
     
        PwButton.addEventListener("click", prevSlide);
        IdButton.addEventListener("click", IdSlide);
            
            function showSlide(index) {
                var offset = -index * 100;
                sliderWrapper.style.transform = 'translateX(' + offset + '%)';
            }

            function IdSlide() {//우측으로 이동
            	sliderWrapper.style.transform = 'translateX(0%)';
            }

            function prevSlide() {//좌측으로 이동
            	sliderWrapper.style.transform = 'translateX(-100%)';
            }
    });
</script>
</body>
</html>