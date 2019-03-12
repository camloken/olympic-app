import React from 'react';
import cc from'./countryConverter'
import './results.css'

const Table = props => {
  const { athletes } = props

  const sortedByMedal = athletes.sort((a, b) => {
    if (a.Medal === 'Gold') {
      return -1
    } else if (b.Medal === 'Bronze') {
      return -1
    } else {
      return 0
    }
  })

  const table = sortedByMedal.map((a, i) =>{
    const team = a['Team'].replace(/[0-9]|-/gi, '')
    const country = cc(a.NOC)
    return (
      <div key={`athlete${i}`} className="row flex-row">
        <span className={`flag flag-icon flag-icon-${country}`}></span>
        <b>{a.NOC}</b>
        <div className="flex-1">{a.Name}</div>
        <div>{a.Medal}</div>
        <div className={a.Medal} />
      </div>
    )
  })

  return (
    <div>
      <div className="title">{props.event}</div>
      <div className="table">{table}</div>
    </div>
  )
}

export default Table