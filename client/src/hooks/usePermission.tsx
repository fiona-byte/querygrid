import { defineAbility } from '@casl/ability';
import { useUser } from './useUser';

export const usePermission = () => {
  const user = useUser();

  return defineAbility((can) => {
    if (user) {
      const permissions = user.role.permissions;
      const permissionKeys = Object.keys(permissions);
      for (const permissionKey of permissionKeys) {
        for (const permission of permissions[permissionKey]) {
          can(permission, permissionKey);
        }
      }
    }
  });
};
