import { DOCUMENT } from '@angular/common';
import { Component, Inject, inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  theme: string = 'my-light-theme';

  constructor(@Inject(DOCUMENT) private document, private renderer: Renderer2) {

  }
  ngOnInit(): void {
    // this.renderer.setAttribute(this.document.body, 'class', 'my-light-theme');
    if (localStorage.getItem('isDark') !== null)
      this.theme = localStorage.getItem('isDark');

    this.renderer.setAttribute(this.document.body, 'class', this.theme);
  }
  title = 'Client';
  public isDark = false;
  sidebarEvent = false;
  isDarkMode(ev: any) {
    this.isDark = ev;

    this.theme = this.isDark ? 'my-dark-theme' : 'my-light-theme';
    localStorage.clear();
    localStorage.setItem('isDark', this.theme);
    this.renderer.setAttribute(this.document.body, 'class', this.theme);


  }
  sidebarToggle(ev) {
    this.sidebarEvent = ev;
  }
}
