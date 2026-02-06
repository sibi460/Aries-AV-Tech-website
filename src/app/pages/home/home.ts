import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, inject } from '@angular/core';
import { NgForm,FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Mail, Phone, MapPin, Globe } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgxDarkVeilComponent } from '@omnedia/ngx-dark-veil';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
    FooterComponent,
    FormsModule,
    CommonModule,
    NgxDarkVeilComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroRoot', { static: true })
  heroRoot!: ElementRef;
 loading = false;
  successMessage = '';
  errorMessage = '';

  // 🔹 Form fields
  company = '';
  firstName = '';
  lastName = '';
  phone = '';
  location = '';
  email = '';
  message = '';

  icons = {
    Mail,
    Phone,
    MapPin,
    Globe,
  };

  constructor(private http: HttpClient, private router: Router) {}

  private platformId = inject(PLATFORM_ID);
  private ctx!: gsap.Context;
  submitForm(form: NgForm): void {
    if (!form.valid) return;

    const whatsappNumber = '919940111888';

    const text = `
New Enquiry 🚀

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
      product: 'Home Page Enquiry',
      message: this.message
    }).subscribe({
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

  
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);
    this.runAnimations();
  }
  private initPartnersLoop(): void {
    const track = document.querySelector('.partners-track') as HTMLElement;
    if (!track) return;

    const logos = Array.from(track.children) as HTMLElement[];
    if (logos.length < 2) return;

    const firstLogo = logos[0];
    const firstDuplicate = logos[logos.length / 2];

    const loopDistance = firstDuplicate.offsetLeft - firstLogo.offsetLeft;

    gsap.to(track, {
      x: `-=${loopDistance}`,
      duration: 25,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: (x) => {
          const parsed = parseFloat(x);
          return `${parsed % loopDistance}px`;
        },
      },
    });
  }

  private runAnimations(): void {
    this.ctx?.revert();

    this.ctx = gsap.context(() => {
      /* ===============================
       HERO IMAGE + TEXT SLIDER
    =============================== */

const slides = gsap.utils.toArray<HTMLElement>('.hero-slide');
const copies = gsap.utils.toArray<HTMLElement>('.hero-copy');

if (slides.length < 2 || slides.length !== copies.length) return;

let current = 0;
const ENTER_X = 180;
const EXIT_X = -180;

// Initial state
gsap.set(slides, { opacity: 0, x: ENTER_X });
gsap.set(copies, { opacity: 0, x: ENTER_X });

gsap.set(slides[0], { opacity: 1, x: 0 });
gsap.set(copies[0], { opacity: 1, x: 0 });

const slideNext = () => {
  const next = (current + 1) % slides.length;

  gsap
    .timeline()
    // Exit current slide
    .to(slides[current], {
      opacity: 0,
      x: EXIT_X,
      duration: 1.2,
      ease: 'power3.inOut',
    })
    // Exit current copy (SAME DIRECTION)
    .to(
      copies[current],
      {
        opacity: 0,
        x: EXIT_X,
        duration: 1.2,
        ease: 'power3.inOut',
      },
      '<',
    )
    // Enter next slide
    .fromTo(
      slides[next],
      { opacity: 0, x: ENTER_X },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      },
      '<',
    )
    // Enter next copy (SAME DIRECTION)
    .fromTo(
      copies[next],
      { opacity: 0, x: ENTER_X },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      },
      '<',
    )
    .call(() => {
      current = next;
    });
};

// Auto loop
gsap.delayedCall(3, function repeat() {
  slideNext();
  gsap.delayedCall(4.5, repeat);
});


      /* ===============================
       ABOUT INTRO
    =============================== */

      gsap.from('.about-content, .about-visual', {
        scrollTrigger: {
          trigger: '.about-intro',
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 0,
        y: 40,
        duration: 1.4,
        stagger: 0.2,
        ease: 'power3.out',
      });

      /* ===============================
   SOLUTIONS ENTRY (SAFE)
================================ */

      gsap.from('.solutions-header > *', {
        scrollTrigger: {
          trigger: '#solutions',
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.from('.solution-card', {
        scrollTrigger: {
          trigger: '.solutions-grid',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 0,
        y: 60,
        duration: 1.4,
        stagger: 0.2,
        ease: 'power3.out',

        // 🔑 THIS IS THE FIX
        clearProps: 'transform',
      });

      gsap.fromTo(
        '.solutions-line',
        { width: 0 },
        {
          scrollTrigger: {
            trigger: '#solutions',
            start: 'top 80%',
            once: true,
          },
          width: '120px',
          duration: 1,
          ease: 'power3.out',
        },
      );
      /* ===============================
   PARTNERS — TRUE INFINITE LOOP
================================ */
      // Use window.load to ensure images are sized correctly on desktop
      // ❌ REMOVE COMPLETELY
      window.addEventListener('load', () => {
        const track = document.querySelector('.partners-track') as HTMLElement;
        const logos = Array.from(track.children) as HTMLElement[];

        if (track && logos.length > 0) {
          const firstLogo = logos[0];
          const firstDuplicate = logos[logos.length / 2];
          const loopDistance = firstDuplicate.offsetLeft - firstLogo.offsetLeft;

          gsap.to(track, {
            x: `-=${loopDistance}`,
            duration: 25,
            ease: 'none',
            repeat: -1,
            modifiers: {
              x: (x) => {
                const parsed = parseFloat(x);
                const wrap = parsed % loopDistance;
                return `${wrap}px`;
              },
            },
          });
        }
      });

      gsap.from('.partners-header > *', {
        scrollTrigger: {
          trigger: '.partners',
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      this.initPartnersLoop();

      gsap.from('.glass-card', {
        scrollTrigger: {
          trigger: '.glass-section',
          start: 'top 75%',
          once: true,
        },
        opacity: 0,
        y: 80,
        duration: 1.4,
        ease: 'power3.out',
      });
      // contact form
      gsap.from('.glass-left > *', {
        scrollTrigger: {
          trigger: '.glass-section',
          start: 'top 75%',
          once: true,
        },
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.from('.glass-right span', {
        scrollTrigger: {
          trigger: '.glass-section',
          start: 'top 70%',
          once: true,
        },
        opacity: 0,
        x: 40,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out',
      });

      /* ===============================
   CONTACT SECTION — FIXED
================================ */

      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top 85%',
        toggleActions: 'play reverse play reverse',
        onEnter: () => {
          const tl = gsap.timeline();

          tl.from('.contact-card', {
            opacity: 0,
            y: 60,
            duration: 1.2,
            ease: 'power3.out',
          })

            .from(
              '.contact-form',
              {
                opacity: 0,
                x: -60,
                duration: 1,
                ease: 'power3.out',
              },
              '-=0.6',
            )

            .from(
              '.contact-info',
              {
                opacity: 0,
                x: 60,
                duration: 1,
                ease: 'power3.out',
              },
              '<',
            )

            .from(
              '.contact-item',
              {
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power2.out',
              },
              '-=0.4',
            );
        },
      });

      /* ===============================
       SERVICES
    =============================== */

      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: '.services',
          start: 'top 80%',
          once: true,
        },
        opacity: 0,
        y: 60,
        duration: 1.4,
        stagger: 0.25,
        ease: 'power2.out',
      });

      /* ===============================
       WHY US
    =============================== */

      gsap.from('.why-card', {
        scrollTrigger: {
          trigger: '.why-us',
          start: 'top 80%',
          once: true,
        },
        opacity: 0,
        y: 60,
        duration: 1.4,
        stagger: 0.25,
        ease: 'power2.out',
      });
    }, document.body); // ✅ CRITICAL FIX
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());
    ScrollTrigger.refresh();
  }
}
