import useSWR from 'swr';
import Card from '@/component/Card';
import {StyledH1} from '@/component/StyledHeadings';
import {StyledWrapper} from '@/component/StyledWrapper';
import StyledAlert from '@/component/StyledAlert';
import {useState} from 'react';

export default function HomePage({fetcher}) {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: 'info'
  });
  const {data: cards, isLoading, error, mutate} = useSWR('/api/cards', fetcher);

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Failed to load cards. Error: {error.message}</div>;
  if (cards) return <div>No cards available. Please insert new cards...</div>;

  const handleDelete = async (id) => {
    const response = await fetch(`/api/cards/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setAlert({
        show: true,
        message: 'Card deleted successfully!',
        type: 'success'
      })
      mutate();
    } else {
      setAlert({
        show: true,
        message: 'Could not delete card!',
        type: 'error'
      })
    }
  };
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
        {cards.map((card) => {
          return (
              <Card
                  key={card._id}
                  question={card.question}
                  collectionName={card.collectionId?.title}
                  onDelete={() => handleDelete(card._id)}
              />
          );
        })}
      </StyledWrapper>
  );
}
