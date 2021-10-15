import { BaseComponent } from '../../component/base-component';
import { Select } from '../../component/select/select';
import { ImageCategoryModel } from '../../models/image-category-model';
import './settingGame.css';

const DIFFICULTY_LEVEL_EASY = 2;
const DIFFICULTY_LEVEL_MEDIUM = 8;
const DIFFICULTY_LEVEL_HARD = 18;

export class SettingGame extends BaseComponent {
  static category = 'animal';
  static numberCard = '2';
  private readonly selectCategory: Select;
  private readonly selectFieldCard: Select;
  private readonly titleDifficulty: HTMLElement;
  private readonly titleGameCard: HTMLElement;

  constructor(id: string) {
    super('div', ['settingGame']);
    this.element.id = id;
    this.titleGameCard = document.createElement('span');
    this.titleGameCard.innerHTML = 'Game Card';
    this.element.appendChild(this.titleGameCard);
    this.selectCategory = new Select();
    this.element.appendChild(this.selectCategory.element);
    this.titleDifficulty = document.createElement('span');
    this.titleDifficulty.innerHTML = 'Difficulty (2x2)';
    this.element.appendChild(this.titleDifficulty);
    this.selectFieldCard = new Select();
    this.element.appendChild(this.selectFieldCard.element);
    this.selectCategory.element
      .addEventListener('change', (ev: Event) => this.categoryHandler(ev));
    this.selectFieldCard.element
      .addEventListener('change', (ev: Event) => this.numberCardHandler(ev));
    this.createSelectCategory();
  }

  createSelectCategory = async (): Promise<void> => {
    const res = await fetch('./images.json');
    const field = await fetch('./field-card.json');
    const fieldCards: string[] = await field.json();
    const categories: ImageCategoryModel[] = await res.json();
    const categoriesGame: string[] = [];
    categories.forEach(categoryItem => {
      categoriesGame.push(categoryItem.category);
    })

    this.selectCategory.createOption(categoriesGame);
    this.selectFieldCard.createOption(fieldCards);
  }

  categoryHandler = (ev: Event): void => {
    SettingGame.category = (ev.target as HTMLInputElement).value;
  };

  numberCardHandler = (ev: Event): void => {
    SettingGame.numberCard = (ev.target as HTMLInputElement).value;
  };

  static setWidthFieldCard = (numberFieldCard: number): void => {
    const fieldCard = document.querySelector('.cards-field');
    if (numberFieldCard === DIFFICULTY_LEVEL_EASY) fieldCard?.classList.add('easy');
    if (numberFieldCard === DIFFICULTY_LEVEL_MEDIUM) fieldCard?.classList.add('medium');
    if (numberFieldCard === DIFFICULTY_LEVEL_HARD) fieldCard?.classList.add('hard');
  };

  static getCategory = (): string => SettingGame.category;

  static getNumberCard = (): number => Number(SettingGame.numberCard) * Number(SettingGame.numberCard) ;

  render = (): HTMLElement => this.element;
}
