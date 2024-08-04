"use client";
import React from "react";
import CourseCard from "../../components/CourseCard";
import { useQuery } from "react-query";
import courses from "../api/courses";

const Products: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await courses(),
    // queryKey: ["products"],
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Sorry There was an Error</div>;

  console.log("Data", data);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container m-auto">
      <div className="grid grid-cols-4 gap-4">
        {data.products.map((course: any) => (
          <CourseCard
            title={course.title}
            author={course.sku}
            duration={course.price}
            level={course.category}
            image={course.images[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
