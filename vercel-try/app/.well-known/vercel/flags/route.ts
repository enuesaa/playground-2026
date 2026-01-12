import { createFlagsDiscoveryEndpoint, getProviderData } from 'flags/next'
import * as flags from '../../../../flags'

// see https://flags-sdk.dev/api-reference/frameworks/next#createflagsdiscoveryendpoint
// see https://github.com/vercel/flags/blob/23cf50428e4e83a75784108bb8221e2f275d1d7f/examples/shirt-shop/app/.well-known/vercel/flags/route.ts
export const GET = createFlagsDiscoveryEndpoint(() => {
  const providerData = getProviderData(flags)
  return providerData
}) as any
