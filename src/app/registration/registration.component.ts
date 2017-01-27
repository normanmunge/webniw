import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { Registration } from './registration';
import { FormBuilder, FormGroup, Validators, FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit {

  constructor(
    private _delegateRegistration: RegistrationService,
    private fb: FormBuilder
  ) { }


  public success;
  public fail;
  public empty;
  public registerDelegate: Registration;
  public events;
  public form: FormGroup;
  side_events = [];

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required,])],
      lastName: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      events: [null]
    });
    console.log('ujinga');

    this.getEvents();
  }

  s = [];
  eventSelected: string;
  onSubmit(registerDelegate: Registration){

    this.eventSelected = registerDelegate.events;
    this.side_events = new Array(this.eventSelected);

    console.log(this.eventSelected, this.side_events);

    this.registerDelegate = new Registration(registerDelegate.firstName,registerDelegate.lastName,registerDelegate.email,registerDelegate.phone,registerDelegate.events);
    this._delegateRegistration.sendData({
      fstname: registerDelegate.firstName,
      lstname: registerDelegate.lastName,
      username: registerDelegate.email,
      phone: registerDelegate.phone,
      events: this.side_events,
      password: (registerDelegate.firstName)+("#")
    })
    .subscribe(
            data => //console.log(data)
            {
              console.log("Added Delegate Successfully"),
              this.success = "Added Delegate Successfully";
              this.form.reset();
            },
            error =>{
              console.log(error);
              this.empty = "This field is required";
              this.fail = "Failed to save data";
            }
      );
  }


  getEvents(){

    this._delegateRegistration.getEvents()
      .subscribe(
        (res)=>{
          const eventName = [];
          for (let event in res){
            eventName.push(res[event]);
          }
          this.events = eventName;
          console.log(eventName);
        },
      (err) => console.log(err),
      ()=>console.log("Done")
    );
  }

}
