import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var TICK_RATE = 1000;
var OPINION_MAX = 100;
var OPINION_MIN = 0;
var OPINION_START = 50;
var OPINION_START_SPREAD = 20;
// opinion change speed
var MOVE_SPEED = 0.2;
var POPUP_SPEED = 3;
var POPUP_MAX_DISTANCE = 300;

var Opinion = {Love : 75, Neutral : 40, Angry : 5, Fury : 0};

var Scene = {Intro : 1, Game : 2, End : 3};

var PORTRAITS = {"US" : []};

var TEST_NATION_CODES = ["AF", "AX", "AL", "DZ", "AS"];
var TEST_NATION_NAMES = ["AFGHANISTAN", "ÅLAND ISLANDS", "ALBANIA", "ALGERIA", "AMERICAN SAMOA"];
var ALL_NATION_CODES = ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"];
var ALL_NATION_NAMES = ["AFGHANISTAN", "ÅLAND ISLANDS", "ALBANIA", "ALGERIA", "AMERICAN SAMOA", "ANDORRA", "ANGOLA", "ANGUILLA", "ANTARCTICA", "ANTIGUA AND BARBUDA", "ARGENTINA", "ARMENIA", "ARUBA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BERMUDA", "BHUTAN", "BOLIVIA, PLURINATIONAL STATE OF", "BONAIRE, SINT EUSTATIUS AND SABA", "BOSNIA AND HERZEGOVINA", "BOTSWANA", "BOUVET ISLAND", "BRAZIL", "BRITISH INDIAN OCEAN TERRITORY", "BRUNEI DARUSSALAM", "BULGARIA", "BURKINA FASO", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADA", "CAPE VERDE", "CAYMAN ISLANDS", "CENTRAL AFRICAN REPUBLIC", "CHAD", "CHILE", "CHINA", "CHRISTMAS ISLAND", "COCOS (KEELING) ISLANDS", "COLOMBIA", "COMOROS", "CONGO", "CONGO, THE DEMOCRATIC REPUBLIC OF THE", "COOK ISLANDS", "COSTA RICA", "CÔTE D'IVOIRE", "CROATIA", "CUBA", "CURAÇAO", "CYPRUS", "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ERITREA", "ESTONIA", "ETHIOPIA", "FALKLAND ISLANDS (MALVINAS)", "FAROE ISLANDS", "FIJI", "FINLAND", "FRANCE", "FRENCH GUIANA", "FRENCH POLYNESIA", "FRENCH SOUTHERN TERRITORIES", "GABON", "GAMBIA", "GEORGIA", "GERMANY", "GHANA", "GIBRALTAR", "GREECE", "GREENLAND", "GRENADA", "GUADELOUPE", "GUAM", "GUATEMALA", "GUERNSEY", "GUINEA", "GUINEA-BISSAU", "GUYANA", "HAITI", "HEARD ISLAND AND MCDONALD ISLANDS", "HOLY SEE (VATICAN CITY STATE)", "HONDURAS", "HONG KONG", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN, ISLAMIC REPUBLIC OF", "IRAQ", "IRELAND", "ISLE OF MAN", "ISRAEL", "ITALY", "JAMAICA", "JAPAN", "JERSEY", "JORDAN", "KAZAKHSTAN", "KENYA", "KIRIBATI", "KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF", "KOREA, REPUBLIC OF", "KUWAIT", "KYRGYZSTAN", "LAO PEOPLE'S DEMOCRATIC REPUBLIC", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MACAO", "MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MARSHALL ISLANDS", "MARTINIQUE", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MEXICO", "MICRONESIA, FEDERATED STATES OF", "MOLDOVA, REPUBLIC OF", "MONACO", "MONGOLIA", "MONTENEGRO", "MONTSERRAT", "MOROCCO", "MOZAMBIQUE", "MYANMAR", "NAMIBIA", "NAURU", "NEPAL", "NETHERLANDS", "NEW CALEDONIA", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NIUE", "NORFOLK ISLAND", "NORTHERN MARIANA ISLANDS", "NORWAY", "OMAN", "PAKISTAN", "PALAU", "PALESTINE, STATE OF", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "PITCAIRN", "POLAND", "PORTUGAL", "PUERTO RICO", "QATAR", "RÉUNION", "ROMANIA", "RUSSIAN FEDERATION", "RWANDA", "SAINT BARTHÉLEMY", "SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA", "SAINT KITTS AND NEVIS", "SAINT LUCIA", "SAINT MARTIN (FRENCH PART)", "SAINT PIERRE AND MIQUELON", "SAINT VINCENT AND THE GRENADINES", "SAMOA", "SAN MARINO", "SAO TOME AND PRINCIPE", "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SINT MAARTEN (DUTCH PART)", "SLOVAKIA", "SLOVENIA", "SOLOMON ISLANDS", "SOMALIA", "SOUTH AFRICA", "SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS", "SOUTH SUDAN", "SPAIN", "SRI LANKA", "SUDAN", "SURINAME", "SVALBARD AND JAN MAYEN", "SWAZILAND", "SWEDEN", "SWITZERLAND", "SYRIAN ARAB REPUBLIC", "TAIWAN, PROVINCE OF CHINA", "TAJIKISTAN", "TANZANIA, UNITED REPUBLIC OF", "THAILAND", "TIMOR-LESTE", "TOGO", "TOKELAU", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TURKS AND CAICOS ISLANDS", "TUVALU", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES", "UNITED STATES MINOR OUTLYING ISLANDS", "URUGUAY", "UZBEKISTAN", "VANUATU", "VENEZUELA, BOLIVARIAN REPUBLIC OF", "VIET NAM", "VIRGIN ISLANDS, BRITISH", "VIRGIN ISLANDS, U.S.", "WALLIS AND FUTUNA", "WESTERN SAHARA", "YEMEN", "ZAMBIA", "ZIMBABWE"];

