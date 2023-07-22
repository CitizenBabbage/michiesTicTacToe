// this is the master level that manages processes while the game is in progress
// It has both the game itself and the learning algo as children. 
// it also has other components as children, including the game logger. 

import React from 'react';
import { useState } from 'react';
import BoardContainer from "./BoardContainer.js"

import { Button } from 'primereact/button';

//props received: <GameContainer reset = {reset} player = {player} opponent = {opponent}></GameContainer>
export default function GameContainer( props ) {
  
  return (
      <div>
      <BoardContainer reset = {props.reset} player = {props.player} opponent = {props.opponent}></BoardContainer>
      {/* <GameLog/> */}
      </div>
  )
}
