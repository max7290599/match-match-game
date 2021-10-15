import { BaseComponent } from '../base-component';
import { Option } from '../option/option';
import './select.css';

export class Select extends BaseComponent {
  private options: Option[] = [];

  constructor() {
    super('select', ['select']);
  }

  addOption = (options: Option[]): void => {
    this.options = options;
    this.options.forEach((item) => this.element.appendChild(item.element));
  }

  createOption = (ArrayItems: string[]): void => {
    const selectItems = ArrayItems.map((item) => new Option(item));
    this.addOption(selectItems);
  }
}
