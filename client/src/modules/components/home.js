import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { Users } from '../../resources/data/users';

//require and end up with variable to access
@inject(Router,Users)
export class Home {

  
  constructor(router, users) {
        this.router = router;
        this.users = users;        
        this.message = 'Home';
        this.showLogin = true;
  }

  
  showRegister(){
    //creating empty object that can receive input from user
    this.user = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
    this.registerError = "";

    this.showLogin = false;
  }
  
  async save() {
  console.log(this.user)
          let serverResponse = await this.users.save(this.user);
          if (!serverResponse.error) {
            this.showLogin = true;
          } else {
            this.registerError = "There was a problem registering the user."
          }
      
  }
  
  //takes to list
  login(){
	  this.router.navigate('list');
  }

  
}
