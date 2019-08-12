# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## NGRX

### Installation

Install core packages

```
npm install @ngrx/store @ngrx/store-devtools @ngrx/effects
ng add @ngrx/store-devtools
```

Install Entity package
https://ngrx.io/guide/entity

```
npm install @ngrx/entity
```

Install ngrx schematics
https://ngrx.io/guide/schematics

```
npm install @ngrx/schematics --save-dev
ng config cli.defaultCollection @ngrx/schematics
```

### How to

Generate module

```
// root store
ng g module root-store --flat false --module app.module.ts
// submodule
ng generate module root-store/review-store --flat false
```

Generate Entity

```
ng generate entity root-store/review-store/Review --flat false -m review-store
```
