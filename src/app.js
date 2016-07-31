export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia Weather App';
    config.map([
      { route: ['', 'welcome'], name: 'home',   moduleId: './pages/home/Home', title: 'home'},
      { route: 'details',       name: 'details',moduleId: './pages/details/Details', title: 'details'},
    ]);

    this.router = router;
  }
}
