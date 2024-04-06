"use client";

import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { Item } from "./definitions";

const FormSchema = z.object({
  id: z.string(),
  file: z
    .instanceof(File)
    .refine((file: File) => file.size !== 0, "Image is required")
    .refine((file) => {
      return !file || file.size <= 1024 * 1024 * 3;
    }, "File size must be less than 3MB"),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

const CreateItem = FormSchema.omit({ id: true });
const UpdateItem = FormSchema.omit({ id: true });

export type ItemState = {
  errors?: {
    file?: string[];
    name?: string[];
    description?: string[];
  };
  message?: string | null;
  success?: boolean;
  items: Item[];
  editId?: string;
};

export async function deleteItem(
  prevState: ItemState,
  formData: FormData
) {}

export async function createItem(prevState: ItemState, formData: FormData) {
  const validatedFields = CreateItem.safeParse({
    file: formData.get("url"),
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return <ItemState>{
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice",
      success: false,
      items: prevState.items,
    };
  }

  try {
    const { file, name, description } = validatedFields.data;

    let newItems = prevState.items?.concat({
      id: uuidv4(),
      file: file,
      name: name,
      description: description,
    });

    return <ItemState>{
      message: "Successfully loaded a new item",
      errors: {},
      success: true,
      items: newItems,
    };
  } catch (error) {
    return <ItemState>{
      message: "Database Error: Failed to Create Invoice.",
      errors: error,
      success: false,
      items: prevState.items,
    };
  }
}

export async function updateItem(prevState: ItemState, formData: FormData) {
  let itemFile = prevState.items.find(
    (item) => item.id == prevState.editId
  )?.file;

  let formDataFile = formData.get('url');
  let file: File | undefined;

  if (formDataFile instanceof File && formDataFile.size > 0) {
    file = formDataFile;
  }else {
    file = itemFile;
  }
  
  const validatedFields = UpdateItem.safeParse({
    file: file,
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return <ItemState>{
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create invoice",
      success: false,
      items: prevState.items,
    };
  }

  try {
    const { file, name, description } = validatedFields.data;

    let newItems = prevState.items?.map((item) => {
      if (item.id == prevState.editId) {
        return <Item>{
          file: file,
          name: name,
          description: description,
        };
      }

      return item;
    });

    return <ItemState>{
      message: "Successfully updated a item",
      errors: {},
      success: true,
      items: newItems,
    };
  } catch (error) {
    return <ItemState>{
      message: "Database Error: Failed to update gallery",
      errors: error,
      success: false,
      items: prevState.items,
    };
  }
}
