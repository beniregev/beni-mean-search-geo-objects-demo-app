import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchWidgetComponent } from './component/widget/search-widget/search-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchWidgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client-angular17';
}
