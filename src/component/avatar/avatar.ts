import { BaseComponent } from '../base-component';

export class Avatar extends BaseComponent {
  constructor(readonly id: string, className: string) {
    super('img', [className]);
    this.element.id = id;
  }
}
