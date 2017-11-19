import {inject} from 'aurelia-framework';
import {ToDos} from '../resources/data/todos';
import { AuthService } from 'aurelia-auth';

import {Router} from 'aurelia-router';



inject(Router)
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
  async saveTodo(){
		if(this.todoObj){		
			let response = await this.todos.save(this.todoObj);
			if(response.error){
				alert("There was an error creating the ToDo");
			} else {
				//Could provide feeback									
			}
			this.showList = true;
		}
	}


  logout(){
    sessionStorage.removeItem('user');
    this.auth.logout();
}}



