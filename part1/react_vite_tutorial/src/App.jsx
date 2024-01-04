const Hello = (props) => {
  console.log(props)
  return (
    < div >
      <p>Hello {props.name}, you're {props.age}</p>
    </div >
  )
}


const App = () => {
  const friends = ['peter', 'amy']
  return (
    <>

      <Hello />
    </>

  )
}

export default App
