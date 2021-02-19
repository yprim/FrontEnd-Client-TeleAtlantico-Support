import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private client: ClientService, private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.client.logout();
    this.router.navigate(['/login']);
  }

}
