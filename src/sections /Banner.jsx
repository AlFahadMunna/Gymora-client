"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion } from "motion/react";
import { FaArrowRight, FaPlay, FaDumbbell } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background px-4 py-16">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500/20 blur-[140px] animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold mb-6">
              <FaDumbbell className="animate-bounce" />
              Elite Fitness Platform
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] mb-6">
              Unlock Your
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-violet-500 to-orange-500 bg-clip-text text-transparent">
                Strongest Self
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-default-500 max-w-xl mb-8 leading-relaxed">
              Join a high-performance fitness ecosystem with expert trainers,
              smart tracking, and personalized workout programs built to push
              your limits.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/classes">
                <Button
                  size="lg"
                  endContent={<FaArrowRight />}
                  className="h-14 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-500 text-white font-bold shadow-xl hover:scale-105 transition"
                >
                  Start Training
                </Button>
              </Link>

              <Button
                size="lg"
                variant="bordered"
                startContent={<FaPlay />}
                className="h-14 px-8 rounded-2xl border-default-300 hover:border-orange-500"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div>
                <h3 className="text-2xl font-bold">10K+</h3>
                <p className="text-sm text-default-500">Active Members</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">500+</h3>
                <p className="text-sm text-default-500">Workouts</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">4.9★</h3>
                <p className="text-sm text-default-500">User Rating</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-[2rem] overflow-hidden border-8 border-surface shadow-2xl">
              <Image
                width={1000}
                height={1000}
                src="/fitness-hero.jpg"
                alt="Fitness Training"
                className="w-full h-[600px] object-cover hover:scale-110 transition duration-700"
              />
            </div>

            {/* Floating Card 1 */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute border top-10 -left-10 bg-background/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border"
            >
              <p className="text-xs text-default-500">🔥 Today’s Workout</p>
              <p className="font-bold">Full Body HIIT</p>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 -right-10 bg-background/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border"
            >
              <p className="text-xs text-default-500">💪 Progress</p>
              <p className="font-bold">+24% Strength</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
