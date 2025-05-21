import { useRouter } from 'next/router'
import useSWR from 'swr'
import { StyledH1 } from '@/components/StyledH1'
import { StyledWrapper } from '@/components/StyledWrapper'
import StyledAlert from '@/components/StyledAlert'
import { useAlert } from '@/hooks/useAlert'
import CardList from '@/components/CardList'
import { DeleteCard } from '@/utils/DeleteCard'
import SideMenu from '@/components/SideMenu'
import Form from '@/components/Form'
import { useState } from 'react'
import { CreateCard } from '@/utils/CreateCard'
import Modal from '@/components/Modal'

export default function CollectionDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const { data: cards, isLoading, error, mutate } = useSWR(id ? `/api/collections/${id}` : null)
  const { alert, triggerAlert, closeAlert } = useAlert()
  const [showForm, setShowForm] = useState(false)
  const [editCard, setEditCard] = useState(null)

  const handleDelete = DeleteCard(mutate, triggerAlert)
  const handleSubmit = CreateCard(mutate, () => {
    setShowForm(false)
    setEditCard(null)
  })

  const handleUpdate = async (updatedCard) => {
    try {
      const response = await fetch(`/api/cards/${editCard._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCard),
      })

      if (!response.ok) throw new Error('Failed to update')

      await mutate()
      setShowForm(false)
      setEditCard(null)
      triggerAlert('Card updated!', 'success')
    } catch (err) {
      triggerAlert('Update failed', 'error')
    }
  }

  const openCreateForm = () => {
    if (showForm && !editCard) {
      setShowForm(false)
    } else {
      setEditCard(null)
      setShowForm(true)
    }
  }

  const openEditForm = (card) => {
    setEditCard(card)
    setShowForm(true)
  }

  return isLoading ? (
    <div>Loading cards...</div>
  ) : error ? (
    <div>Failed to load cards. Error: {error.message}</div>
  ) : !cards || cards.length === 0 ? (
    <div>No cards available. Please insert new cards...</div>
  ) : (
    <StyledWrapper>
      {alert.show && (
        <StyledAlert
          message={alert.message}
          type={alert.type}
          onClose={closeAlert}
          duration={3000}
        />
      )}
      <StyledH1>{cards[0]?.collectionId.title}</StyledH1>
      {showForm && (
        <Modal
          onClose={() => {
            setShowForm(false)
            setEditCard(null)
          }}
        >
          <Form
            showUpdate={!!editCard}
            onSubmit={editCard ? handleUpdate : handleSubmit}
            initialData={editCard}
            onReturnClick={() => {
              setShowForm(false)
              setEditCard(null)
            }}
          />
        </Modal>
      )}
      <SideMenu onCreate={openCreateForm} />
      <CardList
        cards={cards}
        onDelete={handleDelete}
        onEdit={openEditForm}
        fromAllCardsPage={false}
      />
    </StyledWrapper>
  )
}
