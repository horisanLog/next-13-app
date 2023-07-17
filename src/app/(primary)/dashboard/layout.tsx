// export async function getServerSideProps(context) {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts")
//   const data = await res.json()

//   return {
//     props: {
//       data,
//     },
//   }
// }
import axios from "axios"
import { ReactNode } from "react"

async function getData() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
  return res.data
}

interface DashboardLayoutProps {
  children: ReactNode
}

// Layouts can be nested and composed
export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const data = await getData()

  return (
    <section>
      <h1>Dashboard</h1>
      {children}
      <p>{data.map((t)=> t.userId)}</p>
    </section>
  )
}

// export default function Page({ data }) {
//   return <div>{/* Render the data */}</div>
// }
