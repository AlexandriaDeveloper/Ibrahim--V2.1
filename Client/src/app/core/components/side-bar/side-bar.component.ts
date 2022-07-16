import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  panelOpenState = false;
@Input() isDark:boolean;
@Input() sidebarToggle : boolean;
@ViewChild("drawer") matDrawer :MatDrawer;
  constructor() { }

  ngOnInit(): void {
  }
toggle(){
 // if(this.sidebarToggle)
    this.matDrawer.toggle();
}
}
