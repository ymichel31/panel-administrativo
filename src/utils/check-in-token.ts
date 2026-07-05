import { createHmac, timingSafeEqual } from 'crypto';

function getSecret() {
  const secret = process.env.CHECK_IN_SECRET;
  if (!secret) {
    throw new Error('CHECK_IN_SECRET is not configured');
  }
  return secret;
}

function buildPayload(subscriptionId: number, attendanceId: number) {
  return `${subscriptionId}:${attendanceId}`;
}

export function createCheckInToken(
  subscriptionId: number,
  attendanceId: number,
): string {
  return createHmac('sha256', getSecret())
    .update(buildPayload(subscriptionId, attendanceId))
    .digest('hex');
}

export function verifyCheckInToken(
  subscriptionId: number,
  attendanceId: number,
  token: string,
): boolean {
  const expected = createCheckInToken(subscriptionId, attendanceId);

  if (expected.length !== token.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(expected), Buffer.from(token));
}
