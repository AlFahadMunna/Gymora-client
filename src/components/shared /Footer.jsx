"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Separator } from "@heroui/react";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaDumbbell,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <FaXTwitter />,
      href: "https://x.com",
      label: "X",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram />,
      href: "https://instagram.com",
      label: "Instagram",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Classes", href: "/classes" },
    { name: "Community Forum", href: "/forum" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div>
            <Link href="/" className="group flex items-center gap-3">
              <div
                className="
                  relative flex items-center justify-center
                  w-11 h-11 rounded-xl
                  bg-gradient-to-br from-blue-600 to-orange-500
                  shadow-lg
                  transition-all duration-500
                  group-hover:scale-110
                  group-hover:-translate-y-1
                  group-hover:rotate-12
                  group-hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]
                "
              >
                <FaDumbbell className="text-white text-xl transition-all duration-500 group-hover:scale-125" />
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-wider uppercase">
                  <span className="text-foreground">GYM</span>
                  <span className="text-orange-500">ORA</span>
                </h2>

                <p className="text-[10px] uppercase tracking-[0.3em] text-default-500">
                  Train • Transform • Thrive
                </p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-default-500">
              Gymora is a modern fitness and gym management platform that
              empowers members to discover classes, connect with trainers,
              participate in community discussions, and achieve their fitness
              goals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold">
              <span className="text-blue-600">Quick</span>
              <span className="text-orange-500"> Links</span>
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-default-500 transition-colors hover:text-orange-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-5 text-lg font-bold">
              <span className="text-blue-600">Contact</span>
              <span className="text-orange-500"> Info</span>
            </h3>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-default-500">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-default-100">
                  <FaEnvelope />
                </div>

                <span>support@gymora.com</span>
              </li>

              <li className="flex items-center gap-3 text-sm text-default-500">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-default-100">
                  <FaPhoneAlt />
                </div>

                <span>+880 1700-000000</span>
              </li>

              <li className="flex items-center gap-3 text-sm text-default-500">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-default-100">
                  <FaMapMarkerAlt />
                </div>

                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-5 text-lg font-bold">
              <span className="text-blue-600">Follow</span>
              <span className="text-orange-500"> Us</span>
            </h3>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-xl bg-default-100
                    text-lg
                    transition-all
                    hover:bg-gradient-to-r
                    hover:from-blue-600
                    hover:to-orange-500
                    hover:text-white
                  "
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <p className="mt-5 text-sm text-default-500">
              Stay connected with our fitness community and get the latest
              updates, tips, and announcements.
            </p>
          </div>
        </div>

        <Separator className="my-10" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-sm text-default-500">
            © {currentYear} Gymora. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-sm text-default-500 transition-colors hover:text-orange-500"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="text-sm text-default-500 transition-colors hover:text-orange-500"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
