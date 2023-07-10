import React, { Fragment} from 'react';
import Rings from '../img/olympic-rings.svg'

const Header = props => {
  // const genderTitle = props.gender && props.gender.value === 'M' ? 'Mens ' : 'Womens '

  return (
    <header className="app-header text-center">
      <div className="app-header-inner">
          {props.results.length < 1
            ? <Fragment>
                <img src={Rings} alt="logo" className="logo" />
                <div className="pr-20">Olympic Medalists</div>
              </Fragment>
            : <>
                <img src={Rings} alt="logo" className="logo small fade-in" />
                <div className='flex-1 fade-in'>{`${props.year.value} Games`}</div>
                <div onClick={props.onClick} className="close-x fade-in">&times;</div>
              </>}
        </div>
    </header>
  )
}

export default Header