import {Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {AuthGuard} from "./core/auth/guards/auth.guard";
import {NoAuthGuard} from './core/auth/guards/noAuth.guard';

export const appRoutes: Routes = [

  {path: '', pathMatch: 'full', redirectTo: 'home'},

  {path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard'},

  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
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
        path: 'booking/:uuid',
        loadChildren: () => import('app/modules/booking/booking.module').then(m => m.BookingModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'structure/:uuid',
        loadChildren: () => import('app/modules/structure/structure.module').then(m => m.StructureModule)
      },
      {
        path: 'configurations/:uuid',
        loadChildren: () => import('app/modules/configurations/configurations.module').then(m => m.ConfigurationsModule)
      },
      {
        path: 'subscription',
        loadChildren: () => import('app/modules/subscription/subscription.module').then(m => m.SubscriptionModule)
      },
      {
        path: 'unauthorized',
        loadChildren: () => import('app/modules/errors/error-403/error-403.module').then(m => m.Error403Module)
      },
    ]
  },

  {
    path: 'admin',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
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
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
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
    ]
  },

  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.HomeModule)
      },
    ]
  },

  {
    path: 'organismes',
    component: LayoutComponent,
    data: {
      layout: 'organisme'
    },
    children: [
      {
        path: ':id/home',
        loadChildren: () => import('app/modules/organismes/home/home.module').then(m => m.HomeModule)
      },
      {
        path: ':id/booking',
        loadChildren: () => import('app/modules/organismes/booking/booking.module').then(m => m.BookingModule)
      },
      {
        path: ':id/booking/:date',
        loadChildren: () => import('app/modules/organismes/booking-confirm/booking-confirm.module').then(m => m.BookingConfirmModule)
      },
    ]
  },

  {path: '**', redirectTo: 'home'},
];
