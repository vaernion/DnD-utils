import { Character } from "./Character";
import { AttackResult } from "./Weapon";

type BattleParticipant = "player" | "enemy";

type Initiatives = {
  [k in BattleParticipant]: number;
};

type Hitpoints = {
  [x: string]: number;
};

interface BattleRoundCharacterResult {
  targetId: string;
  initiative: number; // 1-6
  attack: AttackResult;
  otherAction?: null; // placeholder for consumables/abilities/spells
}

type BattleRound = {
  [k in BattleParticipant]: BattleRoundCharacterResult;
} & {
  nr: number;
  actionOrder: [BattleParticipant, BattleParticipant];
  isDone: boolean;
};

export type BattleOutcome = {
  rounds: BattleRound[];
  hitpoints: Hitpoints[];
  winner: BattleParticipant;
};

export class Battle {
  public player;
  public enemy;
  constructor(player: Character, enemy: Character) {
    this.player = player;
    this.enemy = enemy;
  }

  // resolve rounds until a winner is found
  battle(): BattleOutcome {
    const rounds: BattleRound[] = [];
    const hitpoints: Hitpoints[] = [];
    let roundNr = 0;

    let winner: BattleParticipant | null = null;
    const hps: Hitpoints = {
      [this.player.uuid]: this.player.hp,
      [this.enemy.uuid]: this.enemy.hp,
    };

    while (winner === null) {
      const round = this.round();
      round.nr = ++roundNr;
      // iterate battleparticipants in initiative order
      for (const participant of round.actionOrder) {
        const { targetId, initiative, attack, otherAction } =
          round[participant];
        // hit opponent
        if (attack.isHit && attack.damage) {
          hps[targetId] -= attack.damage.sum;
          // opponent died
          if (hps[targetId] <= 0) {
            round.isDone = true;
            winner = participant;
            // prevent dead char from acting
            break;
          }
        }
      }
      rounds.push(round);
      hitpoints.push({ ...hps });
    }
    return {
      rounds,
      hitpoints,
      winner,
    };
  }

  // resolve a battle round
  round(): BattleRound {
    const initiatives = this.rollAllInitiatives();
    const initWinner = this.getInitiativeWinner(initiatives);
    const initLoser = initWinner === "player" ? "enemy" : "player";

    const playerTarget = this.enemy;
    const enemyTarget = this.player;

    const playerAttack = this.player.randomAttack(
      playerTarget.ac,
      playerTarget.isLarge
    );
    const enemyAttack = this.enemy.randomAttack(
      enemyTarget.ac,
      playerTarget.isLarge
    );

    const battleRound: BattleRound = {
      player: {
        targetId: playerTarget.uuid,
        initiative: initiatives.player,
        attack: playerAttack,
        otherAction: null,
      },
      enemy: {
        targetId: enemyTarget.uuid,
        initiative: initiatives.enemy,
        attack: enemyAttack,
        otherAction: null,
      },
      nr: 0,
      actionOrder: [initWinner, initLoser],
      isDone: false,
    };
    return battleRound;
  }

  getInitiativeWinner(initiatives: Initiatives): BattleParticipant {
    // compare dex
    if (initiatives.player === initiatives.enemy) {
      return Math.random() < 0.5 ? "player" : "enemy";
    }

    const winner = initiatives.player > initiatives.enemy ? "player" : "enemy";
    return winner;
  }

  // roll initiatives for all characters in battle
  rollAllInitiatives(): Initiatives {
    const playerInit = this.rollInitiative();
    const enemyInit = this.rollInitiative();

    return {
      player: playerInit,
      enemy: enemyInit,
    };
  }

  // return random number 1-6
  rollInitiative(): number {
    return 1 + Math.floor(Math.random() * 6);
  }
}

let x = Character.newGenericChar();
let y = Character.newGenericChar();

let b = new Battle(x, y);
