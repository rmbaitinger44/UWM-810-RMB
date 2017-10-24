export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      //each one of these objects represents page or route 
      { 
	      route: ['', 'home'],
        //where is the file located
        moduleId: './modules/home',
        //Aurelia creates a menu for us
        name: 'Home' 
      },
      {
	      route: 'list',
	      moduleId: './modules/list',
	      name: 'List' 
     }
    ]);
  }
}

