import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  loggedin(){
    return sessionStorage.getItem('userid') && sessionStorage.getItem('username');
  }
  onlogout(){
    const logoutObserver={
      next:(x: any)=> console.log('User logged out'),
      error:(err: any)=> console.log(err),
    }
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("username");
    location.reload();
  }
}
