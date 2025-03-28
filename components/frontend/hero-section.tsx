"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
interface TryItProps {
  email: string;
}

export function HeroSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TryItProps>();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation = {
    y: [-4, 4],
    transition: {
      y: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const avatarContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
      },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, x: -10, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };
  const router = useRouter();

  function submit(data: TryItProps) {
    if (!data.email) {
      toast.error("Please enter the email");
    }
    if (data.email.trim()) {
      router.push(`/register?email=${encodeURIComponent(data.email)}`);
    } else {
      router.push("/register");
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-black pt-[6.5rem] md:pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 h-[500px] w-[500px] left-0"
      >
        <Image
          src="/images/bg/10.webp"
          alt="background"
          fill
          className="object-cover"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute top-0 h-[500px] w-[500px] right-0"
      >
        <Image
          src="/images/bg/7.webp"
          alt="background"
          fill
          className="object-cover"
        />
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 mx-auto px-4 text-center"
      >
        <motion.div
          animate={floatingAnimation}
          className="mx-auto mb-8 flex max-w-fit items-center gap-2 rounded-full border-2 border-zinc-800 bg-[#050111] px-4 py-1"
        >
          <motion.div
            variants={avatarContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex -space-x-2"
          >
            {[1, 2, 3].map((i) => (
              <motion.img
                key={i}
                variants={avatarVariants}
                src={`https://img.freepik.com/free-photo/close-up-lovely-woman-enjoying-her-day-off_1139-401.jpg?ga=GA1.1.323946196.1739739986&semt=ais_hybrid-${i}.jpg`}
                alt={`Avatar ${i}`}
                className="h-8 w-8 rounded-full border-2 border-zinc-800 object-cover"
              />
            ))}
          </motion.div>
          <motion.span
            variants={itemVariants}
            className="text-sm text-zinc-300"
          >
            5000+ 5 stars reviews
          </motion.span>
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl font md:text-6xl"
        >
          Streamlined Task Management for Teams and Individuals
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-12 smallfont max-w-2xl text-lg text-zinc-400"
        >
          In today&apos;s fast-paced world, staying organized and on track can
          be challenging, whether you&apos;re working alone or as part of a
          team.
        </motion.p>
        <motion.form
          onSubmit={handleSubmit(submit)}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="mx-auto flex max-w-md border-2 rounded-full py-1 px-1 border-zinc-800 items-center flex-row"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
            className="h-full bg-transparent outline-none focus:outline-none focus-visible::border-none focus-visible:ring-1 focus-visible:ring-transparent border-none text-white placeholder:text-zinc-400"
          />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
            >
              Try It Free
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </motion.svg>
            </Button>
          </motion.div>
        </motion.form>
        {errors["email"] && (
          <span className="text-xs text-red-500">please enter your email</span>
        )}
      </motion.div>
    </section>
  );
}
