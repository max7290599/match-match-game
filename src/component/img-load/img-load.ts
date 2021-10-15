import { Avatar } from '../avatar/avatar';
import { BaseComponent } from '../base-component';
import { Input } from '../input/input';
import './img-load.css';

export class ImgLoad extends BaseComponent {
  private avatarInput: Input;
  private avatarImg: Avatar;
  private imageUrl: string;

  constructor() {
    super('div', ['file-load']);
    this.imageUrl = '';
    this.avatarInput = new Input({ type: 'file', id: 'imageSelector' });
    this.element.appendChild(this.avatarInput.element);
    this.avatarImg = new Avatar('image', 'img-loader');
    this.element.appendChild(this.avatarImg.element);
    this.avatarInput.element.addEventListener('change', (ev: Event) => this.readURL(ev));
  }

  readURL = (ev: Event): void => {
    const target = ev.target as HTMLInputElement | null;
    if (target === null) return;
    const fileList = target.files as FileList;
    const file = fileList[0];
    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        document.getElementById('image')?.setAttribute('src', reader.result as string);
        this.imageUrl = reader.result as string;
      });

      reader.readAsDataURL(file);
    }
  }

  getUrlImage = (): string => this.imageUrl;
}
