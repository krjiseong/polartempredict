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

  // 2010–2019년 실제 학습자료에서 추출한 관측 예시입니다.
  // 버튼을 누를 때마다 현재 모델에 맞는 다른 관측행을 채웁니다.
  const EXAMPLE_POOLS = {
  "KPDC_ONLY": [
    {
      "datetime": "2010-01-01T05:00",
      "kpdc_rh": 90.0,
      "kpdc_slp": 992.6,
      "kpdc_wind_speed": 1.1,
      "kpdc_wind_direction": 145.5,
      "kpdc_cn10": 583.831
    },
    {
      "datetime": "2010-05-16T04:00",
      "kpdc_rh": 96.6,
      "kpdc_slp": 973.1,
      "kpdc_wind_speed": 10.8,
      "kpdc_wind_direction": 299.0,
      "kpdc_cn10": 654.247
    },
    {
      "datetime": "2010-10-10T15:00",
      "kpdc_rh": 97.2,
      "kpdc_slp": 967.6,
      "kpdc_wind_speed": 11.4,
      "kpdc_wind_direction": 146.7,
      "kpdc_cn10": 1264.989
    },
    {
      "datetime": "2011-03-28T00:00",
      "kpdc_rh": 88.9,
      "kpdc_slp": 997.5,
      "kpdc_wind_speed": 9.5,
      "kpdc_wind_direction": 96.5,
      "kpdc_cn10": 68.829
    },
    {
      "datetime": "2011-08-11T04:00",
      "kpdc_rh": 95.4,
      "kpdc_slp": 970.5,
      "kpdc_wind_speed": 4.4,
      "kpdc_wind_direction": 337.6,
      "kpdc_cn10": 114.178
    },
    {
      "datetime": "2011-12-27T22:00",
      "kpdc_rh": 77.9,
      "kpdc_slp": 984.7,
      "kpdc_wind_speed": 4.8,
      "kpdc_wind_direction": 38.7,
      "kpdc_cn10": 263.477
    },
    {
      "datetime": "2012-05-12T05:00",
      "kpdc_rh": 87.4,
      "kpdc_slp": 998.3,
      "kpdc_wind_speed": 9.6,
      "kpdc_wind_direction": 353.0,
      "kpdc_cn10": 1504.141
    },
    {
      "datetime": "2012-10-09T16:00",
      "kpdc_rh": 80.4,
      "kpdc_slp": 995.7,
      "kpdc_wind_speed": 5.6,
      "kpdc_wind_direction": 313.4,
      "kpdc_cn10": 381.572
    },
    {
      "datetime": "2013-03-05T12:00",
      "kpdc_rh": 94.2,
      "kpdc_slp": 994.9,
      "kpdc_wind_speed": 7.7,
      "kpdc_wind_direction": 309.0,
      "kpdc_cn10": 295.44
    },
    {
      "datetime": "2013-08-29T03:00",
      "kpdc_rh": 86.4,
      "kpdc_slp": 986.4,
      "kpdc_wind_speed": 2.0,
      "kpdc_wind_direction": 59.4,
      "kpdc_cn10": 64.489
    },
    {
      "datetime": "2014-02-02T07:00",
      "kpdc_rh": 67.6,
      "kpdc_slp": 994.8,
      "kpdc_wind_speed": 2.0,
      "kpdc_wind_direction": 31.5,
      "kpdc_cn10": 414.673
    },
    {
      "datetime": "2014-06-27T02:00",
      "kpdc_rh": 85.8,
      "kpdc_slp": 989.1,
      "kpdc_wind_speed": 7.3,
      "kpdc_wind_direction": 68.1,
      "kpdc_cn10": 297.959
    },
    {
      "datetime": "2014-12-15T22:00",
      "kpdc_rh": 91.2,
      "kpdc_slp": 988.8,
      "kpdc_wind_speed": 5.6,
      "kpdc_wind_direction": 315.7,
      "kpdc_cn10": 4668.743
    },
    {
      "datetime": "2015-04-23T11:00",
      "kpdc_rh": 74.6,
      "kpdc_slp": 974.0,
      "kpdc_wind_speed": 5.1,
      "kpdc_wind_direction": 248.5,
      "kpdc_cn10": 123.654
    },
    {
      "datetime": "2015-09-21T21:00",
      "kpdc_rh": 91.5,
      "kpdc_slp": 994.6,
      "kpdc_wind_speed": 3.2,
      "kpdc_wind_direction": 308.7,
      "kpdc_cn10": 864.136
    },
    {
      "datetime": "2016-02-12T02:00",
      "kpdc_rh": 90.3,
      "kpdc_slp": 975.5,
      "kpdc_wind_speed": 10.1,
      "kpdc_wind_direction": 95.8,
      "kpdc_cn10": 1149.509
    },
    {
      "datetime": "2016-07-30T00:00",
      "kpdc_rh": 94.8,
      "kpdc_slp": 1003.3,
      "kpdc_wind_speed": 4.4,
      "kpdc_wind_direction": 141.9,
      "kpdc_cn10": 2609.378
    },
    {
      "datetime": "2017-03-13T10:00",
      "kpdc_rh": 80.5,
      "kpdc_slp": 993.1,
      "kpdc_wind_speed": 10.1,
      "kpdc_wind_direction": 24.1,
      "kpdc_cn10": 374.141
    },
    {
      "datetime": "2017-07-31T07:00",
      "kpdc_rh": 80.4,
      "kpdc_slp": 977.4,
      "kpdc_wind_speed": 15.9,
      "kpdc_wind_direction": 231.9,
      "kpdc_cn10": 62.377
    },
    {
      "datetime": "2018-01-21T20:00",
      "kpdc_rh": 95.7,
      "kpdc_slp": 975.4,
      "kpdc_wind_speed": 5.1,
      "kpdc_wind_direction": 303.5,
      "kpdc_cn10": 7053.408
    },
    {
      "datetime": "2018-05-30T23:00",
      "kpdc_rh": 86.4,
      "kpdc_slp": 981.8,
      "kpdc_wind_speed": 7.2,
      "kpdc_wind_direction": 310.1,
      "kpdc_cn10": 37.427
    },
    {
      "datetime": "2018-10-13T21:00",
      "kpdc_rh": 86.9,
      "kpdc_slp": 989.3,
      "kpdc_wind_speed": 13.7,
      "kpdc_wind_direction": 108.7,
      "kpdc_cn10": 928.936
    },
    {
      "datetime": "2019-03-31T23:00",
      "kpdc_rh": 85.8,
      "kpdc_slp": 986.6,
      "kpdc_wind_speed": 4.6,
      "kpdc_wind_direction": 72.2,
      "kpdc_cn10": 427.657
    },
    {
      "datetime": "2019-08-20T14:00",
      "kpdc_rh": 82.7,
      "kpdc_slp": 1012.5,
      "kpdc_wind_speed": 1.7,
      "kpdc_wind_direction": 339.7,
      "kpdc_cn10": 411.787
    }
  ],
  "KPDC_MATCHED": [
    {
      "datetime": "2010-01-01T18:45",
      "kpdc_rh": 79.8,
      "kpdc_slp": 993.6,
      "kpdc_wind_speed": 4.2,
      "kpdc_wind_direction": 264.6,
      "kpdc_cn10": 3340.124
    },
    {
      "datetime": "2010-05-09T18:44",
      "kpdc_rh": 94.4,
      "kpdc_slp": 993.9,
      "kpdc_wind_speed": 13.4,
      "kpdc_wind_direction": 334.4,
      "kpdc_cn10": 359.062
    },
    {
      "datetime": "2010-10-06T04:40",
      "kpdc_rh": 88.1,
      "kpdc_slp": 1004.6,
      "kpdc_wind_speed": 8.5,
      "kpdc_wind_direction": 26.1,
      "kpdc_cn10": 626.058
    },
    {
      "datetime": "2011-04-01T18:48",
      "kpdc_rh": 95.3,
      "kpdc_slp": 999.2,
      "kpdc_wind_speed": 5.6,
      "kpdc_wind_direction": 102.8,
      "kpdc_cn10": 82.089
    },
    {
      "datetime": "2011-08-22T04:39",
      "kpdc_rh": 94.8,
      "kpdc_slp": 1004.4,
      "kpdc_wind_speed": 3.5,
      "kpdc_wind_direction": 333.6,
      "kpdc_cn10": 42.341
    },
    {
      "datetime": "2012-01-07T18:42",
      "kpdc_rh": 82.5,
      "kpdc_slp": 984.4,
      "kpdc_wind_speed": 8.9,
      "kpdc_wind_direction": 262.7,
      "kpdc_cn10": 555.969
    },
    {
      "datetime": "2012-07-07T04:39",
      "kpdc_rh": 90.9,
      "kpdc_slp": 1002.4,
      "kpdc_wind_speed": 2.1,
      "kpdc_wind_direction": 175.3,
      "kpdc_cn10": 1178.737
    },
    {
      "datetime": "2012-11-28T04:39",
      "kpdc_rh": 78.0,
      "kpdc_slp": 989.6,
      "kpdc_wind_speed": 1.7,
      "kpdc_wind_direction": 56.8,
      "kpdc_cn10": 386.609
    },
    {
      "datetime": "2013-04-05T04:40",
      "kpdc_rh": 83.4,
      "kpdc_slp": 978.4,
      "kpdc_wind_speed": 12.2,
      "kpdc_wind_direction": 24.9,
      "kpdc_cn10": 669.926
    },
    {
      "datetime": "2013-11-08T04:33",
      "kpdc_rh": 75.0,
      "kpdc_slp": 981.0,
      "kpdc_wind_speed": 10.1,
      "kpdc_wind_direction": 245.2,
      "kpdc_cn10": 229.756
    },
    {
      "datetime": "2014-03-24T18:49",
      "kpdc_rh": 84.7,
      "kpdc_slp": 984.0,
      "kpdc_wind_speed": 8.5,
      "kpdc_wind_direction": 60.4,
      "kpdc_cn10": 623.363
    },
    {
      "datetime": "2014-08-17T18:36",
      "kpdc_rh": 93.6,
      "kpdc_slp": 984.0,
      "kpdc_wind_speed": 4.2,
      "kpdc_wind_direction": 321.6,
      "kpdc_cn10": 151.654
    },
    {
      "datetime": "2015-01-15T18:42",
      "kpdc_rh": 90.3,
      "kpdc_slp": 986.0,
      "kpdc_wind_speed": 11.3,
      "kpdc_wind_direction": 112.2,
      "kpdc_cn10": 566.109
    },
    {
      "datetime": "2015-06-07T04:34",
      "kpdc_rh": 91.7,
      "kpdc_slp": 982.0,
      "kpdc_wind_speed": 16.3,
      "kpdc_wind_direction": 117.4,
      "kpdc_cn10": 81.616
    },
    {
      "datetime": "2015-10-21T18:48",
      "kpdc_rh": 78.0,
      "kpdc_slp": 1003.9,
      "kpdc_wind_speed": 3.7,
      "kpdc_wind_direction": 245.4,
      "kpdc_cn10": 580.091
    },
    {
      "datetime": "2016-04-13T04:40",
      "kpdc_rh": 83.4,
      "kpdc_slp": 985.5,
      "kpdc_wind_speed": 8.1,
      "kpdc_wind_direction": 293.5,
      "kpdc_cn10": 230.951
    },
    {
      "datetime": "2016-10-22T04:39",
      "kpdc_rh": 76.8,
      "kpdc_slp": 971.1,
      "kpdc_wind_speed": 8.8,
      "kpdc_wind_direction": 222.1,
      "kpdc_cn10": 422.491
    },
    {
      "datetime": "2017-04-26T18:42",
      "kpdc_rh": 69.4,
      "kpdc_slp": 998.4,
      "kpdc_wind_speed": 5.4,
      "kpdc_wind_direction": 85.1,
      "kpdc_cn10": 209.039
    },
    {
      "datetime": "2017-10-12T18:36",
      "kpdc_rh": 73.3,
      "kpdc_slp": 985.8,
      "kpdc_wind_speed": 9.4,
      "kpdc_wind_direction": 259.3,
      "kpdc_cn10": 598.077
    },
    {
      "datetime": "2018-03-03T18:49",
      "kpdc_rh": 95.8,
      "kpdc_slp": 990.6,
      "kpdc_wind_speed": 5.2,
      "kpdc_wind_direction": 317.2,
      "kpdc_cn10": 1105.483
    },
    {
      "datetime": "2018-07-11T18:37",
      "kpdc_rh": 89.3,
      "kpdc_slp": 970.6,
      "kpdc_wind_speed": 8.6,
      "kpdc_wind_direction": 299.1,
      "kpdc_cn10": 157.284
    },
    {
      "datetime": "2018-11-14T18:39",
      "kpdc_rh": 92.9,
      "kpdc_slp": 971.1,
      "kpdc_wind_speed": 11.8,
      "kpdc_wind_direction": 86.0,
      "kpdc_cn10": 469.459
    },
    {
      "datetime": "2019-04-20T04:33",
      "kpdc_rh": 81.1,
      "kpdc_slp": 987.6,
      "kpdc_wind_speed": 10.3,
      "kpdc_wind_direction": 87.8,
      "kpdc_cn10": 168.045
    },
    {
      "datetime": "2019-08-20T04:36",
      "kpdc_rh": 89.1,
      "kpdc_slp": 1012.0,
      "kpdc_wind_speed": 4.0,
      "kpdc_wind_direction": 337.5,
      "kpdc_cn10": 285.887
    }
  ],
  "NASA_ONLY": [
    {
      "datetime": "2010-01-07T04:42",
      "calipso_latitude": -62.050944,
      "calipso_longitude": -59.510457,
      "calipso_altitude": 0.905416,
      "calipso_rh": 93.195,
      "calipso_pressure": 890.867,
      "calipso_profiles": 26,
      "calipso_time_span": 26.037,
      "merra2_density": 2192.741,
      "calipso_merra2_time_diff": 12.033,
      "nasa_cn10": 204.831,
      "nasa_wind_speed": 6.423,
      "nasa_wind_direction": 147.729,
      "nasa_kpdc_time_diff": 17.967
    },
    {
      "datetime": "2010-05-08T04:34",
      "calipso_latitude": -62.343174,
      "calipso_longitude": -58.09371,
      "calipso_altitude": 0.9058,
      "calipso_rh": 91.582,
      "calipso_pressure": 881.672,
      "calipso_profiles": 36,
      "calipso_time_span": 26.038,
      "merra2_density": 2162.095,
      "calipso_merra2_time_diff": 4.964,
      "nasa_cn10": 248.508,
      "nasa_wind_speed": 12.399,
      "nasa_wind_direction": 49.01,
      "nasa_kpdc_time_diff": 25.036
    },
    {
      "datetime": "2010-09-20T04:39",
      "calipso_latitude": -62.108507,
      "calipso_longitude": -59.483739,
      "calipso_altitude": 0.90572,
      "calipso_rh": 99.176,
      "calipso_pressure": 870.426,
      "calipso_profiles": 36,
      "calipso_time_span": 26.037,
      "merra2_density": 2198.964,
      "calipso_merra2_time_diff": 9.942,
      "nasa_cn10": 355.531,
      "nasa_wind_speed": 8.816,
      "nasa_wind_direction": 345.837,
      "nasa_kpdc_time_diff": 20.058
    },
    {
      "datetime": "2011-01-20T18:42",
      "calipso_latitude": -62.213046,
      "calipso_longitude": -58.722834,
      "calipso_altitude": 0.90541,
      "calipso_rh": 86.984,
      "calipso_pressure": 886.946,
      "calipso_profiles": 40,
      "calipso_time_span": 29.015,
      "merra2_density": 2190.39,
      "calipso_merra2_time_diff": 12.717,
      "nasa_cn10": 357.587,
      "nasa_wind_speed": 6.774,
      "nasa_wind_direction": 181.806,
      "nasa_kpdc_time_diff": 17.283
    },
    {
      "datetime": "2011-06-19T04:39",
      "calipso_latitude": -62.113326,
      "calipso_longitude": -59.507175,
      "calipso_altitude": 0.905917,
      "calipso_rh": 96.931,
      "calipso_pressure": 897.827,
      "calipso_profiles": 37,
      "calipso_time_span": 26.782,
      "merra2_density": 2160.283,
      "calipso_merra2_time_diff": 9.45,
      "nasa_cn10": 83.12,
      "nasa_wind_speed": 8.156,
      "nasa_wind_direction": 110.248,
      "nasa_kpdc_time_diff": 20.55
    },
    {
      "datetime": "2012-01-16T18:36",
      "calipso_latitude": -61.997403,
      "calipso_longitude": -57.381103,
      "calipso_altitude": 0.905998,
      "calipso_rh": 58.606,
      "calipso_pressure": 892.998,
      "calipso_profiles": 26,
      "calipso_time_span": 18.6,
      "merra2_density": 2155.666,
      "calipso_merra2_time_diff": 6.331,
      "nasa_cn10": 504.736,
      "nasa_wind_speed": 5.528,
      "nasa_wind_direction": 306.549,
      "nasa_kpdc_time_diff": 23.669
    },
    {
      "datetime": "2012-08-27T18:36",
      "calipso_latitude": -61.997119,
      "calipso_longitude": -57.407178,
      "calipso_altitude": 0.905998,
      "calipso_rh": 99.109,
      "calipso_pressure": 896.158,
      "calipso_profiles": 26,
      "calipso_time_span": 18.599,
      "merra2_density": 2183.622,
      "calipso_merra2_time_diff": 6.363,
      "nasa_cn10": 243.887,
      "nasa_wind_speed": 7.385,
      "nasa_wind_direction": 309.482,
      "nasa_kpdc_time_diff": 23.637
    },
    {
      "datetime": "2013-01-15T04:39",
      "calipso_latitude": -62.08748,
      "calipso_longitude": -59.556569,
      "calipso_altitude": 0.905328,
      "calipso_rh": 92.302,
      "calipso_pressure": 885.609,
      "calipso_profiles": 36,
      "calipso_time_span": 26.037,
      "merra2_density": 2155.275,
      "calipso_merra2_time_diff": 9.565,
      "nasa_cn10": 251.887,
      "nasa_wind_speed": 6.52,
      "nasa_wind_direction": 249.896,
      "nasa_kpdc_time_diff": 20.435
    },
    {
      "datetime": "2013-07-03T04:33",
      "calipso_latitude": -62.327444,
      "calipso_longitude": -58.172029,
      "calipso_altitude": 0.905069,
      "calipso_rh": 97.221,
      "calipso_pressure": 881.42,
      "calipso_profiles": 37,
      "calipso_time_span": 26.782,
      "merra2_density": 2163.467,
      "calipso_merra2_time_diff": 3.993,
      "nasa_cn10": 602.35,
      "nasa_wind_speed": 13.391,
      "nasa_wind_direction": 90.108,
      "nasa_kpdc_time_diff": 26.007
    },
    {
      "datetime": "2013-12-02T18:48",
      "calipso_latitude": -62.432139,
      "calipso_longitude": -60.104179,
      "calipso_altitude": 0.905739,
      "calipso_rh": 91.628,
      "calipso_pressure": 878.162,
      "calipso_profiles": 27,
      "calipso_time_span": 19.343,
      "merra2_density": 2159.6,
      "calipso_merra2_time_diff": 18.853,
      "nasa_cn10": 314.854,
      "nasa_wind_speed": 8.479,
      "nasa_wind_direction": 282.987,
      "nasa_kpdc_time_diff": 11.147
    },
    {
      "datetime": "2014-04-27T18:37",
      "calipso_latitude": -62.014555,
      "calipso_longitude": -57.384431,
      "calipso_altitude": 0.905998,
      "calipso_rh": 90.684,
      "calipso_pressure": 880.78,
      "calipso_profiles": 26,
      "calipso_time_span": 18.598,
      "merra2_density": 2158.401,
      "calipso_merra2_time_diff": 7.138,
      "nasa_cn10": 292.525,
      "nasa_wind_speed": 6.744,
      "nasa_wind_direction": 263.842,
      "nasa_kpdc_time_diff": 22.862
    },
    {
      "datetime": "2014-10-10T04:33",
      "calipso_latitude": -62.329916,
      "calipso_longitude": -58.113984,
      "calipso_altitude": 0.906241,
      "calipso_rh": 91.527,
      "calipso_pressure": 865.261,
      "calipso_profiles": 36,
      "calipso_time_span": 26.037,
      "merra2_density": 2160.828,
      "calipso_merra2_time_diff": 3.42,
      "nasa_cn10": 679.696,
      "nasa_wind_speed": 12.088,
      "nasa_wind_direction": 255.229,
      "nasa_kpdc_time_diff": 26.58
    },
    {
      "datetime": "2015-02-22T04:40",
      "calipso_latitude": -62.089967,
      "calipso_longitude": -59.565945,
      "calipso_altitude": 0.904798,
      "calipso_rh": 95.951,
      "calipso_pressure": 877.707,
      "calipso_profiles": 35,
      "calipso_time_span": 25.294,
      "merra2_density": 2159.394,
      "calipso_merra2_time_diff": 10.441,
      "nasa_cn10": 1621.986,
      "nasa_wind_speed": 12.63,
      "nasa_wind_direction": 287.903,
      "nasa_kpdc_time_diff": 19.559
    },
    {
      "datetime": "2015-08-10T04:33",
      "calipso_latitude": -62.323876,
      "calipso_longitude": -58.195407,
      "calipso_altitude": 0.906441,
      "calipso_rh": 91.829,
      "calipso_pressure": 877.799,
      "calipso_profiles": 37,
      "calipso_time_span": 26.782,
      "merra2_density": 2158.777,
      "calipso_merra2_time_diff": 3.979,
      "nasa_cn10": 849.011,
      "nasa_wind_speed": 6.652,
      "nasa_wind_direction": 248.285,
      "nasa_kpdc_time_diff": 26.021
    },
    {
      "datetime": "2015-12-23T04:39",
      "calipso_latitude": -62.091424,
      "calipso_longitude": -59.56306,
      "calipso_altitude": 0.904911,
      "calipso_rh": 94.746,
      "calipso_pressure": 882.068,
      "calipso_profiles": 36,
      "calipso_time_span": 26.039,
      "merra2_density": 2164.569,
      "calipso_merra2_time_diff": 9.705,
      "nasa_cn10": 105.232,
      "nasa_wind_speed": 5.096,
      "nasa_wind_direction": 333.961,
      "nasa_kpdc_time_diff": 20.295
    },
    {
      "datetime": "2016-06-03T18:36",
      "calipso_latitude": -62.001919,
      "calipso_longitude": -57.457425,
      "calipso_altitude": 0.905998,
      "calipso_rh": 70.872,
      "calipso_pressure": 892.329,
      "calipso_profiles": 27,
      "calipso_time_span": 19.343,
      "merra2_density": 2161.545,
      "calipso_merra2_time_diff": 6.861,
      "nasa_cn10": 127.378,
      "nasa_wind_speed": 3.538,
      "nasa_wind_direction": 228.271,
      "nasa_kpdc_time_diff": 23.139
    },
    {
      "datetime": "2016-12-10T18:48",
      "calipso_latitude": -62.451314,
      "calipso_longitude": -60.042966,
      "calipso_altitude": 0.905569,
      "calipso_rh": 80.312,
      "calipso_pressure": 887.029,
      "calipso_profiles": 28,
      "calipso_time_span": 20.087,
      "merra2_density": 2157.246,
      "calipso_merra2_time_diff": 18.259,
      "nasa_cn10": 501.302,
      "nasa_wind_speed": 3.891,
      "nasa_wind_direction": 101.362,
      "nasa_kpdc_time_diff": 11.741
    },
    {
      "datetime": "2017-05-02T04:39",
      "calipso_latitude": -62.097833,
      "calipso_longitude": -59.530696,
      "calipso_altitude": 0.905886,
      "calipso_rh": 90.497,
      "calipso_pressure": 877.648,
      "calipso_profiles": 37,
      "calipso_time_span": 26.783,
      "merra2_density": 2174.996,
      "calipso_merra2_time_diff": 9.762,
      "nasa_cn10": 257.17,
      "nasa_wind_speed": 7.758,
      "nasa_wind_direction": 338.645,
      "nasa_kpdc_time_diff": 20.238
    },
    {
      "datetime": "2017-11-26T04:39",
      "calipso_latitude": -62.091152,
      "calipso_longitude": -59.617015,
      "calipso_altitude": 0.905794,
      "calipso_rh": 81.983,
      "calipso_pressure": 862.058,
      "calipso_profiles": 35,
      "calipso_time_span": 25.295,
      "merra2_density": 2157.475,
      "calipso_merra2_time_diff": 9.874,
      "nasa_cn10": 198.52,
      "nasa_wind_speed": 5.12,
      "nasa_wind_direction": 268.005,
      "nasa_kpdc_time_diff": 20.126
    },
    {
      "datetime": "2018-03-18T04:40",
      "calipso_latitude": -62.080492,
      "calipso_longitude": -59.6106,
      "calipso_altitude": 0.906251,
      "calipso_rh": 97.878,
      "calipso_pressure": 874.146,
      "calipso_profiles": 35,
      "calipso_time_span": 25.295,
      "merra2_density": 2159.935,
      "calipso_merra2_time_diff": 10.665,
      "nasa_cn10": 374.665,
      "nasa_wind_speed": 13.076,
      "nasa_wind_direction": 113.728,
      "nasa_kpdc_time_diff": 19.335
    },
    {
      "datetime": "2018-07-24T04:40",
      "calipso_latitude": -62.093023,
      "calipso_longitude": -59.569757,
      "calipso_altitude": 0.904569,
      "calipso_rh": 98.224,
      "calipso_pressure": 872.609,
      "calipso_profiles": 35,
      "calipso_time_span": 25.295,
      "merra2_density": 2154.523,
      "calipso_merra2_time_diff": 10.303,
      "nasa_cn10": 316.483,
      "nasa_wind_speed": 10.484,
      "nasa_wind_direction": 313.387,
      "nasa_kpdc_time_diff": 19.697
    },
    {
      "datetime": "2019-01-18T18:47",
      "calipso_latitude": -62.322468,
      "calipso_longitude": -59.272897,
      "calipso_altitude": 0.905998,
      "calipso_rh": 98.148,
      "calipso_pressure": 882.344,
      "calipso_profiles": 38,
      "calipso_time_span": 27.527,
      "merra2_density": 2141.265,
      "calipso_merra2_time_diff": 17.088,
      "nasa_cn10": 307.157,
      "nasa_wind_speed": 3.512,
      "nasa_wind_direction": 52.75,
      "nasa_kpdc_time_diff": 12.912
    },
    {
      "datetime": "2019-06-19T04:46",
      "calipso_latitude": -62.051596,
      "calipso_longitude": -59.933764,
      "calipso_altitude": 0.905675,
      "calipso_rh": 89.321,
      "calipso_pressure": 883.2,
      "calipso_profiles": 31,
      "calipso_time_span": 22.319,
      "merra2_density": 2151.697,
      "calipso_merra2_time_diff": 16.704,
      "nasa_cn10": 220.359,
      "nasa_wind_speed": 8.275,
      "nasa_wind_direction": 112.721,
      "nasa_kpdc_time_diff": 13.296
    },
    {
      "datetime": "2019-12-02T04:43",
      "calipso_latitude": -62.441032,
      "calipso_longitude": -58.413324,
      "calipso_altitude": 0.905998,
      "calipso_rh": 55.584,
      "calipso_pressure": 895.15,
      "calipso_profiles": 23,
      "calipso_time_span": 27.528,
      "merra2_density": 2160.461,
      "calipso_merra2_time_diff": 13.652,
      "nasa_cn10": 168.866,
      "nasa_wind_speed": 7.16,
      "nasa_wind_direction": 271.445,
      "nasa_kpdc_time_diff": 16.348
    }
  ],
  "NASA_KPDC": [
    {
      "datetime": "2010-01-07T04:42",
      "calipso_latitude": -62.050944,
      "calipso_longitude": -59.510457,
      "calipso_altitude": 0.905416,
      "calipso_rh": 93.195,
      "calipso_pressure": 890.867,
      "calipso_profiles": 26,
      "calipso_time_span": 26.037,
      "merra2_density": 2192.741,
      "calipso_merra2_time_diff": 12.033,
      "nasa_cn10": 204.831,
      "nasa_wind_speed": 6.423,
      "nasa_wind_direction": 147.729,
      "nasa_kpdc_time_diff": 17.967,
      "kpdc_rh": 84.6,
      "kpdc_slp": 999.6,
      "kpdc_wind_speed": 2.8,
      "kpdc_wind_direction": 96.4,
      "kpdc_cn10": 315.323
    },
    {
      "datetime": "2010-04-30T18:50",
      "calipso_latitude": -62.456206,
      "calipso_longitude": -60.088843,
      "calipso_altitude": 0.905368,
      "calipso_rh": 93.791,
      "calipso_pressure": 872.236,
      "calipso_profiles": 27,
      "calipso_time_span": 19.342,
      "merra2_density": 2162.027,
      "calipso_merra2_time_diff": 20.136,
      "nasa_cn10": 202.152,
      "nasa_wind_speed": 10.493,
      "nasa_wind_direction": 119.937,
      "nasa_kpdc_time_diff": 9.864,
      "kpdc_rh": 89.3,
      "kpdc_slp": 983.5,
      "kpdc_wind_speed": 9.6,
      "kpdc_wind_direction": 78.4,
      "kpdc_cn10": 97.279
    },
    {
      "datetime": "2010-09-04T04:40",
      "calipso_latitude": -62.111145,
      "calipso_longitude": -59.534129,
      "calipso_altitude": 0.904887,
      "calipso_rh": 95.938,
      "calipso_pressure": 873.29,
      "calipso_profiles": 36,
      "calipso_time_span": 26.038,
      "merra2_density": 2158.297,
      "calipso_merra2_time_diff": 10.255,
      "nasa_cn10": 777.262,
      "nasa_wind_speed": 7.438,
      "nasa_wind_direction": 291.669,
      "nasa_kpdc_time_diff": 19.745,
      "kpdc_rh": 84.2,
      "kpdc_slp": 977.6,
      "kpdc_wind_speed": 5.7,
      "kpdc_wind_direction": 25.8,
      "kpdc_cn10": 233.953
    },
    {
      "datetime": "2011-01-20T18:42",
      "calipso_latitude": -62.213046,
      "calipso_longitude": -58.722834,
      "calipso_altitude": 0.90541,
      "calipso_rh": 86.984,
      "calipso_pressure": 886.946,
      "calipso_profiles": 40,
      "calipso_time_span": 29.015,
      "merra2_density": 2190.39,
      "calipso_merra2_time_diff": 12.717,
      "nasa_cn10": 357.587,
      "nasa_wind_speed": 6.774,
      "nasa_wind_direction": 181.806,
      "nasa_kpdc_time_diff": 17.283,
      "kpdc_rh": 80.6,
      "kpdc_slp": 995.0,
      "kpdc_wind_speed": 2.4,
      "kpdc_wind_direction": 241.5,
      "kpdc_cn10": 617.386
    },
    {
      "datetime": "2011-06-03T04:39",
      "calipso_latitude": -62.099244,
      "calipso_longitude": -59.470758,
      "calipso_altitude": 0.906511,
      "calipso_rh": 70.904,
      "calipso_pressure": 901.333,
      "calipso_profiles": 37,
      "calipso_time_span": 26.781,
      "merra2_density": 2154.054,
      "calipso_merra2_time_diff": 9.43,
      "nasa_cn10": 107.592,
      "nasa_wind_speed": 3.858,
      "nasa_wind_direction": 300.768,
      "nasa_kpdc_time_diff": 20.57,
      "kpdc_rh": 95.2,
      "kpdc_slp": 1008.4,
      "kpdc_wind_speed": 9.7,
      "kpdc_wind_direction": 305.2,
      "kpdc_cn10": 24.187
    },
    {
      "datetime": "2011-12-22T18:42",
      "calipso_latitude": -62.216086,
      "calipso_longitude": -58.7739,
      "calipso_altitude": 0.906459,
      "calipso_rh": 74.383,
      "calipso_pressure": 879.739,
      "calipso_profiles": 39,
      "calipso_time_span": 28.271,
      "merra2_density": 2150.238,
      "calipso_merra2_time_diff": 12.374,
      "nasa_cn10": 339.857,
      "nasa_wind_speed": 8.734,
      "nasa_wind_direction": 243.4,
      "nasa_kpdc_time_diff": 17.626,
      "kpdc_rh": 81.5,
      "kpdc_slp": 983.8,
      "kpdc_wind_speed": 5.7,
      "kpdc_wind_direction": 238.2,
      "kpdc_cn10": 613.526
    },
    {
      "datetime": "2012-06-24T18:36",
      "calipso_latitude": -62.004864,
      "calipso_longitude": -57.380625,
      "calipso_altitude": 0.905998,
      "calipso_rh": 81.536,
      "calipso_pressure": 872.824,
      "calipso_profiles": 26,
      "calipso_time_span": 18.597,
      "merra2_density": 2158.964,
      "calipso_merra2_time_diff": 6.58,
      "nasa_cn10": 553.264,
      "nasa_wind_speed": 4.753,
      "nasa_wind_direction": 335.211,
      "nasa_kpdc_time_diff": 23.42,
      "kpdc_rh": 90.8,
      "kpdc_slp": 971.1,
      "kpdc_wind_speed": 10.3,
      "kpdc_wind_direction": 20.7,
      "kpdc_cn10": 120.8
    },
    {
      "datetime": "2012-11-22T18:42",
      "calipso_latitude": -62.21445,
      "calipso_longitude": -58.767031,
      "calipso_altitude": 0.90657,
      "calipso_rh": 91.387,
      "calipso_pressure": 864.963,
      "calipso_profiles": 40,
      "calipso_time_span": 29.015,
      "merra2_density": 2166.829,
      "calipso_merra2_time_diff": 12.454,
      "nasa_cn10": 228.313,
      "nasa_wind_speed": 13.451,
      "nasa_wind_direction": 252.445,
      "nasa_kpdc_time_diff": 17.546,
      "kpdc_rh": 85.8,
      "kpdc_slp": 971.6,
      "kpdc_wind_speed": 9.6,
      "kpdc_wind_direction": 264.8,
      "kpdc_cn10": 666.271
    },
    {
      "datetime": "2013-03-30T18:43",
      "calipso_latitude": -62.225591,
      "calipso_longitude": -58.755409,
      "calipso_altitude": 0.906123,
      "calipso_rh": 94.593,
      "calipso_pressure": 892.597,
      "calipso_profiles": 40,
      "calipso_time_span": 29.013,
      "merra2_density": 2152.147,
      "calipso_merra2_time_diff": 13.35,
      "nasa_cn10": 88.703,
      "nasa_wind_speed": 3.96,
      "nasa_wind_direction": 57.915,
      "nasa_kpdc_time_diff": 16.65,
      "kpdc_rh": 82.9,
      "kpdc_slp": 1001.7,
      "kpdc_wind_speed": 7.1,
      "kpdc_wind_direction": 342.6,
      "kpdc_cn10": 195.054
    },
    {
      "datetime": "2013-10-24T18:42",
      "calipso_latitude": -62.215096,
      "calipso_longitude": -58.750569,
      "calipso_altitude": 0.90457,
      "calipso_rh": 87.295,
      "calipso_pressure": 871.079,
      "calipso_profiles": 40,
      "calipso_time_span": 29.014,
      "merra2_density": 2152.661,
      "calipso_merra2_time_diff": 12.718,
      "nasa_cn10": 344.636,
      "nasa_wind_speed": 7.856,
      "nasa_wind_direction": 267.424,
      "nasa_kpdc_time_diff": 17.282,
      "kpdc_rh": 87.7,
      "kpdc_slp": 974.8,
      "kpdc_wind_speed": 5.4,
      "kpdc_wind_direction": 310.4,
      "kpdc_cn10": 91.845
    },
    {
      "datetime": "2014-03-07T04:40",
      "calipso_latitude": -62.082051,
      "calipso_longitude": -59.554909,
      "calipso_altitude": 0.905911,
      "calipso_rh": 93.646,
      "calipso_pressure": 871.857,
      "calipso_profiles": 36,
      "calipso_time_span": 26.038,
      "merra2_density": 2159.079,
      "calipso_merra2_time_diff": 10.327,
      "nasa_cn10": 1046.525,
      "nasa_wind_speed": 12.114,
      "nasa_wind_direction": 299.079,
      "nasa_kpdc_time_diff": 19.673,
      "kpdc_rh": 81.3,
      "kpdc_slp": 977.5,
      "kpdc_wind_speed": 13.0,
      "kpdc_wind_direction": 298.2,
      "kpdc_cn10": 425.682
    },
    {
      "datetime": "2014-06-12T18:48",
      "calipso_latitude": -62.428471,
      "calipso_longitude": -60.080108,
      "calipso_altitude": 0.905962,
      "calipso_rh": 98.916,
      "calipso_pressure": 884.913,
      "calipso_profiles": 28,
      "calipso_time_span": 20.086,
      "merra2_density": 2168.456,
      "calipso_merra2_time_diff": 18.861,
      "nasa_cn10": 139.173,
      "nasa_wind_speed": 8.598,
      "nasa_wind_direction": 151.091,
      "nasa_kpdc_time_diff": 11.139,
      "kpdc_rh": 77.5,
      "kpdc_slp": 997.7,
      "kpdc_wind_speed": 9.7,
      "kpdc_wind_direction": 109.9,
      "kpdc_cn10": 238.021
    },
    {
      "datetime": "2014-12-04T04:39",
      "calipso_latitude": -62.097581,
      "calipso_longitude": -59.473998,
      "calipso_altitude": 0.905912,
      "calipso_rh": 71.731,
      "calipso_pressure": 882.785,
      "calipso_profiles": 35,
      "calipso_time_span": 26.781,
      "merra2_density": 2164.538,
      "calipso_merra2_time_diff": 9.581,
      "nasa_cn10": 262.446,
      "nasa_wind_speed": 8.116,
      "nasa_wind_direction": 235.98,
      "nasa_kpdc_time_diff": 20.419,
      "kpdc_rh": 75.7,
      "kpdc_slp": 990.5,
      "kpdc_wind_speed": 8.0,
      "kpdc_wind_direction": 251.5,
      "kpdc_cn10": 495.724
    },
    {
      "datetime": "2015-04-04T04:34",
      "calipso_latitude": -62.33978,
      "calipso_longitude": -58.164305,
      "calipso_altitude": 0.905042,
      "calipso_rh": 75.202,
      "calipso_pressure": 870.887,
      "calipso_profiles": 37,
      "calipso_time_span": 26.782,
      "merra2_density": 2166.905,
      "calipso_merra2_time_diff": 4.457,
      "nasa_cn10": 72.54,
      "nasa_wind_speed": 2.929,
      "nasa_wind_direction": 169.671,
      "nasa_kpdc_time_diff": 25.543,
      "kpdc_rh": 75.7,
      "kpdc_slp": 979.7,
      "kpdc_wind_speed": 1.8,
      "kpdc_wind_direction": 50.5,
      "kpdc_cn10": 69.042
    },
    {
      "datetime": "2015-09-19T18:48",
      "calipso_latitude": -62.439452,
      "calipso_longitude": -60.161842,
      "calipso_altitude": 0.90533,
      "calipso_rh": 95.928,
      "calipso_pressure": 886.339,
      "calipso_profiles": 26,
      "calipso_time_span": 18.599,
      "merra2_density": 2157.776,
      "calipso_merra2_time_diff": 18.842,
      "nasa_cn10": 114.778,
      "nasa_wind_speed": 6.376,
      "nasa_wind_direction": 273.403,
      "nasa_kpdc_time_diff": 11.158,
      "kpdc_rh": 85.4,
      "kpdc_slp": 998.2,
      "kpdc_wind_speed": 6.0,
      "kpdc_wind_direction": 283.1,
      "kpdc_cn10": 274.756
    },
    {
      "datetime": "2016-01-25T18:48",
      "calipso_latitude": -62.453941,
      "calipso_longitude": -60.11124,
      "calipso_altitude": 0.905771,
      "calipso_rh": 96.157,
      "calipso_pressure": 881.737,
      "calipso_profiles": 27,
      "calipso_time_span": 19.343,
      "merra2_density": 2207.661,
      "calipso_merra2_time_diff": 18.945,
      "nasa_cn10": 491.509,
      "nasa_wind_speed": 10.39,
      "nasa_wind_direction": 111.371,
      "nasa_kpdc_time_diff": 11.055,
      "kpdc_rh": 80.4,
      "kpdc_slp": 992.1,
      "kpdc_wind_speed": 8.5,
      "kpdc_wind_direction": 88.7,
      "kpdc_cn10": 759.81
    },
    {
      "datetime": "2016-09-07T18:36",
      "calipso_latitude": -61.998592,
      "calipso_longitude": -57.427851,
      "calipso_altitude": 0.905998,
      "calipso_rh": 99.506,
      "calipso_pressure": 874.936,
      "calipso_profiles": 27,
      "calipso_time_span": 19.343,
      "merra2_density": 2161.679,
      "calipso_merra2_time_diff": 6.383,
      "nasa_cn10": 552.669,
      "nasa_wind_speed": 13.64,
      "nasa_wind_direction": 329.625,
      "nasa_kpdc_time_diff": 23.617,
      "kpdc_rh": 96.6,
      "kpdc_slp": 972.4,
      "kpdc_wind_speed": 14.4,
      "kpdc_wind_direction": 341.3,
      "kpdc_cn10": 479.366
    },
    {
      "datetime": "2017-04-19T18:36",
      "calipso_latitude": -61.997124,
      "calipso_longitude": -57.352807,
      "calipso_altitude": 0.905998,
      "calipso_rh": 99.398,
      "calipso_pressure": 869.754,
      "calipso_profiles": 25,
      "calipso_time_span": 17.855,
      "merra2_density": 2149.902,
      "calipso_merra2_time_diff": 6.475,
      "nasa_cn10": 186.92,
      "nasa_wind_speed": 5.094,
      "nasa_wind_direction": 115.319,
      "nasa_kpdc_time_diff": 23.525,
      "kpdc_rh": 87.6,
      "kpdc_slp": 985.6,
      "kpdc_wind_speed": 12.2,
      "kpdc_wind_direction": 91.5,
      "kpdc_cn10": 976.703
    },
    {
      "datetime": "2017-11-26T04:39",
      "calipso_latitude": -62.091152,
      "calipso_longitude": -59.617015,
      "calipso_altitude": 0.905794,
      "calipso_rh": 81.983,
      "calipso_pressure": 862.058,
      "calipso_profiles": 35,
      "calipso_time_span": 25.295,
      "merra2_density": 2157.475,
      "calipso_merra2_time_diff": 9.874,
      "nasa_cn10": 198.52,
      "nasa_wind_speed": 5.12,
      "nasa_wind_direction": 268.005,
      "nasa_kpdc_time_diff": 20.126,
      "kpdc_rh": 73.7,
      "kpdc_slp": 968.7,
      "kpdc_wind_speed": 2.3,
      "kpdc_wind_direction": 258.5,
      "kpdc_cn10": 852.757
    },
    {
      "datetime": "2018-03-03T18:49",
      "calipso_latitude": -62.462541,
      "calipso_longitude": -60.141888,
      "calipso_altitude": 0.905176,
      "calipso_rh": 81.837,
      "calipso_pressure": 882.178,
      "calipso_profiles": 26,
      "calipso_time_span": 18.6,
      "merra2_density": 2148.236,
      "calipso_merra2_time_diff": 19.602,
      "nasa_cn10": 487.306,
      "nasa_wind_speed": 5.035,
      "nasa_wind_direction": 311.919,
      "nasa_kpdc_time_diff": 10.398,
      "kpdc_rh": 95.8,
      "kpdc_slp": 990.6,
      "kpdc_wind_speed": 5.2,
      "kpdc_wind_direction": 317.2,
      "kpdc_cn10": 1105.483
    },
    {
      "datetime": "2018-06-16T18:43",
      "calipso_latitude": -62.223333,
      "calipso_longitude": -58.739271,
      "calipso_altitude": 0.905695,
      "calipso_rh": 79.847,
      "calipso_pressure": 874.607,
      "calipso_profiles": 40,
      "calipso_time_span": 29.014,
      "merra2_density": 2156.378,
      "calipso_merra2_time_diff": 13.134,
      "nasa_cn10": 229.347,
      "nasa_wind_speed": 8.624,
      "nasa_wind_direction": 94.644,
      "nasa_kpdc_time_diff": 16.866,
      "kpdc_rh": 82.3,
      "kpdc_slp": 982.3,
      "kpdc_wind_speed": 9.3,
      "kpdc_wind_direction": 82.6,
      "kpdc_cn10": 51.625
    },
    {
      "datetime": "2018-11-09T18:45",
      "calipso_latitude": -62.295767,
      "calipso_longitude": -59.210496,
      "calipso_altitude": 0.905998,
      "calipso_rh": 88.314,
      "calipso_pressure": 881.84,
      "calipso_profiles": 39,
      "calipso_time_span": 28.271,
      "merra2_density": 2158.721,
      "calipso_merra2_time_diff": 15.867,
      "nasa_cn10": 456.551,
      "nasa_wind_speed": 3.959,
      "nasa_wind_direction": 155.608,
      "nasa_kpdc_time_diff": 14.133,
      "kpdc_rh": 75.5,
      "kpdc_slp": 992.5,
      "kpdc_wind_speed": 2.7,
      "kpdc_wind_direction": 87.0,
      "kpdc_cn10": 344.504
    },
    {
      "datetime": "2019-04-11T18:48",
      "calipso_latitude": -62.297239,
      "calipso_longitude": -59.197869,
      "calipso_altitude": 0.906023,
      "calipso_rh": 88.56,
      "calipso_pressure": 883.235,
      "calipso_profiles": 39,
      "calipso_time_span": 28.27,
      "merra2_density": 2161.185,
      "calipso_merra2_time_diff": 18.166,
      "nasa_cn10": 1216.111,
      "nasa_wind_speed": 13.44,
      "nasa_wind_direction": 304.922,
      "nasa_kpdc_time_diff": 11.834,
      "kpdc_rh": 84.9,
      "kpdc_slp": 990.4,
      "kpdc_wind_speed": 11.9,
      "kpdc_wind_direction": 311.7,
      "kpdc_cn10": 42.881
    },
    {
      "datetime": "2019-08-20T04:36",
      "calipso_latitude": -62.451934,
      "calipso_longitude": -57.41772,
      "calipso_altitude": 0.905998,
      "calipso_rh": 71.089,
      "calipso_pressure": 901.646,
      "calipso_profiles": 26,
      "calipso_time_span": 18.599,
      "merra2_density": 2157.295,
      "calipso_merra2_time_diff": 6.95,
      "nasa_cn10": 388.794,
      "nasa_wind_speed": 12.448,
      "nasa_wind_direction": 237.951,
      "nasa_kpdc_time_diff": 23.05,
      "kpdc_rh": 89.1,
      "kpdc_slp": 1012.0,
      "kpdc_wind_speed": 4.0,
      "kpdc_wind_direction": 337.5,
      "kpdc_cn10": 285.887
    }
  ]
};

  // 모델별 학습자료에서 관측된 입력 범위입니다.
  const MODEL_FIELD_RANGES = {
  "KPDC_ONLY": {
    "kpdc_rh": {
      "min": 32.0,
      "max": 100.0,
      "rangeText": "32~100"
    },
    "kpdc_slp": {
      "min": 933.9,
      "max": 1030.9,
      "rangeText": "933.9~1,030.9"
    },
    "kpdc_wind_speed": {
      "min": 0.0,
      "max": 31.2,
      "rangeText": "0~31.2"
    },
    "kpdc_wind_direction": {
      "min": 0.0,
      "max": 360.0,
      "rangeText": "0~360"
    },
    "kpdc_cn10": {
      "min": 0.0,
      "max": 138657558.24,
      "rangeText": "0~138,657,558"
    }
  },
  "KPDC_MATCHED": {
    "kpdc_rh": {
      "min": 54.1,
      "max": 99.8,
      "rangeText": "54.1~99.8"
    },
    "kpdc_slp": {
      "min": 942.1,
      "max": 1027.6,
      "rangeText": "942.1~1,027.6"
    },
    "kpdc_wind_speed": {
      "min": 0.1,
      "max": 24.3,
      "rangeText": "0.1~24.3"
    },
    "kpdc_wind_direction": {
      "min": 0.1,
      "max": 359.7,
      "rangeText": "0.1~359.7"
    },
    "kpdc_cn10": {
      "min": 0.0,
      "max": 57737.501,
      "rangeText": "0~57,738"
    }
  },
  "NASA_ONLY": {
    "calipso_latitude": {
      "min": -62.683,
      "max": -61.863,
      "rangeText": "-62.683~-61.863"
    },
    "calipso_longitude": {
      "min": -60.568,
      "max": -56.995,
      "rangeText": "-60.568~-56.995"
    },
    "calipso_altitude": {
      "min": 0.902258,
      "max": 0.919938,
      "rangeText": "0.902~0.92"
    },
    "calipso_rh": {
      "min": 15.854,
      "max": 99.876,
      "rangeText": "15.9~99.9"
    },
    "calipso_pressure": {
      "min": 826.39,
      "max": 919.676,
      "rangeText": "826.4~919.7"
    },
    "calipso_profiles": {
      "min": 7.0,
      "max": 40.0,
      "rangeText": "7~40"
    },
    "calipso_time_span": {
      "min": 4.464,
      "max": 29.016,
      "rangeText": "4.46~29.02"
    },
    "merra2_density": {
      "min": 1972.381,
      "max": 2349.273,
      "rangeText": "1,972.4~2,349.3"
    },
    "calipso_merra2_time_diff": {
      "min": 1.15,
      "max": 29.745,
      "rangeText": "1.15~29.75"
    },
    "nasa_cn10": {
      "min": 13.716,
      "max": 4824.827,
      "rangeText": "14~4,825"
    },
    "nasa_wind_speed": {
      "min": 0.103252,
      "max": 22.434,
      "rangeText": "0.1~22.43"
    },
    "nasa_wind_direction": {
      "min": 0.153618,
      "max": 359.602,
      "rangeText": "0.2~359.6"
    },
    "nasa_kpdc_time_diff": {
      "min": 0.25465,
      "max": 28.85,
      "rangeText": "0.25~28.85"
    }
  },
  "NASA_KPDC": {
    "calipso_latitude": {
      "min": -62.683,
      "max": -61.863,
      "rangeText": "-62.683~-61.863"
    },
    "calipso_longitude": {
      "min": -60.568,
      "max": -56.995,
      "rangeText": "-60.568~-56.995"
    },
    "calipso_altitude": {
      "min": 0.902258,
      "max": 0.919938,
      "rangeText": "0.902~0.92"
    },
    "calipso_rh": {
      "min": 15.854,
      "max": 99.876,
      "rangeText": "15.9~99.9"
    },
    "calipso_pressure": {
      "min": 826.39,
      "max": 919.676,
      "rangeText": "826.4~919.7"
    },
    "calipso_profiles": {
      "min": 7.0,
      "max": 40.0,
      "rangeText": "7~40"
    },
    "calipso_time_span": {
      "min": 4.464,
      "max": 29.016,
      "rangeText": "4.46~29.02"
    },
    "merra2_density": {
      "min": 1972.381,
      "max": 2349.273,
      "rangeText": "1,972.4~2,349.3"
    },
    "calipso_merra2_time_diff": {
      "min": 1.15,
      "max": 29.745,
      "rangeText": "1.15~29.75"
    },
    "nasa_cn10": {
      "min": 13.716,
      "max": 4824.827,
      "rangeText": "14~4,825"
    },
    "nasa_wind_speed": {
      "min": 0.103252,
      "max": 22.434,
      "rangeText": "0.1~22.43"
    },
    "nasa_wind_direction": {
      "min": 0.153618,
      "max": 359.602,
      "rangeText": "0.2~359.6"
    },
    "nasa_kpdc_time_diff": {
      "min": 0.25465,
      "max": 28.85,
      "rangeText": "0.25~28.85"
    },
    "kpdc_rh": {
      "min": 54.1,
      "max": 99.8,
      "rangeText": "54.1~99.8"
    },
    "kpdc_slp": {
      "min": 942.1,
      "max": 1027.6,
      "rangeText": "942.1~1,027.6"
    },
    "kpdc_wind_speed": {
      "min": 0.1,
      "max": 24.3,
      "rangeText": "0.1~24.3"
    },
    "kpdc_wind_direction": {
      "min": 0.1,
      "max": 359.7,
      "rangeText": "0.1~359.7"
    },
    "kpdc_cn10": {
      "min": 0.0,
      "max": 57737.501,
      "rangeText": "0~57,738"
    }
  }
};

  const KPDC_FIELDS = [
    { id: "kpdc_rh", label: "KPDC 상대습도", unit: "%", step: 0.1 },
    { id: "kpdc_slp", label: "KPDC 해면기압", unit: "hPa", step: 0.1 },
    { id: "kpdc_wind_speed", label: "KPDC 풍속", unit: "m/s", step: 0.1 },
    { id: "kpdc_wind_direction", label: "KPDC 풍향", unit: "degree", step: 0.1 },
    { id: "kpdc_cn10", label: "KPDC CN10", unit: "개/cm³", step: 0.001 },
  ];

  const NASA_FIELDS = [
    { id: "calipso_latitude", label: "CALIPSO 위도", unit: "degree", step: 0.000001 },
    { id: "calipso_longitude", label: "CALIPSO 경도", unit: "degree", step: 0.000001 },
    { id: "calipso_altitude", label: "CALIPSO 지상고도", unit: "km AGL", step: 0.000001 },
    { id: "calipso_rh", label: "CALIPSO 상대습도", unit: "%", step: 0.001 },
    { id: "calipso_pressure", label: "CALIPSO 기압", unit: "hPa", step: 0.001 },
    { id: "calipso_profiles", label: "평균 프로파일 수", unit: "count", step: 1 },
    { id: "calipso_time_span", label: "CALIPSO 관측 시간범위", unit: "seconds", step: 0.001 },
    { id: "merra2_density", label: "MERRA-2 유효 혼합밀도", unit: "kg/m³", step: 0.001 },
    { id: "calipso_merra2_time_diff", label: "CALIPSO–MERRA-2 시간차", unit: "minutes", step: 0.001 },
    { id: "nasa_cn10", label: "NASA 추정 CN10", unit: "개/cm³", step: 0.001 },
    { id: "nasa_wind_speed", label: "MERRA-2 풍속", unit: "m/s", step: 0.001 },
    { id: "nasa_wind_direction", label: "MERRA-2 풍향", unit: "degree", step: 0.001 },
    { id: "nasa_kpdc_time_diff", label: "NASA–KPDC 시간차", unit: "minutes", step: 0.001 },
  ];

  const cache = new Map();
  let selectedModel = "KPDC_ONLY";
  const lastExampleIndex = new Map();

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

    const range = MODEL_FIELD_RANGES[selectedModel]?.[field.id] ?? {};
    const label = document.createElement("label");
    label.htmlFor = field.id;

    const rangeMarkup = range.rangeText
      ? ` <span class="range-hint">(${range.rangeText})</span>`
      : "";

    label.innerHTML =
      `${field.label} <span class="unit">${field.unit ?? ""}</span>${rangeMarkup}`;

    const input = document.createElement("input");
    input.type = "number";
    input.id = field.id;
    input.name = field.id;
    input.required = true;
    input.placeholder = "값 입력";
    input.inputMode = "decimal";

    // min/max는 학습자료 기반 권장 입력범위만 제한하고,
    // step은 any로 두어 범위 안의 모든 실수값을 입력할 수 있게 한다.
    const attributes = { min: range.min, max: range.max, step: "any" };
    for (const [attr, value] of Object.entries(attributes)) {
      if (value !== undefined) input[attr] = String(value);
    }

    wrapper.append(label, input);
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
        makeSection("KPDC 지상 관측자료", "지상 관측값을 입력해 주세요.", KPDC_FIELDS),
      );
      return;
    }

    fieldContainer.appendChild(
      makeSection("NASA·CALIPSO·MERRA-2 관측자료", "위성·재분석 관측값을 입력해 주세요.", NASA_FIELDS),
    );

    if (selectedModel === "NASA_KPDC") {
      fieldContainer.appendChild(
        makeSection("KPDC 지상 관측자료", "동일 시점에 매칭된 지상 관측값을 입력해 주세요.", KPDC_FIELDS),
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
    if (!dateInput.value) throw new Error("관측 날짜·시간을 입력해 주세요.");
    const date = new Date(`${dateInput.value}:00Z`);
    if (Number.isNaN(date.getTime())) throw new Error("관측 날짜·시간 형식을 확인해 주세요.");
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
      throw new Error(`${element.previousElementSibling?.textContent ?? id} 값을 확인해 주세요.`);
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
      loadingState.textContent = `${error.message} GitHub Pages 주소에서 실행해 주세요.`;
      showError(error.message);
    }
  }

  function fillExample() {
    const pool = EXAMPLE_POOLS[selectedModel] ?? [];
    if (pool.length === 0) {
      showError("현재 모델의 예시 관측값을 불러오지 못했습니다.");
      return;
    }

    const previousIndex = lastExampleIndex.get(selectedModel);
    let index = Math.floor(Math.random() * pool.length);
    if (pool.length > 1 && index === previousIndex) {
      index = (index + 1) % pool.length;
    }
    lastExampleIndex.set(selectedModel, index);

    const example = pool[index];
    dateInput.value = example.datetime;
    form.querySelectorAll('input[type="number"]').forEach((input) => {
      if (Object.hasOwn(example, input.id)) {
        input.value = String(example[input.id]);
      }
    });
    clearResult();
  }

  function clearResult() {
    resultPanel.classList.remove("has-result", "has-error");
    resultValue.textContent = "관측값을 입력한 뒤 예측을 실행해 주세요.";
    resultDescription.textContent = "세종과학기지 지상기온을 예측합니다.";
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
