import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { PollsService} from '../services/polls.service';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
@Component({
    selector: 'app-polladd',
    templateUrl: './polladd.component.html',
    styleUrls: ['./polladd.component.css']
})
export class PolladdComponent implements OnInit {
    formId;
    user:string;
    @Output() someEvent = new EventEmitter<string>();
    public myForm: FormGroup;
    
        constructor(private _fb: FormBuilder, 
            private pollservice: PollsService,
            private authService: AuthService, 
        private router:Router ) { }
    
        ngOnInit() {
            this.getLoggedInUser();
            
            this.myForm = this._fb.group({
                user:[ '' ],
                question: ['', [Validators.required, Validators.minLength(2)]],
                options : this._fb.array([])
            });
            
            // add address
            this.addOption();
            
            /* subscribe to addresses value changes */
            // this.myForm.controls['addresses'].valueChanges.subscribe(x => {
            //   console.log(x);
            // })
        }
        
        getLoggedInUser(){
            this.authService.getProfile().subscribe(profile=>{
              this.user = profile.user.name;
             console.log(this.user);
            },
              err=>{
                  console.log(err);
                  return false;
              }   
          );
        }


        initAddress() {
            return this._fb.group({
                detail: ['', Validators.required],
                count: [0]
            });
        }
    
        addOption() {
            const control = <FormArray>this.myForm.controls['options'];
            const optCtrl = this.initAddress();
            control.push(optCtrl);
            
            /* subscribe to individual address value changes */
            // addrCtrl.valueChanges.subscribe(x => {
            //   console.log(x);
            // })
        }
    
        removeOption(i: number) {
            const control = <FormArray>this.myForm.controls['options'];
            control.removeAt(i);
   
        }
    
        save(model) {
            console.log('saving');
            model.value.user=this.user;
            this.pollservice.addPolltoMlab(model.value)
            .subscribe(
                data=>'', 
                err=> console.log(err),
                ()=>{
                    
                    console.log('sucess')
                    }
                );
                this.someEvent.next();
           
              
        }
}
