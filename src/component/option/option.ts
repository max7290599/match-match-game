import { BaseComponent } from '../base-component';

export class Option extends BaseComponent {
  constructor(readonly item: string) {
    super('option', ['option']);
    this.element.innerHTML = item;
    this.element.setAttribute('value', item);
  }
}
