export function CreateCard(mutate, setShowForm) {
  return async (newCard) => {
    try {
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      })

      if (response.ok) {
        const createdCard = await response.json()
        await mutate((currentCards) => [createdCard, ...currentCards], false)
        setShowForm(false)
      }
    } catch (error) {
      console.error('Your card could not be added', error)
    }
  }
}
