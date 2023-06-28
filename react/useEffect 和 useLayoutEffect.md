#  `useEffect`
#### `useEffect` `React` 副作用函数，用于在组件渲染之后`异步执行`某些操作，同时在当前组件初始，更新，卸载处理不同的逻辑。

```tsx
function App() {
  const [count, setCount] = useState(0)
  
  useEffect(() =>{
    
    console.log('useEffect副作用执行')
    
    document.title = `useEffect: ${count}`
    
  }, [count])
  
  return (
    <>
      <Button onClick={() => setCount(c => c + 1)}>按钮</Button>
    </>
  )
}

```

#  `useLayoutEffect`

####  `React` 中用于处理副作用，用法和作用与 `useEffect` 一样，区别在于 `useLayoutEffect` 是在组件渲染之后同步执行的，它会阻塞组件的渲染过程，直到副作用函数执行完毕

---

###  `useEffect` 和 `useLayoutEffect` 的区别

#### 使用 `useEffect` 时，副作用函数会在浏览器绘制之后异步执行。这意味着在执行副作用函数之前，浏览器可能已经对屏幕进行了绘制，用户可能已经看到了更新后的界面。

#### 然而，有些情况下，我们希望在浏览器绘制之前立即执行副作用函数，以确保对界面的更新可以立即生效。这就是 `useLayoutEffect` 的作用。

### `useEffect` 和 `useLayoutEffect` 的区别在于执行时机。`useEffect` 是在组件渲染之后`异步执行`的，不会阻塞页面渲染，而 `useLayoutEffect` 是在组件渲染之后`同步执行`的，会阻塞页面渲染。在大多数情况下，推荐使用 `useEffect`，只有在需要在页面渲染之前同步执行副作用函数时才使用 `useLayoutEffect`


