import { database } from '../../indexedDB';
import { BaseComponent } from '../base-component';
import { ImgLoad } from '../img-load/img-load';
import { Input } from '../input/input';
import { Label } from '../label/label';
import { blankLine, blankLineMail } from './validateForm';
import './form.css';

export class Form extends BaseComponent {
  static user = {
    total: 0,
    fname: '',
    lname: '',
    mail: '',
    url: '',
  };

  private buttonSend: Input;
  private buttonCancel: Input;
  private firstLabel: Label;
  private lastLabel: Label;
  private emailLabel: Label;
  private imgLoad: ImgLoad;

  constructor() {
    super('form', ['form-container']);
    this.firstLabel = new Label({
      label: 'First name', name: 'fname', for: 'fname', type: 'text', id: 'fname',
    });
    this.lastLabel = new Label({
      label: 'Last name', name: 'lname', for: 'lname', type: 'text', id: 'lname',
    });
    this.emailLabel = new Label({
      label: 'E-mail', name: 'mail', for: 'mail', type: 'text', id: 'mail',
    });
    this.imgLoad = new ImgLoad();
    this.buttonSend = new Input({ type: 'button', value: 'Send' });
    this.buttonCancel = new Input({ type: 'button', value: 'X' });
    this.element.append(
      this.firstLabel.element, this.lastLabel.element, this.emailLabel.element,
      this.imgLoad.element, this.buttonSend.element, this.buttonCancel.element
      )
    this.firstLabel.element.children[0].addEventListener('input', (ev: Event) => this.handleChange(ev));
    this.lastLabel.element.children[0].addEventListener('input', (event: Event) => this.handleChange(event));
    this.emailLabel.element.children[0].addEventListener('input', (event: Event) => this.handleChange(event));
    this.buttonSend.element.addEventListener('click', this.validate);
    this.buttonCancel.element.addEventListener('click', this.setLocationBestScore);
  }

  openForm = (): void => {
    this.element.style.display = 'flex';
  }

  static setScoreUser = (total: number): void => {
    Form.user.total = (total < 0) ? 0 : total;
  };

  validate = (): void => {
    Form.user.url = this.imgLoad.getUrlImage();
    const firstNameInput = (this.firstLabel.element.children[0] as HTMLInputElement);
    const lastNameInput = (this.lastLabel.element.children[0] as HTMLInputElement);
    const mailInput = (this.emailLabel.element.children[0] as HTMLInputElement);

    blankLine(firstNameInput.value, firstNameInput);
    blankLine(lastNameInput.value, lastNameInput);
    blankLineMail(mailInput.value, mailInput);

    if (document.querySelector('.error') === null) {
      this.setScore();
      this.setLocationBestScore();
    }
  };

  handleChange = (ev: Event): void => {
    const target = ev.target as HTMLInputElement;
    if (target.name === 'fname' || target.name === 'lname' || target.name === 'mail') {
      Form.user[target.name] = target.value;
    }
  };

  setScore = (): void => {
    const transaction = database?.transaction('bestScore', 'readwrite');
    const store = transaction?.objectStore('bestScore');
    const result = store?.put(Form.user);
    if (result === undefined) return;

    result.onsuccess = () => {
    };
    result.onerror = () => {
    };
  };

  setLocationBestScore = (): void => {
    window.location.href = '/max7290599-JSFE2021Q1/match-match-game/#bestScore';
    const btnNewGame = document.querySelector('.button-game');
    const links = document.querySelectorAll('.link');

    if (links === null) return;
    if (btnNewGame === null) return;

    links[1].classList.add('active');
    btnNewGame.innerHTML = 'new game';
    btnNewGame.setAttribute('href', '#game');
  };
}
