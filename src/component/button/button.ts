import { BaseComponent } from '../base-component';
import './button.css';

export class Button extends BaseComponent {
  constructor(name: string) {
    super('button', ['button']);
    this.element.innerHTML = name;
  }
}
