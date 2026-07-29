const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getTrainerClasses = async (trainerId, status = "approved") => {
  const res = await fetch(
    `${baseUrl}/api/classes?classId=${trainerId}$status=${status}`,
  );
  return res.json();
};
