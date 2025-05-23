import useSWR from 'swr'
import { StyledH1 } from '@/components/StyledH1'
import { StyledWrapper } from '@/components/StyledWrapper'
import StyledAlert from '@/components/StyledAlert'
import Form from '@/components/Form'
import { useAlert } from '@/hooks/useAlert'
import CardList from '@/components/CardList'
import { DeleteCard } from '@/utils/DeleteCard'
import SideMenu from '@/components/SideMenu'
import { useState } from 'react'
import { CreateCard } from '@/utils/CreateCard'
import { getSession } from 'next-auth/react'
import Modal from '@/components/Modal'
import { StatusMessage } from '@/components/StatusMessage'

export default function AllCardsList({ isAuthenticated }) {
  const { data: cards, isLoading, error, mutate } = useSWR('/api/cards')
  const { alert, triggerAlert, closeAlert } = useAlert()
  const [showForm, setShowForm] = useState(false)
  const [editCard, setEditCard] = useState(null)

  if (!isAuthenticated) {
    return null
  }

  const handleDelete = DeleteCard(mutate, triggerAlert)
  const handleSubmit = CreateCard(mutate, () => {
    setShowForm(false), setEditCard(null)
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
    <StatusMessage>Loading</StatusMessage>
  ) : error ? (
    <StatusMessage>Failed to load cards. Error: {error.message}</StatusMessage>
  ) : !cards || cards.length === 0 ? (
    <StatusMessage>No cards available. Please insert new cards...</StatusMessage>
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
      <StyledH1 $variant="norm">All Cards List</StyledH1>
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
        fromAllCardsPage={true}
      />
    </StyledWrapper>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: `/?callbackUrl=${encodeURIComponent(context.resolvedUrl)}`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      isAuthenticated: !!session,
    },
  }
}
