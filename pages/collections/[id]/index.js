import { useRouter } from "next/router";
import useSWR from "swr";
import { StyledH1 } from "@/component/StyledHeadings";
import Card from "@/component/Card";
import { StyledWrapper } from "@/component/StyledWrapper";
import { StyledLink } from "@/component/StyledLink";

export default function CollectionDetailPage({ fetcher }) {
  const router = useRouter();
  const { id } = router.query;
  const { data: cards, isLoading, error } = useSWR(`/api/cards/${id}`, fetcher);

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Error loading cards: {error.message}</div>;

  return (
    <StyledWrapper>
      <StyledH1>{cards[0]?.collectionId.title}</StyledH1>
      <StyledLink href={`/collections`}>Back to Collection List</StyledLink>
      {cards.length === 0 ? (
        <p>No Cards</p>
      ) : (
        cards.map((card) => (
          <Card
            key={card._id}
            question={card.question}
            showCollectionName={false}
          ></Card>
        ))
      )}
    </StyledWrapper>
  );
}
