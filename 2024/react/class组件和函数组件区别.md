# class组件和函数组件区别


## class组件

使用 js es6 class 类语法创建的组件。

```jsx
class ClassCom extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
      return (
          <>
              <div>Class 组件</div>
          </>
      )
      
  }
}
```

## 函数组件

使用 js 函数创建组件


```jsx
function MyHunctionCom() {
    return (
        <>
            <div>函数组件</div>
        </>
    )
}
```

---

# 区别

## 语法结构：

#### **类组件**：

采用 JavaScript ES6版本的 class 类创建组件，创建过程中需基于 React.Component 类继承的方式创建。

#### **函数组件**：

使用 JavaScript 函数式编程等方式创建 React 组件，函数组件接受一个 props 参数作为组件的属性，并在函数内部放回一个 jsx结构。

## 状态管理：

#### **类组件**：

类组件内部通过 state 与 setState 管理组件内部状态。

#### **函数组件**：

函数式组件，没有状态，也称为无状态组件，如果需要在函数内部创建状态时，需要依赖于 React16.8之后 hooks 中的 useState 提供类似类组件的 state / setState 方法。

## 生命周期：

#### **类组件**：

类组件有明确的生命周期函数在各个阶段可以操作。


#### **函数组件**：

函数式组件没有生命周期，不过可以通过 useEffect hooks 模拟类组件生命周期中的已挂载、更新和卸载阶段。

## 性能优化：

#### **类组件**：

类组件通过 shouldComponentUpdate 和 PureComponent 进行内部优化。

#### **函数组件**：

函数式组件可以用 React.memo 对函数进行记忆化。

## 错误处理：

#### **类组件**

类组件内部拥有可以针对自身以及子组件的一个错误处理的方法 componentDidCatch。

#### **函数组件**：

React 在函数式组件内部并没有提供高方法，一般可以采用库或者内部自己 try catch 等方式捕获。

## 引用实例：

#### **类组件**

基于内部 this 的方式，类组件可以通过 this 的方式引用实例。

#### **函数组件**：

需要通用 useRef 的方式

## 高阶组件：

#### **类组件**

高阶组件（HOC）是类组件的常见模式，用于复用组件逻辑。

```tsx
const Hoc = (Component: React.ComponentType<AboutProps>) =>
    class extends React.Component<AboutProps, { count: number }> {
        constructor(props: AboutProps) {
            super(props)

            this.state = {
                count: 0
            }
        }

        componentDidMount() {
            this.setState({
                count: 2
            })
        }

        render() {
            return <Component count={this.state.count} {...this.props} />
        }
    }
```

#### **函数组件**

虽然也可以在函数组件中使用高阶组件，但 Hooks 的引入使得许多以前需要高阶组件的场景变得更加简单。
```jsx

const Hoc = (Component: React.ComponentType<AboutProps>) => (props: AboutProps) => {
    return <Component count={2} {...props} />
}
```

不过没有办法使用状态而已，一般情况下不会在函数式组件内部这么实现，真是场景应该优先考虑 hooks 等方式实现函数式组件的逻辑复用等方式。
