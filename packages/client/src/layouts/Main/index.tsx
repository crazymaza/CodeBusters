import { FC } from 'react'
import './styles.css'

export type MainLayoutProps = {
  title?: string
  children: React.ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ title, children }) => {
  return (
    <section className="main-layout">
      {title && <h1 className="main-layout__header">{title}</h1>}
      <div className="main-layout__content">{children}</div>
    </section>
  )
}

export default MainLayout
