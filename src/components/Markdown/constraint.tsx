interface MarkdrwnState {
    markdownCode : string,       //markdown代码
}

interface MarkdrwnProps {
    onSubmit?(code :string) :void,           //提交参数为markdown代码
}
  

export { MarkdrwnProps , MarkdrwnState }