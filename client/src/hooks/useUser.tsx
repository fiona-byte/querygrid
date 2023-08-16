import { useContext } from 'react';
import { AuthUserContext } from '@context/authUserContext';

export const useUser = () => useContext(AuthUserContext).user;
