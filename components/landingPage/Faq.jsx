import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";

const Faq = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-background/80">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-2 max-w-3xl mx-auto">
          <h2 className="text-3xl tracking-tighter font-bold text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-center">
            Check out the most common questions and answers.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible>
            {faqs.map((item, index) => (
              <AccordionItem key={index} value={index.toString()}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
