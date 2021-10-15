import { BaseComponent } from '../../component/base-component';
import './aboutGame.css';

export class AboutGame extends BaseComponent {
  constructor(id: string) {
    super('div', ['aboutGame']);
    this.element.id = id;
    this.element.innerHTML = `<section class="rules">
    <div class="rules__wrapper">
      <h1 class="rules__title">How to play Match Match Game</h1>
      <p class="rules__text  rules__text--general">Memory is a counter game where
        the object is to find pairs. When the game begins, all pictures are hidden.
      </p>
      <p class="rules__text  rules__text--general">Please don't forget to choose a
        card shirt and the difficulty level of the game.
      </p>
      <h2 class="rules__title  rules__title--play">To Play:</h2>
      <ol class="rules__text-conteiner">
        <li class="rules__text">Select two cards to try to match the pictures.</li>
        <li class="rules__text">If you match the pictures you can go again.</li>
        <li class="rules__text">If they don't match it is the computer turn them.</li>
        <li class="rules__text">The player that find that finds all pairs wins!</li>
      </ol>
    </div>
  </section>`;
  }

  render = (): HTMLElement => this.element;
}
