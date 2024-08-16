import { z } from "zod";
import { ECurrencySymbol, EMediaEnum, Prisma } from "@repo/db";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "invalid data type",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "invalid data type",
    })
    .min(1, { message: "Password is required" }),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;

export const SignUpSchema = LoginSchema.pick({ email: true }).merge(
  z.object({
    fullName: z
      .string({
        required_error: "Fullname is required",
        invalid_type_error: "invalid data type",
      })
      .min(5),
    password: z
      .string({
        required_error: "email is required",
        invalid_type_error: "invalid data type",
      })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must include an uppercase letter, a lowercase letter, a digit, and a special character",
        }
      ),
  })
);
export type TSignupSchema = z.infer<typeof SignUpSchema>;

export const OTPSchema = z.object({
  otp: z.string({
    required_error: "otp is required",
    invalid_type_error: "invalid data type",
  }),
});

export type TOtpSchema = z.infer<typeof OTPSchema>;

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const ObjectIdFormatSchema = z
  .string()
  .refine((value) => objectIdRegex.test(value), {
    message: "Invalid ObjectID format",
  });

export const ObjectIdParamSchema = (paramName: string) =>
  z.object({
    [paramName]: ObjectIdFormatSchema,
  });

// Product zod schema

const CurrenyEnum = z.nativeEnum(ECurrencySymbol);
const MediaEnum = z.nativeEnum(EMediaEnum);

const TPriceSchema = z.object({
  amount: z.coerce.number().nonnegative(),
  currency: CurrenyEnum.default(ECurrencySymbol.INR),
}) satisfies z.Schema<Prisma.TPriceCreateInput>;

const ProductDimensionSchema = z.object({
  length: z.coerce.number().nonnegative(),
  width: z.coerce.number().nonnegative(),
  height: z.coerce.number().nonnegative(),
  weight: z.coerce.number().nonnegative(),
}) satisfies z.Schema<Prisma.ProductDimensionCreateInput>;

const TTablePropsSchema = z.object({
  key: z.string(),
  value: z.string(),
}) satisfies z.Schema<Prisma.TTablePropsCreateInput>;

const TMediaSchema = z.object({
  url: z.string().url(),
  type: MediaEnum,
  isDefault: z.boolean().default(false),
  orderNo: z.coerce.number().nonnegative(),
}) satisfies z.Schema<Prisma.TMediaCreateInput>;

export const ProductSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    price: TPriceSchema,
    dimension: ProductDimensionSchema,
    quantityInStock: z.coerce.number().nonnegative(),
    tableProps: z.array(TTablePropsSchema),
    medias: z.array(TMediaSchema).optional(),
  })
  .strict();
//  satisfies z.Schema<Prisma.ProductUncheckedCreateInput>;
