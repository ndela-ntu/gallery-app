import React from "react";
import { Item } from "../lib/definitions";
import Image from "next/image";

export default function View({
  item,
  onDelete,
  onEdit,
}: {
  item: Item;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <div key={item.id} className="card w-96 bg-base-100 shadow-xl p-8 m-5">
      <figure className='py-4'>
        <div className=" w-[250px] h-[250px] flex items-center justify-center">
          <Image
            src={URL.createObjectURL(item.file)}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={250}
            height={250}
            alt="Image of item"
          />
        </div>
      </figure>
      <div className="divider"></div> 
      <div className="card-body">
        <h2 className="py-8 card-title text-2xl">{item.name}</h2>
        <div className="divider"></div> 
        <p className="py-5">{item.description}</p>
        <div className="divider"></div> 
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={onDelete}>
            Delete
          </button>
          <button className="btn btn-primary" onClick={onEdit}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
