### 环境
1. 项目依赖node环境,需要在开发环境安装node ，相关安装因系统不同而定，请自行google 安装node

### 项目启动

1. npm i 
2. npm start 



##代码规范

1.基本规则
每个文件只包含一个React组件；
但是无状态, 或者 Pure 组件 允许一个文件包含多个组件。eslint: react/no-multi-comp.
始终使用 JSX 语法;
2.不要使用 React.createElement方法，除非初始化 app 的文件不是 JSX 格式。
Class vs React.createClass vs stateless
如果组件拥有内部的 state 或者 refs 的时，更推荐使用 class extends React.Component，除非你有一个非常好的理由要使用 mixin。 eslint: react/prefer-es6-class
// bad
const Listing = React.createClass({
  // ...
  render() {
    return <div>{this.state.hello}</div>;
  }
});

// good
class Listing extends React.Component {
  // ...
  render() {
    return <div>{this.state.hello}</div>;
  }
}

3.命名
扩展名：React 组件使用.js扩展名；
文件名：文件名使用帕斯卡命名。 例如： ReservationCard.jsx。
引用命名：React 组件使用帕斯卡命名，引用实例采用骆驼命名。 eslint: react/jsx-pascal-case
// bad
import reservationCard from './ReservationCard';

// good
import ReservationCard from './ReservationCard';

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
4.组件命名：组件名称应该和文件名一致， 例如： ReservationCard.jsx 应该有一个ReservationCard的引用名称。 但是， 如果是在目录中的组件， 应该使用 index.jsx 作为文件名 并且使用文件夹名称作为组件名：
// bad
import Footer from './Footer/Footer';

// bad
import Footer from './Footer/index';

// good
import Footer from './Footer';
5.声明
不要使用｀displayName｀属性来命名组件，应该使用类的引用名称。
// bad
export default React.createClass({
  displayName: 'ReservationCard',
  // stuff goes here
});

// good
export default class ReservationCard extends React.Component {
}
6.对齐
为 JSX 语法使用下列的对其方式。eslint: react/jsx-closing-bracket-location
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// 如果组件的属性可以放在一行就保持在当前一行中
<Foo bar="bar" />

// 多行属性采用缩进
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Quux />
</Foo>
7.引号
JSX 的属性都采用双引号，其他的 JS 都使用单引号。eslint: jsx-quotes
为什么这样做？JSX 属性 不能包含转义的引号, 所以当输入"don't"这类的缩写的时候用双引号会更方便。
标准的 HTML 属性通常也会使用双引号，所以 JSX 属性也会遵守这样的约定。
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style= />

// good
<Foo style= />
8.空格
终始在自闭合标签前面添加一个空格。
// bad
<Foo/>

// very bad
<Foo                 />

// bad
<Foo
 />

// good
<Foo />
9.属性
属性名称始终使用骆驼命名法。
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>

// good
<Foo
  userName="hello"
  phoneNumber={12345678}
/>
当属性值等于true的时候，省略该属性的赋值。 eslint: react/jsx-boolean-value
// bad
<Foo
  hidden={true}
/>

// good
<Foo
  hidden
/>
10.大括号
用括号包裹多行 JSX 标签。 eslint: react/wrap-multilines
// bad
render() {
  return <MyComponent className="long body" foo="bar">
           <MyChild />
         </MyComponent>;
}

// good
render() {
  return (
    <MyComponent className="long body" foo="bar">
      <MyChild />
    </MyComponent>
  );
}

// good, when single line
render() {
  const body = <div>hello</div>;
  return <MyComponent>{body}</MyComponent>;
}
11.标签
当标签没有子元素时，始终时候自闭合标签。 eslint: react/self-closing-comp
// bad
<Foo className="stuff"></Foo>

// good
<Foo className="stuff" />
如果控件有多行属性，关闭标签要另起一行。 eslint: react/jsx-closing-bracket-location
// bad
<Foo
  bar="bar"
  baz="baz" />

// good
<Foo
  bar="bar"
  baz="baz"
/>
12.方法
在 render 方法中事件的回调函数，应该在构造函数中进行bind绑定。 eslint: react/jsx-no-bind
为什么这样做? 在 render 方法中的 bind 调用每次调用 render 的时候都会创建一个全新的函数。
// bad
class extends React.Component {
  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv.bind(this)} />
  }
}

// good
class extends React.Component {
  constructor(props) {
    super(props);

    this.onClickDiv = this.onClickDiv.bind(this);
  }

  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv} />
  }
}
React 组件的内部方法命名不要使用下划线前缀。
// bad
React.createClass({
  _onClickSubmit() {
    // do stuff
  },

  // other stuff
});

// good
class extends React.Component {
  onClickSubmit() {
    // do stuff
  }

  // other stuff
}
13.排序
class extends React.Component 的顺序：
static静态方法
constructor
getChildContext
componentWillMount
componentDidMount
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate
componentDidUpdate
componentWillUnmount
点击回调或者事件回调 比如 onClickSubmit() 或者 onChangeDescription()
render函数中的 getter 方法 比如 getSelectReason() 或者 getFooterContent()
可选的 render 方法 比如 renderNavigation() 或者 renderProfilePicture()
render

14.isMounted
不要使用 isMounted. eslint: react/no-is-mounted





















