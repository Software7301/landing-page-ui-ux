import { z } from "zod";

export const workspaceSchema = z.object({
  name: z
    .string()
    .min(3, "Workspace name must be at least 3 characters")
    .max(50, "Workspace name must be at most 50 characters"),
});

export const serverSchema = z.object({
  name: z
    .string()
    .min(3, "Server name must be at least 3 characters")
    .max(50, "Server name must be at most 50 characters"),
  region: z.string().min(1, "Region is required"),
});

export const domainSchema = z.object({
  name: z
    .string()
    .min(1, "Domain name is required")
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/, "Invalid domain name"),
  containerId: z.string().optional(),
  dnsType: z.enum(["A", "AAAA", "CNAME", "MX", "TXT"]),
  dnsValue: z.string().min(1, "DNS value is required"),
});

export const userProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z.string().email("Invalid email address"),
});

export const apiTokenSchema = z.object({
  name: z
    .string()
    .min(3, "Token name must be at least 3 characters")
    .max(50, "Token name must be at most 50 characters"),
});

export type WorkspaceFormData = z.infer<typeof workspaceSchema>;
export type ServerFormData = z.infer<typeof serverSchema>;
export type DomainFormData = z.infer<typeof domainSchema>;
export type UserProfileFormData = z.infer<typeof userProfileSchema>;
export type ApiTokenFormData = z.infer<typeof apiTokenSchema>;

