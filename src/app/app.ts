import { Component, OnDestroy, signal } from '@angular/core';

interface TimeUnit {
  label: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnDestroy {
  private readonly targetDate = new Date(2029, 8, 30);
  private readonly timerId = window.setInterval(() => this.updateCountdown(), 1000);

  protected readonly targetLabel = '30.09.2029';
  protected readonly timeUnits = signal<TimeUnit[]>([]);
  protected readonly isFinished = signal(false);

  constructor() {
    this.updateCountdown();
  }

  ngOnDestroy(): void {
    window.clearInterval(this.timerId);
  }

  private updateCountdown(): void {
    const difference = Math.max(this.targetDate.getTime() - Date.now(), 0);
    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.isFinished.set(difference === 0);
    this.timeUnits.set([
      { label: 'Дней', value: this.formatValue(days) },
      { label: 'Часов', value: this.formatValue(hours) },
      { label: 'Минут', value: this.formatValue(minutes) },
      { label: 'Секунд', value: this.formatValue(seconds) },
    ]);
  }

  private formatValue(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
