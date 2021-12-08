import { Component, Input, OnInit } from '@angular/core';
import { GameBaloon } from 'src/app/models/baloon.model';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TickersService } from 'src/app/services/tickers.service';

@Component({
  selector: '[app-baloon]',
  templateUrl: './baloon.component.svg',
  styleUrls: ['./baloon.component.scss'],
  animations: [
    trigger('baloon', [
      state('new', style({
        transform: 'translate({{x}}px,{{y}}px) scale(0.1)'
      }), {params: new GameBaloon()}),
      state('empty', style({
        transform: 'translate({{x}}px,{{y}}px) scale(0.1)'
      }), {params: new GameBaloon()}),
      state('full', style({
        transform: 'translate({{x}}px,{{y}}px) scale(1)'
      }), {params: new GameBaloon()}),
      transition('* => full', animate('1000ms')),
      transition('* => empty', animate('1000ms')),
    ])
  ],
})
export class BaloonComponent implements OnInit {

  @Input() baloon: GameBaloon;

  constructor(private tickers: TickersService) { }

  ngOnInit(): void {
  }

  baloonDone(event: any) {
    console.log('baloon done', this.baloon.state, event.toState);
    if (this.baloon.state == event.toState && this.baloon.state === 'full') {
      this.baloon.state = 'empty';
    }
  }

  inflating() {
    this.tickers.loop('inflate', 100, () => {
      this.baloon.size = Math.min(10, this.baloon.size +1);
      if (this.baloon.size >= 10) {
        this.tickers.stop('inflate');
        this.deflating();
      }
    });
  }

  deflating() {
    this.tickers.loop('deflate', 100, () => {
      this.baloon.size = Math.max(0, this.baloon.size -1);
      if (this.baloon.size <= 0) {
        this.tickers.stop('deflate');
        this.baloon.state = 'new';
      }
    });
  }

  baloonStart(event: any) {
    if (event.fromState === 'new' && event.toState === 'full') {
      this.inflating();
    }
    //console.log('baloon start', this.baloon.state, event);
  }

  clickBaloon() {
    console.log('clickBaloon!');
    this.tickers.stop('inflate');
    this.tickers.stop('deflate');
  }

}
