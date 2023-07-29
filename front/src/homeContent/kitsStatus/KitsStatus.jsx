// 여기서 not registered or registered를 기기의 정보에 따라 조건부 렌더링

import React from 'react'

function KitsStatus({ idx, plantName, plantNickName, startDate,    }) {
  return (
    <div>
      {/*  이 안에 조건부렌더링 / 등록되어있으면 대충의 정보, 아니면 등록하라는 창 */}
      {/* 등록되어있으면 정보 받아서, 아니면 notregistered 사용하면 됨 */}
    </div>
  )
}

export default KitsStatus
