"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { MarketingTemplate } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useActionState } from "react";
import { updateMarketingTemplateAction } from "../../_actions/actions";
import { useToast } from "@/hooks/use-toast";
export default function TemplateCard({
  template,
  index,
}: {
  template: MarketingTemplate;
  index: number;
}) {
  const { toast } = useToast();
  const isSelected = template.selected;
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, templateId: string) => {
      const response = await updateMarketingTemplateAction(templateId);
      if (response.success) {
        toast({
          title: response.message,
        });
      } else {
        toast({
          title: response.message,
        });
      }
      return response;
    },
    null,
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
        <CardHeader
          className={cn("px-4 py-6 text-white")}
          style={{
            background: `linear-gradient(to right, ${template.templateColors.join(", ")})`,
          }}
        >
          <CardTitle className="text-xl font-bold">
            {template.templateName}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="mb-4 text-sm text-gray-600">
            {template.templateDescription}
          </p>
          <div className="flex space-x-2">
            {template.templateColors.map((color, colorIndex) => (
              <motion.div
                key={colorIndex}
                {...(colorIndex === 0 && {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.3, delay: colorIndex * 0.1 },
                  className:
                    "h-8 w-8 rounded-full border-2 border-white shadow-md",
                })}
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                }}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 px-4 py-4">
          <form action={(formData) => formAction(template.id)}>
            <Button
              type="submit"
              variant="outline"
              disabled={isSelected || isPending}
              className={cn(
                `w-full transition-all duration-300 ease-in-out hover:bg-white hover:text-black`,
                isSelected && "bg-green-500 text-white",
              )}
            >
              {isPending
                ? "Updating..."
                : isSelected
                  ? "Selected"
                  : "Select Template"}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

{
  /*  */
}