var Status = {"Alive" : 1, "Dead" : 2, "Dying" : 3};
Object.freeze(Status);

function rand_int (i)
{
  return Math.floor(Math.random () * i);
}

function screen_w ()
{
  return window.innerWidth - 20;
}

function screen_h ()
{
  // - topbar height
  return window.innerHeight - 200;
}

function dice_x (sides, func)
{
  let rand = rand_int(sides);
  
  if (rand == 0)
  {
    func();
  }
}

const GameContext = React.createContext({});

class Popup extends React.Component
{
  constructor (props)
  {
    super(props);
  }
  
  render ()
  {
    let popup = this.props.value;
    let y = popup.y;
    let x = popup.x;
    let style = {bottom: y, left: x};
    
    return (
      <p className="popup" style={style}>{popup.msg}</p>
    );
  }
}

class PopupHandler extends React.Component
{
  constructor (props)
  {
    super(props);
  }
  
  render ()
  {
    let state = this.context;
    let pops = state.popups;
    let result = [];
    
    for (var i = 0; i < pops.length; i ++)
    {
      result.push(<Popup value={pops[i]} key={i} />);
    }
    
    return (<div className="popup-holder">{result}</div>);
  }
}
PopupHandler.contextType = GameContext;

class Flag extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      
    };
  }
  
  render() {
    // this is our nation index/ id
    const i = this.props.value;
//    let state = this.context;
    const code = ALL_NATION_CODES[i]; 
    const name = ALL_NATION_NAMES[i];
    const url = "flags/" + code.toString().toLowerCase() + ".png";
    let player = this.props.player_nation;
    let opinion = this.props.opinion;
    let x = this.props.x;
    let y = this.props.y;
    let style = {/*background: color,*/
                left: x,
                top: y,
                position: "absolute"};
    
    return (
        <div style={style}>
            <button className="flag-bg" onClick={() => {this.props.select_nation(i);}}>
            <img src={url} />
            </button>
            <img className="emotion" src="emotes/icon_lol.png" />
        </div>
    );
  }
}
Flag.contextType = GameContext;

class Title extends React.Component {
  render () {
    return(
      <p></p>);
  }
}
Title.contextType = GameContext;

class Board extends React.Component {
  constructor () {
    super();
    this.state = {
    };
  }
  
