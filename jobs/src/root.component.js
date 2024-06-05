import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Jobs from "./jobs";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Jobs,
  errorBoundary(err, info, props) {
    return <div>Error in Jobs Microfrontend</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
