# 현대얼터너티브 웹사이트

## 프로젝트 구조

```
.
├── pc/                         # PC 버전
│   ├── main.html              # 메인 페이지
│   ├── about/                 # 회사 소개
│   │   ├── company.html      # 회사소개
│   │   ├── organization.html # 조직소개
│   │   └── location.html     # 오시는길
│   ├── portfolio/            # 포트폴리오
│   │   ├── assets.html      # 운용자산현황
│   │   └── business.html    # 사업영역
│   ├── esg/                  # ESG
│   │   ├── riskCompliance.html    # Risk & Compliance
│   │   └── esgManagement.html     # ESG 경영
│   └── management/           # 경영정보
│       ├── news/            # 회사소식
│       │   ├── newsList.html     # 목록
│       │   └── newsView.html     # 상세
│       ├── disclosure/      # 경영공시
│       │   ├── disclosureList.html   # 목록
│       │   └── disclosureView.html   # 상세
│       ├── fundDisclosure/  # 펀드공시
│       │   ├── fundDisclosureList.html   # 목록
│       │   └── fundDisclosureView.html   # 상세
│       └── careers/         # 인재채용
│           ├── careersList.html    # 목록
│           └── careersView.html    # 상세
├── mo/                         # 모바일 버전 (PC와 동일한 구조)
└── resources/                  # 리소스 파일
    ├── frontAssets/          # 프론트엔드 자산
    │   ├── pc/              # PC 버전 자산
    │   │   ├── css/        # CSS 파일
    │   │   ├── javascript/ # JavaScript 파일
    │   │   ├── image/      # 이미지 파일
    │   │   └── font/       # 폰트 파일
    │   └── mo/             # 모바일 버전 자산 (PC와 동일한 구조)
    └── adminAssets/         # 관리자 자산
        ├── css/            # CSS 파일
        ├── javascript/     # JavaScript 파일
        ├── image/         # 이미지 파일
        └── font/          # 폰트 파일
```

## 개발 환경 설정

1. Node.js 설치

   - [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 설치

2. 프로젝트 의존성 설치
   ```bash
   npm install
   ```

## SCSS 컴파일

프로젝트는 SCSS를 사용하여 스타일을 관리합니다. 다음 명령어로 SCSS를 CSS로 컴파일할 수 있습니다:

1. PC 버전만 컴파일

   ```bash
   npm run sass:pc
   ```

2. 모바일 버전만 컴파일

   ```bash
   npm run sass:mo
   ```

3. PC와 모바일 버전 동시 컴파일
   ```bash
   npm run sass
   ```

## 코드 포맷팅

코드의 일관성을 유지하기 위해 Prettier를 사용합니다:

```bash
npm run format
```

## 개발 환경

- HTML5
- SCSS
- JavaScript
- Node.js
- 패키지 매니저: npm
- 코드 포맷터: Prettier

## 브라우저 지원

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)
- Samsung Internet (모바일)

## 반응형 디자인

- PC 버전: 1200px 이상
- 모바일 버전: 360px ~ 767px

## 문의

프로젝트 관련 문의사항은 담당자에게 연락 바랍니다.

## 설명

- `pc/`: PC 버전 웹사이트 파일
- `mo/`: 모바일 버전 웹사이트 파일
- `resources/`: 정적 자산 파일
  - `frontAssets/`: 프론트엔드 관련 자산
  - `adminAssets/`: 관리자 페이지 관련 자산

## 시작하기

1. SCSS를 CSS로 컴파일하기 위해 SASS 컴파일러를 설치해야 합니다.
2. `styles/main.scss` 파일을 컴파일하여 `styles/main.css` 파일을 생성합니다.
3. `index.html` 파일을 브라우저에서 열어 확인합니다.

## SCSS 컴파일 방법

```bash
sass styles/main.scss styles/main.css
```

## 라이브 서버 실행

로컬 서버를 실행하여 프로젝트를 확인할 수 있습니다:

```bash
python -m http.server 8000
```

그 후 브라우저에서 `http://localhost:8000`으로 접속하세요.
