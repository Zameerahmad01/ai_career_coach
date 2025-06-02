import { testimonial } from "@/data/testimonial";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const Testimonials = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:32 bg-muted/80">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl tracking-tighter font-bold text-center">
            Powerful AI Tools for Your Career
          </h2>
          <p className="text-muted-foreground text-center">
            Our AI tools are designed to help you achieve your career goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 max-w-6xl mx-auto mt-10 ">
          {testimonial.map((testimonial, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary transition-all duration-300"
            >
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={50}
                        height={50}
                        className="object-cover rounded-full border-2 border-primary/20"
                      />
                    </div>
                    <div>
                      <h3 className=" font-semibold">{testimonial.author}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-primary">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <blockquote>
                    <p className="relative italic text-muted-foreground">
                      <span className="absolute text-3xl -top-4 left-0 text-primary">
                        &quot;
                      </span>
                      {testimonial.quote}
                      <span className="absolute text-3xl -bottom-4  text-primary">
                        &quot;
                      </span>
                    </p>
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
