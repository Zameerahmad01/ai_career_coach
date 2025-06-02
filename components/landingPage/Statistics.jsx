import React from "react";

const Statistics = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-muted/80">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-4xl font-bold">50+</h2>
            <p className="text-muted-foreground">Industries Covered</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-4xl font-bold">1000+</h2>
            <p className="text-muted-foreground">Interviews</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-4xl font-bold">100+</h2>
            <p className="text-muted-foreground">Success Stories</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-4xl font-bold">24/7</h2>
            <p className="text-muted-foreground">AI Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
