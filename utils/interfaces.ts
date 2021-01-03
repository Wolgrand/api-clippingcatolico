export interface ErrorResponseType {
  error: string;
}

export interface UserSuccessResponseType {
  _id: string;
  name: string,
  department: string,
  email: string,
  password: string,
  position: number,
  score: number,
  role: 'jogador' | 'pmo',
  rewards: string[],
  criterias: string[],
  achievements: string[]
}
