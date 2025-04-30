// --- Global Modal State ---
let currentOpenModal = null; // 현재 열려있는 모달 추적
const MODAL_ANIMATION_DURATION = 300; // 모달 애니메이션 시간 (ms)

// --- Generic Modal Functions ---

// 모달 닫기 함수
const closeModal = modalElement => {
  if (!modalElement || modalElement.style.display === 'none') return; // 이미 닫혔거나 없으면 종료

  const modalDim = modalElement.querySelector('.modal__dim');
  const modalDialog =
    modalElement.querySelector('.modal-dialog') || modalElement.querySelector('.modal-filter'); // 콘텐츠 영역 선택자 추가

  if (modalDialog) modalDialog.classList.remove('active');
  if (modalDim) modalDim.classList.remove('active');

  setTimeout(() => {
    modalElement.style.display = 'none';
    if (modalDim) modalDim.style.display = 'none';
    document.body.style.overflow = ''; // 배경 스크롤 복원

    // 모달이 닫힌 후 이벤트 발생
    const closeEvent = new CustomEvent('modal:closed', {
      detail: { modal: modalElement, modalId: modalElement.id },
    });
    modalElement.dispatchEvent(closeEvent); // 모달 요소 자체에서 이벤트 발생
    // document.dispatchEvent(closeEvent); // 또는 문서 전체에 발생

    if (currentOpenModal === modalElement) {
      currentOpenModal = null; // 현재 열린 모달 상태 초기화
    }
  }, MODAL_ANIMATION_DURATION);
};

// 모달 열기 함수
const openModalById = modalId => {
  const targetModal = document.getElementById(modalId);
  if (!targetModal) {
    console.error(`Modal with ID "${modalId}" not found.`);
    return;
  }

  // 이미 열려있는 모달 처리 (선택: 닫거나, 그냥 두거나)
  if (currentOpenModal && currentOpenModal !== targetModal) {
    console.warn(
      `Modal ${currentOpenModal.id} is already open. Closing it before opening ${modalId}.`
    );
    closeModal(currentOpenModal); // 이전 모달 닫기
    // 또는 return; // 새 모달 열기 중단
  } else if (currentOpenModal === targetModal) {
    console.log(`Modal ${modalId} is already open.`);
    return; // 이미 열려 있으면 다시 열지 않음
  }

  const modalDim = targetModal.querySelector('.modal__dim');
  const modalDialog =
    targetModal.querySelector('.modal-dialog') || targetModal.querySelector('.modal-filter');

  if (!modalDim || !modalDialog) {
    console.error('Modal requires .modal__dim and .modal-dialog (or .modal-filter) inside.');
    return;
  }

  targetModal.style.display = 'block';
  modalDim.style.display = 'block';
  document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
  currentOpenModal = targetModal; // 현재 열린 모달 설정

  // 애니메이션 시작
  setTimeout(() => {
    modalDim.classList.add('active');
    modalDialog.classList.add('active');

    // 애니메이션 완료 후 이벤트 발생
    setTimeout(() => {
      const openEvent = new CustomEvent('modal:opened', {
        detail: { modal: targetModal, modalId: targetModal.id },
      });
      targetModal.dispatchEvent(openEvent); // 모달 요소 자체에서 이벤트 발생
      // document.dispatchEvent(openEvent); // 또는 문서 전체에 발생
    }, MODAL_ANIMATION_DURATION);
  }, 10); // display block 적용 후 약간의 딜레이
};

// 범용 닫기 이벤트 리스너 초기화 (페이지 로드 시 한 번만 실행)
const initGlobalCloseListeners = () => {
  // 딤 클릭 처리
  document.addEventListener('click', e => {
    if (currentOpenModal && e.target.classList.contains('modal__dim')) {
      const currentDim = currentOpenModal.querySelector('.modal__dim');
      if (e.target === currentDim) {
        closeModal(currentOpenModal);
      }
    }
    // 닫기 버튼 처리 (이벤트 위임 활용)
    if (e.target.matches('.modal-close, .close, .btn-close')) {
      // 다양한 닫기 버튼 클래스 처리
      const modalToClose = e.target.closest('.modal');
      if (modalToClose && modalToClose === currentOpenModal) {
        closeModal(modalToClose);
      }
    }
    // 일반 모달 확인 버튼 처리
    if (e.target.matches('.modal.general-modal .btn')) {
      const generalModal = e.target.closest('.modal.general-modal');
      if (generalModal && generalModal === currentOpenModal) {
        closeModal(generalModal);
      }
    }
  });

  // ESC 키 처리
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && currentOpenModal) {
      closeModal(currentOpenModal);
    }
  });
};

