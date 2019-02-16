import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
  function Key(props){
  return (
    <button className='key' onClick={props.onClick}>
    {props.value.key}
    </button>
  );
  }

  function Fret(props){
    let source = require('./frets/' + props.value + '.png');
    return (
        <img className='fret' width='100px' height='auto' src={source} alt={props.value}/>
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
            major: {
              i: 'A',
              iv: 'D',
              v: 'E',
              vi: "Fsm",
            },
            minor: {
              i: 'Am',
              iv: "Dm",
              v: "Em",
              vi: 'F'
            }
          },
          {
            id:1,
            key:'B',
            selected:false,
            major: {
              i: "B",
              iv: 'E',
              v: "Fs",
              vi: "Abm",
            },
            minor: {
              i: "Bm",
              iv: "Em",
              v: "Fsm",
              vi: "G"
            }
          },
          {
            id:2,
            key:'C',
            selected:false,
            major: {
              i: 'C',
              iv: 'F',
              v: 'G',
              vi: 'Am',
            },
            minor: {
              i: "Cm",
              iv: "Fm",
              v: "Gm",
              vi: "Ab"
            }
            
          },
          {
            id:3,
            key:'D',
            selected:false,
            major:{
              i:"D",
              iv:'G',
              v:'A',
              vi:'Bm',
            },
            minor:{
              i:'Dm',
              iv:'Gm',
              v:'Am',
              vi:'Bb',
            }
          },
          {
            id:4,
            key:'E',
            selected:false,
            major:{
              i:'E',
              iv:'A',
              v:'B',
              vi:'Csm'
            },
            minor:{
              i:'Em',
              iv:'Am',
              v:'Bm',
              vi:'C',
            }
          },
          {
            id:5,
            key:'F',
            selected:false,
            major:{
              i:'F',
              iv:'Bb',
              v:'C',
              vi:'Dm',
            },
            minor:{
              i:'Fm',
              iv:'Bbm',
              v:'Cm',
              vi:'Cs',
            }
          },
          {
            id:6,
            key:'G',
            selected:false,
            major:{
              i:'G',
              iv:'C',
              v:'D',
              vi:"Em",
            },
            minor:{
              i:'Gm',
              iv:'Cm',
              v:'Dm',
              vi:'Eb',
            }
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

    getKey(key, number){
      if(this.state.major === true){
        return key.major[number];
      }
      else{
        return key.minor[number];
      }
    }

    renderFrets(i){
      //Return chords
      return (
        <table id='diagram' cellSpacing='0'>
          <tbody>
            <tr id='imgs'>
              <td>
                <Fret value={this.getKey(this.state.keys[i], 'i')}/>
              </td>
              <td>
                <Fret value={this.getKey(this.state.keys[i], 'iv')}/>
              </td>
              <td>
                <Fret value={this.getKey(this.state.keys[i], 'v')}/>
              </td>
              <td>
                <Fret value={this.getKey(this.state.keys[i], 'vi')}/>
              </td>
            </tr>
            <tr id="labels">
              <td>
                i
              </td>
              <td>
                iv
              </td>
              <td>
                v
              </td>
              <td>
                vi
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    renderMajor(major, button){
        if(major === button){
          return;
        }
        else{
          this.setState({major: !this.state.major});
        }
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
        <div className='buttons'>
          <button onClick={ (e) => this.renderMajor(this.state.major, true)}>{this.state.major && 'X'}</button> Major 
          <button onClick={ (e) => this.renderMajor(this.state.major, false)}>{!this.state.major && 'X'}</button> Minor
        </div>
        <div className="keyTable">
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
        listOpen: false,
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

  class SongList extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        sorting: ['name','nameR','i','iv','v','vi'],
        selectedSort: 'name',
        chordOrder: {
          i: 'i - v - vi - iv',
          iv: 'iv - i - v - vi',
          vi: 'vi - iv - v - i',
        },
        listOpen: true,
        songs: [
            {
              title: 'Wake me Up',
              chord: 'iv'
            },
            {
              title: 'Bad Romance',
              chord: 'iv'
            },
            {
              title: 'Pompeii',
              chord: 'vi',
            },
            {
              title: 'Hey Brother',
              chord: 'i'
            }
          ]
      };
    }

    componentDidMount(){
      fetch('')
    }


    toggleList(){
      this.setState({listOpen: !this.state.listOpen});
    }

    toggleOrder(order){
      let list = this.state.songs;
      if(order === 'name'){
        list.sort(function(a,b) {
          var nameA=a.title.toLowerCase(), nameB=b.title.toLowerCase()
          if(nameA < nameB)
            return -1
          if(nameA > nameB)
            return 1
          return 0
        });
        if(this.state.selectedSort === order){
          list = list.reverse()
          this.setState({selectedSort: 'nameR'})
        }
        else{
          this.setState({selectedSort: 'name'})
        }
      }
      else{
        if(this.state.selectedSort === 'i'){
          list.sort(function(a,b){
            var A = a.chord, B = b.chord;
            if(A === 'iv' && B !== 'iv')
              return -1
            if(B === 'iv' && A !== 'iv'){
              return 1
            }
            if(A === 'iv' && B === 'iv'){
              if(A < B) return -1
              if(A > B) return 1
              return 0;
            }
            if(A !== 'iv' && B !== 'iv'){
              if(A < B) return -1
              if(A > B) return 1
              return 0;
            }
            return 0;
          })
          this.setState({selectedSort: 'iv'});
          return;
        }
        if(this.state.selectedSort === 'iv'){
          list.sort(function(a,b){
            var A = a.chord, B = b.chord;
            if(A === 'vi' && B !== 'vi')
              return -1
            if(B === 'vi' && A !== 'vi')
              return 1
            if(A === 'vi' && B === 'vi'){
              if(A > B) return 1
              if(A < B) return -1
              return 0;
            }
            if(A !== 'vi' && B !== 'vi'){
              if(A > B) return 1
              if(A < B) return -1
              return 0;
            }
            return 0;
          })
          this.setState({selectedSort: 'vi'});
          return;
        }
        else{
          list.sort(function(a,b) {
            var nameA=a.chord.toLowerCase(), nameB=b.chord.toLowerCase()
            if(nameA < nameB)
              return -1
            if(nameA > nameB)
              return 1
            return 0
          });
          this.setState({selectedSort:'i'});
        }
      }
      
      this.setState({songs: list})
    }

    render(){
      var list = this.state.songs
      return(
        <table className='song-list'>
          <thead onClick={()=> this.toggleList()}>
            <tr>
              <td>
                <button>Display Playable Songs</button>
              </td>
            </tr>
          </thead>
          {this.state.listOpen &&  <tbody>
            <tr>
              <th onClick={()=> this.toggleOrder('name')}>
                Song Title 
                {this.state.selectedSort === 'name' && <span>  ^</span>}
                {this.state.selectedSort === 'nameR' && <span> v</span>}
              </th>
              <th onClick={()=> this.toggleOrder('chord')}>
                Chord Progression
                {this.state.selectedSort !== 'name' && this.state.selectedSort !== 'nameR' && <span>    {this.state.selectedSort}</span>}
              </th>
            </tr>
            {list.map((item)=> (
              <tr>
                <td className='song-title'>
                  {item.title}
                </td>
                <td className='song-chord'>
                  {this.state.chordOrder[item.chord]}
                </td>
              </tr>
            ))}
          </tbody>}
        </table>

      );
    };
  }



  
  class App extends React.Component {
    render() {
      return (
        <div className="game-info">
            <div><KeyChoice /></div>
            <div><SongList /></div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  