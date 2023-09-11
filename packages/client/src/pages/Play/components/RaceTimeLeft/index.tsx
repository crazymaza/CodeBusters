import { useMemo } from 'react'
import { Typography } from '@mui/material'
import { selectTimeLeft } from '@/store/slices/gameSlice/selectors'
import { useAppSelector } from '@/store/typedHooks'

const RaceTimeLeft = () => {
  const timeLeft = useAppSelector(selectTimeLeft)

  const time = useMemo(() => {
    return timeLeft.toFixed(0)
  }, [timeLeft])

  if (timeLeft <= 0) {
    return null
  }

  return (
    <Typography marginTop={2} variant="h4">
      Бензин: {time}
    </Typography>
  )
}

export default RaceTimeLeft
