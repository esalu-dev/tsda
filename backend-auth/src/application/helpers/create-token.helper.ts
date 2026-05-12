import { v4 } from 'uuid';

export class CreateTokenHelper {
  static createToken() {
    return v4();
  }
}
