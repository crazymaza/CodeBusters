import BronzeCup from 'icons/bronze_cup.png'
import GoldCup from 'icons/gold_cup.png'
import SilverCup from 'icons/silver_cup.png'

enum LeaderPlace {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
}

export const getColorForCup = (rating: number) => {
  switch (rating) {
    case LeaderPlace.FIRST:
      return GoldCup
    case LeaderPlace.SECOND:
      return SilverCup
    case LeaderPlace.THIRD:
      return BronzeCup
    default:
      return ''
  }
}
