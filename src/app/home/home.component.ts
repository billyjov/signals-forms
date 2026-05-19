import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Demo {
  title: string;
  reactiveRoute: string;
  signalsRoute: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink]
})
export class HomeComponent {
  categories: Demo[] = [
    {
      title: 'Cross-Field Validation',
      reactiveRoute: '/cross-field/reactive',
      signalsRoute: '/cross-field/signals'
    },
    {
      title: 'Async Validation',
      reactiveRoute: '/async/reactive',
      signalsRoute: '/async/signals'
    },
    {
      title: 'Dynamic Forms',
      reactiveRoute: '/array/reactive',
      signalsRoute: '/array/signals'
    }
  ];
}
