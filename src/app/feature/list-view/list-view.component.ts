import { Component, OnInit } from '@angular/core';
import { USStateList } from 'src/app/_miscellaneous/us_states';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent  implements OnInit {
  us_state_list =  USStateList.states
  constructor() { }
  
  ngOnInit() {
    console.log('us_state_list: ', this.us_state_list)

  }

}
