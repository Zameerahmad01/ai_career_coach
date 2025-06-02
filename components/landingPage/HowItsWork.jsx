import { howItWorks } from "@/data/howItWorks";
import React from "react";

const HowItsWork = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-2 max-w-3xl mx-auto">
          <h2 className="text-3xl tracking-tighter font-bold text-center">
            How It Works
          </h2>
          <p className="text-muted-foreground text-center">
            Follow these steps to get started with our AI tools.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-10 place-items-center">
          {howItWorks.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 text-center p4 max-w-80"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItsWork;
