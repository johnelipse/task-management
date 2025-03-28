"use client";

import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function TaskManagement() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const float = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/bg/14.jpg"
          alt="background"
          fill
          className="object-contain opacity-20 md:opacity-10"
        />
      </motion.div>
      <div className="container relative mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center"
        >
          <div className="space-y-4">
            <motion.h1
              className="text-[1.1rem] md:text-4xl font-bold text-white leading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Improve Your
              <br />
              <span className="text-white">Task Management Workflow.</span>
            </motion.h1>
            <motion.p
              className="text-gray-400 text-[1rem] max-w-2xl hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Bring your team's work together in one shared space, choose the
              project view that suits your style, and collaborate no matter.
            </motion.p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 rounded-full relative overflow-hidden group">
              <Link href="/workspace/boards" className="relative z-10">
                Get Started
              </Link>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ opacity: 1 }}
              />
              <ArrowRight className="ml-2 hidden md:block h-4 w-4 relative z-10" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Customizable Views */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900/60 backdrop-blur-xl rounded-xl py-6 px-4 space-y-6"
          >
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex space-x-2"
            >
              {["Kanban", "List", "Calendar"].map((text, index) => (
                <motion.div
                  key={text}
                  variants={item}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge
                    variant={index === 0 ? "secondary" : "outline"}
                    className={
                      index === 0 ? "bg-purple-600 text-white" : "text-white"
                    }
                  >
                    {text}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="grid md:grid-cols-2 gap-3">
              <motion.div
                variants={float}
                animate="animate"
                className="bg-gray-800/50 p-4 rounded-lg space-y-2 hover:bg-gray-800/70 transition-colors"
              >
                <Badge className="bg-orange-500/20 text-orange-500">
                  Project
                </Badge>
                <div className="text-sm text-white">Project Team Brief</div>
                <div className="text-xs text-gray-400">September 10, 2024</div>
                <div className="text-xs text-gray-400">2:00 PM-3:00PM</div>
              </motion.div>

              <motion.div
                variants={float}
                animate="animate"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="bg-gray-800/50 p-4 rounded-lg space-y-2 hover:bg-gray-800/70 transition-colors">
                  <Badge className="bg-purple-500/20 text-purple-500">
                    Design
                  </Badge>
                  <div className="text-sm text-white">
                    Presentation To The Design Team
                  </div>
                  <div className="text-xs text-gray-400">
                    September 10, 2024
                  </div>
                  <div className="text-xs text-gray-400">2:00 PM-3:00PM</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.h3
              variants={item}
              className="text-xl font-semibold text-white"
            >
              Customizable Views
            </motion.h3>
            <motion.p variants={item} className="text-gray-400 text-sm">
              Easily switch between multiple views such as list, calendar, or
              kanban, allowing you to tailor your workflow to your specific
              needs and preferences.
            </motion.p>
          </motion.div>

          {/* Task Organization */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900/60 backdrop-blur-xl rounded-xl h-auto md:h-[15rem] p-6 space-y-6"
          >
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-2"
            >
              {[
                "Fitness",
                "Work Project",
                "Projects Household Chores",
                "Personal Goals",
                "Finance",
                "Travel Planning",
                "Learning & Development",
                "Health & Wellness",
              ].map((text) => (
                <motion.div
                  key={text}
                  variants={item}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-2 hover:bg-purple-500/20 transition-colors"
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    {text}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <motion.h3
              variants={item}
              className="text-xl font-semibold text-white"
            >
              Task Organization
            </motion.h3>
            <motion.p variants={item} className="text-gray-400 text-sm">
              Organize tasks into customizable categories like work, personal,
              and health, ensuring.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
