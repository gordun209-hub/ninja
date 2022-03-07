/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
      <div className='logo'>
        <Image src='/logo.png' alt='site logo' width={128} height={77} />
      </div>
      <Link href='/'>Home</Link>
      <Link href='/about'>About</Link>
    </nav>
  )
}

export default Navbar
