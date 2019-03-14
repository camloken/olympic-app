import React, { Component } from 'react';
import SearchBlock from './pages/SearchBlock'
import Results from './pages/Results'
import Header from './components/Header'
import Loader from './components/Loader';
import Papa from 'papaparse'
import './css/flag-icon.css';
import './css/app.css';

class App extends Component {
  initalState = {
    yearList: [],
    sportList: [],
    genderList: [],
    year: null,
    sport: null,
    gender: null,
    results: []
  }

  state = { ...this.initalState, medalists: [] }

  componentDidMount() {
    // Get past Olympics data and add it to state
    Papa.parse('./athlete_events.csv', {
    	download: true,
      header: true,
      dynamicTyping: true,
      complete: results => {
        const all = results.data
        const medalists = results.data.filter( a => a.Medal !== 'NA' )
        const yearList = this.getUniqueList( medalists, 'Games' )
        this.setState({ medalists, yearList, all })
      }
    })
  }

  getUniqueList = (array, key) => {
    // This removes duplicates from an array and sorts a-z, 0-9
    const list = []
    array.filter(item => list.push(item[key]))
    let uniqueList = list.filter((v, i, a) => a.indexOf(v) === i)
    uniqueList.sort((a, b) => isNaN(a) ? a.localeCompare(b) : a - b)
    if (key === 'Games'){
      const games = uniqueList.filter( a => a !== undefined)
      games.reverse()
      uniqueList = games
      return uniqueList.map(a => ({ label: a, value: a }))
    }
    if (key === 'Sex') {
      return uniqueList.map(a => {
        const gender = a === 'M' ? 'Mens' : 'Womens'
        return { label: `${gender} sports`, value: a }
      })
    }
    return uniqueList.map(a => ({ label: a, value: a }))
  }

  onYearChange = e => {
    if (e) {
      const games = e.value
      const list = this.state.medalists.filter(s => s.Games === games)
      const sportList = this.getUniqueList(list, 'Sport')
      this.setState({ year: e, sportList, sport: null, genderList: [], gender: null })
      return
    }
    // reset if e is null
    this.setState({ year: null, sport: null, sportList: null })
  }

  onSportChange = e => {
    if (e) {
      this.setState({ sport: e }, () => this.getGenderList())
      return
    }
    // reset if e is null
    this.setState({ sport: null, gender: null })
  }

  onGenderChange = e => {
    this.setState({ gender: e }, () => this.getResults())
  }

  getGenderList = () => {
    const { medalists, year, sport } = this.state
    const list = medalists.filter(m => m.Games === year.value && m.Sport === sport.value)
    const genders = this.getUniqueList(list, 'Sex').reverse()
    this.setState({ genderList: genders })
  }

  getResults = () => {
    const { medalists, year, sport, gender } = this.state
    const list = medalists.filter( r => r.Games === year.value && r.Sport === sport.value)
    if (gender.value === 'M') {
      this.setState({ results: list.filter(m => m.Sex === 'M') })
    } else if (gender.value === 'F') {
      this.setState({ results: list.filter(f => f.Sex === 'F') })
    } else {
      this.setState({ results: list })
    }
  }

  reset = () => {
    this.setState({
      sportList: [],
      genderList: [],
      year: null,
      sport: null,
      gender: null,
      results: []
    })
  }

  render() {
    const test = this.state.all && this.state.all.filter(a => a.Year === 1908 && a.Sport === 'Athletics' && a.Event === `Athletics Men's High Jump`)
    console.log(test)
    const { yearList, results } = this.state
    return (
      <div className="app">
        <div className="app-container">
        <Header {...this.state} onClick={this.reset} />
          <div className="app-content">
            { yearList.length < 1
                ? <Loader />
                : (results.length < 1 
                    ? <SearchBlock
                        {...this.state}
                        onYearChange={e => this.onYearChange(e)}
                        onSportChange={e => this.onSportChange(e)}
                        onGenderChange={e => this.onGenderChange(e)}
                      />
                    : <Results data={results} />
                  )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App
