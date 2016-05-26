import './css/reset.css';
import './css/main.css';

import React from 'react';
import ReactDOM from 'react-dom';

import GameScreen from '../components/GameScreen/GameScreen.jsx';

ReactDOM.render(<GameScreen/>, document.getElementById("gamecontainer"));