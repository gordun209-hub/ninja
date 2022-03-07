/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import { useRouter } from 'next/router'

const dynamic = () => {
  const router = useRouter()
  const query = router.query.dynamic
  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
    </div>
  )
}

export default dynamic
