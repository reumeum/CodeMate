package kr.rboard.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.controller.Action;

public class ApplyResultAction implements Action {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		int rb_num = Integer.parseInt(request.getParameter("rb_num"));
		String rb_title = request.getParameter("rb_title");
		
		request.setAttribute("result_title", "코드메이트 신청 완료");
		request.setAttribute("result_msg", "[" + rb_title + "] 메이트 모집에 신청했어요!");
		request.setAttribute("btn_value1", "모집글로 돌아가기");
		request.setAttribute("btn_value2", "신청내역 확인");
		request.setAttribute("result_url1", "detail.do?rb_num=" + rb_num);
		request.setAttribute("result_url2", request.getContextPath() + "/member/myPageShin.do");
		
		return "/WEB-INF/views/common/result_view_two_btn.jsp";
	}

}
