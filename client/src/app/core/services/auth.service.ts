import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  async login(data: any) {
    const res = await axios.post(`${environment.apiUrl}/auth/login`, data);
    localStorage.setItem('token', res.data.token);
    return res.data;
  }

  async register(data: any) {
    const res = await axios.post(`${environment.apiUrl}/auth/register`, data);
    return res.data;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}