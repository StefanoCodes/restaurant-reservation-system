"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submit-button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { addNewAdminAction } from "../../_actions/actions";
import AddNewButton from "../../_components/add-new-button";
import { Button } from "@/components/ui/button";
import FormErrorMessage from "../../_components/form-error-message";
export default function AddNewAdminDialog() {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<
    | {
        name?: string[];
        email?: string[];
        password?: string[];
        phoneNumber?: string[];
      }
    | undefined
  >();
  const { toast } = useToast();
  const handleAddNewAdmin = async (formData: FormData) => {
    const addNewAdminResponse = await addNewAdminAction(formData);

    if (addNewAdminResponse?.success) {
      setOpen(false);
      toast({
        title: addNewAdminResponse.message,
        className: "bg-[#222] text-white",
      });
    } else {
      setErrors(addNewAdminResponse?.error);
      if (!addNewAdminResponse?.error) {
        toast({
          title: addNewAdminResponse?.message,
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <span className="flex items-center space-x-2">
            <span>Add New Admin</span>
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
          <DialogDescription>
            Enter the details for the new admin. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form action={handleAddNewAdmin}>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="name" className="w-[100px] text-left">
                  Name
                </Label>
                <div className="flex-1">
                  <Input
                    onFocus={() => {
                      setErrors(undefined);
                    }}
                    id="name"
                    name="name"
                    placeholder="Enter the name of the admin"
                    required
                  />
                  {errors?.name && (
                    <p className="mt-1 text-sm text-red-500">{errors?.name}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="phoneNumber" className="w-[100px] text-left">
                  Phone Number
                </Label>
                <div className="flex-1">
                  <Input
                    onFocus={() => {
                      setErrors(undefined);
                    }}
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter the phone number of the admin"
                    required
                  />
                  {errors?.phoneNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors?.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="email" className="w-[100px] text-left">
                  Email
                </Label>
                <div className="flex-1">
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter the email of the admin"
                    required
                    onFocus={() => {
                      setErrors(undefined);
                    }}
                  />
                  {errors?.email && (
                    <p className="mt-1 text-sm text-red-500">{errors?.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="password" className="w-[100px] text-left">
                  Password
                </Label>
                <div className="flex-1">
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter the password of the admin"
                    required
                    onFocus={() => {
                      setErrors(undefined);
                    }}
                  />
                  {errors?.password && (
                    <FormErrorMessage
                      className="mt-1"
                      errorMessage={errors?.password}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <SubmitButton
              variant={"default"}
              className="bg-green-500 hover:bg-green-700"
            >
              Save
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
