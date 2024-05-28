<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>

    <!-- 프로젝트 신청하기 -->
    <div id="r_apply">
        <div class="r_apply_window">
            <!-- 프로필 제목 -->
            <div class="r_apply_title">
                <h2>신청하기</h2>
                <!-- 창 닫기 -->
                <div class="r_apply_close">X</div>
            </div>
            <!-- 본문 -->
            <div class="content">
                <!-- 신청하기 DIV -->
                <div class="ra_content_div">
                    <h4>프로젝트 신청하기</h4>
                    <form id="ra_form" action="">
                        <textarea id="ra_content"></textarea>
                        <!-- 버튼 -->
		                <div class="btn-div">
		                    <input type="submit" id="apply_btn" value="신청">
		                    <div class="r_apply_close" id="close_btn">
		                        <span>취소</span>
		                    </div>
		                </div>
                    </form>
                </div>
                
            </div>
        </div>
    </div>


    <script>
        const r_apply = document.getElementById("r_apply");

        function modalOn() {
        	r_apply.style.display = "flex";
        }

        function isModalOn() {
            return r_apply.style.display === "flex";
        }

        function modalOff() {
        	r_apply.style.display = "none";
        }

        const btnModal = document.getElementById("btn-modal");

        btnModal.addEventListener("click", e => {
            modalOn();
        });

        // 첫 번째 닫기 버튼
        document.querySelector(".r_apply_close").addEventListener("click", e => {
            modalOff();
        });

        // 마지막 닫기 버튼에 대한 이벤트 리스너 추가
        document.getElementById("close_btn").addEventListener("click", e => {
            modalOff();
        });
    </script>