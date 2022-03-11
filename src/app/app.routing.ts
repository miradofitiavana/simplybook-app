import {Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";

export const appRoutes: Routes = [

  {path: '', pathMatch: 'full', redirectTo: 'sign-in'},

  {path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard'},

  {
    path: '',
    // canActivate: [NoAuthGuard],
    // canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'classic'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule)
      },
    ]
  },

  {
    path: '',
    // canActivate: [NoAuthGuard],
    // canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      {
        path: 'sign-in',
        loadChildren: () => import('app/modules/authentication/sign-in/sign-in.module').then(m => m.SignInModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('app/modules/authentication/sign-up/sign-up.module').then(m => m.SignUpModule)
      },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule)
      // },
    ]
  },

  {path: '**', redirectTo: 'sign-in'},
];
