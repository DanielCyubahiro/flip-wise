import styled from 'styled-components'
import { useState, useEffect } from 'react'

const FormBox = styled.form`
  background-color: var(--color-button-two);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  padding: 32px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
`

const FormText = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`

const FormInput = styled.input`
  font-size: 1.2rem;
  font-weight: 600;
  border: 0;
  color: #333;
`

const FormButton = styled.button`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`

export default function Form({ onSubmit, onReturnClick, showUpdate = false, initialData }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [collection, setCollection] = useState('')
  const [collectionOptions, setCollectionOptions] = useState([])

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question || '')
      setAnswer(initialData.answer || '')
      setCollection(initialData.collectionId || '')
    }
  }, [initialData])

  useEffect(() => {
    async function fetchCollections() {
      try {
        const res = await fetch('/api/collections')
        const data = await res.json()
        setCollectionOptions(data)
      } catch (error) {
        console.error('Error fetching collections', error)
      }
    }

    fetchCollections()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    const newCard = {
      question,
      answer,
      collectionId: collection,
    }

    try {
      await onSubmit(newCard)
      if (!showUpdate) {
        setQuestion('')
        setAnswer('')
        setCollection('')
      }
    } catch (error) {
      console.error('Your card could not be added', error)
    }
  }

  return (
    <FormBox onSubmit={handleSubmit}>
      <FormText htmlFor="question">Question</FormText>
      <FormInput
        required
        id="question"
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <FormText htmlFor="answer">Answer</FormText>
      <FormInput
        required
        id="answer"
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <FormText htmlFor="collection">Collection</FormText>
      <select
        id="collection"
        value={collection}
        onChange={(e) => setCollection(e.target.value)}
        required
      >
        <option value="">Select collection</option>
        {collectionOptions.map((col) => (
          <option key={col._id} value={col._id}>
            {col.title}
          </option>
        ))}
      </select>
      <FormButton type="submit">{showUpdate ? 'Update Card' : 'Add Card'}</FormButton>
      {showUpdate && (
        <FormButton type="button" onClick={onReturnClick}>
          Cancel
        </FormButton>
      )}
    </FormBox>
  )
}
