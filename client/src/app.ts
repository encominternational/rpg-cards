/// <reference path="./dispatcher/dispatcher.ts"/>
/// <reference path="./stores/store.ts"/>
/// <reference path="./actions/actions.ts"/>
/// <reference path="./views/view.ts"/>
/// <reference path="./views/ui.ts"/>
/// <reference path="./external/page/page.d.ts"/>

/// <reference path="./routes.ts"/>
/// <reference path="./mock.ts"/>

module rpgcards {

    /**
     * An object that holds all global data for our application
     */
    class App {
        public dispatcher: Dispatcher;
        public actions: Actions;
        public store: Store;
        public view: View;
        public container: ()=>HTMLElement;
        
        constructor() {
            this.dispatcher = null;
            this.actions = null;
            this.store = null;
            this.view = null;
            this.container = null;
        }
        
        // Initializes the application
        // Creates and links the global objects
        bootstrap() {
            this.dispatcher = new Dispatcher();
            this.actions = new Actions(this.dispatcher);
            this.store = new Store(this.dispatcher);
            this.view = renderUI;
            this.container = ()=>document.body;

            // Each state change triggers a re-render
            this.store.addChangeListener(() => this.refresh());
             
            // Map URLs to views (triggers an initial action)
            setupRoutes(this.actions);
        }
        
        // Refresh
        refresh() {
            // In this project, views are pure functions that map
            // the application state (Store) to React elements
            React.render(this.view(this.store), this.container());
        }
    }
    

    // All the global data (only accessible from within this file)
    var app: App;
    
    // Access to the global data, to be used from the browser debug window
    export function _debug(): App { return app; }

    // Bootstrap the application
    export function bootstrap() {
        app = new App();
        app.bootstrap();
        
        _mockData();
    }
    
    // Setup some test state
    export function _mockData() {
        setupTestState(app.store, app.actions);
    }


}