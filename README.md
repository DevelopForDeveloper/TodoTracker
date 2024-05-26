# TODO List Application

## 개요
이 프로젝트는 Vue 3.0과 Nuxt.js를 사용하여 개발된 TODO 리스트 애플리케이션입니다. 이 애플리케이션은 사용자에게 할 일을 추가, 수정, 삭제할 수 있는 기능을 제공하며, 로컬 스토리지를 사용하여 데이터를 영구적으로 저장합니다. 또한, 반응형 디자인을 채택하여 다양한 디바이스에서 최적의 사용자 경험을 제공합니다.

## 기능
- 할 일 추가, 수정, 삭제 [o]
- 로컬 스토리지에 데이터 저장 [o]
- 중복 입력 금지 [o]
- 할일, 하는중, 완료 각 스테이터스 변경 가능 [o]
- 유효성 검사 추가
- 할 일 필터링 (전체, 완료, 미완료)
- 할 일 검색
- 반응형 디자인
- 마감일, 우선순위(높음, 중간, 낮음)
- 우선순위에 따라 할 일 정렬
- 캘린더로 보는 기능 추가
- 로그인 기능 추가
- 파이어베이스로 데이터베이스 기능 추가

## 기술 스택
- [Vue 3.0](https://vuejs.org/)
- [Nuxt.js](https://nuxtjs.org/)
- [Pinia](https://pinia.vuejs.org/) (상태 관리)
- [Vue Router](https://router.vuejs.org/) (라우팅)
- [Sass](https://sass-lang.com/) (스타일링)
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) (데이터 저장)

## 프로젝트 설정

### 요구 사항
- [Node.js](https://nodejs.org/) (버전 18 이상)
- npm 또는 yarn

### 설치
1. 리포지토리를 클론합니다.
    ```bash
    git clone https://github.com/woori3104/TodoTracker.git
    ```

2. 의존성을 설치합니다.
    ```bash
    npm install
    # 또는
    yarn install
    ```

### 개발 서버 실행
  ```bash
  # npm
  npm install

  # pnpm
  pnpm install

  # yarn
  yarn install

  # bun
  bun install
  ```

## 개발 서버 

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
# TodoTracker
