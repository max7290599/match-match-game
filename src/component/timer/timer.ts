import { BaseComponent } from '../base-component';
import './timer.css';

export class Timer extends BaseComponent {
  min: number | string;
  sec: number | string;
  static stoptime = false;

  constructor() {
    super('span', ['timer']);
    this.sec = 0;
    this.min = 0;
  }

  cleanTimer = (): void => {
    Timer.stoptime = false;
    this.sec = 0;
    this.min = 0;
  }

  timerCycle = (): void => {
    if (Timer.stoptime === false) {
      this.sec = Number(this.sec);
      this.min = Number(this.min);
      if (typeof this.sec === 'number') this.sec += 1;
      if (this.sec === 60) {
        this.min += 1;
        this.sec = 0;
      }

      if (this.sec < 10 || this.sec === 0) {
        this.sec = `0${this.sec}`;
      }
      if (this.min < 10 || this.min === 0) {
        this.min = `0${this.min}`;
      }

      this.element.innerHTML = `${this.min}:${this.sec}`;

      setTimeout(() => this.timerCycle(), 1000);
    } else {
      this.element.innerHTML = `${Number(this.min) * 60 + Number(this.sec)}`;
      this.cleanTimer();
    }
  }
}
