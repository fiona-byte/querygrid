import { useContext } from 'react';
import { InternationalizationContext } from '../contexts/translatorContext';

export const useTranslator = () => useContext(InternationalizationContext);
