import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Jobs from '../../jobs/src/jobs';
import Users from '../../users/src/users';
import Tracking from '../../tracking/src/tracking';
import './style.css';

function App() {
  return (
    <div className="container">
      <div className="microfrontend">
        <Users />
      </div>
      <div className="microfrontend">
        <Jobs />
      </div>
      <div className="microfrontend">
        <Tracking />
      </div>
    </div>
  );
}

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(err, info, props) {
    return <div>Dobrodosli</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
