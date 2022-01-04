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
        path: 'about',
        loadChildren: () =>
          import('../pages/about/about.module').then((m) => m.AboutModule),
      },
      {...notFound}
    ]
  }
]

export const routes = [...MainRoutes];
