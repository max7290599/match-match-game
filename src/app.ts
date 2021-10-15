import { Game } from './component/game/game';
import { Header } from './component/header/header';
import { openIndexedDB } from './indexedDB';
import { ImageCategoryModel } from './models/image-category-model';
import { Router } from './router';
import { SettingGame } from './page/settingGame/settingGame';

export class App {
  static category: string = 'animal';
  private urlImages: string[] = [];
  private readonly header: Header;
  private router: Router;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.router = new Router();
    openIndexedDB();
  }

  getHeader = async (): Promise<void> => {
    const resNav = await fetch('./header-nav.json');
    const nav: string[] = await resNav.json();
    this.header.createContainerNav(nav);
  }

  start = async (categories: string): Promise<void> => {
    const res = await fetch('./images.json');
    const images: ImageCategoryModel[] = await res.json();
    const image: ImageCategoryModel | undefined = images
      .find((imageItem) => imageItem.category === categories);
    if (image === undefined) return;
    const deleteNumberCard = SettingGame.getNumberCard() / 2;
    const cardImage: string[] = image.images.splice(0, deleteNumberCard);
    this.urlImages = cardImage.map((name) => `${image.category}/${name}`);
    const hash = window.location.hash.slice(1);
    const page = this.router.renderNewPage(hash);
    if (page instanceof Game) {
      this.header.element.querySelectorAll('.link').forEach((n) => n.classList.remove('active'));
      page.newGame(this.urlImages);
    }
    const pageHTML = page.render();
    pageHTML.id = this.router.defaultPageId;
    this.rootElement.append(pageHTML);
    SettingGame.setWidthFieldCard(deleteNumberCard);
  }

  enableRouteChange = (): void => {
    window.addEventListener('hashchange', () => {
      this.start(SettingGame.getCategory());
    });
  }

  run = (): void => {
    this.getHeader();
    const page = this.router.renderNewPage('aboutGame');
    const pageHTML = page.render();
    pageHTML.id = this.router.defaultPageId;

    this.rootElement.append(pageHTML);
    this.enableRouteChange();
  }
}
