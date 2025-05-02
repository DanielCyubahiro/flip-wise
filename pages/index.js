import useSWR from "swr";
import Card from "@/component/Card";
import {StyledH1} from "@/component/StyledHeadings";
import {StyledWrapper} from "@/component/StyledWrapper";

export default function HomePage({ fetcher }) {
  const {data: cards, isLoading, error, mutate} = useSWR("/api/cards", fetcher);

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Failed to load cards. Error: {error.message}</div>;
  const handleDelete = async (id) => {
    const response = await fetch(`/api/cards/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      mutate();
    }
  };
  return (
      <StyledWrapper>
        <StyledH1>All Cards List</StyledH1>
        {cards.map((card) => {
          return (
              <Card
                  key={card._id}
                  question={card.question}
                  collectionName={card.collectionId?.title}
                  onDelete={() => handleDelete(card._id)}
              ></Card>
          );
        })}
      </StyledWrapper>
  );
}
