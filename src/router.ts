import { Game } from './component/game/game';
import { AboutGame } from './page/aboutGame/aboutGame';
import { BestScore } from './page/bestScore/bestScore';
import { SettingGame } from './page/settingGame/settingGame';

export const enum PageIds {
  AboutGamePage = 'aboutGame',
  BestScorePage = 'bestScore',
  SettingGamePage = 'gameSetting',
  GamePage = 'game',
}

export class Router {
  defaultPageId = 'current-page';

  renderNewPage = (idPage: string): SettingGame | AboutGame | BestScore | Game => {
    const currentPageHTML = document.querySelector(`#${this.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: SettingGame | AboutGame | BestScore | Game | null = null;

    switch (idPage) {
      case PageIds.BestScorePage: {
        page = new BestScore(idPage)
        break;
      }
      case PageIds.SettingGamePage: {
        page = new SettingGame(idPage)
        break;
      }
      case PageIds.GamePage: {
        page = new Game()
        break;
      }
      default:
        page = new AboutGame(idPage)
    }

    return page;
  }
}
