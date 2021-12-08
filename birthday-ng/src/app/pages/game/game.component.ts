import { Component, OnInit } from '@angular/core';
import { GameBaloon } from 'src/app/models/baloon.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  baloons: GameBaloon[] = [];

  constructor() { }

  ngOnInit(): void {
    //this.baloons.push(new GameBaloon());
    this.baloons.push({x: 50, y: 50, size: 0, state: 'new'});
  }

  clickBaloon(baloon: GameBaloon) {
    console.log('clickBaloon', baloon.state);
    baloon.state = baloon.state === 'full' ? 'empty' : 'full';
  }

}
