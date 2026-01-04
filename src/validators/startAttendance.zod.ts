import { z } from "zod";

export const startAttendanceSchema = z.object({
  classId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid classId"),
});
