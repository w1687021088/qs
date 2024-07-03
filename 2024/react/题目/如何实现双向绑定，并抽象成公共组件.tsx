interface InputComponentProps {
  value: string
  onChange: (value: string) => void
}

// 接收外部的 value 属性， 以及可以更改 value 的方法
function InputComponent({ value, onChange }: InputComponentProps) {
  return <input value={value} onChange={(event) => onChange(event.target.value) }/>
}

export default InputComponent
