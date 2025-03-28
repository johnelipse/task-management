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
          className="object-cover rotate-180"
        />
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto grid max-w-7xl z-50 bg-transparent/90 backdrop-blur-none rounded-3xl p-2 md:p-8 padding gap-6 lg:grid-cols-3"
      >
        {/* Create New Task Panel */}
        <MotionCard
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          className="backdrop-blur-xl bg-gray-300 p-4"
        >
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-black">
              Create New Task
            </h2>
            <button className="text-black hover:text-black">×</button>
          </motion.div>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-black">For</span>
            <Avatar className="h-6 w-6">
              <Image
                src="https://img.freepik.com/premium-photo/beautiful-woman-posing_149066-1884.jpg?ga=GA1.1.323946196.1739739986&semt=ais_hybrid"
                alt="Avatar"
                width={24}
                height={24}
              />
            </Avatar>
            <span className="text-sm text-black">Brooklyn</span>
            <span className="text-sm text-black">in</span>
            <Button
              variant="outline"
              size="sm"
              className="h-7 bg-white/10 text-black"
            >
              Project
            </Button>
          </div>

          <Textarea
            disabled
            placeholder="Description..."
            className="mt-4 bg-white/5 text-black"
          />

          <div className="mt-4 flex items-center gap-4">
            <button className="text-black">Aa</button>
            <button className="text-gray-400">😊</button>
            <button className="text-gray-400">📎</button>
            <button className="text-gray-400">📅</button>
            <button className="ml-auto text-black">👤</button>
          </div>

          <Button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500">
            Create Task
          </Button>

          <div className="mt-2">
            <h3 className="mb-4 font-medium text-black">Personal Projects</h3>
            <div className="space-y-3">
              {["Fitness", "Groceries", "Appointments"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-black">
                  <span>🔗</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2">
            <h3 className="mb-4 font-medium text-black">Team Projects</h3>
            <div className="space-y-3">
              {["Meeting Agenda", "Panze web design & dev...."].map((item) => (
                <div key={item} className="flex items-center gap-2 text-black">
                  <span>○</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </MotionCard>

        {/* Project Status Panel */}
        <MotionCard
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          className="backdrop-blur-xl bg-gray-300 p-4"
        >
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-black">Project Status</h2>
            <button className="text-gray-400">🔍</button>
          </motion.div>

          <motion.div variants={fadeInVariants} className="mt-8 space-y-6">
            {[
              {
                name: "Marketing Page Redesign",
                progress: 100,
                status: "Completed",
                statusColor: "text-green-400",
                date: "14 Mar",
                avatar:
                  "https://img.freepik.com/premium-photo/beautiful-woman-posing_149066-1884.jpg?ga=GA1.1.323946196.1739739986&semt=ais_hybrid",
              },
              {
                name: "Pitch Deck",
                progress: 70,
                status: "In progress",
                statusColor: "text-orange-400",
                date: "10 Mar",
                avatar:
                  "https://img.freepik.com/premium-photo/beautiful-woman-posing_149066-1884.jpg?ga=GA1.1.323946196.1739739986&semt=ais_hybrid",
              },
              {
                name: "New iOS Development",
                progress: 45,
                status: "Pending",
                statusColor: "text-red-400",
                date: "25 Mar",
                avatar:
                  "https://img.freepik.com/premium-photo/beautiful-woman-posing_149066-1884.jpg?ga=GA1.1.323946196.1739739986&semt=ais_hybrid",
              },
            ].map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-black">{project.name}</span>
                  <Avatar className="h-6 w-6">
                    <Image
                      src={project.avatar || "/placeholder.svg"}
                      alt=""
                      width={24}
                      height={24}
                    />
                  </Avatar>
                </div>
                <Progress value={project.progress} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className={project.statusColor}>{project.status}</span>
                  <span className="text-black">{project.date}</span>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-black">
              Design Phase:
            </h3>
            <div className="space-y-3">
              {[
                "Wireframe-Creation",
                "Mockup-Design",
                "Design Review and Approval",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Checkbox checked />
                  <span className="text-black">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-black">
              Development Phase:
            </h3>
            <div className="space-y-3">
              {[
                "Front-End Development",
                "Back-End Development",
                "Content Integration",
                "Testing and QA",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Checkbox />
                  <span className="text-black">{item}</span>
                </div>
              ))}
            </div>
          </div> */}
        </MotionCard>

        {/* Features Panel */}
        <MotionCard
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          className="space-y-6 backdrop-blur-xl bg-gray-300 p-4"
        >
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div
              variants={fadeInVariants}
              whileHover={{ scale: 1.02 }}
              className="rounded-lg bg-purple-500/20 p-4"
            >
              <h3 className="text-lg font-semibold text-black">
                Make your task easier
              </h3>
              <button className="rounded-full bg-purple-500/20 p-1 text-black">
                ?
              </button>
            </motion.div>
            <p className="mt-2 text-sm text-black">
              Write your #Prompt in your language
            </p>
            <div className="mt-4 rounded-lg bg-purple-500/20 p-3 text-sm text-black">
              I need a 3-day honeymoon itinerary for Paris. Please include
              romantic spots, must-see landmarks, intimate dining options, and
              relaxing activities for a memorable trip
            </div>
          </motion.div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-black">
              Connected with your favorite apps
            </h3>
            <div className="grid grid-cols-6 gap-4">
              {["drive", "maps", "chrome", "appstore", "adobe", "chrome"].map(
                (app, i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"
                  >
                    <Image
                      src="https://img.freepik.com/premium-photo/beautiful-woman-posing_149066-1884.jpg?ga=GA1.1.323946196.1739739986&semt=ais_hybrid"
                      alt={app}
                      width={20}
                      height={20}
                      className="opacity-75 rounded-full w-full h-full object-fill"
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <div className="rounded-lg bg-blue-500/10 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-black">
                Invite people to Team
              </h3>
              <button className="text-black">×</button>
            </div>
            <Input
              disabled
              placeholder="name@email.com, name@email.com,..."
              className="mt-2 bg-white/5 text-black"
            />
            <div className="mt-2 flex items-center justify-between">
              <button className="text-blue-400">copy link invite</button>
              <Button className="bg-gradient-to-r py-1 from-blue-500 to-purple-500">
                Send
              </Button>
            </div>
          </div>
        </MotionCard>
      </motion.div>
    </div>
  );
}
