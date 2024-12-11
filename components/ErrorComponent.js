"use client";
export default function ErrorComponent({ message }) {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 p-4 my-4 text-red-700">
      {message}
    </div>
  );
}
