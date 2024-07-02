interface IconProps {
  src: string
  alt: string
  className?: string
}

export const Icon = (props: IconProps) => {
  const { src, alt, className } = props
  return <img src={src} alt={alt} className={className} />
}
