import Flicking from "@egjs/flicking";

const flicking = new Flicking("#flick", {
  circular: true,
  horizontal: false,
});

flicking.addPlugins(new AutoPlay());
