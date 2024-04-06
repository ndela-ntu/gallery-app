"use client";

import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { TShirt } from "./definitions";

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

const CreateTShirt = FormSchema.omit({ id: true });
const UpdateTShirt = FormSchema.omit({ id: true });

export type TShirtState = {
  errors?: {
    file?: string[];
    name?: string[];
    description?: string[];
  };
  message?: string | null;
  success?: boolean;
  tShirts: TShirt[];
  editId?: string;
};

export async function deleteTShirt(
  prevState: TShirtState,
  formData: FormData
) {}

export async function createTShirt(prevState: TShirtState, formData: FormData) {
  const validatedFields = CreateTShirt.safeParse({
    file: formData.get("url"),
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return <TShirtState>{
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice",
      success: false,
      tShirts: prevState.tShirts,
    };
  }

  try {
    const { file, name, description } = validatedFields.data;

    let newTShirts = prevState.tShirts?.concat({
      id: uuidv4(),
      file: file,
      name: name,
      description: description,
    });

    return <TShirtState>{
      message: "Successfully loaded a new T-shirt",
      errors: {},
      success: true,
      tShirts: newTShirts,
    };
  } catch (error) {
    return <TShirtState>{
      message: "Database Error: Failed to Create Invoice.",
      errors: error,
      success: false,
      tShirts: prevState.tShirts,
    };
  }
}

export async function updateTShirt(prevState: TShirtState, formData: FormData) {
  let tShirtFile = prevState.tShirts.find(
    (tShirt) => tShirt.id == prevState.editId
  )?.file;

  let formDataFile = formData.get('url');
  let file: File | undefined;

  if (formDataFile instanceof File && formDataFile.size > 0) {
    file = formDataFile;
  }else {
    file = tShirtFile;
  }
  
  const validatedFields = UpdateTShirt.safeParse({
    file: file,
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return <TShirtState>{
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create invoice",
      success: false,
      tShirts: prevState.tShirts,
    };
  }

  try {
    const { file, name, description } = validatedFields.data;

    let newTShirts = prevState.tShirts?.map((tShirt) => {
      if (tShirt.id == prevState.editId) {
        return <TShirt>{
          file: file,
          name: name,
          description: description,
        };
      }

      return tShirt;
    });

    return <TShirtState>{
      message: "Successfully updated a T-shirt",
      errors: {},
      success: true,
      tShirts: newTShirts,
    };
  } catch (error) {
    return <TShirtState>{
      message: "Database Error: Failed to update gallery",
      errors: error,
      success: false,
      tShirts: prevState.tShirts,
    };
  }
}
