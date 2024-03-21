export interface LoginModel {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  gender: string;
  image: string;
}

export interface PostResponseModel {
  posts: Array<PostModel>;
  total: number;
  skip: number;
  limit: number;
}

export interface PostModel {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: Array<string>;
  reactions: number;
  isDeleted?: boolean;
  deletedOn?: string;
}
