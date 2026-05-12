export interface ReviewType {
  id: number
  user: {
    username: string
  }
  rating: number
  body: string
  difficulty: number
  wouldTakeAgain: boolean
  learningLevel: number
  createdAt: Date
  published: boolean
  materia: {
    nombre: string
  }
  likes: Array<{
    id: number
  }>
  likedByUser: boolean
  likesCount: number
}
