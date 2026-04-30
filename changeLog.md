## 수정내역


#### 26.04.16

1. changeLog 기록 시작 
2. Path Alias 설정
   > + tsconfig.app.json 및 vite.config.ts 파일 수정
   > + component 폴더명 components로 변경
3. 게임 옵션 창 작업
    > + 옵션 변수 생성
    > + 기능 연결
4. 컴퓨터 상태 이모지 수정
   > tricky 이모지 변경
   > tricky > 실수로 정답일 때 confusion 추가
   > tickiy > 오답일 때 tease 추가

### 26.04.17

1. 로직 로그 UI 추가
   > + 행동 분기 별 로그를 찍기 위해 comAlgorithm의 if문 구조 변경
2. 변수명 변경
   > + opt_remainRatio → opt_openedRatio로 변경
   > + opend 오타 수정

### 26.04.19

1. 로직 로그 UI 추가
   > ComLog.tsx 컴포넌트 생성

2. 기타
   > Infinity.tsx svg 생성

### 26.04.20

1. 로직 로그 UI 추가
   > useLogStore.tsx 생성, 스토어 작성, 데이터 연결 완료
   > 로직 단계마다 로직 state 업데이트 구문 작성
   > UI 레이아웃 변경 위해 기획 중
   
### 26.04.21
1. 컴퓨터 알고리즘 수정
   > insertWrongIndex()의 targetArray를 knownIndices, unknownIndices 배열 전체로 받던 거를 returnIndices로 받도록 수정
   > 비공개 배열에서 선택 케이스의 조건에 length 조건 추가 ( 배열에 값이 없는데 로직 분기에 진입해서 undefined 리턴되는 것으로 예상 )
2. 페이지 레이아웃 변경
   > 로그 UI를 게임보드와 좌, 우에 각각 배치되도록 변경 (display: grid)
   > 페이지 레이아웃을 grid로 변경하면서 GameHUD도 fixed → static으로 변경
3. 로직 로그 UI
   > 1차 작업 완료, CSS 지속적 개선 예정
4. UI 수정
   > GameOver.tsx 수정
   > + 조건에 따라 컴포넌트 전체를 return하는 방식에서 일부분만 변경되도록 변경 
   > + 로그 UI 추가하면서 게임 종료 후 로그 확인할 수 있도록 딤드 숨기는 기능 추가

### 26.04.22
1. 컴퓨터 알고리즘 수정
   > insertWrongIndex()에서 filteredArray의 값이 없을 경우 원본배열을 return하는 코드 추가
      (카드 두 장이 남았을 때 실수가 발생하면 undefined 발생)
2. UI 수정
   > Spinner.tsx 수정 
   > + 기존 로딩 애니메이션만 출력 → 타이머 애니메이션 추가하면서 속성을 props로 컨트롤 가능하도록 변경
3. 변수명 변경
   > useUIStore의 state를 boolean 결과에 맞게 이름 변경
4. CSS 수정
   > 반응형 작업 (진행중)
   > 인터랙티브 애니메이션 수정, 개선 (진행중)

### 26.04.29
1. CSS 수정
   > 반응형 작업 (진행중)
   > + InputCheck 컴포넌트의 체크박스 크기를 font-size에 대응하도록 변경하면서 체크마크를 svg로 변경
   > 인터랙티브 애니메이션 수정, 개선 (진행중)

### 26.04.30
1. CSS 수정
   > 반응형 작업 (진행중)
2. 함수 개선
   > 카드크기 → 화면 크기에 따라 자동 변경 함수 변경
   > + 기존 : window.innerWidth 기준, window.resize로 트리거
   > + 변경 : gameBoard 크기 기준, ResizeObserver로 트리거, 값이 변경되었을 때만 setOpt_cardSize로 업데이트 하도록 기능 추가
3. 컴포넌트 코드 정리   
   > 커스텀 훅 작성 → useGameBoardLogic.ts 생성하여 함수 이동
4. UI 수정
   > StatusDisplay.tsx에 타이머 무제한 상태 추가 (Infinity.ts)


#### 해야 할 것
1. CSS 작성
   > + CSS 완성
   > + CSS 변수 정리, 활용
   > + 반응형 작성
2. 기능 추가 : 선 턴 정하기
   > + 대전 모드에서 선 턴 정하기 (동전 던지기 애니메이션)
   > + 카드 디자인 추가
3. UI 추가
   > + 컴퓨터 행동 로직 로그 창 추가
   > + 컴퓨터 행동 로직 상세설명 창 추가
   > + 타이머 상태 추가 (최초 접속 / 게임 승리 / 패배 / 종료(싱글모드) / 타이머 시간 게이지 / 타이머 무한)
4. 코드 정리
   > + 외부파일로 관리 가능한 함수는 외부파일로
   > + 기획이 변경되면서 gamePhase의 "gameStart" 값 사용처 없어짐, 작업 완료하고 사용처 없으면 삭제하기
5. ReadMe, changeLog 작성