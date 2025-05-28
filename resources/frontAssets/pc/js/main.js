let HyundaiModal = {
  open: function (selector) {
    const modal = document.querySelector(selector);
    console.log(modal);
    if (!modal) return;

    const modalDim = modal.querySelector('.modal__dim');

    if (modal && modalDim) {
      modal.style.display = 'block';
      modalDim.style.display = 'block';
    }
  },
  close: function (selector) {
    const modal = document.querySelector(selector);
    if (!modal) return;

    const modalDim = modal.querySelector('.modal__dim');

    if (modal && modalDim) {
      modal.style.display = 'none';
      modalDim.style.display = 'none';
    }
  },
};

document.addEventListener('DOMContentLoaded', function () {
  const topButton = document.querySelector('.button-top-wrapper');
  const showOffset = 200; // 스크롤이 200px 이상 되었을 때 버튼 표시
  const headerNav = document.querySelector('.header__nav');
  const htmlElement = document.documentElement;

  const scrollEvent = () => {
    // 스크롤 위치가 0보다 크면 'scrolled' 클래스 추가, 아니면 제거
    if (window.pageYOffset > 0) {
      htmlElement.classList.add('scrolled');
    } else {
      htmlElement.classList.remove('scrolled');
    }

    // top 버튼 표시/숨김 처리
    if (!topButton) return;
    if (window.pageYOffset > showOffset) {
      topButton.classList.add('visible');
    } else {
      topButton.classList.remove('visible');
    }
  };

  // 스크롤 이벤트 처리
  window.addEventListener('scroll', function () {
    scrollEvent();
  });
  scrollEvent();

  // header__nav 마우스 이벤트 처리
  if (headerNav) {
    headerNav.addEventListener('mouseenter', function () {
      this.classList.add('active');
    });

    headerNav.addEventListener('mouseleave', function () {
      // setTimeout(() => {
      this.classList.remove('active');
      // }, 300);
    });
  }

  // top 버튼 클릭 이벤트
  if (topButton) {
    topButton.querySelector('.button-top').addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // 모달 초기화
  initModal();

  // 그 다음 다른 초기화 함수들 실행
  initSearchKeyword();
  initDropdowns();
  initResetAll();
});

// 모달 관리
const initModal = () => {
  // 모든 모달에 대한 이벤트 리스너 설정
  document.querySelectorAll('.modal').forEach(modal => {
    const modalDim = modal.querySelector('.modal__dim');
    const confirmButton = modal.querySelector('.btn');

    // 확인 버튼 클릭 시 모달 닫기
    if (confirmButton) {
      confirmButton.addEventListener('click', () => {
        HyundaiModal.close(`#${modal.id}`);
      });
    }

    // 모달 딤 클릭 시 모달 닫기
    if (modalDim) {
      modalDim.addEventListener('click', () => {
        HyundaiModal.close(`#${modal.id}`);
      });
    }
  });

  // ESC 키 누를 때 열려있는 모든 모달 닫기
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        if (modal.style.display === 'block') {
          HyundaiModal.close(`#${modal.id}`);
        }
      });
    }
  });
};

// 검색 초기화 관리
const initResetAll = () => {
  const resetAllButton = document.querySelector('.reset-button');
  if (!resetAllButton) return;

  resetAllButton.addEventListener('click', function () {
    // 키워드 입력 초기화
    const searchInputs = document.querySelectorAll('.search-box-careers__input');
    searchInputs.forEach(input => {
      input.value = '';
      const resetButton = input.closest('.input-keyword').querySelector('.reset');
      resetButton.style.display = 'none';
    });

    // 드롭다운 초기화
    const selectButtons = document.querySelectorAll('.select-button');
    const selectDropdowns = document.querySelectorAll('.select-dropdown');

    selectButtons.forEach((button, index) => {
      const dropdown = selectDropdowns[index];
      const dropdownTitle = dropdown.querySelector('.select-dropdown__title');
      const dropdownItems = dropdown.querySelectorAll('.select-dropdown__item');
      const defaultText = button.dataset.defaultText || (index === 0 ? '근무형태' : '접수상태');

      // 체크박스 초기화
      dropdownItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        checkbox.checked = false;
        item.classList.remove('active');
      });

      // 전체 체크박스 선택
      const allCheckbox = dropdownItems[0].querySelector('input[type="checkbox"]');
      allCheckbox.checked = true;
      dropdownItems[0].classList.add('active');

      // 버튼과 타이틀 텍스트 초기화
      button.textContent = defaultText;
      // dropdownTitle.textContent = defaultText;
    });
  });
};

