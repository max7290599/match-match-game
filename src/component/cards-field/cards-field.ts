import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { Timer } from '../timer/timer';
import './cards-field.css';

const SHOW_TIME: number = 10;

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  private timer: Timer;

  constructor() {
    super('div', ['cards-field']);
    this.timer = new Timer();
  }

  clear = ():void => {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards = (cards: Card[]): void => {
    this.element.appendChild(this.timer.element);

    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
      this.timer.timerCycle();
    }, SHOW_TIME * 1000);
  }
}
