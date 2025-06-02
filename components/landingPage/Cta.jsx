import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Cta = () => {
  return (
    <section className="w-full">
      <div className=" gradient mx-auto py-24">
        <div className="flex flex-col items-center justify-center gap-2 text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl tracking-tighter font-bold text-center text-primary-foreground sm:text-4xl md:text-5xl">
            Ready to Elevate Your Career?
          </h2>
          <p className="text-primary-foreground/80 text-center max-w-[600px] mx-auto md:text-xl">
            Join thousands of professionals who have already transformed their
            careers with SensAI.
          </p>{" "}
          <Link href="/signup" passHref className="mt-4 cursor-pointer">
            <Button className="bg-primary-foreground cursor-pointer text-foreground px-8 hover:bg-primary-foreground/80 animate-bounce">
              Start Your Journey Today <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
