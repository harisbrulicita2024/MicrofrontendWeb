import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Users from './users';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Users,
  errorBoundary(err, info, props) {
    return <div>Users Microfrontend</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;

