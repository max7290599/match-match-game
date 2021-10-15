import { BaseComponent } from '../base-component';
import './link.css';

export class Link extends BaseComponent {
  constructor(readonly link: string) {
    super('a', ['link']);
    this.element.setAttribute('href', this.getLink(link));
    this.element.innerHTML = link;
    this.element.addEventListener('click', this.handleClick);
  }

  getLink = (link: string): string => {
    const newLink = `#${link[0].toLowerCase()}${link.slice(1)}`;
    return newLink.replace(/\s+/g, '');
  };

  handleClick = (): void => {
    document.querySelectorAll('.link').forEach((n) => n.classList.remove('active'));
    this.element.classList.add('active');
  };
}
