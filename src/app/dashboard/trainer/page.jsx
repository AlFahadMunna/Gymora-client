"use client";
import { useSession } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";

const TrainerDashboardPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }
  const user = session?.user;
  const trainer = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    totalClasses: 24,
    totalStudents: 320,
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-10">
      {/* Main Container */}
      <div className="mx-auto max-w-6xl space-y-6">
        {/* HEADER / PROFILE SECTION */}
        <div className="flex flex-col gap-4 rounded-2xl border bg-background p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          {/* Profile */}
          <div className="flex items-center gap-4">
            <Avatar src={trainer.avatar} size="lg" />

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg font-semibold sm:text-xl">
                  {trainer.name}
                </h1>

                {/* Trainer Badge */}
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  Trainer
                </span>
              </div>

              <p className="text-sm text-muted-foreground">{trainer.email}</p>
            </div>
          </div>

          {/* Optional Action Button Area */}
          <button className="rounded-xl bg-default-100 px-4 py-2 text-sm font-medium hover:bg-default-200 transition">
            Edit Profile
          </button>
        </div>

        {/* STATISTICS SECTION */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {/* Total Classes */}
          <div className="rounded-2xl border bg-background p-5 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-muted-foreground">
              Total Classes Created
            </p>

            <h2 className="mt-2 text-3xl font-bold">{trainer.totalClasses}</h2>

            <div className="mt-3 h-2 w-full rounded-full bg-default-200">
              <div className="h-2 w-2/3 rounded-full bg-primary" />
            </div>
          </div>

          {/* Total Students */}
          <div className="rounded-2xl border bg-background p-5 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-muted-foreground">
              Total Students Enrolled
            </p>

            <h2 className="mt-2 text-3xl font-bold">{trainer.totalStudents}</h2>

            <div className="mt-3 h-2 w-full rounded-full bg-default-200">
              <div className="h-2 w-3/4 rounded-full bg-primary" />
            </div>
          </div>
        </div>

        {/* EXTRA DASHBOARD SECTION (optional placeholder) */}
        <div className="rounded-2xl border bg-background p-5 shadow-sm">
          <h3 className="text-lg font-semibold">Overview</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your classes, track student progress, and grow your training
            business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboardPage;
