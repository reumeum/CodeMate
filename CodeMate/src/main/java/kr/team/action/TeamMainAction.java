package kr.team.action;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kr.controller.Action;
import kr.member.dao.TeamDAO;
import kr.member.vo.TeamVO;

public class TeamMainAction implements Action{

    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	
    	request.setCharacterEncoding("utf-8");
    	
        HttpSession session = request.getSession();
        Integer mem_num = (Integer) session.getAttribute("mem_num");
        Integer tm_auth = null;
        
        // 사용자가 클릭한 팀 번호를 가져옵니다.
        int team_num = Integer.parseInt(request.getParameter("team_num"));
        TeamDAO dao = TeamDAO.getInstance();
        
        if (mem_num == null) {// 로그인 미실시
            return "redirect:/member/loginForm.do";
        }
        
        TeamVO teams = dao.getTeam(team_num);
		if (teams == null || teams.getTeam_status() == 0) {
		    // 팀이 존재하지 않는 경우
		    response.setContentType("text/html; charset=UTF-8");
		    PrintWriter out = response.getWriter();
		    out.println("<script type=\"text/javascript\">");
		    out.println("var contextPath = '" + request.getContextPath() + "';");
		    out.println("alert('팀이 존재하지 않거나 비활성화 팀입니다. 참여중인 팀 페이지로 돌아갑니다.');");
		    out.println("window.location.href = contextPath + '/member/myTeam.do';");
		    out.println("</script>");
		    return null;
		}
        
        TeamVO teammember = dao.getTeamMember(mem_num, team_num);
        if(teammember == null) {
        	response.setContentType("text/html; charset=UTF-8");
        	PrintWriter out = response.getWriter();
        	out.println("<script type=\"text/javascript\">");
        	out.println("var contextPath = '" + request.getContextPath() + "';");
        	out.println("alert('잘못된 접근입니다. 참여중인 팀 페이지로 돌아갑니다.');");
        	out.println("window.location.href = contextPath + '/member/myTeam.do';");
        	out.println("</script>");

            return null;
        } 
        
        
        
        // TeamDAO를 사용하여 사용자의 권한 정보를 가져옵니다.
        TeamVO team = dao.getUserTeam(mem_num,team_num);
        if (team != null) {
                tm_auth = team.getTm_auth();
         }

        // 가져온 권한 정보를 세션에 저장합니다.
        session.setAttribute("tm_auth", tm_auth);
        
        // 가져온 팀 정보를 세션에 저장합니다.
        session.setAttribute("team_num", team_num);

        // 팀의 홈페이지로 이동합니다.
        return "/WEB-INF/views/team/teamTo_Do.jsp";
    }
}
