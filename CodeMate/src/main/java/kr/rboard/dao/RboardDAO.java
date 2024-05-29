package kr.rboard.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import kr.rboard.vo.RapplyVO;
import kr.rboard.vo.RboardVO;
import kr.rboard.vo.RcommentVO;
import kr.util.DBUtil;
import kr.util.DurationFromNow;

public class RboardDAO {
	private static RboardDAO instance = new RboardDAO();

	public static RboardDAO getInstance() {
		return instance;
	}

	private RboardDAO() {
	};

	// rboard 등록
	public void insertRboard(RboardVO rboard) throws Exception {
		Connection conn = null;
		PreparedStatement pstmt = null;
		PreparedStatement pstmt2 = null;
		PreparedStatement pstmt3 = null;
		PreparedStatement pstmt4 = null;
		PreparedStatement pstmt5 = null;
		ResultSet rs = null;
		String sql = null;
		int rb_num = 0;

		try {
			conn = DBUtil.getConnection();
			conn.setAutoCommit(false);

			// rboard seq 생성
			sql = "SELECT r_board_seq.nextval FROM DUAL";
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();

			if (rs.next()) {
				rb_num = rs.getInt(1);
			}

			// r_board에 추가
			sql = "INSERT INTO r_board (rb_num,mem_num,rb_category,rb_meet,rb_teamsize,rb_period,rb_start,"
					+ "rb_title,rb_content,rb_endrecruit,rb_pj_title) VALUES(?,?,?,?,?,?,?,?,?,?,?)";

			pstmt2 = conn.prepareStatement(sql);
			pstmt2.setInt(1, rb_num);
			pstmt2.setInt(2, rboard.getMem_num());
			pstmt2.setInt(3, rboard.getRb_category());
			pstmt2.setInt(4, rboard.getRb_meet());
			pstmt2.setInt(5, rboard.getRb_teamsize());
			pstmt2.setInt(6, rboard.getRb_period());
			pstmt2.setString(7, rboard.getRb_start());
			pstmt2.setString(8, rboard.getRb_title());
			pstmt2.setString(9, rboard.getRb_content());
			pstmt2.setString(10, rboard.getRb_endRecruit());
			pstmt2.setString(11, rboard.getRb_pj_title());

			pstmt2.executeUpdate();

			// r_skill에 추가
			sql = "INSERT INTO r_skill (rs_num,rb_num,hs_code) VALUES(r_skill_seq.nextval,?,?)";

			for (String skill : rboard.getR_skills()) {
				int intSkill = Integer.parseInt(skill);
				pstmt3 = conn.prepareStatement(sql);
				pstmt3.setInt(1, rb_num);
				pstmt3.setInt(2, intSkill);
				pstmt3.executeUpdate();
			}

			// r_field에 추가
			sql = "INSERT INTO r_field (rf_num,rb_num,f_code) VALUES(r_field_seq.nextval,?,?)";

			for (String field : rboard.getR_fields()) {
				int intField = Integer.parseInt(field);
				pstmt4 = conn.prepareStatement(sql);
				pstmt4.setInt(1, rb_num);
				pstmt4.setInt(2, intField);
				pstmt4.executeUpdate();
			}

			// team 테이블에 추가
			sql = "INSERT INTO team (team_num) VALUES(?)";

			pstmt5 = conn.prepareStatement(sql);
			pstmt5.setInt(1, rb_num);
			pstmt5.executeUpdate();

			// 전체 커밋
			conn.commit();

		} catch (Exception e) {
			conn.rollback();
			throw new Exception(e);
		} finally {
			DBUtil.executeClose(null, pstmt5, null);
			DBUtil.executeClose(null, pstmt4, null);
			DBUtil.executeClose(null, pstmt3, null);
			DBUtil.executeClose(null, pstmt2, null);
			DBUtil.executeClose(null, pstmt, conn);
		}
	}

	// rboard 수정
	// rboard 삭제
	// rboard 글 개수, 검색 개수
	public int getRboardCount() throws Exception {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = null;
		int count = 0;

		try {
			conn = DBUtil.getConnection();

			sql = "SELECT COUNT(*) FROM r_board";

			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			if (rs.next()) {
				count = rs.getInt(1);
			}
		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			DBUtil.executeClose(rs, pstmt, conn);
		}

		return count;
	}

