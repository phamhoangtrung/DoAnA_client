interface BaseUser {
  name: string;
  age: number;
  address: string;
  phone: string;
}

interface UserSignin {
  email: string;
  password: string;
}

interface WithSignup {
  confirmPassword?: string;
}

type UserSignup = UserSignin & WithSignup & BaseUser;

interface User {
  _id: string;
  role: 'user' | 'admin' | 'sys-admin';
  totalBuy: number;
  memberShip: number;
  name: string;
  age: string;
  address: string;
  email: string;
  phone: string;
  token?: string;
}

export { UserSignup, UserSignin, User };
