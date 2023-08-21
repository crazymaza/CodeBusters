export interface ILeaderList {
  rating: string
  avatar: string
  nickname: string
  scores: string
  country: string
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

export enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc',
}

export type Order = `${OrderTypes}`
