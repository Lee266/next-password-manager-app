import { z } from 'zod';
import { Timestamp } from 'types/others/Timestamp';

export const PasswordGroupSchema = z.object({
  id: z.number().optional(),
  user: z.number(),
  group_name: z
    .string()
    .nonempty()
    .refine((group_name) => group_name !== 'other', {
      message: "group_name can't be 'other'",
    }),
  created_at: Timestamp,
  updated_at: Timestamp,
});

export const PasswordTagSchema = z.object({
  id: z.number().optional(),
  user: z.number(),
  tag_name: z.string().nonempty(),
  created_at: Timestamp,
  updated_at: Timestamp,
});

export const PasswordCustomSchema = z.object({
  id: z.number().optional(),
  custom_name: z.string(),
  custom_value: z.string(),
  created_at: Timestamp,
  updated_at: Timestamp,
});

export const PasswordSchema = z.object({
  id: z.number().optional(),
  user: z.number(),
  title: z.string().nonempty(),
  password: z.string().nullable(),
  email: z.union([z.string(), z.literal(''), z.null()]),
  website: z.string().nullable(),
  notes: z.string().nullable(),
  tag: z.union([z.literal(''), z.number().nullable(), PasswordTagSchema.optional()]),
  group: z.union([z.literal(''), z.number().nullable(), PasswordGroupSchema.optional()]),
  // custom: z.union([z.number().nullable(), PasswordCustomSchema.optional()]),
  index: z.number().nullable().optional(),
  createdAt: Timestamp,
});

export type Password = z.infer<typeof PasswordSchema>;
export type PasswordGroup = z.infer<typeof PasswordGroupSchema>;
export type PasswordTag = z.infer<typeof PasswordTagSchema>;
export type PasswordCustom = z.infer<typeof PasswordCustomSchema>;