// 검색 키워드 관리
const initSearchKeyword = () => {
  // 모든 검색 관련 입력창 선택
  const searchInputs = document.querySelectorAll('.search-box-careers__input, .search-input');

  searchInputs.forEach(input => {
    const resetButton =
      input.closest('.input-keyword')?.querySelector('.reset') ||
      input.closest('.search-form')?.querySelector('.search-clear');

    const searchButton =
      input.closest('.input-keyword')?.querySelector('.search') ||
      input.closest('.search-form')?.querySelector('.search-button');
    console.log(searchButton);

    // 검색 버튼 클릭 시
    searchButton.addEventListener('click', e => {
      e.preventDefault();
      if (!input.value.trim()) {
        console.log(HyundaiModal);
        HyundaiModal.open('#searchModal');
      }
    });

    if (!resetButton) return;

    // 초기 상태 설정
    resetButton.style.display = 'none';

    // 입력 이벤트
    input.addEventListener('input', function () {
      resetButton.style.display = this.value ? 'block' : 'none';
    });

    // 리셋 버튼 클릭 이벤트
    resetButton.addEventListener('click', function () {
      input.value = '';
      this.style.display = 'none';
    });

    // 페이지 로드 시 입력값이 있는 경우 리셋 버튼 표시
    if (input.value) {
      resetButton.style.display = 'block';
    }
  });
};

// 드롭다운 메뉴 관리
const initDropdowns = () => {
  // 필요한 요소들 선택
  const selectButtons = document.querySelectorAll('.select-button');
  const selectDropdowns = document.querySelectorAll('.select-dropdown');

  // 문서 클릭 이벤트 핸들러
  document.addEventListener('click', function (e) {
    // 드롭다운 영역이나 버튼을 클릭한 경우가 아닐 때만 드롭다운 닫기
    if (!e.target.closest('.select-dropdown') && !e.target.closest('.select-button')) {
      selectDropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
      });
    }
  });

  selectButtons.forEach((button, index) => {
    const dropdown = button.nextElementSibling; // select-dropdown
    const dropdownTitle = dropdown.querySelector('.select-dropdown__title');
    const dropdownItems = dropdown.querySelectorAll('.select-dropdown__item');
    const allCheckbox = dropdownItems[0].querySelector('input[type="checkbox"]');
    const otherCheckboxes = Array.from(dropdownItems)
      .slice(1)
      .map(item => item.querySelector('input[type="checkbox"]'));
    const defaultText = button.textContent;

    // defaultText를 데이터 속성으로 저장
    button.dataset.defaultText = defaultText;

    // 드롭다운 초기 상태 설정
    dropdown.style.display = 'none';

    // 버튼 클릭 이벤트
    button.addEventListener('click', function (e) {
      e.stopPropagation();

      // 다른 열린 드롭다운들 닫기
      selectDropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          otherDropdown.style.display = 'none';
        }
      });

      // 현재 드롭다운 토글
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    // 체크박스 클릭 이벤트 전파 중지
    dropdownItems.forEach(item => {
      item.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    });

    // 전체 체크박스 이벤트
    allCheckbox.addEventListener('change', function () {
      const isChecked = this.checked;

      // 전체 체크박스 상태에 따라 다른 체크박스들도 동일하게 설정
      otherCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
        checkbox.closest('.select-dropdown__item').classList.toggle('active', isChecked);
      });

      // 전체 체크박스의 active 클래스 토글
      allCheckbox.closest('.select-dropdown__item').classList.toggle('active', isChecked);

      // 버튼과 타이틀 텍스트 업데이트
      const displayText = isChecked ? '전체' : defaultText;
      button.textContent = displayText;
      // dropdownTitle.textContent = displayText;
    });

    // 다른 체크박스들 이벤트
    otherCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        const item = this.closest('.select-dropdown__item');
        item.classList.toggle('active', this.checked);

        // 모든 다른 체크박스가 선택되었는지 확인
        const allOtherChecked = otherCheckboxes.every(cb => cb.checked);

        // 전체 체크박스 상태 업데이트
        allCheckbox.checked = allOtherChecked;
        allCheckbox.closest('.select-dropdown__item').classList.toggle('active', allOtherChecked);

        // 선택된 항목들의 텍스트를 수집
        const selectedItems = Array.from(dropdownItems)
          .slice(1)
          .filter(item => item.querySelector('input[type="checkbox"]').checked)
          .map(item => item.querySelector('label').textContent);

        // 버튼과 타이틀 텍스트 업데이트
        const displayText = allOtherChecked
          ? '전체'
          : selectedItems.length > 0
            ? selectedItems.join(', ')
            : defaultText;
        button.textContent = displayText;
        // dropdownTitle.textContent = displayText;
      });
    });

    // 드롭다운 타이틀 클릭 이벤트
    dropdownTitle.addEventListener('click', function () {
      dropdown.style.display = 'none';
    });
  });
};

// 운영체제(OS) 구분
const userAgent = navigator.userAgent.toLowerCase();

if (userAgent.includes('windows')) {
  document.documentElement.classList.add('window');
} else if (userAgent.includes('macintosh') || userAgent.includes('mac os')) {
  document.documentElement.classList.add('mac');
} else {
}
