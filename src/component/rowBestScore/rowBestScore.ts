import { UserModel } from '../../models/user-model';
import { BaseComponent } from '../base-component';
import './rowBestScore.css';

export class RowBestScore extends BaseComponent {
  private firstName: HTMLElement;
  private lastName: HTMLElement;
  private mail: HTMLElement;
  private total: HTMLElement;
  private url: HTMLElement;

  constructor(userGame: UserModel) {
    super('div', ['rowBestScore']);
    this.url = document.createElement('img');
    this.url.setAttribute('src', userGame.url);
    this.firstName = document.createElement('div');
    this.firstName.innerHTML = userGame.fname;
    this.lastName = document.createElement('div');
    this.lastName.innerHTML = userGame.lname;
    this.mail = document.createElement('div');
    this.mail.innerHTML = userGame.mail;
    this.total = document.createElement('div');
    this.total.innerHTML = String(userGame.total);
    this.element.appendChild(this.url);
    this.element.appendChild(this.firstName);
    this.element.appendChild(this.lastName);
    this.element.appendChild(this.mail);
    this.element.appendChild(this.total);
  }
}
