import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule,RouterLink,FooterComponent],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {

  product: any;

  products: Record<string, any> = {
    'professional-speakers': {
      title: 'Professional Speakers',
      desc: 'High-fidelity sound systems for commercial environments.',
      image: '/assets/images/audio.png'
    },
    'led-displays': {
      title: 'LED Displays',
      desc: 'Ultra-bright displays for indoor and outdoor applications.',
      image: '/assets/images/display1.png'
    },
    'LED Video Wall System': {
      title: 'Interactive Panels',
      desc: 'Touch-enabled collaboration solutions.',
      image: '/assets/images/bbb.png'
    },
     'interactive-panels': {
      title: 'Interactive Panels',
      desc: 'Touch-enabled collaboration solutions.',
      image: '/assets/images/ifp.png'
    },
    'digital-signage': {
      title: 'Digital Signage',
      desc: 'Dynamic display solutions for branding and information.',
      image: '/assets/images/ccc.png'
    },
      'video-walls': {
      title: 'Video Wall Systems',
      desc: 'Large-scale multi-screen display solutions.',
      image: '/assets/images/a1.png'
    },
    'conference-audio': {
      title: 'Conference Audio Systems',
      desc: 'Crystal-clear audio for professional meeting spaces.',
      image: '/assets/images/audio-con.png'
    },
    'classroom-av': {
      title: 'Classroom AV Solutions',
      desc: 'Smart tools for modern digital classrooms.',
      image: '/assets/images/av.png'
    },
  
    'av-control-systems': {
      title: 'AV Control Systems',
      desc: 'Centralized automation for integrated environments.',
      image: '/assets/images/Control-systems.png'
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 🔒 Gate check
    const allowed = localStorage.getItem('contactSubmitted') === 'true';
    if (!allowed) {
      this.router.navigate(['/contact']);
      return;
    }

    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug || !this.products[slug]) {
      this.router.navigate(['/products']);
      return;
    }

    this.product = this.products[slug];
  }
}
