## useImperativeHandle
```ts {.line-numbers}
function Child(props,ref){
  const childRef = React.useRef();
  //函数组件自定义暴露给父组件ref对象
  React.useImperativeHandle(ref,()=>({
    focus(){
      childRef.current.focus();
    },
    print(){
      console.log('print');
    }
  }),[]);
  return <input ref={childRef}/>
}

let ForwardChild = React.forwardRef(Child);

function Parent(){
  //let [number,setNumber]=React.useState();
  let inputRef = React.useRef();

  const getFocus = ()=>{
    inputRef.current.focus();
    inputRef.current.print();
  }
  
  return (
    <div>
      <ForwardChild ref={inputRef}/>
      <button onClick={getFocus}>焦点</button>
    </div>
  )
}
```
## forwardRef
```ts {.line-numbers}
function TextInput(props,ref){
  return <input ref={ref}/>
}

const ForwardedTextInput = React.forwardRef(TextInput);

class Form extends React.Component{
  constructor(props){
    super(props);
    this.textInputRef = React.createRef();
  }
  getFormFocus = ()=>{
    //this.textInputRef.current就会指向TextInput类组件的实例
    this.textInputRef.current.focus();
  }
  render(){
    return (
      <div>
        <ForwardedTextInput ref={this.textInputRef}/>
        <button onClick={this.getFormFocus}>获得焦点</button>
      </div>
    )
  }
}

function forwardRef(render){
    return {
        $$typeof:REACT_FORWARD_REF_TYPE,
        render//原来那个函数件
    }
}

function mountForwardComponent(vdom){
    let {type,props,ref} = vdom;
    let renderVdom = type.render(props,ref);
    vdom.oldRenderVdom = renderVdom;
    return createDOM(renderVdom);
}
```