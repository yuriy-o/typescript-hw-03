class Key {
  constructor(private signature: number = Math.random()) {}

  getSignature() {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  //TODO додав, що метод повертає значення 'Key'
  getKey(): Key {
    return this.key;
  }
}

//TODO замінив 'private' на 'protected'
abstract class House {
  protected tenants: string[] = [];
  door: boolean;
  key: Key;

  constructor(door: boolean, key: Key) {
    this.door = door;
    this.key = key;
  }

  comeIn(person: string) {
    if (this.door) {
      this.tenants.push(person);
    }
  }

  public abstract openDoor(key: Key): void;
}

//TODO замінив 'key === this.key' на => 'key.getSignature() === this.key.getSignature()'
class MyHouse extends House {
  public openDoor(key: Key): void {
    if (!this.door && key.getSignature() === this.key.getSignature()) {
      this.door = true;
    }
  }
}

const key = new Key();

const house = new MyHouse(true, key);
const person = new Person(key);

house.openDoor(person.getKey());

//! тут помилка → Аргумент типу Person не може бути присвоєний параметру типу string
house.comeIn(person);

export {};
