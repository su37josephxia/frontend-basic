import React,{ FC } from "react";
import { useQuery } from "./hooks";
interface ResData {
  getBox: {
    width: number;
    balls: { size: number; color: string }[];
  };
}
const query = `
    query {
      getBox {
        width
        balls (color:"red"){
          size
          color
        }
      }
    }`;
export const Home: FC = () => {
  const { data, loading, error } = useQuery<ResData>(query);
  if (loading) return <div>loading</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <h2>{data.getBox.width}</h2>
      <ul>
        {data.getBox.balls.map((n) => (
          <li>
            size:{n.size} color:{n.color}
          </li>
        ))}
      </ul>
    </div>
  );
};
