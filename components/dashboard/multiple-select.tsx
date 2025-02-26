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

// Sample data - replace with your own data source
const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "wordpress", label: "WordPress" },
  { value: "express", label: "Express.js" },
  { value: "nest", label: "NestJS" },
];

interface MultiSelectProps {
  placeholder?: string;
  options: { value: string; label: string }[];
  onChange?: (values: string[]) => void;
  defaultValues?: string[];
  className?: string;
}

export function MultiSelect({
  placeholder = "Select items...",
  options,
  onChange,
  defaultValues = [],
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(defaultValues);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (value: string) => {
    const newSelected = selected.filter((item) => item !== value);
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const handleSelect = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
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
          <div className="flex flex-wrap gap-1 items-center max-w-full overflow-hidden">
            {selected.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : selected.length <= 2 ? (
              // Show all badges if 2 or fewer items are selected
              selected.map((value) => {
                const option = options.find((option) => option.value === value);
                return (
                  <Badge
                    key={value}
                    variant="secondary"
                    className="mr-1 px-2 py-0"
                  >
                    {option?.label}
                    <button
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleUnselect(value);
                      }}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      <span className="sr-only">Remove {option?.label}</span>
                    </button>
                  </Badge>
                );
              })
            ) : (
              // Show limited badges with a count for the rest
              <>
                {/* Show first item */}
                {(() => {
                  const value = selected[0];
                  const option = options.find(
                    (option) => option.value === value
                  );
                  return (
                    <Badge
                      key={value}
                      variant="secondary"
                      className="mr-1 px-2 py-0"
                    >
                      {option?.label}
                      <button
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleUnselect(value);
                        }}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                        <span className="sr-only">Remove {option?.label}</span>
                      </button>
                    </Badge>
                  );
                })()}

                {/* Show count badge */}
                <Badge variant="secondary" className="px-2 py-0">
                  +{selected.length - 1} more
                </Badge>
              </>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full">
          <CommandInput
            placeholder="Search items..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              <CommandItem
                value="select-all"
                onSelect={() => {
                  if (selected.length === options.length) {
                    // If all are selected, unselect all
                    setSelected([]);
                    onChange?.([]);
                  } else {
                    // Otherwise, select all
                    const allValues = options.map((option) => option.value);
                    setSelected(allValues);
                    onChange?.(allValues);
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
                <span className="font-medium">Select All</span>
              </CommandItem>

              {options.length > 0 && <div className="my-1 h-px bg-muted" />}

              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(option.value)
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

// export default function MultiSelectDemo() {
//   const [values, setValues] = React.useState<string[]>([]);

//   return (
//     <div className="w-full max-w-md mx-auto p-4 space-y-4">
//       <h1 className="text-xl font-bold">Multi-Select with Search</h1>
//       <MultiSelect
//         options={frameworks}
//         onChange={setValues}
//         placeholder="Select frameworks..."
//       />
//       <div className="text-sm">
//         <p>Selected values:</p>
//         <pre className="mt-2 rounded-md bg-muted p-4">
//           {JSON.stringify(values, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// }
