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

export interface FeedProps {
  source: string,
  title: string,
  url: string,
  thumbnail: string,
  date_published: string,
  content_html: string,

}

export interface FeedPropsArray {
  feed: FeedProps[],


}