	// rboard 목록 구하기
	public List<RboardVO> getRboardList(int start, int end) throws Exception {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<RboardVO> list = null;
		String sql = null;

		try {
			conn = DBUtil.getConnection();
			sql = "SELECT * FROM (SELECT a.*, rownum rnum FROM (SELECT * FROM r_board JOIN"
					+ " (SELECT rb_num, LISTAGG(hs_name,',') within group ( order by hs_name) hs_name ,"
					+ " LISTAGG(hs_photo,',') within group ( order by hs_name)  hs_photo"
					+ " FROM r_skill JOIN hard_skill USING(hs_code) group by rb_num) USING(rb_num) JOIN"
					+ " (SELECT rb_num, LISTAGG(f_name,',') within group ( order by f_name) f_name"
					+ " FROM r_field JOIN field_db USING(f_code) group by rb_num) USING(rb_num) ORDER BY rb_num DESC)a)"
					+ " WHERE rnum >= ? AND rnum <= ?";

			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, start);
			pstmt.setInt(2, end);

			rs = pstmt.executeQuery();

			list = new ArrayList<RboardVO>();
			while (rs.next()) {
				RboardVO rboard = new RboardVO();
				rboard.setRb_num(rs.getInt("rb_num"));
				rboard.setRb_reg_date(rs.getDate("rb_reg_date"));
				rboard.setRb_category(rs.getInt("rb_category"));
				rboard.setRb_meet(rs.getInt("rb_meet"));
				rboard.setRb_teamsize(rs.getInt("rb_teamsize"));
				rboard.setRb_period(rs.getInt("rb_period"));
				rboard.setRb_start(rs.getString("rb_start"));
				rboard.setRb_title(rs.getString("rb_title"));
				rboard.setRb_endRecruit(rs.getString("rb_endRecruit"));

				// 요구기술, 모집필드 배열로 저장
				rboard.setHs_name_arr(rs.getString("hs_name").split(","));
				rboard.setHs_photo_arr(rs.getString("hs_photo").split(","));
				rboard.setF_name_arr(rs.getString("f_name").split(","));

				list.add(rboard);
			}

		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			DBUtil.executeClose(rs, pstmt, conn);
		}

