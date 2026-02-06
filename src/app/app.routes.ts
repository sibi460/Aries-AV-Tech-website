import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductsComponent } from './pages/products/products';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';
import { ServicesComponent } from './pages/services/services';
import { ProductDetails } from './pages/product-details/product-details';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'service', component: ServicesComponent },
  {
  path: 'product-details/:slug',
  loadComponent: () =>
    import('./pages/product-details/product-details')
      .then(m => m.ProductDetails),
  data: { prerender: false }
},
  { path: '', redirectTo: 'products', pathMatch: 'full' },
];
