import Avatar1 from 'images/avatar1.png'
import Avatar2 from 'images/avatar2.png'
import Avatar3 from 'images/avatar3.png'
import { IHeaderCell, ILeaderList } from './types'

export const leaderList: ILeaderList[] = [
  {
    rating: '1',
    avatar: Avatar1,
    nickname: 'Alex',
    scores: '11213',
  },
  {
    rating: '2',
    nickname: 'Ivan',
    avatar: Avatar2,
    scores: '32323',
  },
  {
    rating: '3',
    nickname: 'Greg',
    avatar: Avatar3,
    scores: '32323',
  },
  {
    rating: '4',
    avatar: Avatar1,
    nickname: 'Alex',
    scores: '11213',
  },
  {
    rating: '5',
    nickname: 'Ivan',
    avatar: Avatar2,
    scores: '32323',
  },
  {
    rating: '6',
    nickname: 'MacQueen',
    avatar: Avatar3,
    scores: '32323',
  },
  {
    rating: '7',
    avatar: Avatar1,
    nickname: 'Alex',
    scores: '11213',
  },
  {
    rating: '8',
    nickname: 'Maria',
    avatar: Avatar2,
    scores: '32323',
  },
  {
    rating: '9',
    nickname: 'Bob',
    avatar: Avatar3,
    scores: '32323',
  },
]

export const headerCells: IHeaderCell[] = [
  {
    id: 'rating',
    label: 'Рейтинг',
  },
  {
    id: 'nickname',
    label: 'Никнейм',
  },
  {
    id: 'scores',
    label: 'Набранные очки',
  },
]
