import FeedPost from '../components/FeedPost'
import SignInButton from '../components/SignInButton'
import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from '../graphql/generated'
import styles from '../styles/Home.module.css'
export default function Home() {
  const { isLoading, error, data } = useExplorePublicationsQuery(
    {
      request: {
        sortCriteria: PublicationSortCriteria.TopCollected,
      },
    },
    {
      // Don't refetch when the user comes back
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  if (error) {
    return <div className={styles.container}>Error</div>
  }

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>
  }

  return (
    <div className={styles.container}>
      {/* Iterate over the array of items inside the data field */}
      {data?.explorePublications.items.map((publication) => (
        <FeedPost publication={publication} key={publication.id} />
      ))}
    </div>
  )
}
