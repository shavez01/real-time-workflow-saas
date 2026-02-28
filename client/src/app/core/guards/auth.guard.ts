import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard = () => {

  const router = inject(Router);

  if (typeof window === 'undefined') {
    return false;
  }

  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};