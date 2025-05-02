import useSWR from "swr";
import Card from "@/component/Card";
import { StyledH1 } from "@/component/StyledHeadings";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function HomePage() {
  const { data: cards, isLoading, error } = useSWR("/api/cards", fetcher);

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Failed to load cards. Error: {error.message}</div>;

  return (
    <>
      <StyledH1>All Cards List</StyledH1>
      <ul>
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              question={card.question}
              collectionTitle={card.collectionId?.title}
            ></Card>
          );
        })}
      </ul>
    </>
  );
}