  render() {
    const rows = [];
    let status = this.props.nation_status;
    
    let codes = ALL_NATION_CODES;
    let num = codes.length;

    // scale positions to cover whole screen
    let flag_w = 50;
    let flag_h = 50;
    let x_num = Math.floor(screen_w() / flag_w);
//    let = screen_h() / OPINION_MAX;
    
    for (var i = 0; i < num; i ++)
    {
      if (status[i] == Status.Dead)
      {
        continue;
      }

      let player = this.props.player;
      let opinion = this.props.opinions[i][player];
      let x = Math.floor(i % x_num) * flag_w; 
      let y = Math.floor(i / x_num) * 40;
      
      rows.push(<Flag select_nation={this.props.select_nation} 
                      player_nation={player}
                      x={x} y={y} value={i} key={i} />);
    }
    
    return (
      <div style={{position: "relative", top: "20px"}}>
        {rows}
      </div>
    );
  }
}
Board.contextType = GameContext;

class GameScreen extends React.Component {
  constructor () {
    super();
      this.state = {
        nation_status: [],
        nation_heads : [],
        nation_opinions : [],
//        nation_codes : TEST_NATION_CODES,
//        nation_names : TEST_NATION_NAMES,
        nation_codes : ALL_NATION_CODES,
        nation_names : ALL_NATION_NAMES,
        selected_nation : 0,
        player_nation : 0,
        // other nations' indices, sorted by opinion of player
        nations_sorted : [],
        popups: [],
        
        // methods
        get_mood_level : this.get_mood_level,
        get_opinion : this.get_opinion,
      };
    
    this.setup();
    setTimeout(() => {this.tick()}, TICK_RATE);
  }
  
  tick ()
  {
    this.decay_opinions();
    this.move_popups();
    this.setState({});
    
    setTimeout(() => {this.tick()}, TICK_RATE);
  }
  
  // Increase/ decrease opinion based on time passed
  decay_opinions ()
  {
    let opinions = this.state.nation_opinions;
    let num = opinions.length;
    
    for (var i = 0; i < num; i ++)
      {
        for (var j = 0; j < num; j ++)
          {
            this.add_opinion(i, j, (rand_int(3) - 1) * MOVE_SPEED);
          }
      }
    
    // sort opinions TODO don't do this every tick
    this.state.nations_sorted = [];
    let player = this.state.player_nation;
    
    for (var i = 0; i < num; i ++)
    {
      this.state.nations_sorted.push(i);
    }
    
    this.state.nations_sorted.sort((a, b) => 
     {
      var opinion_a = this.get_mood_level(a);
      var opinion_b = this.get_mood_level(b);
      
      return opinion_a - opinion_b;
    });
  }
  
  move_popups ()
  {
    let popups = this.state.popups;
    
    for (var i = 0; i < popups.length; i ++)
    {
      let pop = popups[i];
      pop.y += POPUP_SPEED;
      
      if (pop.y > POPUP_MAX_DISTANCE)
        {
          popups.splice(i, 1);
        }
    }
    
    this.setState({popups: popups});
  }

  /*
   * SETUP
   */
  setup ()
  {
    var num = this.state.nation_codes.length;
    var status = [];
    
    for (var i = 0; i < num; i ++)
    {
      this.state.nation_status[i] = Status.Alive;
    }
    
    this.setup_opinions();
  }
  
  setup_opinions ()
  {
    // TODO does JS have references? i always forget
    let opinions = [];
    let num = this.state.nation_codes.length;
    
    for (var i = 0; i < num; i ++)
      {
        opinions.push([]);
        for (var j = 0; j < num; j ++)
          {
            opinions[i].push(OPINION_START + rand_int(OPINION_START_SPREAD) - OPINION_START_SPREAD / 2);
          }
      }
    
    this.state.nation_opinions = opinions;
  }
  
  // x's opinion of y
  get_opinion = (nation_x, nation_y) => 
  {
    return this.state.nation_opinions[nation_x][nation_y];
  }
  
  // return their mood (0, 1, 2, 3) in regards to the player
  get_mood_level = (nation) =>
  {
    let player = this.state.player_nation;
    let op = this.state.nation_opinions[nation][player];
    let mood = 3;
    
    if (op < 35) mood = 2;
    if (op < 15) mood = 1;
    if (op <= 1) mood = 0;
    
    return mood;
  }
  
  set_opinion = (nation_x, nation_y, opinion) =>
  {
    // no opinion about self
    if (nation_x == nation_y) return;
    // don't set player's opinions
    if (nation_x == this.state.player_nation) return;
    
    if (opinion > OPINION_MAX) opinion = OPINION_MAX;
    if (opinion < OPINION_MIN) opinion = OPINION_MIN;
    
    this.state.nation_opinions[nation_x][nation_y] = opinion;
  }
  
