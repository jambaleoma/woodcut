import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemoryCard } from 'src/app/model/memoryCard.model';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.page.html',
  styleUrls: ['./memory.page.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('flippedState', [
      state('default', style({ transform: 'none' })),
      state('flipped', style({ transform: 'rotateY(-180deg)' })),
      state('matched', style({ transform: 'rotateY(-180deg)' })),
      transition('flipped => default', animate('1500ms ease-out')),
      transition('default => flipped', animate('400ms ease-in')),
      transition('default => matched', animate('800ms ease-in', style({ opacity: 0 })))
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ],
})
export class MemoryPage implements OnInit {
  public state = 'default';
  public cards: MemoryCard[] = [];
  public cardsName: string[] = [
    'AllenKey',
    'enggHammer',
    'nails',
    'nut',
    'saw',
    'screws',
    'toolbox',
    'wingnut',
    'nutBolt',
    'pliers',
    'screwdriver',
    'tapeMeasure',
    'trowel',
    'wrench',
  ];
  public numberOfFlip = 0;
  public firstCardFilpped: MemoryCard;

  constructor(private router: Router) {
    for (const cardname of this.cardsName) {
      const mc: MemoryCard = {
        name: cardname,
        flippable: true,
        state: 'default',
        cardNumber: 1
      };
      const mc2: MemoryCard = {
        name: cardname,
        flippable: true,
        state: 'default',
        cardNumber: 2
      };
      this.cards.push(mc);
      this.cards.push(mc2);
      this.shuffle(this.cards);
    }
  }

  ngOnInit() { }

  resetGame() { }

  navigateTo(direction: string) {
    this.resetGame();
    this.router.navigateByUrl(direction);
  }

  flipCard(card: MemoryCard) {
    this.numberOfFlip++;
    if (card.name === this.firstCardFilpped?.name) {
      card.state = 'matched';
      this.firstCardFilpped.state = 'matched';
      this.firstCardFilpped = null;
      this.numberOfFlip = 0;
      return;
    } else {
      card.state = (card.state === 'default' ? 'flipped' : 'default');
    }
    if (!this.firstCardFilpped) {
      this.firstCardFilpped = card;
    }
    if (this.numberOfFlip == 2) {
      // SET ALL CARDS UNFLIPPABLE
      this.cards.map(c => c.flippable = false);
      setTimeout(() => {
        this.numberOfFlip = 0;
        this.cards.find((c) => (c.name === card.name) && (c.cardNumber === card.cardNumber)).state = 'default';
        this.cards.find((c) => (c.name === this.firstCardFilpped.name) && (c.cardNumber === this.firstCardFilpped.cardNumber)).state = 'default';
        this.firstCardFilpped = null;
      }, 1000);
    }
  }

  shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}
