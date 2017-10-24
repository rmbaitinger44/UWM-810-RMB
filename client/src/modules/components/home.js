import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

//require and end up with variable to access
@inject(Router)
export class Home {
  constructor(router) {
	this.router = router;
          this.message = 'Home';
  }

  //takes to list
  login(){
	  this.router.navigate('list');
  }
}
