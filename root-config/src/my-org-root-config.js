import { registerApplication, start } from 'single-spa';

registerApplication({
  name: "@my-org/jobs",
  app: () => System.import("@my-org/jobs"),
  activeWhen: ["/"]
});

registerApplication({
  name: "@my-org/users",
  app: () => System.import("@my-org/users"),
  activeWhen: ["/"]
});

registerApplication({
  name: "@my-org/tracking",
  app: () => System.import("@my-org/tracking"),
  activeWhen: ["/"]
});

start();
