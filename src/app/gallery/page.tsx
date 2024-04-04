"use client";

import React, { useState } from "react";
import TShirtView from "../ui/t-shirt-view";
import CreateTShirt from "../ui/create-t-shirt";
import { tShirts } from "../lib/placeholder-data";

export default function Page() {
  const [isAddNew, setIsAddNew] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-10">
      <h1 className="text-4xl">T-Shirt Gallery</h1>
      {!isAddNew && <button
        className="btn btn-primary"
        onClick={() => {
          setIsAddNew(true);
        }}
      >
        Add New
      </button>}
      <div className="grid grid-cols-4 gap-4">
        {isAddNew && <CreateTShirt onCancel={() => setIsAddNew(false)} />}
        {tShirts.map((tShirt) => (
          <TShirtView key={tShirt.name} tShirt={tShirt} />
        ))}
      </div>
    </div>
  );
}
