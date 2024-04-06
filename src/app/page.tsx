"use client";

import React, { useState } from "react";
import { Item } from "./lib/definitions";
import View from "./ui/view";
import CreateForm from "./ui/create-form";
import EditForm from "./ui/edit-form";

interface EditState {
  edit: boolean;
  id: string;
}

export default function Page() {
  const [isAddNew, setIsAddNew] = useState(false);
  const [isEditState, setIsEditState] = useState<EditState>({
    edit: false,
    id: "",
  });
  const [dummyItems, setDummyItems] = useState<Item[]>([]);

  return (
    <div className="flex flex-col items-center bg-gradient-to-l from-[#6f4df7] to-[#C3DFE0] ">
      <header>
        <h1 className="text-4xl">Item Gallery</h1>
      </header>
      <main className="min-h-screen p-6">
        <div className="flex flex-col items-center space-y-10">
          {!isAddNew && (
            <button
              className="btn btn-primary"
              onClick={() => {
                setIsAddNew(true);
              }}
            >
              Add New
            </button>
          )}
          <div className="flex flex-row flex-wrap">
            {isAddNew && (
              <CreateForm
                key={"add-new"}
                onSuccessAdd={(success, items) => {
                  setIsAddNew(!success);
                  setDummyItems(items);
                }}
                onCancel={() => setIsAddNew(false)}
                items={dummyItems}
              />
            )}
            {dummyItems.map((item) => {
              if (isEditState.edit && item.id == isEditState.id) {
                return (
                  <EditForm
                    key={item.id}
                    onCancel={() => {
                      setIsEditState({ edit: false, id: "" });
                    }}
                    onSuccessSave={(value, items) => {
                      if (value) {
                        setIsEditState({ edit: value, id: "" });
                        setDummyItems(items);
                      } else {
                        setIsEditState({ edit: !value, id: isEditState.id });
                      }
                    }}
                    item={item}
                    items={dummyItems}
                  />
                );
              }

              return (
                <View
                  key={item.id}
                  item={item}
                  onEdit={() => {
                    setIsEditState({ edit: true, id: item.id });
                  }}
                  onDelete={() => {
                    setDummyItems(dummyItems.filter((t) => t.id !== item.id));
                  }}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
