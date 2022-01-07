import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import { CommonModule } from "@angular/common";
import { MainComponent } from '../../pages/main/main.component';

const routes: Routes = [{ path: '', component: MainComponent}];

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [],
  exports: [RouterModule]
})
export class MainModule { }
