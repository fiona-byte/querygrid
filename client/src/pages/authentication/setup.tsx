import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import First from '@component/Setup/first';
import Second from '@component/Setup/second';
import { AppSetupContext } from '@context/appSetupContext';
import Loader from '@component/loader';
import PageLayout from '@layout/page';

const Setup = () => {
  const navigate = useNavigate();
  const { install } = useContext(AppSetupContext);
  const [activeStep, setActiveStep] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const [skipped, setSkipped] = useState(new Set<number>());

  useEffect(() => {
    if (install) {
      navigate('/projects');
    }
    setPageLoading(false);
  }, []);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (pageLoading) return <Loader />;

  return (
    <PageLayout page="Setup">
      {activeStep === 0 ? <First handleNext={handleNext} /> : <Second handleBack={handleBack} />}
    </PageLayout>
  );
};

export default Setup;
