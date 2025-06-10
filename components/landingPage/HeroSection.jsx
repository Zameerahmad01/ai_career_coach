"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const HeroSection = () => {
  const imageRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const imageElement = imageRef.current;
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section className="w-full pt-32 md:pt-36 pb-10">
      <div className="space-y-8 text-center px-4 container mx-auto">
        {/* content */}
        <div className="space-y-6 mx-auto">
          <h1 className="gradient gradient-title tracking-tighter font-bold text-5xl md:text-5xl lg:text-7xl xl:text-8xl ">
            Your AI Career Coach for
            <br />
            Professional Success
          </h1>
          <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
            Advance your career with personalized guidance, interview prep, and
            Al-powered tools for job success.
          </p>
        </div>
        {/* cta buttons */}
        <div className="flex items-center justify-center space-x-4">
          <Link href="/dashboard">
            <Button className="text-lg cursor-pointer px-8 py-6">
              Get Started
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="outline"
              className="text-lg cursor-pointer px-8 py-6"
            >
              Learn More
            </Button>
          </Link>
        </div>

        {/* banner */}
        <div className="hero-image-wrapper">
          <div ref={imageRef} className="hero-image flex justify-center">
            <Image
              src="/banner.jpeg"
              alt="banner image"
              width={1200}
              height={720}
              priority
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
