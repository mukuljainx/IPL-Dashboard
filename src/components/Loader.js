import  React from 'react';


const Loader = () => {
  return (
    <section className="loader-wrapper">
      <div className="row align-middle align-center animation-wrapper">
        <div className="columns small-12">
          <div className="loader"></div>
        </div>
      </div>
      <div className="row">
        <div className="columns small-12 text-center">
          <p>Gathering Data, sit tight!</p>
        </div>
      </div>
    </section>
  );
};

export default Loader;
