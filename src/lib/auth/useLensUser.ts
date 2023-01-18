import { useQuery } from '@tanstack/react-query'
import { useAddress } from '@thirdweb-dev/react'
import { useDefaultProfileQuery } from '../../graphql/generated'
import { readAccessToken } from './helpers'

export default function useLensUser() {
  // 1. Make react a query for the localStorage key
  const address = useAddress()

  const localStorageQuery = useQuery(
    ['lens-user', address],
    // write the actual function to check the local storage
    () => readAccessToken()
  )

  // If there is a connected wallet address
  // then we can ask for the default profile from Lens

  const profileQuery = useDefaultProfileQuery(
    {
      request: {
        ethereumAddress: address,
      },
    },
    {
      enabled: !!address,
    }
  )

  return {
    // Contains information about both the localStorage and
    // the information about the lens profile
    isSignedInQuery: localStorageQuery,
    profileQuery: profileQuery,
  }
}
