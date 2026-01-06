import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // If we already have a user, allow immediately
  if (auth.currentUser) return true;

  // Wait up to a short timeout for auth state to initialize via the observable
  const user = await new Promise(resolve => {
    const sub = auth.user$.subscribe(u => {
      sub.unsubscribe();
      resolve(u);
    });
    // safety timeout: resolve null after 2s
    setTimeout(() => resolve(null), 2000);
  });

  if (user) return true;

  // not authenticated — redirect to login and attach returnUrl
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } }) as UrlTree;
};
