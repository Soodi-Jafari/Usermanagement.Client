import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  constructor( private authService: AuthService, private router: Router) {
            this.username = "";
            this.password = "";
           }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(res => {
        if (!res) {
        } else {
          this.router.navigate(['/users']);
        }
    }, error => {
    });
  }


}
