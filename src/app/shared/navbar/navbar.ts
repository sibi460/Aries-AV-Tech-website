import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  // States for visual behavior
  isScrolled = false;   // Adds background/blur when scrolling down
  isVisible = true;     // Controls hiding/showing the bar on scroll
  isMenuOpen = false;   // Controls the mobile sidebar state

  private lastScrollY = 0;
  private scrollTimeout: any;

  @HostListener('window:scroll')
  onScroll() {
    const currentScroll = window.scrollY;

    // 1. Check if we've scrolled enough to style the navbar (glassmorphism)
    this.isScrolled = currentScroll > 40;

    // 2. Always show the navbar while the user is actively scrolling
    this.isVisible = true;

    // 3. Clear existing timer to reset the "hide" logic
    clearTimeout(this.scrollTimeout);

    // 4. Hide logic: Only hide if we are deep in the page and the mobile menu is CLOSED
    this.scrollTimeout = setTimeout(() => {
      if (window.scrollY > 80 && !this.isMenuOpen) {
        this.isVisible = false;
      }
    }, 800); // 800ms delay for a smoother user experience

    this.lastScrollY = currentScroll;
  }

  /**
   * Toggles the mobile hamburger menu
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Prevent the navbar from hiding while the user is interacting with the menu
    if (this.isMenuOpen) {
      this.isVisible = true;
    }
  }

  /**
   * Closes the menu (used when a link is clicked)
   */
  closeMenu() {
    this.isMenuOpen = false;
  }
}