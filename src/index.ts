import { App } from './app';
import './style.css';

window.onload = () => {
  const appElement = document.getElementById('app');

  if (!appElement) throw Error('App root element not found');
  /* eslint-disable no-new */
  new App(appElement).run();
};
