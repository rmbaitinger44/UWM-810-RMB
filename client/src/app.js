import {AuthorizeStep} from 'aurelia-auth';

export class App {

  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep); 
    config.map([
      //each one of these objects represents page or route 
      { 
	      route: ['', 'home'],
        //where is the file located
        moduleId: './modules/components/home',
        //Aurelia creates a menu for us
        name: 'Home' 
      },
      {
	      route: 'list',
	      moduleId: './modules/components/list',
        name: 'List' ,
        auth: true 
     }
    ]);
  }
}

