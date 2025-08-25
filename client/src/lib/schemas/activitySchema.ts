import { z } from 'zod';

const requiredString = (fieldName: string) => z
    .string()
    .trim()
    .min(1, { message: `${fieldName} is required` })

export const activitySchema = z.object({
  title: requiredString('Title'),
  description: requiredString('Description'),
  category: requiredString('Category'),
  date: z.coerce.date().refine((d) => !isNaN(d.getTime()), {
    message: "Date is required",
}),
  city: requiredString('City'),
  venue: requiredString('Venue')    
})

export type ActivitySchema = z.infer<typeof activitySchema>;