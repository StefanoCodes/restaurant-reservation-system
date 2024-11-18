// "use client";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Button } from "@/components/ui/button";
// import { Edit2 } from "lucide-react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";

// export default function EditContentButton({
//   children,
//   content,
//   type = "text",
// }: {
//   children: React.ReactNode;
//   content: string;
//   type: "text" | "image";
// }) {
//   return (
//     <Popover>
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <PopoverTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute -right-6 top-0 h-6 w-6 rounded-full bg-primary text-primary-foreground"
//               >
//                 <Edit2 className="h-3 w-3" />
//                 <span className="sr-only">Edit content</span>
//               </Button>
//             </PopoverTrigger>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Edit {type}</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//       <PopoverContent className="w-80">
//         <div className="grid gap-4">
//           <div className="space-y-2">
//             <h4 className="font-medium leading-none">Edit {type}</h4>
//             <p className="text-sm text-muted-foreground">
//               Make changes to your {type} here. Click save when you're done.
//             </p>
//           </div>
//           <div className="grid gap-2">
//             <div className="grid grid-cols-3 items-center gap-4">
//               <Label htmlFor="content">Content</Label>

//               {type === "image" ? (
//                 <Input
//                   id="content"
//                   defaultValue={content}
//                   className="col-span-2"
//                   type="file"
//                   accept="image/*"
//                 />
//               ) : (
//                 <Input
//                   id="content"
//                   defaultValue={content}
//                   className="col-span-2"
//                 />
//               )}
//               {children}
//             </div>
//           </div>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }
