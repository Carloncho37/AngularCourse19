import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//? Defino el routing del modulo "app"
const routes: Routes = [
  {
    path: 'reactive',
    loadChildren: () => import ('./reactive/reactive.module').then(m => m.ReactiveModule)
  }, //? Asi importo el modulo en lazy load
  {
    path: 'auth',
    loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'reactive'
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }




