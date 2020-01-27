import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() closeSideNavigation = new EventEmitter();

  constructor(
    public data: DataService,

  ) {


  }

  ngOnInit () {
    this.data.getProfile();

  }

  onToggleClose () {
    this.closeSideNavigation.emit();
  }

}
