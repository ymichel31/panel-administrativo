import { getPlanByIdAction } from 'actions/plans';
import EditPlanForm from 'components/plans/EditPlanForm';
import { notFound } from 'next/navigation';

type EditPlanPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPlanPage({ params }: EditPlanPageProps) {
  const { id } = await params;
  const plan = await getPlanByIdAction(id);

  if (!plan) {
    notFound();
  }

  return <EditPlanForm plan={plan} />;
}
