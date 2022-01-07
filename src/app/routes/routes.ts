import { LayoutComponent } from "../layout/layout.component";
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';

const notFound = {
  path: '**',
  component: PageNotFoundComponent,
};

const MainRoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../pages/main/main.module').then((m) => m.MainModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../pages/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'goods',
        loadChildren: () =>
          import('../pages/goods/goods.module').then((m) => m.GoodsModule),
      },
      {
        path: 'add-good',
        loadChildren: () =>
          import('../pages/add-good/add-good.module').then((m) => m.AddGoodModule),
      },
      {
        path: 'edit-good',
        loadChildren: () =>
          import('../pages/edit-good/edit-good.module').then((m) => m.EditGoodModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'edit-user',
        loadChildren: () =>
          import('../pages/edit-user/edit-user.module').then((m) => m.EditUserModule),
      },
      {
        path: 'add-user',
        loadChildren: () =>
          import('../pages/add-user/add-user.module').then((m) => m.AddUserModule),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('../pages/groups/groups.module').then((m) => m.GroupsModule),
      },
      {
        path: 'add-group',
        loadChildren: () =>
          import('../pages/add-group/add-group.module').then((m) => m.AddGroupModule),
      },
      {...notFound}
    ]
  }
]

export const routes = [...MainRoutes];
