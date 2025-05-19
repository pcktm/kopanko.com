/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly HYGRAPH_ENDPOINT: string;
  readonly HYGRAPH_AUTH_TOKEN: string;
}

declare module "prismjs/components/prism-http" {}
declare module "prismjs/components/prism-shell-session" {}
declare module "prismjs/components/prism-bash" {}
