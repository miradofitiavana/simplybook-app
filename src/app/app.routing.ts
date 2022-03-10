import {Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";

export const appRoutes: Routes = [

  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},

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
      // 	{ path: 'login', loadChildren: () => import('app/main/auth/login/login.module').then(m => m.LoginModule) },
      {
        path: 'dashboard',
        loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)
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
      // {
      //   path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.SignInModule)
      // },
      // {
      //   path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.SignUpModule)
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule)
      // },
    ]
  },

  {path: '**', redirectTo: 'dashboard'},
];
