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
  public even:any;
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
    //this.side_events = new Array(this.eventSelected);

    //console.log(this.eventSelected, this.side_events);
    this.eventIds()

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
              console.log("Added Delegate Successfully", this.side_events),
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
  eventIds(){
    this.side_events=[]
    for(let event in this.events){
    //  console.log(this.events[event].event.status)
    if(this.events[event].event.status){
          this.side_events.push(this.events[event].event.id)
    }

    }
    console.log(this.side_events)
  }

  getEvents(){

    this._delegateRegistration.getEvents()
      .subscribe(
        (res)=>{
          const eventName = [];
          for (let event in res){
            this.even=res[event];
            this.even.event.status=false;
            eventName.push(this.even);
          }
          this.events = eventName;
          console.log(eventName);
        },
      (err) => console.log(err),
      ()=>console.log("Done")
    );
  }

}
