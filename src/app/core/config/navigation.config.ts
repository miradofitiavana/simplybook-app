import {NavigationItem} from "../../components/navigation/navigation-item.types";

export const navigations: NavigationItem[] = [
  {
    id: "app",
    type: "group",
    title: "Applications",
    hidden: false,
    children: [
      {
        id: 'dashboard',
        title: 'Tableau de bord',
        type: 'basic',
        icon: 'dashboard',
        link: '/dashboard',
        hidden: false,
      },
      {
        id: 'booking',
        title: 'Mes Réservations',
        subtitle: '3 rendez-vous à venir',
        type: 'basic',
        icon: 'today',
        link: '/booking',
        hidden: false,
      },
      {
        id: 'structure',
        title: 'Infos Structure',
        type: 'basic',
        icon: 'settings',
        link: '/structure',
        hidden: false,
      },
      {
        id: 'options',
        title: 'Mes Options',
        type: 'basic',
        icon: 'view_module',
        link: '/options',
        hidden: false,
      },
      {
        id: 'subscription',
        title: 'Abonnements et Historiques',
        type: 'basic',
        icon: 'all_out',
        link: '/subscription',
        hidden: false,
      },
      {
        id: 'profile',
        title: 'Mon Profil',
        type: 'basic',
        icon: 'account_circle',
        link: '/profile',
        hidden: false,
      }
    ]
  },
  {
    id: "admin",
    type: "group",
    title: "Administration",
    hidden: false,
    children: [
      {
        id: 'gestion-diverses',
        title: 'Gestions diverses',
        type: 'collapsable',
        icon: 'account_circle',
        hidden: false,
        children: [
          {
            id: 'gestion-categorie',
            title: 'Gestion catégories',
            type: 'basic',
            link: "/admin/gestion/categories",
            hidden: false,
          },
          {
            id: 'gestion-categorie',
            title: 'Gestion catégories',
            type: 'basic',
            link: "/profile",
            hidden: false,
          }
        ]
      }
    ]
  }
];
