"use client";

import { useState } from "react";
import {
  Star,
  Bell,
  ChevronDown,
  Zap,
  SlidersHorizontal,
  MoreHorizontal,
  Plus,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Team } from "@prisma/client";

interface Card {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export default function TeamBoard({ team }: { team: Team | null }) {
  const [columns, setColumns] = useState<Column[]>([
    { id: "1", title: "To Do", cards: [] },
    { id: "2", title: "In Progress", cards: [] },
    { id: "3", title: "Done", cards: [] },
  ]);

  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [newCardContent, setNewCardContent] = useState("");

  const startAddingCard = (columnId: string) => {
    setActiveColumn(columnId);
    setNewCardContent("");
  };

  const cancelAddingCard = () => {
    setActiveColumn(null);
    setNewCardContent("");
  };

  const confirmAddCard = () => {
    if (!activeColumn || !newCardContent.trim()) {
      cancelAddingCard();
      return;
    }

    setColumns(
      columns.map((column) => {
        if (column.id === activeColumn) {
          return {
            ...column,
            cards: [
              ...column.cards,
              { id: Math.random().toString(), content: newCardContent.trim() },
            ],
          };
        }
        return column;
      })
    );

    setActiveColumn(null);
    setNewCardContent("");
  };

  const addColumn = () => {
    setColumns([
      ...columns,
      {
        id: Math.random().toString(),
        title: "New List",
        cards: [],
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">{team?.name}</h1>
          <Button variant="ghost" size="icon" className="text-white">
            <Star className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Bell className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-white">
            <Zap className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-white">Filters</span>
          </div>
          <Button
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white"
          >
            Share
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex gap-4 p-4 overflow-x-auto">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-64 bg-white/10 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">{column.title}</h3>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white/70 hover:text-white"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white/70 hover:text-white"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white text-black rounded p-2 shadow"
                >
                  {card.content}
                </div>
              ))}

              {activeColumn === column.id && (
                <div className="bg-white rounded p-2 shadow">
                  <input
                    className="w-full border-none resize-none focus:outline-none text-black"
                    placeholder="Enter card content..."
                    value={newCardContent}
                    onChange={(e) => setNewCardContent(e.target.value)}
                    autoFocus
                  />
                  <div className="flex justify-end mt-2 gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={cancelAddingCard}
                      className="p-1 h-6 text-gray-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={confirmAddCard}
                      className="p-1 h-6 bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {activeColumn !== column.id && (
              <button
                onClick={() => startAddingCard(column.id)}
                className="flex items-center gap-2 text-white/80 hover:text-white mt-4 w-full"
              >
                <Plus className="h-4 w-4" />
                <span>Add a card</span>
                <div className="flex-grow"></div>
                {/* <Copy className="h-4 w-4" /> */}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
