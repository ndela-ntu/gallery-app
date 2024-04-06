import React, { useEffect, useState } from "react";
import { TShirt } from "../lib/definitions";
import { useFormState } from "react-dom";
import { TShirtState, updateTShirt } from "../lib/actions";
import Image from "next/image";

export default function EditTShirtForm({
  onCancel,
  onSuccessSave,
  tShirt,
  tShirts,
}: {
  onCancel: () => void;
  onSuccessSave: (success: boolean, tShirts: TShirt[]) => void;
  tShirt: TShirt;
  tShirts: TShirt[];
}) {
  const initialState = {
    message: null,
    errors: {},
    success: false,
    tShirts: tShirts,
    editId: tShirt.id,
  };

  const [state, dispatch] = useFormState<TShirtState, FormData>(
    updateTShirt,
    initialState
  );
  const [file, setFile] = useState("");

  useEffect(() => {
    if (state.success) {
      onSuccessSave(true, state.tShirts);
    } else {
      onSuccessSave(false, state.tShirts);
    }

    return () => {};
  }, [state.success]);

  return (
    <form key={tShirt.id} action={dispatch}>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <div className="flex items-center justify-center relative w-[75%]">
            <div
              style={{
                position: "relative",
                width: "250px",
                height: "250px",
              }}
            >
              <Image
                src={file ? file : URL.createObjectURL(tShirt.file)}
                alt="Picture of the author"
                sizes="250px"
                fill
                style={{
                  objectFit: "contain",
                }}
                className="border-"
              />
            </div>
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
        <div id="url-error" aria-live="polite" aria-atomic="true">
          {state.errors?.file &&
            state.errors.file.map((error: string) => (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            ))}
        </div>
        <div className="card-body">
          <label htmlFor="name">
            <span>Name:</span>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name of t-shirt..."
              className="input input-bordered w-full max-w-xs"
              aria-describedby="name-error"
              defaultValue={tShirt.name}
            />
          </label>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              ))}
          </div>
          <label>
            <span>Description:</span>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Description of t-shirt..."
              className="input input-bordered w-full max-w-xs"
              defaultValue={tShirt.description}
            />
          </label>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              ))}
          </div>
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
