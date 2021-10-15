import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { Form } from '../form/form';
import { PopUp } from '../pop-up/pop-up';
import { delay } from '../shared/delay';
import { Timer } from '../timer/timer';

const FLIP_DELAY = 3000;

export class Game extends BaseComponent {
  private readonly cardsField = new CardsField();

  private activeCard?: Card;

  private isAnimation = false;

  private form: Form;

  private totalCount = 0;

  private falseCount = 0;

  popUp: PopUp;

  constructor() {
    super();
    this.popUp = new PopUp();
    this.form = new Form();
    this.cardsField = new CardsField();
    this.element.appendChild(this.popUp.element);
    this.element.appendChild(this.cardsField.element);
    this.element.appendChild(this.form.element);
  }

  newGame = (images: string[]): void => {
    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) =>
      card.element.addEventListener('click', () => this.cardHandler(card))
    );
    this.cardsField.addCards(cards);
  }

  endGame = async (): Promise<void> => {
    if (this.cardsField.element.querySelectorAll('.flipped').length === 0) {
      Timer.stoptime = true;
      let totalScore: number;
      let timerTotal: string | undefined;
      this.popUp.openModal();
      await delay(2000);
      await Promise.all([
        (timerTotal = document.querySelector('.timer')?.innerHTML),
        (totalScore =
          (this.totalCount - this.falseCount) * 100 - Number(timerTotal) * 10),
        Form.setScoreUser(Number(totalScore)),
      ]);
    }
  }

  private cardHandler = async (card: Card) => {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    this.totalCount++;

    if (this.activeCard.image !== card.image) {
      this.activeCard.element
        .querySelector('.card__front')
        ?.classList.add('card__false');
      card.element.querySelector('.card__front')?.classList.add('card__false');
      await delay(FLIP_DELAY);
      await Promise.all([
        this.activeCard.flipToBack(),
        card.flipToBack(),
        this.activeCard.element
          .querySelector('.card__front')
          ?.classList.remove('card__false'),
        card.element
          .querySelector('.card__front')
          ?.classList.remove('card__false'),
        this.falseCount++,
      ]);
    } else {
      this.activeCard.element
        .querySelector('.card__front')
        ?.classList.add('card__true');
      card.element.querySelector('.card__front')?.classList.add('card__true');
      this.endGame();
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  };

  render = (): HTMLElement => this.element;
}
