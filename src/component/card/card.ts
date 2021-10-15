import { BaseComponent } from '../base-component';
import './card.css';

const FLIP_CLASS: string = 'flipped';

export class Card extends BaseComponent {
  isFlipped: boolean = false;

  constructor(readonly image: string) {
    super('div', ['card-container']);

    this.element.innerHTML = `
      <div class="card">
        <div 
          class="card__front"
          style="background-blend-mode: color-burn; background-image: url('./images/${image}')" ></div>
        <div class="card__back"></div>
      </div>
    `;
  }

  flipToBack = (): Promise<void> => {
    this.isFlipped = true;
    return this.flip(true);
  };

  flipToFront = (): Promise<void> => {
    this.isFlipped = false;
    return this.flip();
  };

  private flip = (isFront = false): Promise<void> =>
    new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
}