// --- Specific Modal Initializers (Using Generic Functions) ---

// 검색 입력창 확인 후 일반 모달 열기
const initGeneralModalTrigger = () => {
  const searchButtons = document.querySelectorAll('button.search, button.search-button');
  const generalModalId = 'modal-general-alert'; // 일반 알림 모달의 ID 가정

  searchButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      if (this.type === 'submit') e.preventDefault();
      const input =
        this.closest('.input-keyword')?.querySelector('input[type="text"]') ||
        this.closest('.search-form')?.querySelector('input[type="text"]') ||
        this.closest('.search-box')?.querySelector('input[type="text"]') ||
        this.closest('.search-box-careers')?.querySelector('input[type="text"]');

      if (input && !input.value.trim()) {
        const modalId = this.getAttribute('data-modal-id') || generalModalId;
        openModalById(modalId);
      } else if (input && input.value.trim() && this.type === 'submit') {
        // 폼 제출 로직 (필요시)
      }
    });
  });
};

// 필터 모달 내부 요소 및 열기 트리거 초기화
const initFilterModal = () => {
  const filterModal = document.getElementById('modal-filter');
  const filterButton = document.querySelector('.filter');

  if (!filterModal || !filterButton) return;

  filterButton.addEventListener('click', e => {
    e.preventDefault();
    openModalById('modal-filter');
  });

  const resetButton = filterModal.querySelector('.button-reset');
  const applyButton = filterModal.querySelector('.button-apply');

  // 근무형태 체크박스 관리 함수
  const initWorkTypeCheckboxes = () => {
    const workTypeAll = document.getElementById('work-type-all');
    const workTypeRegular = document.getElementById('work-type-regular');
    const workTypeContract = document.getElementById('work-type-contract');
    if (!workTypeAll || !workTypeRegular || !workTypeContract) return;
    workTypeAll.addEventListener('change', () => {
      const isChecked = workTypeAll.checked;
      workTypeRegular.checked = isChecked;
      workTypeContract.checked = isChecked;
    });
    [workTypeRegular, workTypeContract].forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const allChecked = workTypeRegular.checked && workTypeContract.checked;
        workTypeAll.checked = allChecked;
      });
    });
  };
  // 접수상태 체크박스 관리 함수
  const initStatusCheckboxes = () => {
    const statusAll = document.getElementById('status-type-all');
    const statusPre = document.getElementById('status-type-pre');
    const statusIng = document.getElementById('status-type-ing');
    const statusClose = document.getElementById('status-type-close');
    if (!statusAll || !statusPre || !statusIng || !statusClose) return;
    statusAll.addEventListener('change', () => {
      const isChecked = statusAll.checked;
      statusPre.checked = isChecked;
      statusIng.checked = isChecked;
      statusClose.checked = isChecked;
    });
    [statusPre, statusIng, statusClose].forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const allChecked = statusPre.checked && statusIng.checked && statusClose.checked;
        statusAll.checked = allChecked;
      });
    });
  };

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      const checkboxes = filterModal.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
      // 상태 반영 콜백 필요시 호출
    });
  }

  if (applyButton) {
    applyButton.addEventListener('click', () => closeModal(filterModal));
  }

  try {
    initWorkTypeCheckboxes();
    initStatusCheckboxes();
  } catch (error) {
    console.error('Error initializing filter checkboxes:', error);
  }
};

// --- DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', function () {
  // Top 버튼 초기화
  const topButton = document.querySelector('.button-top-wrapper');
  const showOffset = 200;
  if (topButton) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > showOffset) {
        topButton.classList.add('visible');
      } else {
        topButton.classList.remove('visible');
      }
    });
    topButton.querySelector('.button-top')?.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 범용 모달 닫기 리스너 초기화
  initGlobalCloseListeners();

  // 검색 버튼 -> 일반 모달 트리거 초기화
  initGeneralModalTrigger();

  // 필터 모달 초기화 (내부 로직 및 열기 트리거)
  initFilterModal();

  // 범용 모달 열기 트리거 초기화 (data-modal-id 속성 기반)
  document.querySelectorAll('[data-modal-id]').forEach(trigger => {
    if (!trigger.matches('.filter')) {
      // 필터 버튼은 initFilterModal에서 처리
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal-id');
        if (modalId) {
          openModalById(modalId);
        }
      });
    }
  });
});
