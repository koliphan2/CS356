import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Key(props){
  return (
    <button className='key' onClick={props.onClick}>
    {props.value}
    </button>
  );
}

  function Fret(props){
    return (
        <img className='fret' src={"/src/frets/" + props.value + '.jpg'} alt={props.value}/>
    );
  }

  class KeyChoice extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        key: 0,
        major: true,
        keys: [
          {
            id:0,
            key:'A',
            selected:true,
          },
          {
            id:1,
            key:'B',
            selected:false,
          },
          {
            id:2,
            key:'C',
            selected:false,
          },
          {
            id:3,
            key:'D',
            selected:false,
          },
          {
            id:4,
            key:'E',
            selected:false,
          },
          {
            id:5,
            key:'F',
            selected:false,
          },
          {
            id:6,
            key:'G',
            selected:false,
          },
        ],
      };
    }

    renderKey(){
      return (
        <Key 
          value={this.state.keys[this.state.key].key}
          onClick={() => this.handleKeyChange()}
        />
      );
    }

    renderFrets(i){
      //Get other chords
      let iv = parseInt(i) + 3;
      let v = parseInt(i) + 4;
      let vi = parseInt(i) + 5;
      if(iv > 6) iv -= 7;
      if(v > 6) v -= 7;
      if(vi > 6) vi -= 7;

      //Return chords
      return (
        <div>
          <Fret value={this.state.keys[i].key}/>
          <Fret value={this.state.keys[iv].key}/>
          <Fret value={this.state.keys[v].key}/>
          <Fret value={this.state.keys[vi].key}/>
        </div>
      );
    }

    renderMajor(){
        this.setState({major: !this.state.major});
     }

    getMajor(){
      if(this.state.major === true) return 'Major';
      else return 'Minor';
    }

    renderDropDown(){
      return (
        <DropDown 
          title = {this.state.keys[this.state.key].key}
          list = {this.state.keys} 
          toggleItem = {this.toggleKeyChange.bind(this)}
        />
      )
    }

    toggleKeyChange(id){
        let temp = this.state.keys;
        for ( let i = 0; i < temp.length; i++) {
          temp[i].selected = false;
        }
        temp[id].selected = true;
        this.setState({keys: temp});
        this.setState({key:temp[id].id});
        return temp[id].key
    }

    render() {
      return (
      <div>
        <div>{this.renderDropDown()}</div>
        <div onClick={ () => this.renderMajor()}>{this.getMajor()}</div>
        <div className="status">
          {this.renderFrets(this.state.key)}
        </div>
        </div>
      );
    }
  }


  class DropDown extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        listOpen: true,
        title: this.props.title,
      };
    }

    handleClickOutside(){
      this.setState({
        listOpen:false
      });
    }

    toggleList(){
      this.setState({listOpen: !this.state.listOpen});
    }

    changeKey(id){
      this.handleClickOutside();
      let newTitle = this.props.toggleItem(id)
      this.setState({title:newTitle})
     }

    render(){
      const{list} = this.props
      const{listOpen, title} = this.state
      return(
        <div className="dd-wrapper">
          <div className='dd-header'>
            <button className="dd-header" onClick={()=> this.toggleList()}>{title}</button>
          </div>
          {listOpen && <ul className='dd-list'>
            {list.map((item)=> (
              <button className="dd-list-item" key={item.id} onClick={()=> this.changeKey(item.id)}>{item.key} {item.selected && <span className='selected'/>}</button>
              ))}
          </ul>}
        </div>
      );
    }
  }

  

 /* class Diagram extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            frets: Array(4).fill(null),
          };
    }

    handleClick(i){
      const squares = this.state.squares.slice();
      squares[i] = 'X';
      this.setState({squares: squares});
    }

    renderSquare(i) {
      return (
      <Square 
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
      />
      );
    }


  }
    */
  
    

  
  class App extends React.Component {
    render() {
      return (
        <div className="game">
        <div className="game-info">
            <div><KeyChoice /></div>
            <ol>{/* TODO */}</ol>
          </div>
          
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  