  add_opinion = (nation_x, nation_y, amount) =>
  {
    let opinion = this.state.nation_opinions[nation_x][nation_y];
    this.set_opinion(nation_x, nation_y,
                     opinion + amount)
    this.opinion_event(nation_x, nation_y, amount);
  }
  
  // add amount opinion to all nations
  add_opinion_all = (nation, amount) =>
  {
    let opinions = this.state.nation_opinions;
    let num = opinions.length;
    
    for (var i = 0; i < num; i ++)
    {
      this.add_opinion(i, nation, amount);
    }
  }
  
  get_opinion_text = (nation_x, nation_y) =>
  {
    let op = this.state.nation_opinions[nation_x][nation_y];
    let msg = "loves you."
    
    if (op < Opinion.Love)
    {
      msg = "is neutral towards you."
    }
    
    if (op < Opinion.Neutral)
    {
      msg = "is angry with you!"
    }
    
    if (op < Opinion.Hatred)
    {
      msg = "is FURIOUS WITH YOU!!!"
    }
    
    return msg;
  }
  
  get_nation_name = (id) =>
  {
    return this.state.nation_names[id];
  }
  
  /*
   * EVENTS
   */
  opinion_event = (nation_x, nation_y, opinion) =>
  {
    if (opinion == 0)
    {
//        alert("NUKE!!!");
    }
  }
  
  select_nation = (nation) => {
    this.setState({selected_nation : nation});
  }
  
  /*
   *
   */
  show_popup = (msg) =>
  {
    let popups = this.state.popups;
    popups.push({msg: msg, x: rand_int(screen_w()), y: 0});
  }
  
  /*
   * TOOLS
   */
  tool_bribe = (nation_x, nation_y) =>
  {
    // a leader knows if they are being bribed
    this.add_opinion(nation_y, nation_x, 5);
    this.add_opinion(nation_y, nation_y, -2);
    
    dice_x(30, () => {
      this.add_opinion_all(nation_x, -1);
      this.show_popup("Bribery uncovered!");
    });
  }
  
  tool_extort = (nation_x, nation_y) =>
  {
    // a leader knows if they are being extorted
    this.add_opinion(nation_y, nation_x, -5);
    
    dice_x(10, () => {
      this.add_opinion_all(nation_x, -2);
      this.show_popup("Extortion uncovered!");
    });
  }
  
  tool_assassinate = (nation_x, nation_y) =>
  {
//    this.add_opinion(nation_y, nation_x, -15);
    
    dice_x(5, () => {
      this.add_opinion_all(nation_x, -7);
      this.show_popup("Assasination attempt discovered!");
//      alert("you were found out!");
    });
  }
  
  tool_nuke = (nation_x, nation_y) =>
  {
    this.add_opinion(nation_y, nation_x, -50);
    
    let name_x = this.get_nation_name(nation_x);
    let name_y = this.get_nation_name(nation_y);
    this.show_popup(name_y+" has been obliterated by "+name_x);
    
    this.remove_nation(nation_y);
    
    dice_x(2, () => {
      this.add_opinion_all(nation_x, -15);
      this.show_popup("Nuclear launch detected!!!");
//      alert("you were found out!");
    });
  }
  
  /*
   *
   */
  remove_nation (id)
  {
    let status = this.state.nation_status;
    status[id] = Status.Dead;
    this.setState({nation_status : status});
    
    if (id == this.state.player_nation)
    {
      this.game_over();
    }
  }

  /*
   *
   */
  game_over ()
  {
      this.props.end_game();
  }

  is_player_alive ()
  {
    return (this.state.nation_status[this.state.player_nation] == Status.Alive)
  }
  
