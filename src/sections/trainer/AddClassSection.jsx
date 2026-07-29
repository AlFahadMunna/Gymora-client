"use client";

import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Dropdown,
  Label,
  TextField,
  CheckboxGroup,
  Checkbox,
} from "@heroui/react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import {
  FiLoader,
  FiPlusCircle,
  FiChevronDown,
  FiZap,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiImage,
  FiFileText,
} from "react-icons/fi";
import { FaDumbbell } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import Wrapper from "@/components/shared /Wrapper";

const AddTrainerClassSection = () => {
  const [isPending, setIsPending] = useState(false);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);

  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const Days = [
    { id: "sat", label: "Saturday" },
    { id: "sun", label: "Sunday" },
    { id: "mon", label: "Monday" },
    { id: "tue", label: "Tuesday" },
    { id: "wed", label: "Wednesday" },
    { id: "thu", label: "Thursday" },
    { id: "fri", label: "Friday" },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to create a class.");
      return;
    }

    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    if (!difficulty) {
      toast.error("Please select a difficulty level.");
      return;
    }

    if (selectedDays.length === 0) {
      toast.error("Please select at least one schedule day.");
      return;
    }

    const formdata = new FormData(e.target);
    const roomData = Object.fromEntries(formdata.entries());

    // Assemble payload
    roomData.category = category;
    roomData.difficulty = difficulty;
    roomData.scheduleDays = selectedDays;
    roomData.price = Number(roomData.price);
    roomData.userId = user.id;
    roomData.userName = user.name;
    roomData.userEmail = user.email;
    roomData.userImage = user.image;
    roomData.createdAt = new Date();

    setIsPending(true);

    try {
      // const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(roomData),
        },
      );

      const data = await res.json();

      if (res.ok && (data.success || data.insertedId || data.acknowledged)) {
        toast.success("Class Published Successfully!");
        e.target.reset();
        setCategory("");
        setDifficulty("");
        setSelectedDays([]);

        // Push to listing page
        router.push("/my-listing");
      } else {
        toast.error(data.message || "Failed to publish class.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while publishing.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-16 transition-colors duration-500 relative overflow-hidden">
      {/* Background Glow Decorations */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <Wrapper className="my-0 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <motion.header
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center flex flex-col items-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold tracking-widest uppercase mb-4">
              <FaDumbbell className="text-sm" />
              <span>Trainer Portal</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
              Publish a New{" "}
              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-orange-500 bg-clip-text text-transparent">
                Fitness Class
              </span>
            </h1>
            <p className="text-muted text-sm md:text-base max-w-lg">
              Design your workout program, set your schedule, and reach
              thousands of motivated athletes on Gymora.
            </p>
          </motion.header>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="bg-surface/80 p-6 sm:p-10 rounded-3xl shadow-2xl border border-border/80 backdrop-blur-xl relative"
          >
            <Form className="grid grid-cols-1 gap-7" onSubmit={onSubmit}>
              {/* Class Name */}
              <TextField
                isRequired
                name="className"
                type="text"
                validate={(v) =>
                  v.trim().length < 3
                    ? "Class name must be at least 3 characters"
                    : null
                }
              >
                <Label className="text-sm font-bold tracking-wide flex items-center gap-2 mb-1 text-foreground">
                  <FaDumbbell className="text-blue-500" /> Class Title
                </Label>
                <Input
                  placeholder="e.g. High-Intensity Interval Shred"
                  className="bg-field-background border border-border focus:border-blue-500 rounded-xl transition-all h-12 px-4"
                />
              </TextField>

              {/* Description */}
              <TextField
                isRequired
                name="description"
                type="text"
                validate={(v) =>
                  v.trim().length < 10
                    ? "Description must be at least 10 characters"
                    : null
                }
              >
                <Label className="text-sm font-bold tracking-wide flex items-center gap-2 mb-1 text-foreground">
                  <FiFileText className="text-violet-500" /> Overview &
                  Description
                </Label>
                <Input
                  placeholder="Describe your class goals, recommended gear, or requirements..."
                  className="bg-field-background border border-border focus:border-blue-500 rounded-xl transition-all h-12 px-4"
                />
              </TextField>

              {/* Image URL */}
              <TextField
                isRequired
                name="imageUrl"
                type="text"
                validate={(v) =>
                  !/^(https?:\/\/.*)/i.test(v)
                    ? "Please enter a valid image URL (e.g., https://...)"
                    : null
                }
              >
                <Label className="text-sm font-bold tracking-wide flex items-center gap-2 mb-1 text-foreground">
                  <FiImage className="text-orange-500" /> Class Cover Image URL
                </Label>
                <Input
                  placeholder="https://images.unsplash.com/..."
                  className="bg-field-background border border-border focus:border-blue-500 rounded-xl transition-all h-12 px-4"
                />
              </TextField>

              {/* Grid for Duration & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Duration */}
                <TextField
                  isRequired
                  name="duration"
                  type="text"
                  validate={(v) =>
                    v.trim().length === 0 ? "Duration details required" : null
                  }
                >
                  <Label className="text-sm font-bold tracking-wide flex items-center gap-2 mb-1 text-foreground">
                    <FiClock className="text-blue-500" /> Duration
                  </Label>
                  <Input
                    placeholder="e.g. 60 Minutes"
                    className="bg-field-background border border-border focus:border-blue-500 rounded-xl transition-all h-12 px-4"
                  />
                </TextField>

                {/* Price */}
                <TextField
                  isRequired
                  name="price"
                  type="number"
                  validate={(v) =>
                    Number(v) < 0 ? "Rate cannot be negative" : null
                  }
                >
                  <Label className="text-sm font-bold tracking-wide flex items-center gap-2 mb-1 text-foreground">
                    <FiDollarSign className="text-emerald-500" /> Price ($)
                  </Label>
                  <Input
                    placeholder="25"
                    type="number"
                    className="bg-field-background border border-border focus:border-blue-500 rounded-xl transition-all h-12 px-4"
                  />
                </TextField>
              </div>

              {/* Category and Difficulty Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-bold tracking-wide flex items-center gap-2 text-foreground">
                    <FiZap className="text-amber-500" /> Category
                  </Label>
                  <Dropdown>
                    <Button
                      className="w-full justify-between h-12 px-4 bg-field-background border border-border rounded-xl font-medium text-left hover:border-blue-500 transition-all"
                      aria-label="Category"
                      variant="secondary"
                    >
                      <span
                        className={
                          category
                            ? "text-foreground font-semibold uppercase text-xs tracking-wider"
                            : "text-muted"
                        }
                      >
                        {category
                          ? category.replace("-", " ")
                          : "Select Category"}
                      </span>
                      <FiChevronDown className="text-muted" />
                    </Button>
                    <Dropdown.Popover className="w-full min-w-[240px]">
                      <Dropdown.Menu
                        onAction={(key) => setCategory(String(key))}
                      >
                        <Dropdown.Item
                          id="strength-training"
                          textValue="Strength Training"
                        >
                          <Label className="font-semibold cursor-pointer">
                            Strength Training
                          </Label>
                        </Dropdown.Item>
                        <Dropdown.Item id="cardio" textValue="Cardio">
                          <Label className="font-semibold cursor-pointer">
                            Cardio
                          </Label>
                        </Dropdown.Item>
                        <Dropdown.Item id="yoga" textValue="Yoga">
                          <Label className="font-semibold cursor-pointer">
                            Yoga
                          </Label>
                        </Dropdown.Item>
                        <Dropdown.Item id="pilates" textValue="Pilates">
                          <Label className="font-semibold cursor-pointer">
                            Pilates
                          </Label>
                        </Dropdown.Item>
                        <Dropdown.Item id="zumba" textValue="Zumba">
                          <Label className="font-semibold cursor-pointer">
                            Zumba
                          </Label>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown>
                </div>

                {/* Difficulty Level Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-bold tracking-wide flex items-center gap-2 text-foreground">
                    <FaDumbbell className="text-violet-500" /> Difficulty Level
                  </Label>
                  <Dropdown>
                    <Button
                      className="w-full justify-between h-12 px-4 bg-field-background border border-border rounded-xl font-medium text-left hover:border-blue-500 transition-all"
                      aria-label="Difficulty Level"
                      variant="secondary"
                    >
                      <span
                        className={
                          difficulty
                            ? "text-foreground font-semibold uppercase text-xs tracking-wider"
                            : "text-muted"
                        }
                      >
                        {difficulty ? difficulty : "Select Difficulty"}
                      </span>
                      <FiChevronDown className="text-muted" />
                    </Button>
                    <Dropdown.Popover className="w-full min-w-[240px]">
                      <Dropdown.Menu
                        onAction={(key) => setDifficulty(String(key))}
                      >
                        <Dropdown.Item id="beginner" textValue="Beginner">
                          <Label className="font-semibold cursor-pointer">
                            Beginner
                          </Label>
                        </Dropdown.Item>
                        <Dropdown.Item
                          id="intermediate"
                          textValue="Intermediate"
                        >
                          <Label className="font-semibold cursor-pointer">
                            Intermediate
                          </Label>
                        </Dropdown.Item>
                        <Dropdown.Item id="advanced" textValue="Advanced">
                          <Label className="font-semibold cursor-pointer">
                            Advanced
                          </Label>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown>
                </div>
              </div>

              {/* Class Schedule days */}
              <div className="flex flex-col gap-3">
                <Label className="text-sm font-bold tracking-wide flex items-center gap-2 text-foreground">
                  <FiCalendar className="text-blue-500" /> Weekly Schedule
                </Label>
                <CheckboxGroup
                  orientation="horizontal"
                  value={selectedDays}
                  onChange={setSelectedDays}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full"
                >
                  {Days.map((item) => (
                    <label
                      key={item.id}
                      className="cursor-pointer select-none block"
                    >
                      <Checkbox
                        value={item.id}
                        color="primary"
                        className="m-0 p-4 w-full bg-field-background border border-border rounded-2xl flex items-center gap-3 transition-all duration-300 data-[selected=true]:border-blue-500 data-[selected=true]:bg-blue-500/10 data-[selected=true]:shadow-md hover:border-blue-500/50 hover:bg-default-100/50 cursor-pointer"
                      >
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                          <span className="text-foreground font-bold text-xs uppercase tracking-wider cursor-pointer">
                            {item.label}
                          </span>
                        </Checkbox.Content>
                      </Checkbox>
                    </label>
                  ))}
                </CheckboxGroup>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-blue-600 via-violet-600 to-orange-500 text-white font-black text-base uppercase tracking-wider rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
                  isDisabled={isPending}
                >
                  {isPending ? (
                    <FiLoader className="animate-spin text-2xl" />
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FiPlusCircle size={22} />
                      <span>Publish Class Now</span>
                    </div>
                  )}
                </Button>
              </div>
            </Form>
          </motion.div>
        </div>
      </Wrapper>
    </div>
  );
};

export default AddTrainerClassSection;
