import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-carta-forbice-sasso-spock-lizard',
  templateUrl: './carta-forbice-sasso-spock-lizard.page.html',
  styleUrls: ['./carta-forbice-sasso-spock-lizard.page.scss'],
})
export class CartaForbiceSassoSpockLizardPage {

  userChoice: string;
  pcChoice: string;
  userWins: number;
  pcWins: number;
  resultMessage: string;
  userWin: number;

  constructor(
    private router: Router,
    public accessService: AccessService) {
    this.resetGame();
  }

  resetGame() {
    this.userChoice = '';
    this.pcChoice = '';
    this.userWins = 0;
    this.pcWins = 0;
    this.userWin = 0;
    this.resultMessage = 'GIOCA!';
  }

  navigateTo(direction: string) {
    this.resetGame();
    this.router.navigateByUrl(direction);
  }

  chose(userChoice: string) {
    this.userChoice = userChoice;
    this.randomPcChoice();

    if (this.sameChoice()) {
      this.userWin = 3;
      return;
    }

    if (this.checkIfWon()) {
      this.userWins++;
      this.resultMessage = 'HAI VINTO!';
      this.userWin = 1;
    } else {
      this.pcWins++;
      this.resultMessage = 'HAI PERSO!';
      this.userWin = 2;
    }

  }

  randomPcChoice() {
    switch (this.getRandomInt(5)) {
      case 0:
        this.pcChoice = 'Sasso';
        break;
      case 1:
        this.pcChoice = 'Lizard';
        break;
      case 2:
        this.pcChoice = 'Carta';
        break;
      case 3:
        this.pcChoice = 'Spock';
        break;
      case 4:
        this.pcChoice = 'Forbici';
        break;
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  sameChoice() {
    if (this.pcChoice === this.userChoice) {
      this.resultMessage = 'PAREGGIO';
      return true;
    }
  }

  checkIfWon() {
    if (!this.sameChoice()) {
      if (this.pcChoice === 'Sasso') {
        if (this.userChoice === 'Carta' || this.userChoice === 'Spock') {
          return true;
        } else {
          return false;
        }
      } else if (this.pcChoice === 'Lizard') {
        if (this.userChoice === 'Sasso' || this.userChoice === 'Forbici') {
          return true;
        } else {
          return false;
        }
      } else if (this.pcChoice === 'Carta') {
        if (this.userChoice === 'Lizard' || this.userChoice === 'Forbici') {
          return true;
        } else {
          return false;
        }
      } else if (this.pcChoice === 'Spock') {
        if (this.userChoice === 'Lizard' || this.userChoice === 'Carta') {
          return true;
        } else {
          return false;
        }
      } else if (this.pcChoice === 'Forbici') {
        if (this.userChoice === 'Sasso' || this.userChoice === 'Spock') {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  changeColorPc(pcChoice: string) {
    if (pcChoice === this.pcChoice) {
      if (this.sameChoice()) {
        return 'yellow';
      } else if (!this.checkIfWon()) {
        return 'green';
      } else {
        return 'red';
      }
    } else {
      return 'white';
    }
  }

  changeColorUser(userChoice: string) {
    if (userChoice === this.userChoice) {
      if (this.sameChoice()) {
        return 'yellow';
      } else if (this.checkIfWon()) {
        return 'green';
      } else {
        return 'red';
      }
    } else {
      return 'white';
    }
  }

}
