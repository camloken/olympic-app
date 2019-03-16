import React from 'react'
import Table from'../components/Table'
import '../css/flag-icon.css'
import '../css/results.css'

const Results = props => {
  const { data } = props
  const sorted = data.sort((a, b) => a['Event'].localeCompare(b['Event'], 'en', { numeric: true }))

  let eventName = null
  let groups = []
  let athletes = []
  sorted.forEach((data, i) => {
    let event = data.Event
    if (eventName && event !== eventName) {
      groups.push({ event: eventName, athletes: athletes})
      athletes = []
    } else if ( i === sorted.length - 1) {
      athletes.push(data)
      groups.push({ event: eventName, athletes: athletes})
      return
    }
    athletes.push(data)
    eventName = event
  })

  let tables = []
  groups.forEach((data, i) => {
    tables.push((<Table key={i} {...data} />))
  })

  return (
    <div className="results pt-20 pb-20">
      {tables}
    </div>
  )
}

export default Results