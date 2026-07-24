"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createClasses = async (newClassData) => {
  const res = await fetch(`${baseUrl}/api/classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newClassData),
  });

  const data = await res.json();

  return data;
};
