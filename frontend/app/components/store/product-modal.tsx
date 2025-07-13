import { CircleX, Plus } from "lucide-react";
import { type ChangeEvent, type DragEvent, useRef, useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import API from "~/api/client";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export default function ProductModal() {
  const [dragArea, setDragArea] = useState<{
    images: string[];
    highlight: boolean;
  }>({
    images: [],
    highlight: false,
  });

  interface CreateProduct {
    name: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function highlight(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragArea((prevState) => ({
      ...prevState,
      highlight: true,
    }));
  }

  function resetDragArea(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragArea((prevState) => ({
      ...prevState,
      highlight: false,
    }));
  }

  function handleImages(
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    let files = null;
    if ("dataTransfer" in e) {
      files = e.dataTransfer?.files || null;
    } else if ("target" in e) {
      files = e.target?.files || null;
    }

    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setDragArea((prev) => ({
            ...prev,
            images: [...prev.images, reader.result as string],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    handleImages(e);
    resetDragArea(e);
  }

  function triggerFileSelect() {
    fileInputRef.current?.click();
  }

  const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.coerce.number(),
    images: z
      .array(z.string())
      .min(1, { message: "At least one image is required" }),
    quantity: z.coerce.number(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateProduct>({
    resolver: zodResolver(productSchema),
  });
  setValue("images", dragArea.images);

  const onSubmit: SubmitHandler<CreateProduct> = (data) =>
    mutCreateProduct({
      ...data,
      images: dragArea.images,
    });

  const { mutate: mutCreateProduct } = useMutation({
    mutationFn: (data: CreateProduct) => API.post("/product", data),
    onSuccess: () => {
      setDragArea((prevState) => ({
        ...prevState,
        images: [], // Empty state
      }));
      reset();
      console.log("product uploaded");
    },
  });

  console.log(errors);
  console.log("Validating images:", dragArea.images);

  return (
    <div
      id="create-product"
      className="hidden p-4 relative target:block md:w-3/5 h-full md:h-[500px] max-w-fit border rounded-sm ml-auto mr-auto"
    >
      <div className="p-2 flex flex-col gap-4">
        {/*  drag/click area */}
        <div
          onClick={triggerFileSelect}
          onDragEnter={highlight}
          onDragOver={highlight}
          onDragLeave={resetDragArea}
          onDrop={handleDrop}
          className={`border border-dashed rounded-sm p-4 cursor-pointer ${
            dragArea.highlight ? "bg-[#e9f5ff] border-[#0b5ed7] border-2" : ""
          }`}
        >
          {dragArea.images.length > 0 ? (
            <div className="border w-full flex gap-2 overflow-x-auto p-2 rounded-md">
              {dragArea.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="preview"
                  className="h-32 w-32 object-cover rounded-md flex-shrink-0"
                />
              ))}
            </div>
          ) : (
            <>
              <p className="text-center p-4">
                Drag and drop image here or click to select
              </p>
              <Plus className="w-full ml-auto mr-auto" />
            </>
          )}
          <input
            ref={fileInputRef}
            id="product-img"
            type="file"
            accept="image/*"
            hidden
            onChange={handleImages}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Input {...register("name")} type="text" placeholder="Product name" />
          <Input {...register("price")} type="number" placeholder="Price" />
          <Input
            {...register("quantity")}
            type="number"
            placeholder="Quantity"
          />
          <textarea
            {...register("description")}
            placeholder="Product description"
            className="outline-none border w-full rounded-sm p-2"
          />
          <Button type="submit">Publish</Button>
        </form>
      </div>
      <a href="#" className="absolute top-0 right-0 p-2">
        <CircleX />
      </a>
    </div>
  );
}
