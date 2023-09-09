import { Typography } from '@mui/material'
import { selectGameScores } from '@/store/slices/gameSlice/selectors'
import { useAppSelector } from '@/store/typedHooks'

const PlayerScores = () => {
  const scores = useAppSelector(selectGameScores)

  return (
    <Typography marginTop={2} variant="h4">
      Очки: {scores}
    </Typography>
  )
}

export default PlayerScores
