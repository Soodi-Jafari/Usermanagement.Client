import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['vorname', 'nachname', 'geburtsDatum', 'delete'];
  dataSource: Array<User>;

  constructor(private userService: UserService, private router: Router) {
    this.dataSource = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getList()
      .subscribe((result: any) => {
        this.dataSource = result;
      }, error => {
      });
  }

  public add() {
    this.router.navigate(['users/detail/null']);
  }

  public edit(id: number) {
    this.router.navigate([`users/detail/${id}`]);
  }

  delete(id: number): void {
    this.userService.Delete(id)
      .subscribe((result: any) => {
         this.getUsers();
      }, error => {
      });
  }

}
