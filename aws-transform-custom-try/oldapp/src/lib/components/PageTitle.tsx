interface PageTitleProps {
  title: string
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <h2 className="font-extrabold font-zenkaku text-3xl pl-2 my-6">
      {title}
    </h2>
  )
}
