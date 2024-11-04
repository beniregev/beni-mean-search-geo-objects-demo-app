import { Component } from '@angular/core';
import { HeaderComponent } from '../../partial/header/header.component';

@Component({
  selector: 'app-search-widget',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './search-widget.component.html',
  styleUrl: './search-widget.component.css',
})
export class SearchWidgetComponent {}
