import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { ProjectsComponent } from './dashboards/projects/projects.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {
        path: "",
        component: ProjectsComponent
    },
    {
        path: "user",
        component: UsersComponent
    },
    {
      path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
