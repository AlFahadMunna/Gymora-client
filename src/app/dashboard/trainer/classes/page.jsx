"use client";

import { useState } from "react";

export default function MyClassesPage() {
  // Mock data (replace with API later)
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Full Body Workout",
      category: "Fitness",
      price: 20,
      students: [
        { name: "Ali Khan", email: "ali@gmail.com" },
        { name: "Sarah Ahmed", email: "sarah@gmail.com" },
      ],
    },
    {
      id: 2,
      name: "Yoga Flow",
      category: "Yoga",
      price: 15,
      students: [{ name: "John Doe", email: "john@gmail.com" }],
    },
  ]);

  const [selectedClass, setSelectedClass] = useState(null);
  const [editData, setEditData] = useState(null);

  // DELETE CLASS
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this class?",
    );
    if (confirm) {
      setClasses(classes.filter((c) => c.id !== id));
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (cls) => {
    setEditData(cls);
  };

  // SAVE EDIT
  const handleUpdate = () => {
    setClasses(classes.map((c) => (c.id === editData.id ? editData : c)));
    setEditData(null);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6">My Classes</h1>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-2xl border bg-background shadow-sm">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b bg-default-100">
              <tr>
                <th className="p-4">Class Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id} className="border-b hover:bg-default-50">
                  <td className="p-4 font-medium">{cls.name}</td>
                  <td className="p-4">{cls.category}</td>
                  <td className="p-4">${cls.price}</td>

                  <td className="p-4 flex flex-wrap gap-2">
                    {/* VIEW STUDENTS */}
                    <button
                      onClick={() => setSelectedClass(cls)}
                      className="rounded-lg bg-blue-500 px-3 py-1 text-white text-xs hover:opacity-90"
                    >
                      View Students
                    </button>

                    {/* EDIT */}
                    <button
                      onClick={() => openEditModal(cls)}
                      className="rounded-lg bg-yellow-500 px-3 py-1 text-white text-xs hover:opacity-90"
                    >
                      Update
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(cls.id)}
                      className="rounded-lg bg-red-500 px-3 py-1 text-white text-xs hover:opacity-90"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= VIEW STUDENTS MODAL ================= */}
        {selectedClass && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg">
              <h2 className="text-lg font-bold mb-3">
                Students in {selectedClass.name}
              </h2>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {selectedClass.students.map((s, i) => (
                  <div key={i} className="border rounded-lg p-2">
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.email}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedClass(null)}
                className="mt-4 w-full rounded-lg bg-gray-800 text-white py-2"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ================= EDIT MODAL ================= */}
        {editData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg">
              <h2 className="text-lg font-bold mb-3">Update Class</h2>

              <input
                className="w-full border p-2 rounded mb-2"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />

              <input
                className="w-full border p-2 rounded mb-2"
                value={editData.category}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
              />

              <input
                type="number"
                className="w-full border p-2 rounded mb-4"
                value={editData.price}
                onChange={(e) =>
                  setEditData({ ...editData, price: e.target.value })
                }
              />

              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-green-500 text-white py-2 rounded"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditData(null)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
