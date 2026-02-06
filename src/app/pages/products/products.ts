import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { NgxGalaxyComponent } from '@omnedia/ngx-galaxy';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, NgxGalaxyComponent],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent implements AfterViewInit, OnDestroy {

  @ViewChild('productsRoot', { static: true })
  productsRoot!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;
  private platformId = inject(PLATFORM_ID);

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // ✅ PRODUCT CLICK HANDLER (FINAL)
  openProduct(productSlug: string) {
    console.log('Clicked:', productSlug);
    const submitted = localStorage.getItem('contactSubmitted') === 'true';

    if (!submitted) {
      // 🔒 Force contact form first
      this.router.navigate(['/contact'], {
        queryParams: { product: productSlug }
      });
    } else {
      // ✅ Go directly to product details
      this.router.navigate(['/product-details', productSlug]);
    }
    
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {

      gsap.from('.products-hero h1', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });

      gsap.from('.products-hero p', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from('.product-card', {
        scrollTrigger: {
          trigger: '.products-grid',
          start: 'top 75%',
          toggleActions: 'play reverse play reverse'
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        
        ease: 'power4.out',
      });

    }, this.productsRoot);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}
