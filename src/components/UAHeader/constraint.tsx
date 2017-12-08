

interface IOption {
    link? : string,
    value :string
}

interface BreadcrumbProps {
  title? : string,
  data? : IOption [],
  description? :string

}

export { BreadcrumbProps } 
