let world;

/**
 * start game
 */
function init() {
  const canvas = document.getElementById('game');
  world = new World(canvas);
}

init();
