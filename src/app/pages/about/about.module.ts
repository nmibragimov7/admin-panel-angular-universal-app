import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";

import { AboutComponent } from '../../pages/about/about.component';

const routes: Routes = [{ path: '', component: AboutComponent}];

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [],
  exports: [AboutComponent, RouterModule]
})
export class AboutModule { }
