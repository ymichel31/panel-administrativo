import { getPlansAction } from 'actions/plans';
import PlansPageContent from 'components/plans/PlansPageContent';

export default async function PlansPage() {
  const plans = await getPlansAction();

  return <PlansPageContent plans={plans} />;
}
