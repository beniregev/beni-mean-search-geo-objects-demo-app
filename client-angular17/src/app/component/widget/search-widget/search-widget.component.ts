import { Component } from '@angular/core';
import { HeaderComponent } from '../../partial/header/header.component';
import { SearchFilterComponent } from '../../partial/search-filter/search-filter.component';
import { SearchResultComponent } from '../../partial/search-result/search-result.component';

@Component({
  selector: 'app-search-widget',
  standalone: true,
  imports: [HeaderComponent, SearchFilterComponent, SearchResultComponent],
  templateUrl: './search-widget.component.html',
  styleUrl: './search-widget.component.css',
})
export class SearchWidgetComponent {}
