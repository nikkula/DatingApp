import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model : any = {};
  //@Input() usersFromHomeComponent : any;
  @Output() cancelRegister = new EventEmitter();

  constructor(private accountServices : AccountService, private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountServices.register(this.model).subscribe(response => {
        console.log(response);
        this.cancel();
      },
      error => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
