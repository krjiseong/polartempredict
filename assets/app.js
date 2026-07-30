(() => {
  "use strict";

  const TWO_PI = 2 * Math.PI;

  const MODEL_PATHS = {
    KPDC_ONLY: {
      model: "models/KPDC_ONLY_FINAL_full_data.json",
      metadata: "models/KPDC_ONLY_FINAL_metadata.json",
      label: "KPDC 전체표본",
    },
    KPDC_MATCHED: {
      model: "models/KPDC_MATCHED_FINAL_full_data.json",
      metadata: "models/KPDC_MATCHED_FINAL_metadata.json",
      label: "KPDC 공통표본",
    },
    NASA_ONLY: {
      model: "models/NASA_ONLY_FINAL_full_data.json",
      metadata: "models/NASA_ONLY_FINAL_metadata.json",
      label: "NASA 단독",
    },
    NASA_KPDC: {
      model: "models/NASA_KPDC_FINAL_full_data.json",
      metadata: "models/NASA_KPDC_FINAL_metadata.json",
      label: "NASA + KPDC",
    },
  };

  const EXAMPLE = {
    kpdc_rh: 79.8,
    kpdc_slp: 993.6,
    kpdc_wind_speed: 4.2,
    kpdc_wind_direction: 264.6,
    kpdc_cn10: 3340.124,
    calipso_latitude: -62.205237,
    calipso_longitude: -58.781348,
    calipso_altitude: 0.906248,
    calipso_rh: 87.439634,
    calipso_pressure: 886.814513,
    calipso_profiles: 40,
    calipso_time_span: 29.015,
    merra2_density: 2137.860049,
    calipso_merra2_time_diff: 15.02667,
    nasa_cn10: 99.797615,
    nasa_wind_speed: 0.711146,
    nasa_wind_direction: 341.982232,
    nasa_kpdc_time_diff: 14.97333,
  };

  const KPDC_FIELDS = [
    { id: "kpdc_rh", label: "KPDC 상대습도", unit: "%", min: 0, max: 100, step: 0.01 },
    { id: "kpdc_slp", label: "KPDC 해면기압", unit: "hPa", min: 800, max: 1100, step: 0.01 },
    { id: "kpdc_wind_speed", label: "KPDC 풍속", unit: "m/s", min: 0, max: 80, step: 0.01,
      help: "풍향과 함께 Wind_U·Wind_V로 자동 변환" },
    { id: "kpdc_wind_direction", label: "KPDC 풍향", unit: "degree", min: 0, max: 360, step: 0.01 },
    { id: "kpdc_cn10", label: "KPDC CN10", unit: "개/cm³", min: 0, step: 0.001,
      help: "log(1+CN10)으로 자동 변환" },
  ];

  const NASA_FIELDS = [
    { id: "calipso_latitude", label: "CALIPSO 위도", unit: "degree", min: -90, max: 90, step: 0.000001 },
    { id: "calipso_longitude", label: "CALIPSO 경도", unit: "degree", min: -180, max: 180, step: 0.000001 },
    { id: "calipso_altitude", label: "CALIPSO 지상고도", unit: "km AGL", min: 0, step: 0.000001 },
    { id: "calipso_rh", label: "CALIPSO 상대습도", unit: "%", min: 0, max: 100, step: 0.000001 },
    { id: "calipso_pressure", label: "CALIPSO 기압", unit: "hPa", min: 0, step: 0.000001 },
    { id: "calipso_profiles", label: "평균 프로파일 수", unit: "count", min: 1, step: 1 },
    { id: "calipso_time_span", label: "CALIPSO 관측 시간범위", unit: "seconds", min: 0, step: 0.000001 },
    { id: "merra2_density", label: "MERRA-2 유효 혼합밀도", unit: "kg/m³", min: 0, step: 0.000001 },
    { id: "calipso_merra2_time_diff", label: "CALIPSO–MERRA-2 시간차", unit: "minutes", min: 0, step: 0.000001 },
    { id: "nasa_cn10", label: "NASA 추정 CN10", unit: "개/cm³", min: 0, step: 0.000001,
      help: "log(1+CN10)으로 자동 변환" },
    { id: "nasa_wind_speed", label: "MERRA-2 풍속", unit: "m/s", min: 0, max: 100, step: 0.000001,
      help: "풍향과 함께 NASA_Wind_U·NASA_Wind_V로 자동 변환" },
    { id: "nasa_wind_direction", label: "MERRA-2 풍향", unit: "degree", min: 0, max: 360, step: 0.000001 },
    { id: "nasa_kpdc_time_diff", label: "NASA–KPDC 시간차", unit: "minutes", min: 0, step: 0.000001 },
  ];

  const cache = new Map();
  let selectedModel = "KPDC_ONLY";

  const modelGrid = document.getElementById("model-grid");
  const loadingState = document.getElementById("loading-state");
  const form = document.getElementById("prediction-form");
  const fieldContainer = document.getElementById("field-container");
  const fillExampleButton = document.getElementById("fill-example");
  const resetButton = document.getElementById("reset-form");
  const dateInput = document.getElementById("observation_datetime_utc");
  const resultPanel = document.getElementById("result-panel");
  const resultValue = document.getElementById("result-value");
  const resultDescription = document.getElementById("result-description");

  function currentUtcInputValue() {
    const now = new Date();
    now.setUTCMinutes(0, 0, 0);
    return now.toISOString().slice(0, 16);
  }

  function makeInput(field) {
    const wrapper = document.createElement("div");
    wrapper.className = "field";

    const label = document.createElement("label");
    label.htmlFor = field.id;
    label.innerHTML = `${field.label} <span class="unit">${field.unit ?? ""}</span>`;

    const input = document.createElement("input");
    input.type = "number";
    input.id = field.id;
    input.name = field.id;
    input.required = true;
    input.placeholder = "값 입력";
    input.inputMode = "decimal";

    for (const attr of ["min", "max", "step"]) {
      if (field[attr] !== undefined) input[attr] = String(field[attr]);
    }

    const help = document.createElement("span");
    help.className = "field-help";
    help.textContent = field.help ?? "";

    wrapper.append(label, input, help);
    return wrapper;
  }

  function makeSection(title, description, fields) {
    const section = document.createElement("section");
    section.className = "field-section";

    const heading = document.createElement("div");
    heading.className = "field-section-title";
    heading.innerHTML = `<h3>${title}</h3><p>${description}</p>`;

    const grid = document.createElement("div");
    grid.className = "field-grid";
    fields.forEach((field) => grid.appendChild(makeInput(field)));

    section.append(heading, grid);
    return section;
  }

  function renderFields() {
    fieldContainer.innerHTML = "";

    if (selectedModel === "KPDC_ONLY" || selectedModel === "KPDC_MATCHED") {
      fieldContainer.appendChild(
        makeSection("KPDC 지상 관측자료", "지상센서 관측값을 입력한다.", KPDC_FIELDS),
      );
      return;
    }

    fieldContainer.appendChild(
      makeSection("NASA·CALIPSO·MERRA-2 관측자료", "위성·재분석 관측값을 입력한다.", NASA_FIELDS),
    );

    if (selectedModel === "NASA_KPDC") {
      fieldContainer.appendChild(
        makeSection("KPDC 지상 관측자료", "동일 시점에 매칭된 지상 관측값을 입력한다.", KPDC_FIELDS),
      );
    }
  }

  async function loadModel(name) {
    if (cache.has(name)) return cache.get(name);

    const paths = MODEL_PATHS[name];
    const [modelResponse, metadataResponse] = await Promise.all([
      fetch(paths.model),
      fetch(paths.metadata),
    ]);

    if (!modelResponse.ok) throw new Error(`모델 파일을 불러오지 못했다: ${paths.model}`);
    if (!metadataResponse.ok) throw new Error(`메타데이터를 불러오지 못했다: ${paths.metadata}`);

    const [model, metadata] = await Promise.all([
      modelResponse.json(),
      metadataResponse.json(),
    ]);

    validateModelBundle(model, metadata);
    const bundle = { model, metadata };
    cache.set(name, bundle);
    return bundle;
  }

  function validateModelBundle(model, metadata) {
    const modelFeatures = model?.learner?.feature_names;
    const metadataFeatures = metadata?.features;

    if (!Array.isArray(modelFeatures) || !Array.isArray(metadataFeatures)) {
      throw new Error("모델 피처 정보가 올바르지 않다.");
    }

    if (
      modelFeatures.length !== metadataFeatures.length ||
      modelFeatures.some((name, index) => name !== metadataFeatures[index])
    ) {
      throw new Error("모델과 메타데이터의 피처 순서가 일치하지 않는다.");
    }
  }

  function parseBaseScore(value) {
    if (typeof value === "number") return value;
    if (Array.isArray(value)) return Number(value[0]);

    const text = String(value).trim();
    if (text.startsWith("[")) {
      return Number(text.slice(1, -1).split(",")[0]);
    }
    return Number(text);
  }

  function predictXGBoost(model, featureVector) {
    const learner = model.learner;
    const trees = learner.gradient_booster.model.trees;
    let prediction = parseBaseScore(learner.learner_model_param.base_score);

    for (const tree of trees) {
      let node = 0;

      while (tree.left_children[node] !== -1) {
        const featureIndex = tree.split_indices[node];
        const value = Math.fround(featureVector[featureIndex]);
        const threshold = Math.fround(tree.split_conditions[node]);

        if (Number.isNaN(value)) {
          node = tree.default_left[node]
            ? tree.left_children[node]
            : tree.right_children[node];
        } else if (value < threshold) {
          node = tree.left_children[node];
        } else {
          node = tree.right_children[node];
        }
      }

      prediction += tree.split_conditions[node];
    }
    return prediction;
  }

  function readUtcDate() {
    if (!dateInput.value) throw new Error("관측 날짜·시간을 입력해야 한다.");
    const date = new Date(`${dateInput.value}:00Z`);
    if (Number.isNaN(date.getTime())) throw new Error("관측 날짜·시간 형식을 확인하라.");
    return date;
  }

  function dayOfYearUtc(date) {
    const yearStart = Date.UTC(date.getUTCFullYear(), 0, 0);
    const currentDay = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    return Math.floor((currentDay - yearStart) / 86400000);
  }

  function timeFeatures(date) {
    const hour = date.getUTCHours();
    const dayOfYear = dayOfYearUtc(date);
    return {
      hour_sin: Math.sin(TWO_PI * hour / 24.0),
      hour_cos: Math.cos(TWO_PI * hour / 24.0),
      doy_sin: Math.sin(TWO_PI * dayOfYear / 365.25),
      doy_cos: Math.cos(TWO_PI * dayOfYear / 365.25),
    };
  }

  // 학습자료의 Wind_U, Wind_V 생성방식과 동일:
  // U = speed*cos(direction), V = speed*sin(direction)
  function windComponents(speed, directionDegrees) {
    const radians = directionDegrees * Math.PI / 180.0;
    return {
      u: speed * Math.cos(radians),
      v: speed * Math.sin(radians),
    };
  }

  function readNumber(id) {
    const element = document.getElementById(id);
    if (!element) throw new Error(`입력칸을 찾을 수 없다: ${id}`);

    const value = Number(element.value);
    if (!Number.isFinite(value)) {
      throw new Error(`${element.previousElementSibling?.textContent ?? id} 값을 확인하라.`);
    }
    return value;
  }

  function buildRawFeatureMap(observationDate) {
    const values = { ...timeFeatures(observationDate) };

    if (
      selectedModel === "KPDC_ONLY" ||
      selectedModel === "KPDC_MATCHED" ||
      selectedModel === "NASA_KPDC"
    ) {
      const kpdcWind = windComponents(
        readNumber("kpdc_wind_speed"),
        readNumber("kpdc_wind_direction"),
      );
      values["RH(%)"] = readNumber("kpdc_rh");
      values["SLP(hPa)"] = readNumber("kpdc_slp");
      values.Wind_U = kpdcWind.u;
      values.Wind_V = kpdcWind.v;
      values.KPDC_CN10_log1p = Math.log1p(Math.max(0, readNumber("kpdc_cn10")));
    }

    if (selectedModel === "NASA_ONLY" || selectedModel === "NASA_KPDC") {
      const nasaWind = windComponents(
        readNumber("nasa_wind_speed"),
        readNumber("nasa_wind_direction"),
      );

      values.calipso_latitude = readNumber("calipso_latitude");
      values.calipso_longitude = readNumber("calipso_longitude");
      values.calipso_altitude_agl_km = readNumber("calipso_altitude");
      values.calipso_relative_humidity_pct = readNumber("calipso_rh");
      values.calipso_pressure_hpa = readNumber("calipso_pressure");
      values.calipso_n_averaged_profiles = readNumber("calipso_profiles");
      values.calipso_time_span_seconds = readNumber("calipso_time_span");
      values.merra2_effective_mixture_density_kg_m3 = readNumber("merra2_density");
      values.time_difference_minutes = readNumber("calipso_merra2_time_diff");
      values.NASA_estimated_CN10_log1p = Math.log1p(Math.max(0, readNumber("nasa_cn10")));
      values.NASA_Wind_U = nasaWind.u;
      values.NASA_Wind_V = nasaWind.v;
      values.nasa_kpdc_time_difference_minutes = readNumber("nasa_kpdc_time_diff");
    }

    return values;
  }

  async function activateModel(name) {
    selectedModel = name;

    document.querySelectorAll(".model-card").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.model === name);
    });

    form.hidden = true;
    loadingState.hidden = false;
    loadingState.textContent = `${MODEL_PATHS[name].label} 모델을 불러오는 중입니다.`;
    renderFields();
    clearResult();

    try {
      await loadModel(name);
      loadingState.hidden = true;
      form.hidden = false;
    } catch (error) {
      loadingState.hidden = false;
      loadingState.textContent = `${error.message} GitHub Pages에서 실행해 주세요.`;
      showError(error.message);
    }
  }

  function fillExample() {
    dateInput.value = "2015-07-15T12:00";
    form.querySelectorAll("input").forEach((input) => {
      if (Object.hasOwn(EXAMPLE, input.id)) input.value = EXAMPLE[input.id];
    });
  }

  function clearResult() {
    resultPanel.classList.remove("has-result", "has-error");
    resultValue.textContent = "관측값을 입력한 뒤 예측을 실행해 주세요.";
    resultDescription.textContent = "출력은 세종과학기지 지상기온 T(°C)이다.";
  }

  function showError(message) {
    resultPanel.classList.remove("has-result");
    resultPanel.classList.add("has-error");
    resultValue.textContent = "예측을 완료하지 못했습니다.";
    resultDescription.textContent = message;
  }

  function showPrediction(value, modelLabel, date) {
    resultPanel.classList.remove("has-error");
    resultPanel.classList.add("has-result");
    resultValue.textContent = `예측 지상기온 T = ${value.toFixed(2)} °C`;
    resultDescription.textContent =
      `${modelLabel} · ${date.toISOString().replace("T", " ").slice(0, 16)} UTC`;
  }

  modelGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".model-card");
    if (!button) return;
    activateModel(button.dataset.model);
  });

  fillExampleButton.addEventListener("click", fillExample);

  resetButton.addEventListener("click", () => {
    form.reset();
    dateInput.value = currentUtcInputValue();
    clearResult();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    try {
      const observationDate = readUtcDate();
      const bundle = await loadModel(selectedModel);
      const featureMap = buildRawFeatureMap(observationDate);

      const featureVector = bundle.metadata.features.map((name) => {
        if (!Object.hasOwn(featureMap, name)) {
          throw new Error(`필요한 입력 피처가 생성되지 않았다: ${name}`);
        }
        return Number(featureMap[name]);
      });

      const prediction = predictXGBoost(bundle.model, featureVector);
      if (!Number.isFinite(prediction)) {
        throw new Error("모델이 유효한 예측값을 반환하지 않았다.");
      }

      showPrediction(prediction, MODEL_PATHS[selectedModel].label, observationDate);
    } catch (error) {
      console.error(error);
      showError(error.message);
    }
  });

  dateInput.value = currentUtcInputValue();
  activateModel(selectedModel);
})();
