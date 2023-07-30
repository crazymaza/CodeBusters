export interface ILeaderList {
  rating: string
  avatar: string
  nickname: string
  scores: string
}

export interface IHeaderCell {
  id: keyof ILeaderList
  label: string
}

export interface ITableProps {
  onRequestSort: (property: keyof ILeaderList) => void
  order: Order
  orderBy: string
}

export type Order = 'asc' | 'desc'
