import React from 'react'

function ThisPlantInfo({plantDetail}) {

  const getSeason = () => {
    const month = new Date().getMonth() + 1;

    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Autumn';
    return 'Winter'; // 12, 1, 2
  };

  const currentSeason = getSeason();

  return (
    <div>
      Korean name : {plantDetail.plantKoName}<br />
      {/* LeastIllumninance: {plantDetail.plantLeastIllumninance} Lux<br /> */}
      Prefered place : {plantDetail.plantPlace}<br />
      {/* Prefered temperature, LeastTemp : {plantDetail.plantTemp} ℃<br /> */}
      {/* Least Temperature (winter) : {plantDetail.plantWinterTemp} ℃<br /> */}
      {/* Humidity : {plantDetail.plantHumidity} %<br /> */}
      {/* Fertility : {plantDetail.plantFertility}<br /> */}
      
      {/* 계절에 따른 정보 출력 */}
      {currentSeason === 'Spring' && <>
        SpringWater : {plantDetail.plantSpringWater}<br />
      </>}
      {currentSeason === 'Summer' && <>
        SummerWater : {plantDetail.plantSummerWater}<br />
      </>}
      {currentSeason === 'Autumn' && <>
        AutumnWater : {plantDetail.PlantAutumnWater}<br />
      </>}
      {currentSeason === 'Winter' && <>
        WinterWater : {plantDetail.plantWinterWater}<br />
      </>}

      {/* plantGrowthType : {plantDetail.plantGrowthType}<br />
      plantAvgHeight : {plantDetail.plantHeight} cm<br />
      plantAvgArea : {plantDetail.plantArea} cm<br /> */}

    </div>
  )
}

export default ThisPlantInfo
