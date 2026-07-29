import { getTrainerClasses } from "@/lib/api/classes";

const TrainerClassesPage = async () => {
  const userId = "user_124";
  const classes = await getTrainerClasses(userId);

  return <div>Trainer classes page</div>;
};

export default TrainerClassesPage;
