import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  email?: string | null = null;
  url: string | null = null;
}
