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
});
