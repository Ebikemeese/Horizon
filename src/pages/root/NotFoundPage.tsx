import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="padding-x py-16 max-container flex flex-col items-center justify-center gap-6 rounded-md bg-white">
      <h1 className="text-gray-800 text-6xl font-bold">404</h1>
      <h2 className="text-gray-700 text-2xl text-center">
        Oops! The page you’re looking for doesn’t exist 🚪
      </h2>
      <p className="text-gray-500 text-center max-w-md">
        It might have been moved or deleted. Let’s get you back on track.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;