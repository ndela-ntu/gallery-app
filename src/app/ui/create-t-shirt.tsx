import React, { useState } from "react";
import Image from "next/image";

export default function CreateTShirt({ onCancel }: { onCancel: () => void }) {
  const [file, setFile] = useState("");

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <div className="w-64 h-64 flex items-center justify-center">
          <div className="stack">
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-sm w-full max-w-xs place-content-center"
              onChange={(e) => {
                setFile(URL.createObjectURL(e.target.files![0]));
              }}
            />
            {file ? (
              <Image
                src={file}
                width={150}
                height={150}
                alt="Image of T-Shirt"
                className=""
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </figure>
      <div className="card-body">
        <input
          type="text"
          placeholder="Name of t-shirt..."
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Description of t-shirt..."
          className="input input-bordered w-full max-w-xs"
        />
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
