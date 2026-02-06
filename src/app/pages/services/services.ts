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
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent implements AfterViewInit, OnDestroy {

  @ViewChild('servicesRoot', { static: true })
  servicesRoot!: ElementRef<HTMLElement>;

  private platformId = inject(PLATFORM_ID);

  constructor(
    private title: Title,
    private meta: Meta
  ) {
    /* =========================
       SEO
    ========================= */
    this.title.setTitle('Services | Aries AV Tech');
    this.meta.updateTag({
      name: 'description',
      content:
        'Professional audio-visual, automation, and integrated AV services for corporate, educational, and commercial environments.'
    });
  }

  ngAfterViewInit(): void {
    // SSR safe hook (reserved for future animations)
    if (!isPlatformBrowser(this.platformId)) return;
  }

  ngOnDestroy(): void {
    // nothing to clean for now
  }
}
