import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  menuItems = [
    { label: 'Conditional', route: '/conditional-validation' },
    { label: 'Cross-Field R', route: '/cross-field/reactive' },
    { label: 'Cross-Field S', route: '/cross-field/signals' },
    { label: 'Async R', route: '/async/reactive' },
    { label: 'Async S', route: '/async/signals' },
    { label: 'Array R', route: '/array/reactive' },
    { label: 'Array S', route: '/array/signals' },
    { label: 'Register', route: '/register' }
  ];
}
