# useTransition


React 的一个 hooks 方法，该方法用于处理需要并发渲染的场景，以及非关键更新；





```jsx
function App() {
    const [tab, setTab] = useState('A')
    return (
        <>
            <Button onClick={() => setTab('A')}>Button A</Button>
            <Button onClick={() => setTab('B')}>Button B</Button>
            <Button onClick={() => setTab('C')}>Button C</Button>
            <Element>
                {tab === 'A' && <ComponentA />}
                {tab === 'B' && <ComponentB />}
                {tab === 'C' && <ComponentC />}
            </Element>
        </>
    )
}
```

ComponentA 和 ComponentC 为普通组件返回一个文本组件。ComponentB 为 阻塞主线程组件。

```jsx
function List() {
  const items = [...Array(100).keys()]
  return (
    <>
      {items.map((item) => (
        <Aou id={item} key={item} />
      ))}
    </>
  )
}

function Aou({ id }: { id: number }) {
  const time = performance.now()

  while (performance.now() - time < 10) {
    // 模拟耗时任务,让主线程暂停10ms
  }
  return <div>B: {id}</div>
}

function ComponentB() {
  console.log('render B')
  return <List />
}
```


