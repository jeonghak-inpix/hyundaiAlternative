document.addEventListener('DOMContentLoaded', function () {
  const topButton = document.querySelector('.button-top-wrapper');
  const showOffset = 200; // 스크롤이 200px 이상 되었을 때 버튼 표시

  // 스크롤 이벤트 처리
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > showOffset) {
      topButton.classList.add('visible');
    } else {
      topButton.classList.remove('visible');
    }
  });

  // top 버튼 클릭 이벤트
  topButton.querySelector('.button-top').addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // 모달 초기화
  initModal();

  // 필터 모달 관리
  initFilterModal();
});

// 모달 관리
const initModal = () => {
  const generalModal = document.querySelector('.modal.general-modal');
  // const filterModal = document.getElementById('modal-filter'); // 필요 시 참조 유지
  const modalDim = generalModal?.querySelector('.modal__dim'); // 해당 모달 내부의 딤 선택
  const confirmButton = generalModal?.querySelector('.btn');
  const searchButtons = document.querySelectorAll('button.search, button.search-button');

  if (!generalModal) {
    // console.log('General modal not found on this page.');
    return; // 일반 모달 없으면 함수 종료
  }

  // 일반 모달 닫기 함수
  const closeGeneralModal = () => {
    if (generalModal && modalDim) {
      modalDim.classList.remove('active');
      setTimeout(() => {
        generalModal.style.display = 'none';
        modalDim.style.display = 'none';
      }, 200);
    }
  };

  // 딤 클릭 시 모달 닫기 (일반 모달 전용)
  if (modalDim) {
    modalDim.addEventListener('click', e => {
      if (e.target === modalDim) {
        console.log('General modal dim clicked, closing.');
        closeGeneralModal();
      }
    });
  } else {
    console.warn('General modal dim element not found');
  }

  // 모달 열기 함수 (일반 모달용)
  const openGeneralModal = () => {
    if (generalModal && modalDim) {
      modalDim.style.display = 'block'; // 딤 먼저 보이게
      generalModal.style.display = 'block';
      setTimeout(() => {
        modalDim.classList.add('active'); // 딤 애니메이션
      }, 10);
    }
  };

  // 검색 버튼 클릭 시 모달 열기
  if (searchButtons.length > 0) {
    searchButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        if (this.type === 'submit') e.preventDefault();
        const input =
          this.closest('.input-keyword')?.querySelector('input[type="text"]') ||
          this.closest('.search-form')?.querySelector('input[type="text"]') ||
          this.closest('.search-box')?.querySelector('input[type="text"]') ||
          this.closest('.search-box-careers')?.querySelector('input[type="text"]');
        if (input && !input.value.trim()) {
          openGeneralModal();
        }
      });
    });
  }

  // 확인 버튼 클릭 시 모달 닫기 (일반 모달용)
  if (confirmButton) {
    confirmButton.addEventListener('click', closeGeneralModal);
  }

  // ESC 키 누를 때 모달 닫기 (일반 모달 처리 부분만 남김)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (generalModal && generalModal.style.display === 'block') {
        closeGeneralModal();
      }
    }
  });
};

