export class HashedPassword {
  id: bigint;
  hash: string;

  constructor(id: bigint, hash: string) {
    this.id = id;
    this.hash = hash;
  }
}
