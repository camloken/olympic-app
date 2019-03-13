import React from 'react'
import Select from 'react-select';

const SearchBlock = props => {
  const {
    onYearChange,
    yearList,
    year,
    onSportChange,
    sportList,
    sport,
    onGenderChange,
    genderList,
    gender,
  } = props
  return (
    <div className="search-block">
      <h3 className="title text-center mt--40">Find Olympic Medalists</h3>
      <Select
        id="year"
        value={year}
        onChange={onYearChange}
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
            onChange={onSportChange}
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
            onChange={onGenderChange}
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

export default SearchBlock
