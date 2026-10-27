export type Lot = {
  name: string
  id: string
  bets: Bet[]
  color: string
}

export type Member = {
  name: string
  id: string
}

export type Bet = {
  memberId: string
  value: number | undefined
}