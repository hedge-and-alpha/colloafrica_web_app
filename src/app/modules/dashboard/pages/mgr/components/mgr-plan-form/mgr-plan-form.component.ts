import { Component } from '@angular/core';

@Component({
  selector: 'ca-mgr-plan-form',
  templateUrl: './mgr-plan-form.component.html',
  styleUrl: './mgr-plan-form.component.css',
})
export class MgrPlanFormComponent {
  themes: Theme[] = THEME_COLOURS;
  durations: Duration[] = DURATIONS;

  selectTheme(theme: Theme) {
    console.log(theme);
  }
}

const DURATIONS: Duration[] = [
  { id: 'daily', name: 'Daily' },
  { id: 'weekly', name: 'Weekly' },
  { id: 'monthly', name: 'Monthly' },
];

const THEME_COLOURS: Theme[] = [
  {
    from: '#17B890',
    to: '#009D76',
  },
  {
    from: '#006dca',
    to: '#1e96fc',
  },
  {
    from: '#ffba08',
    to: '#ffd056',
  },
  {
    from: '#00241b',
    to: '#000000',
  },
  {
    from: '#bca52c',
    to: '#f6e691',
  },
  {
    from: '#470b96',
    to: '#6b1bd3',
  },
];

type Theme = { from: string; to: string };
type Duration = { id: string; name: string };
