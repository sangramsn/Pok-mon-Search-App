import React from "react";
import Link from "next/link";

const Pokemon = ({ name, imageURL }) => {
  return (
    <div className="max-h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      <Link href={`/pokemon/${name}`}>
        <img
          className="rounded-t-lg w-full bg-white h-48  p-4"
          src={imageURL}
          alt="img"
        />
      </Link>

      <div className="p-5 bg-gray-100 ">
        <p className="font-bold-500">{name}</p>
        <Link
          href={`/pokemon/${name}`}
          className="text-start block bg-transparent text-blue-400 mt-2  rounded-md "
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default Pokemon;
