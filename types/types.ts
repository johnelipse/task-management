export type CategoryProps = {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
};
export type SavingProps = {
  amount: number;
  month: string;
  name: string;
  userId: string;
  paymentDate: any;
};
export type UserProps = {
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  email: string;
  password: string;
  WorkspaceIds: string[];
};
export type LoginProps = {
  email: string;
  password: string;
};
export type ForgotPasswordProps = {
  email: string;
};

// types/types.ts

export interface RoleFormData {
  displayName: string;
  description?: string;
  permissions: string[];
}

// export interface UserWithRoles extends User {
//   roles: Role[];
// }

export interface RoleOption {
  label: string;
  value: string;
}

export interface UpdateUserRoleResponse {
  error: string | null;
  status: number;
  // data: UserWithRoles | null;
}

export interface RoleResponse {
  id: string;
  displayName: string;
  description?: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DepartmentProps {
  name: string;
  code: string;
  description: string;
  location: string;
  budget: number;
  slug: string;
  employeeCapacity: number;
  isActive: boolean;
}

export interface TeamProps {
  name: string;
  description: string;
  workspaceId: string;
  slug: string;
}

export interface MemberProps {
  fullName: string;
  email: string;
  image: string;
  phone: string;
  jobTitle: string;
  employeeId: string;
  department: string;
  employmentType: string;
  dateJoined: string;
  description: string;
  teamId: string;
}
export type Priority = "high" | "medium" | "low";
export type Status = "in-progress" | "pending" | "completed";
export interface Task {
  id: string;
  name: string;
  slug: string;
  description: string;
  priority: Priority;
  department: string;
  startDate: string;
  endDate: string;
  status: Status;
  team: string;
  createdAt: string;
}

export type workspaceIdProps = {
  WorkspaceId: string;
};
