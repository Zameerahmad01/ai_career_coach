import { features } from "@/data/features";
import React from "react";
import { Card, CardContent } from "../ui/card";

const Features = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:32 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl tracking-tighter font-bold text-center">
            Powerful AI Tools for Your Career
          </h2>
          <p className="text-muted-foreground text-center">
            Our AI tools are designed to help you achieve your career goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-10">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary transition-all duration-300"
            >
              <CardContent>
                <div className="flex flex-col gap-2">
                  {feature.icon}
                  <h2 className="text-lg font-bold">{feature.title}</h2>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
