import client from "./clients/apollo";
import { gql } from "@apollo/client";

const API_URL = "https://api.lens.dev";

const httpLink = createHttpLink({
  uri: API_URL,
});

export const challengeQuery = gql`
  query Challenge($address: EthereumAddress!) {
    challenge(request: { address: $address }) {
      text
    }
  }
`;

// returns a challenge
export async function getChallenge(address) {
  const { data: challenge } = await client.query({
    query: challengeQuery,
    variables: {
      address,
    },
  });
  return challenge;
}

export const authenticate = gql`
  mutation Authenticate($address: EthereumAddress!, $signature: Signature!) {
    authenticate(request: { address: $address, signature: $signature }) {
      accessToken
      refreshToken
    }
  }
`;
export async function getJwt(signature, address) {
  const authData = await client.mutate({
    mutation: authenticate,
    variables: {
      address,
      signature,
    },
  });
  return authData;
}
