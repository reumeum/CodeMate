<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>나의 코메 모집</title>
<link href="${pageContext.request.contextPath}/images/로고1.png"
	rel="shortcut icon" type="image/x-icon">
<link
	href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap"
	rel="stylesheet">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/share.css" type="text/css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/pmj.css" type="text/css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/myTeam.css"
	type="text/css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/jquery-3.7.1.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/rboardWriteDelete.js"></script>

</head>
<body>
	<!-- 헤더 링크-->
	<div class="page-container">
		<jsp:include page="/WEB-INF/views/common/header.jsp" />
		<div id="flex_container">
			<!-- 사이드바 -->
			<jsp:include page="/WEB-INF/views/member/myPage_nav.jsp" />
			<!-- 사이드바 끝 -->
			<!-- 메인 정보 수정 -->
			<div class="float-C">
				<div class="align-center">
					<!-- myPage-TItleText만 가운데 정렬됨 -->
					<h3 class="mYPage-TitleText">나의 코메 모집</h3>
				</div>
				
				<c:if test="${empty rboardList}">
					<div class="none_message">나의 모집글이 없습니다</div>
				</c:if>
				<c:if test="${!empty rboardList}">
					<c:forEach var="rboard" items="${rboardList}">
						<c:if test="${rboard.team_status==0}">
							<div class="myPage-line-box"
								onclick="window.location.href='${pageContext.request.contextPath}/member/myPageMoShin.do?rb_num=${rboard.rb_num}'"
								style="cursor: pointer;">
								<div class="team-left">
									<div class="skill_font_T">[프로젝트명]${rboard.rb_pj_title}</div>
									<div class="projectName_font">${rboard.rb_title}</div>
								</div>
								<div class="team-right-mo">
								<div class="count">
										<div class="team-count">신청인원:${rboard.apply_count}명</div>
										<div class="team-count">합격된 인원:${rboard.pass_count}명</div>
										<div>모집마감:${rboard.rb_endRecruit}</div>
								</div>
								<div class="right">
									<input type="button" value="모집글 보기" class="rboard-click" onclick="event.stopPropagation(); location.href='${pageContext.request.contextPath}/rboard/detail.do?rb_num=${rboard.rb_num}'">
									<div class="close-green" data-rbnum="${rboard.rb_num}">활성화</div>
									<div class="delete-green" data-rbnum="${rboard.rb_num}">모집글 삭제</div>
								</div>
								</div>
							</div>
						</c:if>
					</c:forEach>
					
					<c:forEach var="rboard" items="${rboardList}">
						<c:if test="${rboard.team_status==1}"><%--/team/teamMain.do?team_num=${rboard.team_num} --%>
							<div class="myPage-line-box"
								style="cursor: pointer; background-color: #e6e6e6;">
								<div class="team-left">
									<div class="skill_font_T">${rboard.rb_pj_title}</div>
									<div class="projectName_font">[모집 마감]${rboard.rb_title}</div>
								</div>
								<div class="team-right">
									<div></div>
									<div>
										<div class="team-count"></div>
										<div></div>
									</div>
									<div></div>
								</div>
							</div>
						</c:if>
					</c:forEach>
				</c:if>
			</div>
			<!-- 메인 정보 수정 끝 -->
		</div>
		<!-- flex_container끝 -->
	</div>
	<!-- page-container끝 -->
</body>
</html>
