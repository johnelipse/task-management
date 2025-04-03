"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { motion } from "framer-motion";

const MotionCard = motion(Card);
const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export function WhatToDo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen relative bg-black  p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute h-[100%] w-[500px] z-0 right-0 top-0"
      >
        <Image
          src="/images/bg/13.webp"
          alt="backround"
          fill
          className="object-cover z-0 rotate-180"
        />
      </motion.div>
      <motion.div
        // variants={containerVariants}
        // initial="hidden"
        // animate="visible"
        className="mx-auto max-w-8xl z-50 bg-black rounded-3xl p-2 md:p-8 padding gap-6"
      >
        <Image
          src="/images/pnd2.jpg"
          alt="backround"
          width={1920}
          height={1080}
          className="w-full h-full bg-black"
        />
      </motion.div>
    </div>
  );
}
