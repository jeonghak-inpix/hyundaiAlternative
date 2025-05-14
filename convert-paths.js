const fs = require('fs');
const path = require('path');
const glob = require('glob');

// HTML 파일 찾기
const htmlFiles = glob.sync('**/*.html', { ignore: ['node_modules/**'] });

// 각 HTML 파일 처리
htmlFiles.forEach(htmlFile => {
  // 파일 읽기
  const content = fs.readFileSync(htmlFile, 'utf8');

  // 파일의 디렉토리 경로 계산
  const fileDir = path.dirname(htmlFile);

  // 상대 경로 계산 함수
  const getRelativePath = absolutePath => {
    // resources/frontAssets로 시작하는 경로만 처리
    if (!absolutePath.startsWith('/resources/frontAssets')) {
      return absolutePath;
    }

    // 상대 경로 계산
    const relativePath = path.relative(fileDir, absolutePath.slice(1));
    return relativePath;
  };

  // href 속성의 경로 변환
  let modifiedContent = content.replace(
    /href="\/resources\/frontAssets\/([^"]+)"/g,
    (match, p1) => `href="${getRelativePath('/resources/frontAssets/' + p1)}"`
  );

  // src 속성의 경로 변환
  modifiedContent = modifiedContent.replace(
    /src="\/resources\/frontAssets\/([^"]+)"/g,
    (match, p1) => `src="${getRelativePath('/resources/frontAssets/' + p1)}"`
  );

  // 변경된 내용이 있는 경우에만 파일 저장
  if (content !== modifiedContent) {
    fs.writeFileSync(htmlFile, modifiedContent, 'utf8');
    console.log(`Updated: ${htmlFile}`);
  }
});
