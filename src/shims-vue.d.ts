// This file is used to declare modules for TypeScript.
// It allows TypeScript to understand the types of Vue components and other files.
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}