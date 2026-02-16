import { Component } from '@angular/core';
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
    imports: [LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
icons = {
    Mail,
    Phone,
    Globe,
    MapPin
  };
}
