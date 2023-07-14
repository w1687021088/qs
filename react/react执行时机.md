# `class` 时代下 component 生命周期


![img.png](../image/react-class-component-maps.png)

## 挂载阶段

### `constructor`


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

### `static getDerivedStateFromProps`

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

## 更新阶段

## 卸载阶段

---

# `hooks` 时代下 component “生命周期”
