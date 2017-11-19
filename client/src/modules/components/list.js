import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class List {

  constructor(router) {
	        this.router = router;
          this.message = 'List';
          this.auth = auth;
          
          this.user = JSON.parse(sessionStorage.getItem('user'));
          this.showList = true;
  }
  createTodo(){	
		this.todoObj = {
			todo: "",
			description: "",
			dateDue: new Date(),
			 userId: this.user._id,
			priority: this.priorities[0]
		}
		this.showList = false;		
	}

  logout(){
    sessionStorage.removeItem('user');
    this.auth.logout();
}}



