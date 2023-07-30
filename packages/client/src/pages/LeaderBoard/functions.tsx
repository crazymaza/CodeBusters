import BronzeCup from 'icons/bronze_cup.png'
import GoldCup from 'icons/gold_cup.png'
import SilverCup from 'icons/silver_cup.png'

export const getColorForCup = (rating: number) => {
  switch (rating) {
    case 1:
      return GoldCup
    case 2:
      return SilverCup
    case 3:
      return BronzeCup
    default:
      return ''
  }
}
