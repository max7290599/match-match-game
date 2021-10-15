import { BaseComponent } from '../base-component';
import { UserModel } from '../../models/user-model';
import './input.css';

export class Input extends BaseComponent {
  constructor(attribute: UserModel) {
    super('input', ['input']);
    Object.keys(attribute).forEach((key) => this.element.setAttribute(key, attribute[key]));
  }
}
