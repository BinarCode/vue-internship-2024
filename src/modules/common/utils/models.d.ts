export interface LoginModel {
  username: string;
  password: string;
}

interface LoginResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
    gender: string;
    image: string;
  }