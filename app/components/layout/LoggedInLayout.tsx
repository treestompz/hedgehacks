import Footer from './Footer'
import Navbar from './Navbar'

interface Props {
  children: React.ReactNode
}

export default function LoggedInLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
      <Footer />
    </>
  )
}