		return list;
	}

	// 작성자별 rboard 목록 구하기
	public List<RboardVO> getRboardListByMemNum(int mem_num) throws Exception {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<RboardVO> list = null;
		String sql = null;

		try {
			conn = DBUtil.getConnection();
			sql = "SELECT * FROM r_board WHERE mem_num=?";

			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, mem_num);

			rs = pstmt.executeQuery();

			list = new ArrayList<RboardVO>();
			while (rs.next()) {
				RboardVO rboard = new RboardVO();
				rboard.setRb_num(rs.getInt("rb_num"));
				rboard.setRb_title(rs.getString("rb_title"));
				rboard.setRb_pj_title(rs.getString("rb_pj_title"));
				rboard.setRb_teamsize(rs.getInt("rb_teamsize"));
				rboard.setRb_endRecruit(rs.getString("rb_endRecruit"));
				list.add(rboard);
			}
		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			DBUtil.executeClose(rs, pstmt, conn);
		}
		return list;
	}

	// rboard detail 구하기
	public RboardVO getrboard(int rb_num) throws Exception {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		RboardVO rboard = null;
		String sql = null;
		try {
			conn = DBUtil.getConnection();
			sql = "SELECT * FROM member JOIN member_detail USING(mem_num) JOIN r_board USING(mem_num) JOIN"
					+ " (SELECT rb_num, LISTAGG(hs_name,',') within group ( order by hs_name) hs_name ,"
					+ " LISTAGG(hs_photo,',') within group ( order by hs_name)  hs_photo"
					+ " FROM r_skill JOIN hard_skill USING(hs_code) group by rb_num) USING(rb_num) JOIN"
					+ " (SELECT rb_num, LISTAGG(f_name,',') within group ( order by f_name) f_name"
					+ " FROM r_field JOIN field_db USING(f_code) group by rb_num) USING(rb_num)" + " WHERE rb_num=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, rb_num);
			rs = pstmt.executeQuery();

			rboard = new RboardVO();
			if (rs.next()) {
				rboard.setMem_num(rs.getInt("mem_num"));
				rboard.setRb_num(rs.getInt("rb_num"));
				rboard.setMem_nickname(rs.getString("mem_nickname"));
				rboard.setMem_photo(rs.getString("mem_photo"));
				rboard.setRb_reg_date(rs.getDate("rb_reg_date"));
				rboard.setRb_category(rs.getInt("rb_category"));
				rboard.setRb_start(rs.getString("rb_start"));
				rboard.setRb_meet(rs.getInt("rb_meet"));
				rboard.setRb_period(rs.getInt("rb_period"));
				rboard.setRb_teamsize(rs.getInt("rb_teamsize"));
				rboard.setRb_title(rs.getString("rb_title"));
				rboard.setRb_content(rs.getString("rb_content"));
				rboard.setRb_endRecruit(rs.getString("rb_endrecruit"));
				rboard.setRb_pj_title(rs.getString("rb_pj_title"));

				// 요구기술, 모집필드 배열로 저장
				rboard.setHs_name_arr(rs.getString("hs_name").split(","));
				rboard.setHs_photo_arr(rs.getString("hs_photo").split(","));
				rboard.setF_name_arr(rs.getString("f_name").split(","));
			}
		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			DBUtil.executeClose(rs, pstmt, conn);
		}
		return rboard;
	}

	// rboard 지원하기(apply)
	public void applyToRboard(RapplyVO rapply) throws Exception {
		Connection conn = null;
		PreparedStatement pstmt = null;
		String sql = null;

		try {
			conn = DBUtil.getConnection();
			sql = "INSERT INTO r_apply (ra_num, rb_num, mem_num, ra_content) VALUES(r_apply_seq.nextval,?,?,?)";

			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, rapply.getRb_num());
			pstmt.setInt(2, rapply.getMem_num());
			pstmt.setString(3, rapply.getRa_content());

			pstmt.executeUpdate();
		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			DBUtil.executeClose(null, pstmt, conn);
		}
	}

	// 이미 신청한 글인지 확인
	public boolean alreadyApplied(int rb_num, int mem_num) throws Exception {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean alreadyApplied = false;
		String sql = null;

		try {
			conn = DBUtil.getConnection();
			sql = "SELECT ra_num FROM r_apply WHERE rb_num=? AND mem_num=?";

			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, rb_num);
			pstmt.setInt(2, mem_num);

			rs = pstmt.executeQuery();

			if (rs.next()) {
				alreadyApplied = true;
			}

		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			DBUtil.executeClose(rs, pstmt, conn);
		}

		return alreadyApplied;
	}

	// 댓글 등록
	public void writeRcomment(RcommentVO rcomment) throws Exception {
		Connection conn = null;
		PreparedStatement pstmt = null;
		String sql = null;

		try {
			conn = DBUtil.getConnection();
			sql = "INSERT INTO r_comment(rc_num,mem_num,rb_num,rc_content) VALUES(r_comment_seq.nextval,?,?,?)";

			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, rcomment.getMem_num());
			pstmt.setInt(2, rcomment.getRb_num());
			pstmt.setString(3, rcomment.getRc_content());

			pstmt.executeUpdate();

		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			DBUtil.executeClose(null, pstmt, conn);
		}
	}

	// 댓글 목록
	public List<RcommentVO> getRcommentList(int rb_num) throws Exception {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<RcommentVO> list = null;
		String sql = null;

		try {
			conn = DBUtil.getConnection();
			sql = "SELECT c.*, m.mem_nickname, m.mem_photo FROM r_comment c LEFT OUTER JOIN"
					+ " member_detail m ON(c.mem_num = m.mem_num) WHERE rb_num=? ORDER BY rc_num DESC";

			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, rb_num);

			rs = pstmt.executeQuery();

			list = new ArrayList<RcommentVO>();
			while (rs.next()) {
				RcommentVO rcomment = new RcommentVO();
				rcomment.setRc_num(rs.getInt("rc_num"));
				rcomment.setRb_num(rs.getInt("rb_num"));
				rcomment.setMem_num(rs.getInt("mem_num"));
				rcomment.setRc_content(rs.getString("rc_content"));
				rcomment.setMem_photo(rs.getString("mem_photo"));
				rcomment.setMem_nickname(rs.getString("mem_nickname"));

				rcomment.setReg_date_string(DurationFromNow.getTimeDiffLabel(rs.getDate("rc_reg_date")));

				if (rs.getDate("rc_modify_date") != null) {
					rcomment.setModify_date_string(DurationFromNow.getTimeDiffLabel(rs.getDate("rc_modify_date")));
				}

				list.add(rcomment);
			}
		} catch (Exception e) {
			throw new Exception();
		} finally {
			DBUtil.executeClose(rs, pstmt, conn);
		}

		return list;
	}

	// 개별 댓글vo 구하기
	public RcommentVO getRcomment(int rc_num) throws Exception {
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		RcommentVO rcomment = null;
		String sql = null;
		
		try {
			conn = DBUtil.getConnection();
			sql = "SELECT * FROM r_comment WHERE rc_num=?";
			
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, rc_num);
			
			rs = pstmt.executeQuery();
			
			rcomment = new RcommentVO();
			if (rs.next()) {
				rcomment.setRc_num(rs.getInt("rc_num"));
				rcomment.setRc_content(rs.getString("rc_content"));
				rcomment.setMem_num(rs.getInt("mem_num"));
			}
			
		} catch(Exception e) {
			throw new Exception(e);
		} finally {
			DBUtil.executeClose(rs, pstmt, conn);
		}
		
		return rcomment;
	}

	// 댓글 수정

	// 댓글 삭제
	public void deleteRcomment(int rc_num) throws Exception {
		Connection conn = null;
		PreparedStatement pstmt = null;
		String sql = null;

		try {
			conn = DBUtil.getConnection();
			sql = "DELETE FROM r_comment WHERE rc_num=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, rc_num);

			pstmt.executeUpdate();
		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			DBUtil.executeClose(null, pstmt, conn);
		}
	}

}
