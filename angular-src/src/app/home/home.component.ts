import { Component, OnInit } from '@angular/core';
import { PollsService } from '../services/polls.service';
import { forEach } from '@angular/router/src/utils/collection';
import { AuthService } from '../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    POLLSLIST = [];
    ItemSelect;
    UpdateItem = {};
    formHiddenStatus = true;
    questionAdd = null;
    showResult;
    answeredPoll = [];
    loadingDataStatus = true;
    constructor(
        private pollsService: PollsService,
        private authService: AuthService,
        private flashMessage: FlashMessagesService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getPolls();
    }

    reset() {
        this.getPolls();
        this.questionAdd = null;
    }

    getPolls() {
        this.pollsService.getPollfromMlab()
            .subscribe(
            data => this.POLLSLIST = data,
            error => alert(error),
            ()=>this.loadingDataStatus = null

            );

    }

    selectedItem(item) {
        this.formHiddenStatus = false;
        this.ItemSelect = item;
    }

    showPollAddtoogle() {
        if (this.authService.loggedIn()) {
            if (this.questionAdd == null) {
                this.questionAdd = true;
            }
            else {
                this.questionAdd = null;
            }
    

        } else {
            console.log ('not logged in');
            this.flashMessage.show('You need to login to post a question', {
                cssClass:"alert-danger",
                timeout:5000});
           
        }



        
    }

}

