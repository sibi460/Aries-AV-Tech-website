import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { gsap } from 'gsap';

import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';
// import { NgxGalaxyComponent } from '@omnedia/ngx-galaxy';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent implements AfterViewInit, OnDestroy {

  @ViewChild('aboutRoot', { static: true })
  aboutRoot!: ElementRef<HTMLElement>;

  private platformId = inject(PLATFORM_ID);
  private ctx!: gsap.Context;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ctx = gsap.context(() => {
      gsap.from('.about-hero h1', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });

      gsap.from('.about-hero p', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from('.about-card', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });
    }, this.aboutRoot);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
