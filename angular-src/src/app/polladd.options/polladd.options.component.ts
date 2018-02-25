import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
   // moduleId: module.id,
    selector: 'Polladdoption',
    templateUrl: 'polladd.options.component.html',
})
export class PolladdoptionComponent {
    @Input('passvalue') public detailForm: FormGroup;//'group'
   // @Input() id:number;    
}