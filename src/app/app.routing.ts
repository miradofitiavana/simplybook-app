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
        path: 'booking',
        loadChildren: () => import('app/modules/booking/booking.module').then(m => m.BookingModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule)
      },
    ]
  },

  {
    path: 'admin',
    // canActivate: [NoAuthGuard],
    // canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'classic'
    },
    children: [
      {
        path: 'gestion/categories',
        loadChildren: () => import('app/modules/admin/categorie/categorie.module').then(m => m.CategorieModule),
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
