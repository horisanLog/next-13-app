// export async function getServerSideProps(context) {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts")
//   const data = await res.json()

//   return {
//     props: {
//       data,
//     },
//   }
// }
import { getData } from "@/api/todo"
import { ReactNode, Suspense } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

// Layouts can be nested and composed
export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const data = await getData()

  return (
    <section>
      <h1>Dashboard</h1>
      <div>{`サーバサイドレンダリング： ${data[0].title}`}</div>
      <Suspense fallback={<p>Loading feed...</p>}>{children}</Suspense>
    </section>
  )
}

// export default function Page({ data }) {
//   return <div>{/* Render the data */}</div>
// }
