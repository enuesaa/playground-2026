import { flag } from 'flags/next'

// https://flags-sdk.dev/
export const exampleFlag = flag({
  key: 'example-flag',
  decide() {
    return Math.random() > 0.5;
  },
});