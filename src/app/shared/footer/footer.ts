import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  LucideAngularModule
} from 'lucide-angular';
@Component({
  selector: 'app-footer',
  standalone: true,
    imports: [LucideAngularModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  openSection: string | null = null;

icons = {
    Mail,
    Phone,
    Globe,
    MapPin
  };
  toggleSection(section: string) {
  this.openSection = this.openSection === section ? null : section;
}
closeSection() {
  this.openSection = null;
}
}
