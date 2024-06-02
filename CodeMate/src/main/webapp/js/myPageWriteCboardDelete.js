$(function() {
    /* 나의 모집글 삭제 */
    $('.myDelete_btn').on('click', function(event) {
		// '모집글 삭제' 버튼 클릭 이벤트
		event.stopPropagation();
        // 서버와 통신
        $.ajax({
            url: 'deleteMyPageCboardWrite.do',
            type: 'post',
            data: { cb_num: $(this).data('cbnum') }, // 삭제할 게시글 번호를 데이터로 전달
            dataType: 'json',
            success: function(param) {
                if (param.result === 'logout') {
                    alert('로그인 후 사용하세요!');
                } else if (param.result === 'success') {
                    alert('게시글을 삭제했습니다.');
                    location.reload();
                } else {
                    alert('게시글 삭제에 실패했습니다.');
                }
            },
            error: function() {
                alert('네트워크 오류 발생');
            }
        });
    });
});
