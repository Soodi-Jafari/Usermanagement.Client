import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: User;
  title: string;
  submitted = false;
  @ViewChild('frm') userForm?: NgForm;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.user = new User();
    this.title = "User";
  }

  ngOnInit(): void {
    if (this.route.params) {
      this.route.params.subscribe(params => {
        this.user.id = !isNaN(params['id']) ? Number(params['id']) : 0;
        this.title = this.user.id == 0 ? "Add User" : "Edit User";
        if (this.user.id > 0)
          this.getUser();
      });
    }
  }

  getUser() {
    this.userService.getSingle(this.user.id)
      .subscribe((result: any) => {
        this.user = result;
      }, error => {
        console.log(error);
      });
  }

  save() {
    this.submitted = true;
    if (this.userForm?.valid) {
      if (this.user.id == 0)
        this.post()
      else
        this.put();
    }
  }

  post() {
    this.userService.Post(this.user)
      .subscribe((result: any) => {
        this.router.navigate(['users']);
      }, error => {
        console.log(error);
      });
  }

  put() {
    this.userService.Put(this.user)
      .subscribe((result: any) => {
        this.router.navigate(['users']);
      }, error => {
        console.log(error);
      });
  }
}
