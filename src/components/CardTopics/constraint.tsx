interface CardTopicsProps {
  title : string,
  url :string,
  more? :string
}

interface ITopic {
  id :string,
  title : string,
  create_at :string,
}

interface CardTopicsState {
  topics : ITopic [],
  loading : boolean,
}

export { CardTopicsState ,CardTopicsProps };
