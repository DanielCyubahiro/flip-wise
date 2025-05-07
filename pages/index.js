import useSWR from "swr";
import Card from "@/component/Card";
import Form from "@/component/Form";
import { StyledH1 } from "@/component/StyledHeadings";
import { StyledWrapper } from "@/component/StyledWrapper";

export default function HomePage({ fetcher }) {
  const { data: cards, isLoading, error } = useSWR("/api/cards", fetcher);

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Failed to load cards. Error: {error.message}</div>;

  return (
    <StyledWrapper>
      <StyledH1>All Cards List</StyledH1>
      <Form></Form>
      {Array.isArray(cards) &&
        cards.map((card) => {
          return (
            <Card
              key={card._id}
              question={card.question}
              collectionName={card.collectionId?.title}
            ></Card>
          );
        })}
    </StyledWrapper>
  );
}
