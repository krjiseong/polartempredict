# Polar Temp Predict

배포 주소:

```text
https://krijseong.github.io/polartempredict/
```

## GitHub에 올리는 방법

1. GitHub에서 `polartempredict`라는 새 Public 저장소를 만든다.
2. 이 폴더 안의 파일 전체를 저장소 최상단에 업로드한다.
3. 저장소의 `Settings` → `Pages`로 이동한다.
4. `Build and deployment`에서 다음을 선택한다.
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. `Save`를 누른다.
6. 잠시 후 아래 주소로 접속한다.

```text
https://krijseong.github.io/polartempredict/
```

## 구성

- `index.html`: 사이트 화면
- `assets/app.js`: 전처리 및 브라우저 XGBoost 예측
- `assets/style.css`: 화면 디자인
- `models/`: 네 개 최종모델 JSON 및 metadata
- `.nojekyll`: GitHub Pages 정적 배포 설정

Python 서버나 Streamlit은 사용하지 않는다. 모든 예측은 브라우저에서 실행된다.
