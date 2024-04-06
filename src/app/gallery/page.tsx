"use client";

import React, { useState } from "react";
import TShirtView from "../ui/t-shirt-view";
import { tShirts } from "../lib/placeholder-data";
import CreateTShirtForm from "../ui/create-t-shirt-form";
import { TShirt } from "../lib/definitions";
import EditTShirtForm from "../ui/edit-t-shirt-form";

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
  const [dummyTShirts, setDummyTShirts] = useState<TShirt[]>([]);

  return (
    <div className="flex flex-col items-center space-y-10">
      <h1 className="text-4xl">T-Shirt Gallery</h1>
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
          <CreateTShirtForm
            key={"add-new"}
            onSuccessAdd={(success, tShirts) => {
              setIsAddNew(!success);
              setDummyTShirts(tShirts);
            }}
            onCancel={() => setIsAddNew(false)}
            tShirts={dummyTShirts}
          />
        )}
        {dummyTShirts.map((tShirt) => {
          if (isEditState.edit && tShirt.id == isEditState.id) {
            return (
              <EditTShirtForm
                key={isEditState.id}
                onCancel={() => {
                  setIsEditState({ edit: false, id: "" });
                }}
                onSuccessSave={(value, tShirts) => {
                  if (value) {
                    setIsEditState({ edit: value, id: "" });
                    setDummyTShirts(tShirts);
                  } else {
                    setIsEditState({ edit: !value, id: isEditState.id });
                  }
                }}
                tShirt={tShirt}
                tShirts={dummyTShirts}
              />
            );
          }

          return (
            <TShirtView
              key={tShirt.id}
              tShirt={tShirt}
              onEdit={() => {
                setIsEditState({ edit: true, id: tShirt.id });
              }}
              onDelete={() => {
                setDummyTShirts(dummyTShirts.filter((t) => t.id !== tShirt.id));
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
