import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  LucideAngularModule
} from 'lucide-angular';

import { NgxDarkVeilComponent } from '@omnedia/ngx-dark-veil';
import { gsap } from 'gsap';

import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    NgxDarkVeilComponent,
    LucideAngularModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent implements AfterViewInit, OnDestroy {

  @ViewChild('contactRoot', { static: true })
  contactRoot!: ElementRef<HTMLElement>;

  private platformId = inject(PLATFORM_ID);
  private ctx!: gsap.Context;

  loading = false;

  selectedProduct: string | null = null;

  company = '';
  firstName = '';
  lastName = '';
  phone = '';
  location = '';
  email = '';
  message = '';
  successMessage = '';
  errorMessage = '';
  showProductNotice = false;


  icons = { Mail, Phone, MapPin, Globe };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.route.queryParams.subscribe(params => {
      this.selectedProduct = params['product'] || null;
    });
    this.route.queryParams.subscribe(params => {
  if (params['required'] === 'product') {
    this.showProductNotice = true;
  }

  this.selectedProduct = params['product'] || null;
});

    this.ctx = gsap.context(() => {
      gsap.from('.contact-hero1 h1', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
      });

      gsap.from('.contact-hero1 p', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out'
      });

      gsap.from('.contact-card', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
      });
    }, this.contactRoot);
  }

  /* =====================
     WHATSAPP SUBMIT
  ====================== */
  submitForm(form: NgForm): void {
    if (!form.valid) return;

    const whatsappNumber = '919940111888';

    const text = `
New Product Enquiry 🚀

Product: ${this.selectedProduct || 'General'}

Company: ${this.company}
Name: ${this.firstName} ${this.lastName}
Phone: ${this.phone}
Email: ${this.email}
Location: ${this.location}

Message:
${this.message}
    `;

    window.open(
      'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(text),
      '_blank'
    );

    this.afterSuccess(form);
  }

  /* =====================
     EMAIL SUBMIT
  ====================== */
  sendViaEmail(form: NgForm): void {
    if (!form.valid) return;

    this.loading = true;
    this.errorMessage = '';

    this.http.post('http://localhost:3000/api/contact', {
  company: this.company,
  firstName: this.firstName,
  lastName: this.lastName,
  phone: this.phone,
  location: this.location,
  email: this.email,
  product: this.selectedProduct || 'General',
  message: this.message
})
.subscribe({
      next: () => {
        this.loading = false;
        this.afterSuccess(form);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Failed to send email. Please try again.';
      }
    });
  }

  /* =====================
     COMMON SUCCESS
  ====================== */
  private afterSuccess(form: NgForm): void {
    localStorage.setItem('contactSubmitted', 'true');
    this.successMessage = 'Thank you! We will contact you soon.';
    form.resetForm();

    setTimeout(() => {
      this.router.navigate(['/products']);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
