import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass : "toast-bottom-right"
    })
  ],
  //What ever we imported above we need to export them to use in our application as below
  exports : [
    BsDropdownModule,
    ToastrModule
  ]
})
export class SharedModule { }
