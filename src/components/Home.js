import  React from 'react';
import PropTypes from 'prop-types';
// import AnimationCount from 'react-count-animation';

const Home = () => {

  return (
    <section className="home-wrapper">
      <div className="row">
        <div className="columns medium-12">
          <div className="overview">
            <h3>IPL So Far</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {
  // options: PropTypes.array.isRequired,
  // colors: PropTypes.array.isRequired,
  // onClickHandler: PropTypes.func.isRequired,
  // optionsNames: PropTypes.array.isRequired,
};


export default Home;
