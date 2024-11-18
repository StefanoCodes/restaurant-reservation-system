import SectionHeading from "@/app/(marketing)/_components/utils/section-heading";
import { templateTwoConfig } from "@/app/(marketing)/_templates/_template-two/marketing.config";
import Stat from "./stat";
import FrequentlyAskedQuestion from "@/app/(marketing)/_components/utils/frequently-asked-question";
import { Accordion } from "@/components/ui/accordion";
const { faq, heading, description } = templateTwoConfig.FAQ;
export default function Faq() {
  return (
    <section className="relative">
      {/* Container */}
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-5 py-16 md:px-10 md:py-20">
        {/* Component */}
        <div className="mx-auto mb-8 flex flex-col items-center text-center md:mb-12 lg:mb-16">
          <SectionHeading title={heading} className="text-gradient" />
          <p className="text-gradient mx-auto mb-8 mt-4 max-w-lg">
            {description}
          </p>
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-8"
          >
            {faq.map(({ question, answer, id }, idx) => (
              <FrequentlyAskedQuestion
                key={id}
                question={question}
                answer={answer}
                id={id}
              />
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
