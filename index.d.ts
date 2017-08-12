import * as feathers from 'feathers';

declare module 'feathers' {
  interface Application {
    hooks(hooks: hooks.HooksObject): Application;
  }

  interface Service<T> {
    before(hooks: hooks.HookMap): Application;
    after(hooks: hooks.HookMap): Application;
    hooks(hooks: hooks.HooksObject): Application;
  }
}

declare function hooks(): () => void;

declare namespace hooks {
  interface Hook {
    <T>(hook: HookProps<T>): Promise<any> | void;
  }

  interface HookProps<T = any, S = T> {
    readonly app?: feathers.Application;
    readonly service?: feathers.Service<S>;
    readonly path?: string;
    readonly method?: 'find' | 'get' | 'create' | 'update' | 'patch' | 'remove';
    readonly type?: 'before' | 'after' | 'error';
    params?: any;
    id?: any;
    data?: T;
    result?: T;
  }

  interface HookMap {
    all?: Hook | Hook[];
    find?: Hook | Hook[];
    get?: Hook | Hook[];
    create?: Hook | Hook[];
    update?: Hook | Hook[];
    patch?: Hook | Hook[];
    remove?: Hook | Hook[];
  }

  interface HooksObject {
    before?: HookMap;
    after?: HookMap;
    error?: HookMap;
  }
}

export = hooks;
