Reusable Angular Libraries
===========================

- Rather than copying angular-related code from one project to another, this is a method where you can
    - share the same code among many projects
    - have multiple versions
- Todo: An alternative worthy of greater research is the *monorepo*

## Overall approach: 
- Put the code in npm projects  
    - Use local npm modules, versioned with git-flow
- No need to create a separate angular module(which appears more complicated for obv reasons)
    - you'll import these dependencies in statically and associate them with a 'common' module in your angular project
            
## Creating Package
- [good source](https://www.twilio.com/blog/2017/06/writing-a-node-module-in-typescript.html)
- `mkdir my-package`
- `cd my-package`
- `npm init my-package`
    - choose whatever values are appropriate, don't worry about the `main` field yet
- `git init`
- add dependencies:
    - choose the appropriate versions of tsc, angular, etc.
    - to be compatible with angular 6, here are some suggestions (copied from a CLI-created package.json):
        - npm install typescript --save-dev
        - npm install @angular/core@^6.0.0
        - npm install zone.js@~0.8.26
        - npm install rxjs@^6.0.0
- add code files
    - and a README.md would be nice
    - Folder structure
        - add a top level `src` file
            - inside `src` have an `index.js` that will export all the important objects a consumer might want        
            - add a top-level `.npmignore` with the contents: `lib/` (for starters)
        - Arrange all your code in a `lib` folder (or subdirectories)
- set up typescript
    - If you're using VSCode, the bottom right corner will display the version of typescript that the IDE is using.
    - If you want it to you the TSC version that is specified locally (which makes the most sense), click the version and select the option to use the workspace version
    - start with the following options:
    
    ```(json)
    {
        "compileOnSave": true,
        "compilerOptions": {
            "baseUrl": "./",
            "outDir": "./dist",
            "sourceMap": true,
            "declaration": true,
            "moduleResolution": "node",
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "target": "es5",
            "typeRoots": [
            "node_modules/@types"
            ],
            "lib": [
            "es2017",
            "dom"
            ]
        }
    }
    ```

    - add the following script to the package.json

    ```(json)
    "scripts": {
        "build": "tsc",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    ```

    - test building: `npm run build`
        - output should be in `dist` folder


- Add the following changes (change as appropriate) to the package.json so it can be consumed / published 

```(json)
"main": "dist/index.js",
"types": "dist/index.d.ts",
```

## Consuming the Package (Locally)
- [good source](https://medium.com/@arnaudrinquin/build-modular-application-with-npm-local-modules-dfc5ff047bcc)
- cd to root directory of consumer app and run `npm install --save ./path_to_my/custom_module`
    - to refresh the build:
        - on a mac:
            - `rm -rf node_module/custom_module && npm install`
        - on windows:
            - you **cannot** do: `rm -rf node_module/custom_module` as it is a symlink (which it will follow) and will remove the local repo of the custom module
            - simply recompile the custom module
            - to get the VSCode-embedded instance of Typescript / intellisense to update after a build you can:
                - open the command palette (`ctrl-shift-p`) and run: Restart Typescript Server
                    - You can [easily](https://stackoverflow.com/questions/48387873/visual-studio-code-how-to-add-a-keybinding-for-a-command-palette-entry) set a keybinding in VSCode for this command
- you should be able to import it like any other node package now.
- Note: there are some webpack warnings- i think this might relate to the fact that a symbolic link is being used to link to the local module
    - might be worth testing

### Basic DI Setup
- It's a 2 step process:
    1. Assign the node_module to the (common) angular module
    2. Inject the (common) angular module into the root module.
- Associating with the (common) module:

```(typescript)
//common.module.ts
@NgModule({
    imports: [
        //add the imported angular modules here
    ],
    exports: [        
        //add any exported angular components for this module
    ],
    declarations: [
        //add any components defined in this angular module
    ]
})
export class CommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CommonModule,                     
            providers: [
                LogginsService, //add your service here!
                { provide: AjaxClientService, useClass: JQueryAjaxClientService }, //FYI- this is how you handle a polymorphic DI
            ]
        };
    }
}
```

- Injecting the (common) angular module into the root module:

```(typescript)
//app.module.ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //...
    CommonModule.forRoot(),
    //...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Provider Based DI Setup
- You define a provider when you want your service to be injected polymorphically or if it requires certain values injected to it's constructor.

```(typescript)    
export function logginsServiceFactory() {    
    //use the default provider, LogginsDefaultSvc
    let config = environment.logginsDefaults;

    //polymorphic injection: service contract is interface-based, but 
    //a concrete implementation is injected when using this provider
    return new LogginsDefaultService(config);
};

export let LogginsServiceProvider = {
    provide: LogService,
    useFactory: logginsServiceFactory, 
    deps: [ ]
};
```

- In the common.module.ts, change the provider reference 'LogginsService' to 'LogginsServiceProvider' 