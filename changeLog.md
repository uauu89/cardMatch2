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