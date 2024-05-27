<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>나의 코메 모집</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/share.css" type="text/css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/pmj.css" type="text/css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/myTeam.css" type="text/css">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.7.1.min.js"></script>

</head>
<body>
<!-- 헤더 링크-->
<div class="page-container">
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
<div id="flex_container">
<!-- 사이드바 -->
<div class="float-A">
    <div class="myCount">
        <a href="${pageContext.request.contextPath}/member/modifyUserForm.do" class="sideB_font">나의 정보</a>
        <a class="sideB_font">My 코메</a>
        <a href="${pageContext.request.contextPath}/member/myTeam.do">참여중인 팀</a>
        <a href="${pageContext.request.contextPath}/member/myPageShin.do">나의 코메 신청</a>
        <a href="${pageContext.request.contextPath}/member/myPageMo.do">나의 코메 모집</a>
        <a href="${pageContext.request.contextPath}/member/myPageBookMark.do">북마크</a>
        <a class="sideB_font">나의 활동</a>
        <a href="${pageContext.request.contextPath}/member/myWrite.do">내가 쓴 글</a>
        <a href="${pageContext.request.contextPath}/member/myReply.do">내가 쓴 댓글</a>
    </div>   
</div>
<!-- 사이드바 끝 -->
<!-- 메인 정보 수정 -->
<div class="float-C">
<div class="align-center"><!-- myPage-TItleText만 가운데 정렬됨 -->
	<h3 class="mYPage-TitleText">나의 코메 모집</h3>
</div>

<div class="myPage-line-box" onclick="window.location.href='${pageContext.request.contextPath}/member/myPageMoShin.do'">
<div class="team-left">
<div class="skill_font_T">글자</div>
<div class="projectName_font">${rboard.rb_pj_title}</div>
</div>

<div class="team-right">
<div class="delete-green">신청 취소</div>
<div class="team-count">모집인원:${rboard.rb_teamsize}명</div>
<div>남은 기간 2024.05.23~2024.06.10</div>
</div>
</div>

</div>
<!-- 메인 정보 수정 끝 -->
</div><!-- flex_container끝 -->
</div><!-- page-container끝 -->
</body>
</html>
