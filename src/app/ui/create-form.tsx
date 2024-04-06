import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormState } from "react-dom";
import { ItemState, createItem } from "../lib/actions";
import { Item } from "../lib/definitions";

export default function CreateForm({
  onCancel,
  onSuccessAdd,
  items,
}: {
  onCancel: () => void;
  onSuccessAdd: (success: boolean, items: Item[]) => void;
  items: Item[];
}) {
  const initialState = {
    message: null,
    errors: {},
    success: false,
    items: items,
  };
  const [state, dispatch] = useFormState<ItemState, FormData>(
    createItem,
    initialState
  );
  const [file, setFile] = useState("");

  useEffect(() => {
    if (state.success) {
      onSuccessAdd(true, state.items);
    } else {
      onSuccessAdd(false, state.items);
    }

    return () => {};
  }, [state.success]);

  return (
    <form action={dispatch} className="p-8 m-5">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <div className="flex items-center justify-center relative w-[75%]">
            {file ? (
              <div
                style={{
                  position: "relative",
                  width: "250px",
                  height: "250px",
                }}
              >
                <Image
                  src={file}
                  alt="Picture of the item"
                  sizes="250px"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  className="border-"
                />
              </div>
            ) : (
              <div className="w-[250px] h-[250px] flex items-center justify-center"></div>
            )}
            <input
              type="file"
              id="url"
              name="url"
              accept="image/*"
              aria-describedby="url-error"
              className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 file-input file-input-bordered file-input-sm w-full max-w-xs place-content-center"
              onChange={(e) => {
                setFile(URL.createObjectURL(e.target.files![0]));
              }}
            />
          </div>
        </figure>
        <div className="divider"></div> 
        <div className="px-9" id="url-error" aria-live="polite" aria-atomic="true">
          {state.errors?.file &&
            state.errors.file.map((error: string) => (
              <p className="text-sm text-red-500">{error}</p>
            ))}
        </div>
        <div className="card-body" >
          <label htmlFor="name" className="pb-4">
            <span>Name:</span>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name of item..."
              className="input input-bordered w-full max-w-xs"
              aria-describedby="name-error"
            />
          </label>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="text-sm text-red-500">{error}</p>
              ))}
          </div>
          <div className="divider"></div> 
          <label className="flex flex-col">
            <span>Description:</span>
            <textarea
              id="description"
              name="description"
              className="textarea textarea-bordered"
              placeholder="Description of item..."
            ></textarea>
          </label>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="text-sm text-red-500">{error}</p>
              ))}
          </div>
          <div className="divider"></div> 
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
