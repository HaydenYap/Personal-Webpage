const digits = [
  {
    value: "zero",
    symbol: "0"
  },
  {
    value: "decimal",
    symbol: "."
  },
  {
    value: "one",
    symbol: 1
  },
  {
    value: "two",
    symbol: "2"
  },
  {
    value: "three",
    symbol: "3"
  },
  {
    value: "four",
    symbol: "4"
  },
  {
    value: "five",
    symbol: "5"
  },
  {
    value: "six",
    symbol: "6"
  },
  {
    value: "seven",
    symbol: "7"
  },
  {
    value: "eight",
    symbol: "8"
  },
  {
    value: "nine",
    symbol: "9"
  }
  ];
  const operations = [
  {
    op: "add",
    symbol: "+"
  },
  {
    op: "subtract",
    symbol: "-"
  },
  {
    op: "multiply",
    symbol: "*"
  },
  {
    op: "divide",
    symbol: "/"
  },
  {
    op: "equals",
    symbol:"="
  },
  {
    op: "clear",
    symbol: "AC"
  }
];

  // Redux
  const CLEAR = 'CLEAR';
  const EQUAL = 'EQUAL'
  const DIGIT = 'DIGIT';
  const OPERATION = 'OPERATION';

  const addSymbol = (symbol) => {
    if (symbol == "AC"){
      return {
        type: CLEAR,
        symbol: symbol
      }
    } else if (symbol == "="){
      return{
        type: EQUAL,
        symbol: symbol
      }
    } else if (digits.some(digit => digit['symbol'] == symbol)){
      return {
        type: DIGIT,
        symbol: symbol
      }
    } else {
      return {
        type: OPERATION,
        symbol: symbol
      }
    }
  };

  const symbolReducer = (state = [[0], {decimal: false, operator: false}], action) => {
    var newState = [...state];
    if (newState[0].length == 1 && newState[0][0] == 0){
      newState[0] = [];
    }
    switch (action.type) {
      case CLEAR:
          newState = [[0],{decimal: false, operator: false}];
          return newState;
      case EQUAL:
          // calculate state
          const plusMinus = (op, index) =>{
            if (op == "+"){
              return parseFloat(newState[0][index-1]) + parseFloat(newState[0][index+1]);
            } else {
              return parseFloat(newState[0][index-1]) - parseFloat(newState[0][index+1]);
            }
          }
          const multDiv = (op, index) =>{
            if (op == "*"){
              return parseFloat(newState[0][index-1]) * parseFloat(newState[0][index+1]);
            }
            if (op == "/"){
              return parseFloat(newState[0][index-1]) / parseFloat(newState[0][index+1]);
            }
          }

          while(newState[0].length != 1){
            if (newState[0].length % 2 == 0){
              console.log("incomplete Equation")
              return state
            }
            if (newState[0][1] == "+" || newState[0][1] == "-"){
              if (newState[0][3] == "*" || newState[0][3] == "/"){
                newState[0].splice(2,3, multDiv(newState[0][3],3).toString())
              } else {
                newState[0].splice(0,3, plusMinus(newState[0][1],1).toString())
              }
            } else {
              newState[0].splice(0,3, multDiv(newState[0][1],1).toString())
            }
          }
          newState[0][0] = parseFloat(newState[0][0]);
          return newState
      case DIGIT:
        if (action.symbol == "."){
          if (newState[1].decimal == false){
            newState[1].decimal = true;
            console.log("Cannot put more than 1 decimal")
          } else {
            return state;
          }
        }
        if (newState[0].length == 0){
          newState[0] = [...newState[0], action.symbol];
        } else {
          newState[0][newState[0].length - 1] = newState[0][newState[0].length - 1] + action.symbol;
        }
        newState[1].operator = true;
        return newState;
      case OPERATION:
          if (newState[1].operator == false){
            console.log("Operator change")
            newState[0].splice(newState[0].length -2,2)
          }
          if (newState[0].length == 0){
            console.log("Error " + action.symbol + " must be after a number.")
          } else {
            newState[0].push(action.symbol);
            newState[0].push("")
          }
          newState[1] = {decimal: false, operator:false}
          return newState;
      default:
        return state;
    }
  };

  const calculator = Redux.createStore(symbolReducer);

  class NumberPad extends React.Component{
    constructor(props){
      super(props);
      this.handleNumClick = this.handleNumClick.bind(this);
    }

    handleNumClick(event){
      this.props.updateSymbol(event.target.value);
    }

    render(){
      const row = (rowContent) =>{
        var elementClass = "padCasing col"
        return rowContent.map(function(digit){
          return(
            <button className="padButton" id={digit.value} key={digit.value} onClick={this.handleNumClick} value={digit.symbol}>{digit.symbol}</button>
          )
        },this);
      }
      const row1 = row(digits.slice(8,11))
      const row2 = row(digits.slice(5,8))
      const row3 = row(digits.slice(2,5))
      const row4 = row(digits.slice(0,2))

      return(
        <div id="numberPad">
          <div className="row">
            {row1}
          </div>
          <div className="row">
            {row2}
          </div>
          <div className="row">
            {row3}
          </div>
          <div className="row">
            {row4}
          </div>
        </div>
      )
    }
  }

  class OperationPad extends React.Component{
    constructor(props){
      super(props);
      this.handleOpClick=this.handleOpClick.bind(this);
    }

    handleOpClick(event){
      this.props.updateSymbol(event.target.value);
    }

    render(){
      const row = (rowContent) =>{
        return rowContent.map(function(op){
          return(
              <button className="padButton" id={op.op} key={op.op} onClick={this.handleOpClick} value={op.symbol}>{op.symbol}</button>
          )
        },this);
      }

      const row1 = row(operations.slice(0,2))
      const row2 = row(operations.slice(2,4))
      const row3 = row(operations.slice(4,6))

      return(
        <div id="operationPad">
          <div className="row">
            <div className="padButton"/>
            {row1}
          </div>
          <div className="row">
            <div className="padButton"/>
            {row2}
          </div>
          <div className="row">
            <div className="padButton"/>
            {row3}
          </div>
        </div>
      )
    }
  }

  class Root extends React.Component{
    constructor(props){
      super(props)
      this.submitSymbol = this.submitSymbol.bind(this);
    }

    submitSymbol(val){
      this.props.submitNewSymbol(val);
    }

    render(){
      console.log(calculator.getState())
      return (
        <div id="calculator" className="container">
          <div className="row">
            <div id="display">{calculator.getState()[0].join("")}</div>
          </div>
          <div className="row">
            <div id="pad">
                <NumberPad updateSymbol={this.submitSymbol}/>
                <OperationPad updateSymbol={this.submitSymbol}/>
            </div>
          </div>
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {symbols: state}
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      submitNewSymbol: (symbol) => {
        dispatch(addSymbol(symbol))
      }
    }
  };

  const Provider = ReactRedux.Provider;
  const connect = ReactRedux.connect;

  const Container = connect(mapStateToProps, mapDispatchToProps)(Root);

  class AppWrapper extends React.Component {
    render() {
      return (
        <Provider store={calculator}>
          <Container/>
        </Provider>
      );
    }
  };

  ReactDOM.render(<AppWrapper />, document.getElementById('root'))
