import React from "react";
import { TShirt } from "../lib/definitions";
import Image from "next/image";

export default function TShirtView({ tShirt }: { tShirt: TShirt }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <div className="w-64 h-64 flex items-center justify-center">
          <Image
            key={tShirt.name}
            src={`/t-shirts/${tShirt.url}`}
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
          <button className="btn btn-primary">Edit</button>
        </div>
      </div>
    </div>
  );
}
