import React from "react";
import "./Home.scss";
import CategoryTemplate from "../../components/category_template/CategoryTemplate";
import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../utils/httpRequest";
import Additional from "../../components/addditional_features/Additional";
import Topsection from "../../components/topsection/Topsection";
const Home = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      httpRequest.get(`/categories`).then((res) => {
        return res.data;
      }),
  });

  return (
    <>
      <Topsection/>
      <div className="homeContainer">
        {isLoading
          ? "loading the Books...."
          : error
          ? 
            "You have to logged in to see the Books "
          : data.map((category) => (
              <CategoryTemplate key={category._id} card={category} />
            ))}
      </div>
      <Additional />
    </>
  );
};

export default Home;
