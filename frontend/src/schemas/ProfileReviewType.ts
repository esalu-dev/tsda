export interface ProfileReviewType {
  id: number
  user: {
    username: string
  }
  teacher: {
    shortname: string
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string
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
