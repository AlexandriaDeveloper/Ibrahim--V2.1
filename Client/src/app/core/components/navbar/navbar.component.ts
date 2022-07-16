import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {
  isDark = false;

  @Output() darkModeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() sidebar: SideBarComponent;
  @Input() theme: string;

  constructor() { }

  ngOnInit(): void {



    this.isDark = this.theme === 'my-dark-theme' ? true : false
  }

  isDarkToggle() {

    this.isDark = !this.isDark;

    this.darkModeEvent.emit(this.isDark);


  }
  sidebarToggle() {
    this.sidebar.matDrawer.toggle()
  }
}
