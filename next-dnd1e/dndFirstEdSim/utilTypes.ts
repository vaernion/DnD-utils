export interface FixedLengthArray<L extends number, T> extends ArrayLike<T> {
  length: L;
}

export interface AttackResult {
  targetAc: number;
  toHitNeeded: number;
  roll: number;
  attack: number;
  isHit: boolean;
  isCrit: boolean;
  damage: number;
}
