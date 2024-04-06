import React from "react";
import { TShirt } from "../lib/definitions";
import Image from "next/image";

export default function TShirtView({
  tShirt,
  onDelete,
  onEdit,
}: {
  tShirt: TShirt;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <div className="w-[250px] h-[250px] flex items-center justify-center">
          <Image
            src={`/t-shirts/${tShirt.file.name}`}
            width={150}
            height={150}
            alt="Image of T-Shirt"
          />
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{tShirt.name}</h2>
        <p>{tShirt.description}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={onDelete}>
            Delete
          </button>
          <button className="btn btn-primary" onClick={onEdit}>Edit</button>
        </div>
      </div>
    </div>
  );
}
