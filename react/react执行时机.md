# `class` 时代下 component 生命周期


![img.png](../image/react-class-component-maps.png)

## 挂载阶段

### 挂载阶段 1.`constructor`

挂载组件前，第一个执行，组件生命周期阶段只执行一次。

执行`构造函数`将创建组件时期调用，用于创建组件的状态`state`以及接收上层传递的属性`props`。


```tsx

class Com extends React.Component {
  
  // ... 
   
  constructor(props: any) {
    // 需要注意：如果你使用了 constructor 函数，你需要首先调用 super(props) 才能使用this关键字
    super(props);
    
    this.state = {
      // ...创建状态
    }
  }
  
  // ... 
   
  // render() { ...
 
}
```

### 挂载阶段 2.`static getDerivedStateFromProps`

从`props`派生`state`，挂载阶段执行一次，每次更新都在执行。

接收两个参数，一个是当前阶段的 `props` 另外一个是当前阶段的 `state`，用于修改组件的状态，如果无须修改返回 `null`。

```tsx


class Com extends React.Component {

  // ... 
   
  static getDerivedStateFromProps(props, state) {
    if (props.count > 0) {
      return {
        // ...
        name: props.name
      }
    }
    
    return null
  }

   // ... 

   // render() { ...
}
```

### 挂载阶段 3.`componentWillMount`

组件将要挂载阶段，组件生命周期阶段只执行一次。

注意⚠️： 该API 已在React v17.0开始删除。

在这一阶段内设置的状态不会触发组件 `render` 的行为。因为这一阶段是在 `render` 之前触发，不可能会做重新更新的操作。

```tsx


class Com extends React.Component {

  // ... 

  componentWillMount() {
    console.log('componentWillMount')
    
    // 在这里调用 setState 方法， 不会触发额外渲染
    // ...
  }

   // ... 

   // render() { ...
}
```


### 挂载阶段 4.`render`

挂载阶段执行一次，每次重新渲染组件都会执行。

`render()` 方法是唯一必须的钩子函数，它在 `getDerivedStateFromProps` 阶段之后调用，用来更新屏幕视图的UI。

注意⚠️：不要在 render() 方法中改变 state，否则会陷入死循环，导致程序崩溃。

```tsx


class Com extends React.Component {
  
  constructor(props) {
    super(props);
    
    
    this.state = {
      name: 'render'
    }

  }

  render() {
    const { name } = this.state
    
    
    // 不要在这里修改 state 或调用 state
    return <div>{name}</div> // name: render
  }
}
```

如果添加`getDerivedStateFromProps`阶段,挂载阶段时期，`render` 调用之前当前的状态已被`getDerivedStateFromProps`阶段变更。

```tsx


class Com extends React.Component {
  
  constructor(props) {
    super(props);
    
    
    this.state = {
      name: 'render'
    }

  }
  
  static getDerivedStateFromProps(props, state) {
    if (props.count > 0) {
      return {
        ...state,
        name: props.name // 'www'
      }
    }
    
    return null
  }

  render() {
    const { name } = this.state
    
    
    // 不要在这里修改 state 或调用 state
    return <div>{name}</div> // name: www
  }
}
```

### 挂载阶段 5.`componentDidMount`

组件已挂载阶段，组件生命周期阶段只执行一次。

`render` 执行结束，组件被挂载后调用。这里可以用来操作副作用或者其他的诸如数据获取、DOM操作等等。


```tsx


class Com extends React.Component {
  
  constructor(props) {
    super(props);
    
    
    this.state = {
      name: 'render'
    }

  }
  
  componentDidMount() {
    // 操作诸如数据获取、DOM操作等等。
  }

  // render() { ...render
}
```

除了一些副作用的等等操作外， 也可以立即调用 `this.setState` 方法；但这将导致`重新渲染`，因为它启动了`更新阶段`，因为状态已经改变。

在使用 `componentDidMount`阶段时，需要权衡下是否需要在该阶段内调用 `setState`操作状态，因为它可能导致不必要的`重新渲染`。


## 更新阶段

## 卸载阶段

---

# `hooks` 时代下 component “生命周期”
