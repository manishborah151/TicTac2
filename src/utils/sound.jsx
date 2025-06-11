export const playSound = (type) => {
  const sounds = {
    click: new Audio('/sounds/click.mp3'),
    win: new Audio('/sounds/win.mp3'),
    draw: new Audio('/sounds/draw.mp3'),
  };

  const sound = sounds[type];
  if (sound) {
    sound.volume = 0.5;
    sound.play().catch(() => {});
  }
};
