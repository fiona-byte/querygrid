import { useContext } from 'react';
import { AuthUserContext } from '../contexts/authUserContext';

export const useUser = () => useContext(AuthUserContext).user;
