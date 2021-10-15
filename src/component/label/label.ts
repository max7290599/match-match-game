import { BaseComponent } from '../base-component';
import { Input } from '../input/input';
import { UserModel } from '../../models/user-model';
import './label.css';

export class Label extends BaseComponent {
  private input: Input;
  private small: HTMLElement;

  constructor(attribute: UserModel) {
    super('label', ['label']);
    this.element.innerHTML = attribute.label;
    this.element.setAttribute('for', attribute.for);
    this.input = new Input(attribute);
    this.element.appendChild(this.input.element);
    this.small = document.createElement('small');
    this.element.append(this.small);
  }
}
