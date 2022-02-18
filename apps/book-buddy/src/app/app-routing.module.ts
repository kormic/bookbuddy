import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@book-buddy/features';

// CUSTOM PRELOADING STRATEGY
// @Injectable({
//   providedIn: 'root'
// })
// class PreloadSelectedModulesList implements PreloadingStrategy {
//   preload(route: Route, load: () => Observable<void>): Observable<void | null> {
//     return route.data && route.data['preload'] ? load() : of(null);
//   }
// }

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('@book-buddy/features').then(m => m.DashboardModule) },
  // { path: 'book-details', data: { preload: false }, loadChildren: () => import('@book-buddy/features').then(m => m.BooksModule) },
  { path: 'book-details', loadChildren: () => import('@book-buddy/features').then(m => m.BooksModule) },
  { path: 'add-book', loadChildren: () => import('@book-buddy/features').then(m => m.AddBookModule) },
  { path: 'not-found', component: NotFoundComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