// 필터 모달 관리
const initFilterModal = () => {
  const filterModal = document.getElementById('modal-filter');
  const filterModalDim = filterModal?.querySelector('.modal__dim'); // 해당 모달 내부의 딤 선택
  const filterModalBody = filterModal?.querySelector('.modal-filter');
  const filterButton = document.querySelector('.filter');
  const closeButton = filterModal?.querySelector('.close');
  const resetButton = filterModal?.querySelector('.button-reset');
  const applyButton = filterModal?.querySelector('.button-apply');

  if (!filterModal || !filterButton) {
    // console.log('Filter modal or filter button not found on this page.');
    return; // 필터 모달 또는 버튼 없으면 함수 종료
  }

  // 근무형태 체크박스 관리
  const initWorkTypeCheckboxes = () => {
    const workTypeAll = document.getElementById('work-type-all');
    const workTypeRegular = document.getElementById('work-type-regular');
    const workTypeContract = document.getElementById('work-type-contract');

    if (!workTypeAll || !workTypeRegular || !workTypeContract) return;

    // 전체 체크박스 클릭 이벤트
    workTypeAll.addEventListener('change', () => {
      const isChecked = workTypeAll.checked;
      workTypeRegular.checked = isChecked;
      workTypeContract.checked = isChecked;
    });

    // 개별 체크박스 클릭 이벤트
    [workTypeRegular, workTypeContract].forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        // 모든 개별 체크박스가 선택되었는지 확인
        const allChecked = workTypeRegular.checked && workTypeContract.checked;
        workTypeAll.checked = allChecked;
      });
    });
  };

  // 접수상태 체크박스 관리
  const initStatusCheckboxes = () => {
    const statusAll = document.getElementById('status-type-all');
    const statusPre = document.getElementById('status-type-pre');
    const statusIng = document.getElementById('status-type-ing');
    const statusClose = document.getElementById('status-type-close');

    if (!statusAll || !statusPre || !statusIng || !statusClose) return;

    // 전체 체크박스 클릭 이벤트
    statusAll.addEventListener('change', () => {
      const isChecked = statusAll.checked;
      statusPre.checked = isChecked;
      statusIng.checked = isChecked;
      statusClose.checked = isChecked;
    });

    // 개별 체크박스 클릭 이벤트
    [statusPre, statusIng, statusClose].forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        // 모든 개별 체크박스가 선택되었는지 확인
        const allChecked = statusPre.checked && statusIng.checked && statusClose.checked;
        statusAll.checked = allChecked;
      });
    });
  };

  // 모달 열기
  const openFilterModal = () => {
    if (!filterModal || !filterModalDim || !filterModalBody) {
      console.error('Filter modal elements not found for opening');
      return;
    }

    // 딤 표시 및 active 클래스 추가
    filterModalDim.style.display = 'block';
    filterModalDim.classList.add('active');

    // 모달 표시
    filterModal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // 모달 바디 애니메이션 시작 (약간의 지연 후)
    void filterModalBody.offsetWidth; // Reflow 강제
    setTimeout(() => {
      filterModalBody.classList.add('active');
    }, 10);
  };

  // 모달 닫기
  const closeFilterModal = () => {
    if (!filterModal || !filterModalDim || !filterModalBody) {
      console.error('Filter modal elements not found for closing');
      return;
    }

    // 애니메이션 시작
    filterModalBody.classList.remove('active');
    filterModalDim.classList.remove('active');

    // 애니메이션 완료 후 모달과 딤 숨김
    setTimeout(() => {
      filterModal.style.display = 'none';
      filterModalDim.style.display = 'none';
      document.body.style.overflow = '';
    }, 200);
  };

  // 필터 버튼 클릭 이벤트
  filterButton.addEventListener('click', openFilterModal);

  // 닫기 버튼 클릭 이벤트
  if (closeButton) {
    closeButton.addEventListener('click', closeFilterModal);
  } else {
    console.warn('Filter modal close button not found');
  }

  // 초기화 버튼 클릭 이벤트
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      const checkboxes = filterModal.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
      // Reset 시 전체 체크박스도 상태 반영
      initWorkTypeCheckboxes();
      initStatusCheckboxes();
    });
  } else {
    console.warn('Filter modal reset button not found');
  }

  // 적용 버튼 클릭 이벤트
  if (applyButton) {
    applyButton.addEventListener('click', closeFilterModal);
  } else {
    console.warn('Filter modal apply button not found');
  }

  // 딤 클릭 시 모달 닫기 (필터 모달 전용)
  if (filterModalDim) {
    filterModalDim.addEventListener('click', e => {
      if (e.target === filterModalDim) {
        console.log('Filter modal dim clicked, closing.');
        closeFilterModal();
      }
    });
  } else {
    console.warn('Filter modal dim element not found');
  }

  // ESC 키로 모달 닫기 (필터 모달 전용)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && filterModal.style.display === 'block') {
      closeFilterModal();
    }
  });

  // 체크박스 초기화
  try {
    initWorkTypeCheckboxes();
    initStatusCheckboxes();
  } catch (error) {
    console.error('Error initializing checkboxes:', error);
  }
};
