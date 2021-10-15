import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import './pop-up.css';

export class PopUp extends BaseComponent {
  modal: HTMLDivElement;
  button: Button;

  constructor() {
    super('div', ['darken']);
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.element.append(this.modal);
    this.modal.innerHTML = '<h2>Congratulations! You can register your result.</h2>';
    this.button = new Button('Register');
    this.modal.append(this.button.element);
    this.button.element.addEventListener('click', this.closeModal);
  }

  openModal = (): void => {
    this.modal.classList.add('modal-show');
  }

  closeModal = (): void => {
    this.modal.classList.remove('modal-show');
    document.querySelector('.form-container')?.setAttribute('style', 'display: flex;');
  }
}
