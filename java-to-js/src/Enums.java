import java.util.List;
import java.util.Set;

public void main() {
  System.out.println(STR."Roles: \{List.of(Role.values())} Permissions: \{List.of(Permission.values())}");
  System.out.println(STR."Admin Permissions: \{Role.ADMIN.permissions}");

  System.out.println(Role.ADMIN.hasPermission(Permission.DELETE));
  System.out.println(Role.VIEWER.hasPermission(Permission.READ));
  System.out.println(Role.EDITOR.hasPermission(Permission.DELETE));
}

enum Role {
  ADMIN(Permission.READ, Permission.WRITE, Permission.DELETE),
  EDITOR(Permission.READ, Permission.WRITE),
  VIEWER(Permission.READ);

  final Set<Permission> permissions;

  Role(Permission... permissions) {
    this.permissions = Set.of(permissions);
  }

  boolean hasPermission(Permission permission) {
    return permissions.contains(permission);
  }
}

enum Permission {
  READ,
  WRITE,
  DELETE
}

