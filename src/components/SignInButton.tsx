import {
  ConnectWallet,
  useAddress,
  useNetwork,
  useNetworkMismatch,
  ChainId,
  MediaRenderer,
} from '@thirdweb-dev/react'
import { profile } from 'console'
import React from 'react'
import useLensUser from '../lib/auth/useLensUser'
import useLogin from '../lib/auth/useLogin'

type Props = {}

export default function SignInButton({}: Props) {
  const address = useAddress()
  const isOnWrongNetwork = useNetworkMismatch()
  const [, switchNetwork] = useNetwork()
  const { isSignedInQuery, profileQuery } = useLensUser()
  const { mutateAsync: requestLogin } = useLogin()
  // 1. User needs to connect their wallets

  if (!address) {
    return <ConnectWallet></ConnectWallet>
  }

  // 2. User needs to switch network to polygon

  if (isOnWrongNetwork) {
    return (
      <button onClick={() => switchNetwork?.(ChainId.Polygon)}>
        Switch Network
      </button>
    )
  }

  // loading their signed in state
  if (isSignedInQuery.isLoading) {
    return <div>Loading...</div>
  }

  // if the user is not signed in we need to request a login
  if (!isSignedInQuery.data) {
    return <button onClick={() => requestLogin()}>Sign in with Lens</button>
  }

  // loading their profile information
  if (profileQuery.isLoading) {
    return <div>Loading...</div>
  }

  // if it's done loading and there's no default profile
  if (!profileQuery.data?.defaultProfile) {
    return <div>No Lens Profile.</div>
  }

  // if it's done loading and there's a default profile
  if (profileQuery.data?.defaultProfile) {
    return (
      <div>
        <MediaRenderer
          // @ts-ignore
          src={profileQuery?.data?.defaultProfile?.picture?.original?.url || ''}
          alt={profileQuery.data.defaultProfile.name || ''}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
          }}
        />
      </div>
    )
  }
  return <div>Something went wrong.</div>
}
