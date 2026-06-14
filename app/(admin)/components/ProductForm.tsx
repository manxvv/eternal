"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { productService } from "@/services/productService";
import { toast } from "react-hot-toast";

interface ProductFormProps {
  initialData?: any;
  onSuccess: () => void;
}

const CATEGORIES = ["Tea", "Coffee", "Accessories"];

export default function ProductForm({ initialData, onSuccess }: ProductFormProps) {
  const [uploading, setUploading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      name: "",
      description: "",
      category: "Tea",
      price: "",
      countInStock: "",
      images: [],
    },
  });

  const images = watch("images");
  const category = watch("category");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));
    try {
      const paths = await productService.uploadImages(formData);
      setValue("images", [...images, ...paths]);
      toast.success(`${paths.length} image${paths.length > 1 ? "s" : ""} uploaded`);
    } catch {
      toast.error("Upload failed — please try again");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (initialData?._id) {
        await productService.updateProduct(initialData._id, data);
        toast.success("Changes saved");
      } else {
        await productService.createProduct(data);
        toast.success("Product published to Eternal");
      }
      onSuccess();
    } catch {
      toast.error("Could not save product — please try again");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="divide-y divide-brandGold/10"
    >
      {/* Section: Identity */}
      <div className="pb-8 space-y-5">
        <SectionLabel>Identity</SectionLabel>

        <Field label="Product Name" error={errors.name?.message as string}>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="e.g. First Flush Darjeeling"
            className={fieldClass(!!errors.name)}
          />
        </Field>

        <Field label="Category">
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setValue("category", cat)}
                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all ${
                  category === cat
                    ? "bg-green-200 text-black border-brandBlue"
                    : "border-brandGold/25 text-brandBlue/50 hover:border-brandGold/50 hover:text-brandBlue"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Description">
          <textarea
            {...register("description")}
            placeholder="Describe the origin, tasting notes, and character of this product…"
            className={`${fieldClass(false)} h-28 resize-none`}
          />
        </Field>
      </div>

      {/* Section: Pricing */}
      <div className="py-8 space-y-5">
        <SectionLabel>Pricing & Stock</SectionLabel>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Price (₹)" error={errors.price?.message as string}>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-brandBlue/30 font-medium">
                ₹
              </span>
              <input
                type="number"
                min={0}
                step={1}
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
                placeholder="0"
                className={`${fieldClass(!!errors.price)} pl-7`}
              />
            </div>
          </Field>

          <Field label="Quantity in Stock" error={errors.countInStock?.message as string}>
            <input
              type="number"
              min={0}
              step={1}
              {...register("countInStock", {
                required: "Stock count is required",
                min: { value: 0, message: "Must be 0 or more" },
              })}
              placeholder="0"
              className={fieldClass(!!errors.countInStock)}
            />
          </Field>
        </div>
      </div>

      {/* Section: Gallery */}
      <div className="py-8 space-y-5">
        <SectionLabel>Gallery</SectionLabel>

        {/* Upload zone */}
        <label
          className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed px-6 py-8 cursor-pointer transition-colors ${
            uploading
              ? "border-brandGold/40 bg-brandGold/5"
              : "border-brandGold/20 hover:border-brandGold/40 hover:bg-brandCream/20"
          }`}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="sr-only"
            disabled={uploading}
          />
          {uploading ? (
            <>
              <div className="w-6 h-6 border-2 border-brandGold/40 border-t-brandGold rounded-full animate-spin" />
              <span className="text-[10px] uppercase tracking-widest text-brandGold">
                Processing…
              </span>
            </>
          ) : (
            <>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-brandBlue/20"
              >
                <path
                  d="M4 16l4-4 4 4m4-4l4-4M12 4v12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="3"
                  y="18"
                  width="18"
                  height="2"
                  rx="1"
                  fill="currentColor"
                  opacity="0.3"
                />
              </svg>
              <span className="text-[10px] uppercase tracking-widest text-brandBlue/30">
                Click to upload images
              </span>
              <span className="text-[9px] text-brandBlue/20">
                PNG, JPG, WEBP accepted
              </span>
            </>
          )}
        </label>

        {/* Image grid */}
        {images?.length > 0 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((img: string, i: number) => (
              <div key={i} className="relative group aspect-square">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${img}`}
                  alt=""
                  className="w-full h-full object-cover border border-brandGold/10"
                />
                {/* Primary badge */}
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 text-[8px] uppercase tracking-wider bg-brandBlue text-white px-1.5 py-0.5">
                    Cover
                  </span>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setValue(
                      "images",
                      images.filter((_: any, idx: number) => idx !== i)
                    )
                  }
                  className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="pt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brandBlue text-black py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-brandBlue/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all relative"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
              Saving…
            </span>
          ) : initialData ? (
            "Save Changes"
          ) : (
            "Publish"
          )}
        </button>
      </div>
    </form>
  );
}

/* ── Small helpers ── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] uppercase tracking-[0.3em] text-brandGold font-bold">
      {children}
    </p>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] uppercase tracking-widest text-brandBlue/50 font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[10px] text-red-500 tracking-wide">{error}</p>
      )}
    </div>
  );
}

function fieldClass(hasError: boolean) {
  return [
    "w-full px-3 py-2.5 text-sm text-brandBlue bg-white border focus:outline-none transition-colors",
    hasError
      ? "border-red-400 focus:border-red-500"
      : "border-brandGold/20 focus:border-brandGold/50 hover:border-brandGold/35",
  ].join(" ");
}