import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductsComponent } from './pages/products/products';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';
import { ServicesComponent } from './pages/services/services';
import { ProductDetails } from './pages/product-details/product-details';
export const routes: Routes = [
  {
    path: '', title:"HOME",
    component: HomeComponent,
  },
  { path: 'products',title:"PRODUCTS" ,component: ProductsComponent },
  { path: 'about',title:"ABOUT", component: AboutComponent },
  { path: 'contact', title:"CONTACT",component: ContactComponent },
  { path: 'service',title:"SERVICE", component: ServicesComponent },
  {
  path: 'product-details/:slug',title:"PRODUCTS-DETAILS",
  loadComponent: () =>
    import('./pages/product-details/product-details')
      .then(m => m.ProductDetails),
  data: { prerender: false }
}
];
