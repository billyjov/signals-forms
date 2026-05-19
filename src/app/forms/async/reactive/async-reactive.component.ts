import { Component, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-async-reactive',
  templateUrl: './async-reactive.component.html',
  styleUrl: './async-reactive.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AsyncReactiveComponent implements OnInit {
  username = new FormControl('');
  isChecking = signal(false);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.username.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => {
          this.isChecking.set(true);
          return this.http.get<any>(`https://dummyjson.com/users/search?q=${value}`);
        })
      )
      .subscribe(res => {
        this.isChecking.set(false);

        if (res.users.length > 0) {
          this.username.setErrors({ taken: true });
        } else {
          this.username.setErrors(null);
        }
      });
  }
}
