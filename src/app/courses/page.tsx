"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import { useQuery } from "react-query";
import courses from "../api/courses";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Course } from "@/types";

const schema = yup
  .object({
    search: yup.string().required("Search term is required"),
  })
  .required();

const Courses: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await courses(),
  });

  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchCount, setSearchCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: { search: string }) => {
    if (data?.products) {
      const filtered = data.products.filter((course: Course) =>
        course.title.toLowerCase().includes(values.search.toLowerCase())
      );
      setFilteredCourses(filtered);
      setSearchCount(filtered.length);
      setSearchTerm(values.search);
    }
  };

  useEffect(() => {
    if (data?.products) {
      setFilteredCourses(data.products);
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (isError) return <div>Sorry There was an Error</div>;

  return (
    <div className="container m-auto p-4 sm:p-0">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start p-0 sm:py-8 border-b border-gray-300">
        <p className=" text-2xl sm:text-4xl md:text-5xl font-bold">Courses</p>
        <div className="flex items-center mb-4 w-full sm:w-auto p-2 border rounded">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <input
              {...register("search")}
              type="text"
              placeholder="Search course by name"
              className="focus:outline-none focus:border-none"
            />
            {errors.search && (
              <p className="text-red-500">{errors.search.message}</p>
            )}
          </form>
        </div>
      </div>

      {searchTerm &&
        (searchCount > 0 ? (
          <p className="pt-8 px-0 sm:px-4 text-1xl sm:text-2xl md:text-3xl">
            "{searchCount} {searchTerm}" course{searchCount > 1 ? "s" : ""}{" "}
            found
          </p>
        ) : (
          <p className="p-6 text-3xl">No Courses Found For "{searchTerm}"</p>
        ))}

      <div className="grid grid-cols-1 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredCourses.map((course: Course) => (
          <CourseCard
            key={course.sku}
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

export default Courses;
