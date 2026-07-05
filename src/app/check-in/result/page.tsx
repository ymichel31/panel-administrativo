import { getCheckInResultAction } from 'actions/check-in';
import CheckInSuccessSummary from 'components/check-in/CheckInSuccessSummary';
import CheckInUnavailable from 'components/check-in/CheckInUnavailable';

type CheckInResultPageProps = {
  searchParams: Promise<{
    sid?: string;
    aid?: string;
    t?: string;
  }>;
};

export default async function CheckInResultPage({
  searchParams,
}: CheckInResultPageProps) {
  const { sid, aid, t } = await searchParams;

  if (!sid || !aid || !t) {
    return <CheckInUnavailable />;
  }

  const subscriptionId = Number(sid);
  const attendanceId = Number(aid);

  const result = await getCheckInResultAction(subscriptionId, attendanceId, t);

  if (!result.success) {
    return <CheckInUnavailable />;
  }

  return (
    <CheckInSuccessSummary
      firstName={result.data.firstName}
      classesRemaining={result.data.classesRemaining}
      unlimited={result.data.unlimited}
    />
  );
}
