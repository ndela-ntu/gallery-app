import React, { useEffect, useState } from "react";
import { Item } from "../lib/definitions";
import { useFormState } from "react-dom";
import { ItemState, updateItem } from "../lib/actions";
import Image from "next/image";

export default function EditForm({
  onCancel,
  onSuccessSave,
  item,
  items,
}: {
  onCancel: () => void;
  onSuccessSave: (success: boolean, items: Item[]) => void;
  item: Item;
  items: Item[];
}) {

  const initialState = {
    message: null,
    errors: {},
    success: false,
    items: items,
  };

  const updateItemWithId = updateItem.bind(null, item.id, items);

  const [state, dispatch] = useFormState<ItemState, FormData>(
    updateItemWithId,
    initialState
  );

  const [file, setFile] = useState("");

  useEffect(() => {
    console.log(state.items);
    if (state.success) {
      onSuccessSave(true, state.items);
    } else {
      onSuccessSave(false, state.items);
    }

    return () => {
      console.log('Unmounted component 2')
    };
  }, [state]);

  return (
    <form action={dispatch} className="p-8 m-5">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <div className="flex items-center justify-center relative w-[75%]">
            <Image
              src={file ? file : URL.createObjectURL(item.file)}
              alt="Image of item"
              width={250}
              height={250}
            />

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
        <div className="card-body">
          <label htmlFor="name" className="pb-4">
            <span>Name:</span>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name of item..."
              className="input input-bordered w-full max-w-xs"
              aria-describedby="name-error"
              defaultValue={item.name}
            />
          </label>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
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
              defaultValue={item.description}
            ></textarea>
          </label>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string, i) => (
                <p key={i} className="text-sm text-red-500">
                  {error}
                </p>
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
