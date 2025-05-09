import useSWR from 'swr';
import Card from '@/component/Card';
import {StyledH1} from '@/component/StyledHeadings';
import {StyledWrapper} from '@/component/StyledWrapper';
import StyledAlert from '@/component/StyledAlert';
import {useState} from 'react';
import Form from '@/component/Form';

export default function AllCardsPage({fetcher}) {
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info',
  });
  const {data: cards, isLoading, error, mutate} = useSWR('/api/cards', fetcher);

  const collections = Array.from(
      new Map(cards?.map(card => card?.collectionId)?.map(item => [item._id, item])).values()
  )

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Failed to load cards. Error: {error.message}</div>;
  if (!cards) return <div>No cards available. Please insert new cards...</div>;

  const handleDelete = async (id) => {
    const response = await fetch(`/api/cards/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setAlert({
        show: true,
        message: 'Card deleted successfully!',
        type: 'success',
      });
      mutate();
    } else {
      setAlert({
        show: true,
        message: 'Could not delete card!',
        type: 'error',
      });
    }
  };

  const handleSubmit = async (newCard) => {

    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        await mutate();
      }

    } catch (error) {
      console.error("Your card could not be added", error);
    }


  }
  return (
      <StyledWrapper>
        {alert.show && (
            <StyledAlert
                message={alert.message}
                type="success"
                onClose={() => setAlert({...alert, show: false})}
                duration={3000}
            />
        )}
        <StyledH1>All Cards List</StyledH1>
        <Form
            collectionsList={collections}
            onSubmit={handleSubmit}
        />
        {cards.map((card) => {
          return (
              <Card
                  key={card._id}
                  question={card.question}
                  answer={card.answer}
                  collectionName={card.collectionId?.title}
                  showCollectionName={true}
                  onDelete={() => handleDelete(card._id)}
              />
          );
        })}
      </StyledWrapper>
  );
}
