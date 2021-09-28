import { getRandomColor } from './color';

const tech = () => {
  const h1 = document.querySelector('h1');
  const color = getRandomColor();
  h1.style.color = color;
};

export { tech };
