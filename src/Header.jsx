import React, { Fragment} from 'react';
import Rings from './olympic-rings.svg'

const Header = props => {
  const genderTitle = props.gender && props.gender.value === 'M' ? 'Mens ' : 'Womens '
  return (
    <header className="app-header text-center">
      <div className="flex-row flex-align-center">
          { props.results.length < 1
            ? (
              <Fragment>
                <img src={Rings} alt="logo" className="logo" />
                <div className="pr-20">Olympic Medalists</div>
              </Fragment>
              )
            : (
                <div onClick={props.onClick} className="cancelable-title">
                  <div className="close-x">&times;</div>
                  <div>{`${props.year.value} ${genderTitle}${props.sport.value}`}</div>
                </div>
              )
          }
        </div>
    </header>
  )
}

export default Header