"use client";

import { useState } from "react";

export default function AddClassPage() {
  const [form, setForm] = useState({
    className: "",
    image: "",
    category: "",
    difficulty: "Beginner",
    duration: "",
    schedule: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClass = {
      ...form,
      status: "Pending", // ✅ default requirement
      createdAt: new Date(),
    };

    console.log("New Class Data:", newClass);

    alert("Class submitted for approval (Pending)");
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold sm:text-3xl">Add New Class</h1>
          <p className="text-sm text-muted-foreground">
            Create a new training class (will be sent for admin approval)
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-background p-5 shadow-sm space-y-5"
        >
          {/* Class Name */}
          <div>
            <label className="text-sm font-medium">Class Name</label>
            <input
              name="className"
              value={form.className}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. Full Body Workout"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="text-sm font-medium">Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://..."
            />
          </div>

          {/* Category + Difficulty */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                placeholder="Yoga / Fitness / Cardio"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Difficulty Level</label>
              <select
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          {/* Duration + Price */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Duration</label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. 60 minutes"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Price ($)</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. 20"
                required
              />
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="text-sm font-medium">
              Class Schedule (Days & Time)
            </label>
            <input
              name="schedule"
              value={form.schedule}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. Mon, Wed, Fri - 7:00 PM"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              placeholder="Write class details..."
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3 font-semibold text-orange-500 hover:opacity-90 transition"
          >
            Submit Class for Review
          </button>
        </form>
      </div>
    </div>
  );
}
