// "use client";

// import * as React from "react";
// import { Check, ChevronsUpDown, X } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Badge } from "@/components/ui/badge";

// // Sample data - replace with your own data source
// const frameworks = [
//   { value: "next.js", label: "Next.js" },
//   { value: "sveltekit", label: "SvelteKit" },
//   { value: "nuxt", label: "Nuxt.js" },
//   { value: "remix", label: "Remix" },
//   { value: "astro", label: "Astro" },
//   { value: "wordpress", label: "WordPress" },
//   { value: "express", label: "Express.js" },
//   { value: "nest", label: "NestJS" },
// ];

// interface MultiSelectProps {
//   placeholder?: string;
//   options: { value: string; label: string }[];
//   onChange?: (values: string[] | any[]) => void;
//   defaultValues?: string[];
//   className?: string;
// }

// export function MultiSelect({
//   placeholder = "Select Members...",
//   options,
//   onChange,
//   defaultValues = [],
//   className,
// }: MultiSelectProps) {
//   const [open, setOpen] = React.useState(false);
//   const [selected, setSelected] = React.useState<string[]>(defaultValues);
//   const [inputValue, setInputValue] = React.useState("");

//   const handleUnselect = (value: string) => {
//     const newSelected = selected.filter((item) => item !== value);
//     setSelected(newSelected);
//     onChange?.(newSelected);
//   };

//   const handleSelect = (value: string) => {
//     const newSelected = selected.includes(value)
//       ? selected.filter((item) => item !== value)
//       : [...selected, value];
//     setSelected(newSelected);
//     onChange?.(newSelected);
//     setInputValue("");
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className={cn("w-full justify-between", className)}
//         >
//           <div className="flex flex-wrap gap-1 items-center max-w-full overflow-hidden">
//             {selected.length === 0 ? (
//               <span className="text-muted-foreground">{placeholder}</span>
//             ) : selected.length <= 2 ? (
//               // Show all badges if 2 or fewer items are selected
//               selected.map((value) => {
//                 const option = options.find((option) => option.value === value);
//                 return (
//                   <Badge
//                     key={value}
//                     variant="secondary"
//                     className="mr-1 px-2 py-0"
//                   >
//                     {option?.label}
//                     <button
//                       className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                       onMouseDown={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                       }}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         handleUnselect(value);
//                       }}
//                     >
//                       <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
//                       <span className="sr-only">Remove {option?.label}</span>
//                     </button>
//                   </Badge>
//                 );
//               })
//             ) : (
//               // Show limited badges with a count for the rest
//               <>
//                 {/* Show first item */}
//                 {(() => {
//                   const value = selected[0];
//                   const option = options.find(
//                     (option) => option.value === value
//                   );
//                   return (
//                     <Badge
//                       key={value}
//                       variant="secondary"
//                       className="mr-1 px-2 py-0"
//                     >
//                       {option?.label}
//                       <button
//                         className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                         onMouseDown={(e) => {
//                           e.preventDefault();
//                           e.stopPropagation();
//                         }}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           e.stopPropagation();
//                           handleUnselect(value);
//                         }}
//                       >
//                         <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
//                         <span className="sr-only">Remove {option?.label}</span>
//                       </button>
//                     </Badge>
//                   );
//                 })()}

//                 {/* Show count badge */}
//                 <Badge variant="secondary" className="px-2 py-0">
//                   +{selected.length - 1} more
//                 </Badge>
//               </>
//             )}
//           </div>
//           <ChevronsUpDown className="h-4 w-4 text-slate-200 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-full text-slate-200 p-0 bg-gray-950 border-gray-800">
//         <Command className="w-full border-gray-800 bg-gray-950">
//           <CommandInput
//             className="text-slate-200 border-none focus-visible:ring-0 focus-visible:border-none"
//             placeholder="Search items..."
//             value={inputValue}
//             onValueChange={setInputValue}
//           />
//           <CommandList className="border-gray-800">
//             <CommandEmpty>No item found.</CommandEmpty>
//             <CommandGroup className="max-h-64 overflow-auto ">
//               <CommandItem
//                 value="select-all"
//                 onSelect={() => {
//                   if (selected.length === options.length) {
//                     // If all are selected, unselect all
//                     setSelected([]);
//                     onChange?.([]);
//                   } else {
//                     // Otherwise, select all
//                     const allValues = options.map((option) => option.value);
//                     setSelected(allValues);
//                     onChange?.(allValues);
//                     className = "border-gray-800 hover:text-black";
//                   }
//                 }}
//               >
//                 <Check
//                   className={cn(
//                     "mr-2 h-4 w-4",
//                     selected.length === options.length
//                       ? "opacity-100"
//                       : "opacity-0"
//                   )}
//                 />
//                 <span className="font-medium text-slate-200 hover:text-black">
//                   Select All
//                 </span>
//               </CommandItem>

