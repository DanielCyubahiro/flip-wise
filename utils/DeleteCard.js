export function DeleteCard(mutate, triggerAlert) {
  return async (id) => {
    try {
      const response = await fetch(`/api/cards/${id}`, { method: 'DELETE' })
      if (response.ok) {
        triggerAlert('Card deleted successfully!', 'success')
        mutate()
      } else {
        triggerAlert('Could not delete card!', 'error')
      }
    } catch (err) {
      triggerAlert('An unexpected error occurred.', 'error')
    }
  }
}
