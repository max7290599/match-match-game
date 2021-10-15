import { BaseComponent } from '../base-component';
import { Nav } from '../nav/nav';
import { Button } from '../button/button';
import { delay } from '../shared/delay';
import './header.css';

export class Header extends BaseComponent {
  private readonly nav: Nav;
  private readonly button: Button;
  private nameBtn = 'new game';

  constructor() {
    super('header', ['header']);
    this.nav = new Nav();
    this.button = new Button(`<a class="button-game" href="#game">${this.nameBtn}</a>`);
    this.element.appendChild(this.nav.element);
    this.element.appendChild(this.button.element);
    this.button.element.addEventListener('click', this.open);
  }

  createContainerNav = (links: string[]): void => {
    this.nav.createNav(links);
  }

  open = async (): Promise<void> => {
    if (this.nameBtn === 'new game') {
      this.nameBtn = 'stop game';
      await delay(1000);
      await Promise.all([
        this.button.element.children[0].setAttribute('href', '#bestScore'),
      ]);
    } else {
      this.nameBtn = 'new game';
      const links = document.querySelectorAll('.link');
      if (links === null) return;
      links[1].classList.add('active');
      await delay(1000);
      await Promise.all([
        this.button.element.children[0].setAttribute('href', '#game'),
      ]);
    }
    this.button.element.children[0].innerHTML = this.nameBtn;
  }
}
