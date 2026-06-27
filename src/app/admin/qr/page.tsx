import { getQrAction } from 'actions/qr';
import GenerateQrContent from 'components/qr/GenerateQrContent';

export default async function QrPage() {
  const qr = await getQrAction();

  if (!qr.success) {
    return <div>Error: {qr.error}</div>;
  }

  return <GenerateQrContent qr={qr.data} />;
}
