import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  usernameSearchRequest(username: string) {
    return `https://dummyjson.com/users/search?q=${username}`;
  }
}
