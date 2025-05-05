import useSWR from "swr";
import Card from "@/component/Card";
import { StyledH1 } from "@/component/StyledHeadings";
import { StyledWrapper } from "@/component/StyledWrapper";
import { StyledLink } from "@/component/StyledLink";

export default function HomePage({ fetcher }) {
  const { data: cards, isLoading, error } = useSWR("/api/cards", fetcher);

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Failed to load cards. Error: {error.message}</div>;

  return (
    <StyledWrapper>
      <StyledH1>All Cards List</StyledH1>
      <StyledLink href={`/collections`}>To Collection List</StyledLink>
      {cards.map((card) => {
        return (
          <Card
            key={card._id}
            question={card.question}
            collectionName={card.collectionId?.title}
            showCollectionName={true}
          ></Card>
        );
      })}
    </StyledWrapper>
  );
}
