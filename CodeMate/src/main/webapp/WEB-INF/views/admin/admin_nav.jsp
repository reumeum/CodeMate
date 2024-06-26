<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<style>
/* 사이드 시작============*/
.float-A{
	width:15%;
}
.myCount a {
    display: block; /* 줄바꿈 효과를 위해 블록 요소로 설정 */
    margin-bottom: 20px;
    text-decoration: none; /* 링크 밑줄 제거 (선택 사항) */
    color: inherit; /* 링크 색상 상속 (선택 사항) */
    font-size: 15px;
}
.myCount a.sideB_font {
    font-size: 20px;
    font-weight: bold;
}
/* 호버 기능 추가 - 제외할 항목들을 제외한 나머지 a 태그에만 적용 */
.myCount a:not(.no-hover):hover {
    font-weight: bold;
    color: black;
}
/*사이드 끝================*/

.myCount {
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    text-decoration: none; /* 링크 밑줄 제거 (선택 사항) */
    color: inherit; /* 링크 색상 상속 (선택 사항) */
    font-size: 15px;
}

.myCount a.sideB_font {
    font-size: 20px;
    font-weight: bold;
}
/* 호버 기능 추가 - 제외할 항목들을 제외한 나머지 a 태그에만 적용 */
.myCount a:not(.no-hover):hover {
    font-weight: bold;
    color: black;
}
</style>
<div class="float-A">
    <div class="myCount">
        <a href="${pageContext.request.contextPath}/admin/manageMembers.do" class="sideB_font">관리</a>
        <a class="sideB_font">회원 관리</a>
        <a href="${pageContext.request.contextPath}/admin/manageMembers.do">회원 정지,탈퇴,등급 변경</a>
        <a class="sideB_font">게시판 관리</a>
        <a href="${pageContext.request.contextPath}/admin/manageRboard.do">팀원 구하기</a>
        <a href="${pageContext.request.contextPath}/admin/manageCommunity.do">커뮤니티</a>
        <a href="${pageContext.request.contextPath}/admin/manageComment.do">댓글 관리</a>
        <a href="${pageContext.request.contextPath}/admin/manageTeam.do">활성화 팀</a>
        <a href="${pageContext.request.contextPath}/admin/manageStopTeam.do">비활성화 팀</a>
        <a class="sideB_font">1:1 문의</a>
        <a href="${pageContext.request.contextPath}/admin/consultsList.do">1:1 문의 보기</a>
    </div>   
</div>