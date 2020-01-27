import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() SideNavigationToggle = new EventEmitter();

  constructor(private router: Router, public data: DataService) {
    this.data.cartItems = this.data.getCart().length;
    //this.data.getProfile();
  }
  ngOnInit () {
  }

  onToggleOpenSidenav () {

    this.SideNavigationToggle.emit();

  }

}
