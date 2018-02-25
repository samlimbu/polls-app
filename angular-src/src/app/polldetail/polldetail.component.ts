import { Component, OnInit, Input } from '@angular/core';
import  { PollsService }from'../services/polls.service';
import {polloptions} from '../models/polloptions';

@Component({
  selector: 'app-polldetail',
  templateUrl: './polldetail.component.html',
  styleUrls: ['./polldetail.component.css']
})
export class PolldetailComponent implements OnInit {
  @Input() ItemSelected;
  formHiddenStatus;
  resultDisplayStatus;
  processStatus;
  answeredPoll=[];
  POLLSDATA;
  totalCount=0;
  constructor(private pollsService: PollsService) { }

  ngOnInit() {
    console.log(JSON.stringify(this.ItemSelected));
  }
  updateForm(updateInfo){
    this.formHiddenStatus = true;
    this.processStatus = true;

    //for display purpose
    if(this.answeredPoll.indexOf(this.ItemSelected._id.$oid)==-1){
      this.answeredPoll.push(this.ItemSelected._id.$oid);
    }
  
    for(let i in this.ItemSelected.options){
        
        if (this.ItemSelected.options[i].detail == updateInfo.detail){
            this.ItemSelected.options[i].count++;
        }
    } 
    
   

    //prepare obj to pass as parameter
    let tempidLIST = [];

    for(let i in this.ItemSelected.options){
      tempidLIST[i] = new polloptions(this.ItemSelected.options[i].detail, this.ItemSelected.options[i].count);
      this.totalCount+=this.ItemSelected.options[i].count;
    }

    let tempObj= {
        "user": this.ItemSelected.user,
      "question": this.ItemSelected.question,
      "options": tempidLIST
      
    };
 
    //call service for upddate

    this.pollsService.updatePolltoMlab(tempObj, this.ItemSelected._id.$oid)
    .subscribe(
        data=> this.POLLSDATA = data,
        error=> alert(error),
        ()=>{
        this.resultDisplayStatus = true,
        this.processStatus = ''}
    )

  }
 
}
