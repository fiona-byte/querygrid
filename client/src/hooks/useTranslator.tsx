import { useContext } from 'react';
import { InternationalizationContext } from '@context/translatorContext';

export const useTranslator = () => useContext(InternationalizationContext);
