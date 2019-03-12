import React, { Component } from 'react';
import Select from 'react-select';
import Loader from './Loader';
import Results from './Results'
import Header from './Header'
import Papa from 'papaparse'
import './flags-css/flag-icon.css';
import './App.css';

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
        const medalists = results.data.filter( a => a.Medal !== 'NA' )
        const yearList = this.getUniqueList( medalists, 'Games' )
        this.setState({ medalists, yearList })
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
    const list = medalists.filter(m => m.Year === year.value && m.Sport === sport.value)
    const genders = this.getUniqueList(list, 'Sex').reverse()
    this.setState({ genderList: genders })
  }

  getResults = () => {
    const { medalists, year, sport, gender } = this.state
    const list = medalists.filter( r => r.Year === year.value && r.Sport === sport.value)
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

  renderSearchBlock = () => {
    // This should really be it's own component, but for now I'm leaving it here
    const { yearList, year, sportList, sport, genderList, gender } = this.state
    return (
      <div className="search-block">
        <h3 className="title text-center">Find Olympic Medalists</h3>
        <Select
          id="year"
          value={this.state.year}
          onChange={e => this.onYearChange(e)}
          options={yearList}
          placeholder="Select a past olympic games..."
          isClearable
          isSearchable
          className="select w-100"
        />
        { year && (
            <Select
              id="sport"
              value={sport}
              onChange={e => this.onSportChange(e)}
              options={sportList}
              placeholder="Select a sport..."
              isClearable
              isSearchable
              className="select w-100"
            />
        )}
        { sport && (
            <Select
              id="gender"
              value={gender}
              onChange={e => this.onGenderChange(e)}
              options={genderList}
              placeholder="Select mens or womens sports..."
              isClearable
              isSearchable
              className="select w-100"
            />
        )}
      </div>
    )
}

  render() {
    const { yearList, results } = this.state
    return (
      <div className="app">
        <div className="app-container">
        <Header {...this.state} onClick={this.reset} />
          <div className="app-content">
            { yearList.length < 1
                ? <Loader />
                : (results.length < 1 ? this.renderSearchBlock() : <Results data={results} />)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App
