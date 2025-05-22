enum Role {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

enum Permission {
  READ = "READ",
  WRITE = "WRITE",
  DELETE = "DELETE",
}

const rolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: [Permission.READ, Permission.WRITE, Permission.DELETE],
  [Role.EDITOR]: [Permission.READ, Permission.WRITE],
  [Role.VIEWER]: [Permission.READ],
};

function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role].includes(permission);
}

console.log("Admin Permissions", rolePermissions[Role.ADMIN]);

console.log(hasPermission(Role.ADMIN, Permission.DELETE));
console.log(hasPermission(Role.VIEWER, Permission.READ));
console.log(hasPermission(Role.EDITOR, Permission.DELETE));
