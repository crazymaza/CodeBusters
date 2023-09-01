import { useEffect } from 'react'

interface NotificationParams {
  title: string
  icon: string
  body: string
  image?: string
}

const useNotification = () => {
  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('Browser does not support desktop notification')
    } else {
      if (Notification.permission !== 'denied') {
        Notification.requestPermission()
      }
    }
  }, [])

  const showNotification = (props: NotificationParams) => {
    const { title, ...restParams } = props

    if (Notification.permission === 'granted') {
      new Notification(title, restParams)
    }
  }

  return showNotification
}

export default useNotification
