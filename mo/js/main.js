document.addEventListener('DOMContentLoaded', function () {
  const mainNavItems = document.querySelectorAll('.main-nav__item');

  // 모바일 네비게이션 아이템 클릭 이벤트 처리
  mainNavItems.forEach(item => {
    item.addEventListener('click', function () {
      // 현재 클릭된 아이템에 active 클래스가 있는지 확인
      if (this.classList.contains('active')) {
        // active 클래스가 있으면 제거
        this.classList.remove('active');
      } else {
        // active 클래스가 없으면 추가
        this.classList.add('active');
      }
    });
  });
});
