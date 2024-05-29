package kr.rboard.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kr.controller.Action;
import kr.rboard.dao.RboardDAO;
import kr.rboard.vo.RboardVO;
import kr.util.StringUtil;

public class DetailAction implements Action {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("utf-8");
		
		int rb_num = Integer.parseInt(request.getParameter("rb_num"));
		
		RboardDAO rdao = RboardDAO.getInstance();
		
		RboardVO rboard = rdao.getrboard(rb_num);
		
		rboard.setRb_content(StringUtil.useBrNoHTML(rboard.getRb_content()));

		request.setAttribute("rboard", rboard);
		
		return "/WEB-INF/views/rBoard/detail.jsp";
	}
	
}
