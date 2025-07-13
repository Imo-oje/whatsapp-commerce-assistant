import z from "zod";

export const emailSchema = z.string().min(1).max(255);
export const passwordSchema = z.string().min(6).max(255);
export const verificatioCodeSchema = z.string().min(1).max(255);
export const stringSchema = z.string().min(1).max(255);

export const loginSchema = z.object({
  email: emailSchema,
  userAgent: z.string(),
  ipAddress: z.string(),
  password: passwordSchema,
});

export const registerSchema = () =>
  loginSchema
    .extend({
      firstName: z.string(),
      lastName: z.string(),
      confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

export const passwordResetSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
    verificationCode: verificatioCodeSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const createStoreSchema = z.object({
  businessName: z.string().min(3, { message: "Name is too short" }),
  logo: z.string().url().optional(),
});

export const updateStoreSchema = z.object({
  businessName: z.string().min(3, { message: "Name is too short" }).optional(),
  logo: z.string().url().optional(),
  contactEmail: z.string().optional(),
  contactPhone: z.string().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  location: z.string().optional(),
});

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  images: z
    .array(z.string().url())
    .min(1, { message: "At least one image is required" }),
  quantity: z.number(),
});
export const updateProductsSchema = createProductSchema.partial();

export const createRoleSchema = z.object({
  name: z.string(),
  permissions: z.array(z.string()),
});
