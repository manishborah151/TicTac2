export const playSound = (type) => {
  const sounds = {
    click: new Audio('./click.mp3'),
    win: new Audio('./win.mp3'),
    draw: new Audio('./draw.mp3'),
  };

  const sound = sounds[type];
  if (sound) {
    sound.volume = 0.5;
    sound.play().catch(() => {});
  }
};
