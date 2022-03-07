/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link'
import { useRouter } from 'next/router'

const coffeStore = () => {
  const router = useRouter()
  console.log('router', router)
  return (
    <div>
      coffe-store{router.query.id}
      <Link href='/'>Back to home</Link>
      <Link href='/coffee-store/dynamic'>Go dynamic page</Link>
    </div>
  )
}

export default coffeStore
