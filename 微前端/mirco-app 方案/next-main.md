# Next.js 基座方案

接入方案

```ts

function startMicroApp() {
  microApp.start({
    plugins: {
      modules: {
        [micro.vite.name]: [
          {
            loader(code: string) {
              if (process.env.NODE_ENV === 'development') {
                // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
                code = code.replace(/(from|import)(\s*['"])(\/child\/vite\/)/g, all => {
                  return all.replace(micro.vite.base, micro.vite.url + micro.vite.base)
                })
              }

              return code
            }
          }
        ]
      }
    }
  })
}
```

next.js `_app.tsx`

```tsx
  useEffect(() => {
  if (init.current) {
    init.current = false

    // 初始化micro-app
    startMicroApp()
  }
}, [])

```

# Vite + Vue3子应用
