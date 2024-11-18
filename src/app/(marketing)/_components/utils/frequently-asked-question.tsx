import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FrequentlyAskedQuestion({
  question,
  answer,
  id,
}: {
  question: string;
  answer: string;
  id: string;
}) {
  return (
    <AccordionItem value={id} className="max-w-xl">
      <AccordionTrigger>{question}</AccordionTrigger>
      <AccordionContent className="text-left">{answer}</AccordionContent>
    </AccordionItem>
  );
}
