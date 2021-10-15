import { BaseComponent } from '../base-component';
import { Link } from '../link/link';
import './nav.css';

export class Nav extends BaseComponent {
  private nav: Link[] = [];

  constructor() {
    super('nav', ['nav']);
  }

  addNav = (nav: Link[]): void => {
    this.nav = nav;
    this.nav.forEach((item) => this.element.appendChild(item.element));
  }

  createNav = (links: string[]): void => {
    const headerNav = links.map((link) => new Link(link));
    this.addNav(headerNav);
  }
}
