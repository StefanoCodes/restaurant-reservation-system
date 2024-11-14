"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { TemplateNames } from "@/lib/types";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { updateMarketingTemplateAction } from "../_actions/actions";
type Errors = {
  templateName: string;
};
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

export default function MarketingTemplate() {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Errors | undefined>(undefined);
  //   useActionState hook
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const response = await updateMarketingTemplateAction(formData);
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
    <form action={formAction} className="w-full p-4 md:p-6">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-2xl font-bold">
            Marketing Template
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 px-4 md:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <Label
              htmlFor={`booking-duration-interval`}
              className="text-sm font-medium md:min-w-[80px]"
            >
              Template:
            </Label>
            <Select name="templateName">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TemplateOne">Template One</SelectItem>
                <SelectItem value="TemplateTwo">Template Two</SelectItem>
                <SelectItem value="TemplateThree">Template Three</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errors?.templateName && (
            <span className="text-sm">
              <p className="text-red-500">{errors.templateName}</p>
            </span>
          )}
        </CardContent>
        <CardFooter className="px-4 pb-6 md:px-6">
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
