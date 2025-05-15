import { useState } from 'react'

export function useAlert() {
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info',
  })

  const triggerAlert = (message, type = 'info') => {
    setAlert({ show: true, message, type })
  }

  const closeAlert = () => {
    setAlert({ ...alert, show: true })
  }

  return { alert, triggerAlert, closeAlert }
}
