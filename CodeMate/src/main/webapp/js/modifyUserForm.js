$(function() {
	let nicknameChecked = 0;
	let emailChecked = 0;
	let phoneChecked = 0;

	// 콘텍스트 경로 구하기
	function getContextPath() {
		return window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
	}


	// 아이디 입력 필드 비활성화
	const idField2 = document.getElementById('mem_id');
	const originalId = document.getElementById('original_mem_id').value;
	if (idField2.value == originalId) {
		idField2.disabled = true;
	}

	// 회원 정보 수정 유효성 체크
	$('#modify_form').submit(function() {
		const idField1 = document.getElementById('mem_name');
		if (idField1.value.trim() == '') {
			alert('이름은 필수 입력');
			idField1.focus();
			return false;
		}

		const idField3 = document.getElementById('mem_email');
		const emailValue = idField3.value.trim();

		if (emailValue === '') {
			alert('이메일 필수 입력');
			idField3.focus();
			return false;
		}

		if (emailValue.indexOf('@') === -1) {
			alert('이메일 형식이 올바르지 않습니다.');
			idField3.focus();
			return false;
		}
		const idField4 = document.getElementById('mem_nickname');
		if (idField4.value.trim() == '') {
			alert('닉네임 필수 입력');
			idField4.focus();
			return false;
		}

		const idField5 = document.getElementById('mem_phone');
		const phoneNumber = idField5.value.replace(/-/g, ''); // 하이픈 제외한 숫자만 추출

		if (phoneNumber.length !== 11) {
			if (phoneNumber.length === 0) {
				alert('전화번호 필수 입력');
			} else {
				alert('하이픈 제외 숫자 11자 입력 필수');
			}
			idField5.value = '';
			idField5.focus();
			return false;
		}

	});

	// 이미지 기본
	$('#photo_base').click(function() {
		$.ajax({
			url: 'deletePhoto.do',
			type: 'post',
			dataType: 'json',
			success: function(param) {
				if (param.result == 'logout') {
					alert('로그인 후 사용 가능');
				} else if (param.result == 'success') {
					alert('프로필 사진이 기본으로 변경되었습니다.');
					// 페이지를 다시 로드
					location.reload();
				} else {
					alert('파일 전송 오류 발생');
				}
			},
			error: function() {
				alert('네트워크 오류 발생');
			}
		});
	});

	/* 프로필 사진 추가 */
	$('#mem_photo_btn').click(function() {
		$('#mem_photo_choice').show();
		$(this).hide();
	}); // end of Click

	// 이미지 미리 보기
	let photo_path = $('.my-photo').attr('src'); // 처음 화면에 보여지는 이미지 읽기
	$('#mem_photo').change(function() {
		let my_photo = this.files[0]; // 업로드한 파일 정보
		if (!my_photo) {
			// 선택을 취소하면 원래 처음 화면으로 되돌림
			$('.my-photo').attr('src', photo_path);
			return;
		}
		// 용량 체크
		if (my_photo.size > 1024 * 1024) {
			alert(Math.round(my_photo.size / 1024) + 'kbytes(1024kbytes까지만 업로드 가능)');
			$('.my-photo').attr('src', photo_path);
			$(this).val(''); // 선택한 파일 정보 지우기
			return;
		}

		// 화면에 이미지 미리 보기
		const reader = new FileReader();
		reader.readAsDataURL(my_photo);

		reader.onload = function() {
			$('.my-photo').attr('src', reader.result);
		};
	}); // end of Change

	//이미지 전송하기
	$('#mem_photo_submit').click(function() {
		if ($('#mem_photo').val() == '') {
			alert('파일을 선택하세요.');
			$('#mem_photo').focus();
			return;
		}

		// 파일이 선택된 경우 서버에 전송
		const form_data = new FormData();
		form_data.append('mem_photo', $('#mem_photo')[0].files[0]);

		$.ajax({
			url: 'updateMyPhoto.do',
			type: 'post',
			data: form_data,
			dataType: 'json',
			contentType: false,
			processData: false,
			success: function(param) {
				if (param.result == 'logout') {
					alert('로그인 후 사용하세요');
				} else if (param.result == 'success') {
					alert('프로필 사진이 수정되었습니다.');
					// 수정된 이미지 정보 저장
					photo_path = $('.my-photo').attr('src');
					// 변경 전으로 초기화
					$('#mem_photo').val('');
					$('#mem_photo_choice').hide();
					$('#mem_photo_btn').show(); // 수정 버튼 표시
					$('#profile_pic').attr('src', photo_path);
				} else {
					alert('파일 전송 오류 발생');
				}
			},
			error: function() {
				alert('네트워크 오류 발생');
			}
		});
	}); // end of click

	// 이미지 미리보기 취소
	$('#mem_photo_reset').click(function() {
		// 초기 이미지 표시
		$('.my-photo').attr('src', photo_path); // 이미지 미리보기 전 이미지로 되돌리기
		$('#mem_photo').val('');
		$('#mem_photo_choice').hide();
		$('#mem_photo_btn').show(); // 수정 버튼 표시
	});

	//닉네임 중복 시작
	$('#mem_nickname').on('blur', function() {
		var nickname = $(this).val();

		//닉네임이 비어 있을 때 중복 메세지X
		if (nickname.trim() == '') {
			$('#message_nickname').text('');
			return;
		}

		// 닉네임 길이 체크
		if (nickname.length > 10) {
			$('#message_nickname').css('color', 'red').text('닉네임은 최대 10자까지 설정할 수 있습니다.');
			$('#mem_nickname').val('').focus();
			return;
		}


		// 서버에 닉네임 중복 확인 요청을 보냄
		$.ajax({
			url: 'checkDuplicatedNickname.do',
			type: 'post',
			data: { mem_nickname: nickname },
			dataType: 'json',
			success: function(param) {
				if (param.result == 'nicknameDuplicated') {
					nicknameChecked = 0;
					$('#message_nickname').css('color', 'red').text('이미 사용 중인 닉네임입니다.');
					$('#mem_nickname').val('').focus();
					$('#mem_nickname').css('margin-bottom', '0');
				} else if (param.result == 'nicknameNotFound') {
					nicknameChecked = 1;
					$('#mem_nickname').css('margin-bottom', '0');
					$('#message_nickname').css('color', 'black').text('사용 가능한 닉네임입니다.');
				} else {
					nicknameChecked = 0;
					$('#mem_nickname').css('margin-bottom', '0');
					$('#message_nickname').css('color', 'red').text('닉네임 중복 체크 중 오류 발생');
				}
			},
			error: function() {
				nicknameChecked = 0;
				$('#mem_nickname').css('margin-bottom', '0');
				$('#message_nickname').css('color', 'red').text('서버 오류가 발생했습니다.');
			}
		});
	});

	//닉네임 중복 안내 메시지 초기화 및 닉네임 중복값 초기화
	$('#modify_form #mem_nickname').keydown(function() {
		nicknameChecked = 0;
		$('#message_nickname').text('');
	});//end of keydown
	//닉네임 중복 끝


	//이메일 중복 시작
	$('#mem_email').on('blur', function() {
		var email = $(this).val();

		//이메일이 비어 있을 때 중복 메세지X
		if (email.trim() == '') {
			$('#message_email').text('');
			return;
		}

		// 서버에 이메일 중복 확인 요청을 보냄
		$.ajax({
			url: 'checkDuplicatedEmail.do',
			type: 'post',
			data: { mem_email: email },
			dataType: 'json',
			success: function(param) {
				if (param.result == 'emailDuplicated') {
					emailChecked = 0;
					$('#message_email').css('color', 'red').text('이미 사용 중인 이메일입니다.');
					$('#mem_email').val('').focus();
					$('#mem_email').css('margin-bottom', '0');
				} else if (param.result == 'emailNotFound') {
					emailChecked = 1;
					$('#mem_email').css('margin-bottom', '0');
					$('#message_email').css('color', 'black').text('사용 가능한 이메일입니다.');
				} else {
					emailChecked = 0;
					$('#mem_email').css('margin-bottom', '0');
					$('#message_email').css('color', 'red').text('이메일 중복 체크 중 오류 발생');
				}
			},
			error: function() {
				emailChecked = 0;
				$('#mem_email').css('margin-bottom', '0');
				$('#message_email').css('color', 'red').text('서버 오류가 발생했습니다.');
			}
		});
	});

	//닉네임 중복 안내 메시지 초기화 및 닉네임 중복값 초기화
	$('#modify_form #mem_email').keydown(function() {
		emailChecked = 0;
		$('#message_email').text('');
	});//end of keydown
	//이메일 중복 끝



	//전화번호 중복 시작
	$('#mem_phone').on('blur', function() {
		var phone = $(this).val();

		//전화번호 비어 있을 때 중복 메세지X
		if (phone.trim() == '') {
			$('#message_phone').text('');
			return;
		}

		// 서버에 전화번호 중복 확인 요청을 보냄
		$.ajax({
			url: 'checkDuplicatedPhone.do',
			type: 'post',
			data: { mem_phone: phone },
			dataType: 'json',
			success: function(param) {
				if (param.result == 'phoneDuplicated') {
					phoneChecked = 0;
					$('#message_phone').css('color', 'red').text('이미 사용 중인 전화번호입니다.');
					$('#mem_phone').val('').focus();
					$('#mem_phone').css('margin-bottom', '0');
				} else if (param.result == 'phoneNotFound') {
					phoneChecked = 1;
					$('#mem_phone').css('margin-bottom', '0');
					$('#message_phone').css('color', 'black').text('사용 가능한 전화번호입니다.');
				} else {
					phoneChecked = 0;
					$('#mem_phone').css('margin-bottom', '0');
					$('#message_phone').css('color', 'red').text('전화번 중복 체크 중 오류 발생');
				}
			},
			error: function() {
				phoneChecked = 0;
				$('#mem_phone').css('margin-bottom', '0');
				$('#message_phone').css('color', 'red').text('서버 오류가 발생했습니다.');
			}
		});
	});

	//닉네임 중복 안내 메시지 초기화 및 닉네임 중복값 초기화
	$('#modify_form #mem_phone').keydown(function() {
		emailChecked = 0;
		$('#message_phone').text('');
	});//end of keydown
	//전화번호 중복 끝

});
