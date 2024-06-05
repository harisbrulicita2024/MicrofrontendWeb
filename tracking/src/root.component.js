import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Tracking from './tracking';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Tracking,
  errorBoundary(err, info, props) {
    return <div>Tracking Microfrontend</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
