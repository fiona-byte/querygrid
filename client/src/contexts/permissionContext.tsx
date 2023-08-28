import { ReactNode, createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { defineAbility, AnyAbility } from '@casl/ability';
import { useUser } from '@hooks/useUser';

type PermissionProviderProps = {
  children: ReactNode;
};

export const PermissionContext = createContext<AnyAbility>({} as AnyAbility);
export const Can = createContextualCan(PermissionContext.Consumer);

const PermissionProvider = ({ children }: PermissionProviderProps) => {
  const user = useUser();

  const ability = defineAbility((can) => {
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

  return <PermissionContext.Provider value={ability}>{children}</PermissionContext.Provider>;
};

export default PermissionProvider;
