interface CourseCardProps {
  title: string;
  author: string;
  duration: string;
  level: string;
  image: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  author,
  duration,
  level,
  image,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div
        className="relative h-[200px] border-b-[1px] border-b-gray-300 bg-center bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <p className="bg-black bg-opacity-40 w-fit px-2 py-1 rounded-md absolute bottom-2 left-3">
          ${duration}
        </p>
      </div>
      <div className="p-4">
        <p className="bg-opacity-40 bg-gray-400 w-fit px-3 py-0.5 rounded-full mb-2">
          {level}
        </p>
        <p className="font-bold">{title}</p>
        <p className="text-gray-500 mb-5">by {author}</p>
        <button className="w-full bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-700 hover:border-transparent rounded">
          VIEW COURSE
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