  render() {
    let selected = this.state.selected_nation;
    let names = this.state.nation_names;
    let us = this.state.player_nation;
    let mood_text = this.get_opinion_text(selected, us);
    
    return (
      <GameContext.Provider value={this.state}>
        <PopupHandler />
        
        <div className="game">
          <div className="topbar">
            <button onClick={() => {this.tool_extort(us, selected);}} className="tool-butt" id="tool-extort">
              <p>Extort</p>
            </button>
            
            <button onClick={() => {this.tool_bribe(us, selected);}} className="tool-butt" id="tool-bribe">
              <p>Bribe</p>
            </button>
            
            <button onClick={() => {this.tool_assassinate(us, selected);}} className="tool-butt" id="tool-assassinate">
              <p>Assassinate</p>
            </button>
            
            <button onClick={() => {this.tool_nuke(us, selected);}} className="tool-butt" id="tool-nuke">
              <p>Nuke</p>
            </button>
            
            <img className="portrait" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Donald_Trump_official_portrait_(cropped).jpg/174px-Donald_Trump_official_portrait_(cropped).jpg"/>
            <img className="enemy-portrait" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Donald_Trump_official_portrait_(cropped).jpg/174px-Donald_Trump_official_portrait_(cropped).jpg"/>
            
            <p className="title">{names[us]}</p>
            <p className="enemy-title">{names[selected]}</p>
            <p id="enemy-opinion">OPINION = {Math.floor(this.get_opinion(selected, us))}</p>
            <p id="enemy-mood">(Trump) {mood_text}</p>
          </div>
          <div className="game-board">
            <Board select_nation={this.select_nation} nation_status={this.state.nation_status} opinions={this.state.nation_opinions} player={this.state.player_nation} />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
        </GameContext.Provider>
    );
  }
}

class FlagPicker extends React.Component
{
  constructor ()
  {
    super();
  }
 
  select_flag = (nation) =>
  {
    this.props.start_game(nation);
  }

  render ()
  {
    let num_nations = ALL_NATION_NAMES.length;
    let alive_status = [];
    let flags = [];
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    let time = (new Date()).getTime() / 10000;

    for (var i = 0; i < num_nations; i ++)
    {
        let t = time + i - i / 2;
        let amp = i + 200;
        let x = mx + Math.cos(t / Math.PI) * amp;
        let y = my + Math.sin(t / Math.PI) * amp * 0.7;

        flags.push(<Flag select_nation={this.select_flag} x={x} y={y} 
                        player_nation={-1} value={i} key={i}/>);
        alive_status.push(Status.Alive);
    }

    let text_style = {left: mx, top: my};

    return(
        <div>
            <div id="intro-text-holder" style={text_style}>
                <h3 id="intro-text">CHOOSE YOUR NATION</h3>
                <h5 id="intro-text">THE LAST NATION STANDING WINS</h5>
                <p id="intro-text">AVOID ANNIHILATION BY MAINTAINING YOUR REPUTATION WITH THE OTHER WORLD LEADERS</p>
            </div>
            {flags}
        </div>);
  }
}

class IntroScreen extends React.Component
{
  constructor ()
  {
    super();
  }
  
  render ()
  {
    return(<div><FlagPicker start_game={this.props.start_game}/></div>);
  }
}

class EndScreen extends React.Component
{
  constructor ()
  {
    super();
  }
  
  render ()
  {
    return(<div><p>your foolishness has led to the destruction of your entire country. do you want to try again?</p>
        <button onClick={this.props.start_over}>YES! FOR GLORY!</button></div>);
  }
}

class Main extends React.Component
{
  constructor ()
  {
    super();
    
    this.state =
    {
        scene: Scene.Intro
    };

    setTimeout(() => {
        this.animate();
    }, 100);
  }
  
  set_scene = (scene) =>
  {
    this.setState({scene: scene});
  }
  
  start_game = (nation) =>
  {
    this.set_scene(Scene.Game);
  }

  end_game = () =>
  {
    this.set_scene(Scene.End);
  }

  start_over = () =>
  {
    this.set_scene(Scene.Intro);
  }

  animate ()
  {
    this.setState({});

    setTimeout(() => {
        this.animate();
    }, 100);
  }
  
  render ()
  {
    let scene = this.state.scene;
    let result = Scene.Intro;
   
    if (scene == Scene.Intro)
    {
        result = <IntroScreen start_game={this.start_game} />;
    
    } else if (scene == Scene.Game)
    {
        result = <GameScreen end_game={this.end_game}/>;
    
    } else if (scene == Scene.End)
    {
        result = <EndScreen start_over={this.start_over}/>;
    }
  
    return(
        <div>{result} </div>);
  }
}

// ========================================

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

