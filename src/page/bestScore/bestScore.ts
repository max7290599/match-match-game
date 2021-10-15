import { BaseComponent } from '../../component/base-component';
import { RowBestScore } from '../../component/rowBestScore/rowBestScore';
import { database } from '../../indexedDB';
import { UserModel } from '../../models/user-model';
import './bestScore.css';

const TEN_BEST = 10;

export class BestScore extends BaseComponent {
  constructor(id: string) {
    super('div', ['bestScore']);
    this.element.id = id;
    this.element.innerHTML = `
    <div class="header-score">
        Best Player
      </div>
    `;

    const transaction = database?.transaction('bestScore', 'readonly');
    const store = transaction?.objectStore('bestScore');
    const reqCursor = store?.index('fname').openCursor(null, 'next');
    if (reqCursor === undefined) return;
    const arr: UserModel[] = [];
    let count = 0;
    reqCursor.onsuccess = () => {
      const { result } = reqCursor;
      if (result?.value) {
        arr.push(result?.value);
        result?.continue();
        count = count++;
      } else {
        arr.sort((a, b) => Number(b.total) - Number(a.total));
        arr.forEach((item, i): void => {
          if (i < TEN_BEST) {
            const row = new RowBestScore(item);
            this.element.append(row.element);
          }
        });
      }
    };
  }

  render = (): HTMLElement => this.element;
}
