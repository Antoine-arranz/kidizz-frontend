import 'vite/client'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // Add any necessary properties or interfaces here
  const component: DefineComponent<{}, {}, any>
  export default component
}
