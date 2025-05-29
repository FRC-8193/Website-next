"use client";

import { Mail, Send, User, MessageSquare, Briefcase } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";
import { motion } from "motion/react";
import { type ChangeEvent, type FormEvent, useState } from "react";
import SocialIcon from "@/components/ui/SocialIcon";
import Link from "next/link";
import { api } from "~/app/trpc/react";
import { env } from "@/env";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const inputClasses =
  "mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm placeholder-gray-400 transition-shadow hover:shadow-md dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-white dark:focus:border-white";
const labelClasses =
  "block text-sm font-medium text-gray-700 mb-1 dark:text-zinc-300";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [emailSendToken, setEmailSendToken] = useState<string | null>(null);
  const [emailGetToken, setEmailGetToken] = useState<string | null>(null);

  const sendEmail = api.email.sendContactEmail.useMutation();
  const email = api.email.get.useQuery(
    { hcaptchaToken: emailGetToken ?? "" },
    {
      enabled: !!emailGetToken,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await sendEmail.mutateAsync({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        hcaptchaToken: emailSendToken ?? "",
      });
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

  return (
    <motion.div
      className="min-h-screen bg-white px-4 py-16 text-black sm:px-6 sm:py-24 lg:px-8 dark:bg-zinc-900 dark:text-white"
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-5xl">
        <motion.header className="mb-16 text-center" variants={headerVariants}>
          <h1 className="text-5xl font-bold tracking-tight text-black sm:text-6xl dark:text-white">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-zinc-300">
            Use the form below to send us an email or reach out through our
            other channels.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-5">
          <motion.section
            className="rounded-xl bg-gray-50 p-8 shadow-lg transition-all duration-300 hover:shadow-xl lg:col-span-3 dark:bg-zinc-800 dark:shadow-white/20"
            variants={itemVariants}
          >
            <h2 className="mb-8 flex items-center text-3xl font-semibold text-black dark:text-white">
              <Send size={28} className="mr-3 text-black dark:text-white" />{" "}
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className={labelClasses}>
                  Full Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User
                      size={18}
                      className="text-gray-400 dark:text-zinc-400"
                    />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} pl-10`}
                    placeholder="John Doe"
                    aria-label="Full Name"
                  />
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className={labelClasses}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail
                      size={18}
                      className="text-gray-400 dark:text-zinc-400"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} pl-10`}
                    placeholder="you@example.com"
                    aria-label="Email Address"
                  />
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className={labelClasses}>
                  Subject
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Briefcase
                      size={18}
                      className="text-gray-400 dark:text-zinc-400"
                    />
                  </div>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} pl-10`}
                    placeholder="Regarding sponsorship..."
                    aria-label="Subject"
                  />
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className={labelClasses}>
                  Message
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute top-3 left-0 flex items-center pl-3">
                    {" "}
                    {/* Adjusted for textarea */}
                    <MessageSquare
                      size={18}
                      className="text-gray-400 dark:text-zinc-400"
                    />
                  </div>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} pl-10`}
                    placeholder="Your message here..."
                    aria-label="Message"
                  />
                </div>
              </motion.div>

              <HCaptcha
                sitekey={env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                onVerify={(token) => setEmailSendToken(token)}
                onExpire={() => setEmailSendToken(null)}
              />
              <motion.div
                variants={buttonVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting || !emailSendToken}
                  className="group flex w-full items-center justify-center rounded-lg border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-md transition-all duration-150 ease-in-out hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-white"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send
                    size={20}
                    className="ml-2 transform transition-transform duration-300"
                  />
                </button>
              </motion.div>
              {submitStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-md border border-green-200 bg-green-100 p-4 text-sm text-green-600 dark:border-green-700 dark:bg-green-900 dark:text-green-300"
                >
                  Message sent successfully! We&apos;ll get back to you soon.
                </motion.p>
              )}
              {submitStatus === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-md border border-red-200 bg-red-100 p-4 text-sm text-red-600 dark:border-red-700 dark:bg-red-900 dark:text-red-300"
                >
                  Failed to send message. Please try again later or contact us
                  directly via email.
                </motion.p>
              )}
            </form>
          </motion.section>

          <motion.div
            className="space-y-8 lg:col-span-2"
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="rounded-xl bg-gray-50 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-zinc-800 dark:shadow-white/20"
              variants={itemVariants}
            >
              <h3 className="mb-4 flex items-center text-2xl font-semibold text-black dark:text-white">
                <Mail size={24} className="mr-3 text-black dark:text-white" />{" "}
                Email Us
              </h3>
              {emailGetToken ? (
                <Link
                  href={`mailto:${email.data}`}
                  className="text-lg font-medium break-all text-black hover:underline dark:text-white"
                >
                  {email.data ?? "Loading..."}
                </Link>
              ) : (
                <>
                  <HCaptcha
                    sitekey={env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                    onVerify={(token) => setEmailGetToken(token)}
                    onExpire={() => setEmailGetToken(null)}
                  />
                </>
              )}
            </motion.div>

            <motion.div
              className="rounded-xl bg-gray-50 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-zinc-800 dark:shadow-white/20"
              variants={itemVariants}
            >
              <h3 className="mb-4 text-2xl font-semibold text-black dark:text-white">
                Connect on Social Media
              </h3>
              <p className="mb-6 text-gray-600 dark:text-zinc-300">
                Follow our journey, see our robots in action, and get the latest
                updates from The Steel Stingers.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                <SocialIcon
                  href="https://github.com/FRC-8193"
                  icon={FaGithub}
                  label="GitHub"
                  variants={itemVariants}
                />
                <SocialIcon
                  href="https://www.facebook.com/people/New-Lothrop-Robotics-The-Steel-Stingers/100082742922158/"
                  icon={SlSocialFacebook}
                  label="Facebook"
                  variants={itemVariants}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