//               {options.length > 0 && <div className="my-1 h-px bg-muted" />}

//               {options.map((option) => (
//                 <CommandItem
//                   key={option.value}
//                   value={option.value}
//                   onSelect={() => handleSelect(option.value)}
//                   className="text-slate-200"
//                 >
//                   <Check
//                     className={cn(
//                       "mr-2 h-4 w-4",
//                       selected.includes(option.value)
//                         ? "opacity-100"
//                         : "opacity-0"
//                     )}
//                   />
//                   {option.label}
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }

"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface MultiSelectProps {
  placeholder?: string;
  options: { value: string; label: string }[];
  onChange?: (values: { value: string; label: string }[]) => void;
  value?: { value: string; label: string }[];
  className?: string;
}

export function MultiSelect({
  placeholder = "Select Members...",
  options,
  onChange,
  value = [],
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] =
    React.useState<{ value: string; label: string }[]>(value);
  const [inputValue, setInputValue] = React.useState("");

  // Update selected state when value prop changes (for controlled component)
  React.useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  const handleUnselect = (valueToRemove: string) => {
    const newSelected = selected.filter((item) => item.value !== valueToRemove);
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const handleSelect = (valueToSelect: string) => {
    const option = options.find((opt) => opt.value === valueToSelect);

    if (!option) return;

    const isAlreadySelected = selected.some(
      (item) => item.value === valueToSelect
    );

    const newSelected = isAlreadySelected
      ? selected.filter((item) => item.value !== valueToSelect)
      : [...selected, option];

    setSelected(newSelected);
    onChange?.(newSelected);
    setInputValue("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <div className="flex py-3 flex-wrap gap-1 items-center max-w-full overflow-hidden">
            {selected.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : selected.length <= 2 ? (
              // Show all badges if 2 or fewer items are selected
              selected.map((item) => (
                <Badge
                  key={item.value}
                  variant="secondary"
                  className="mr-1 px-2 py-0"
                >
                  {item.label}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnselect(item.value);
                    }}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    <span className="sr-only">Remove {item.label}</span>
                  </button>
                </Badge>
              ))
            ) : (
              // Show limited badges with a count for the rest
              <>
                {/* Show first item */}
                <Badge
                  key={selected[0].value}
                  variant="secondary"
                  className="mr-1 px-2 py-0"
                >
                  {selected[0].label}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnselect(selected[0].value);
                    }}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    <span className="sr-only">Remove {selected[0].label}</span>
                  </button>
                </Badge>

                {/* Show count badge */}
                <Badge variant="secondary" className="px-2 py-0">
                  +{selected.length - 1} more
                </Badge>
              </>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 text-slate-200 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full text-slate-200 p-0 bg-gray-950 border-gray-800">
        <Command className="w-full border-gray-800 bg-gray-950">
          <CommandInput
            className="text-slate-200 border-none focus-visible:ring-0 focus-visible:border-none"
            placeholder="Search members..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList className="border-gray-800">
            <CommandEmpty>No member found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto ">
              <CommandItem
                value="select-all"
                onSelect={() => {
                  if (selected.length === options.length) {
                    // If all are selected, unselect all
                    setSelected([]);
                    onChange?.([]);
                  } else {
                    // Otherwise, select all
                    const allOptions = [...options];
                    setSelected(allOptions);
                    onChange?.(allOptions);
                  }
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.length === options.length
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <span className="font-medium text-slate-200 hover:text-black">
                  Select All
                </span>
              </CommandItem>

              {options.length > 0 && <div className="my-1 h-px bg-muted" />}

              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className="text-slate-200"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.some((item) => item.value === option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
