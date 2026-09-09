
const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({parts}) => {
  return(
    <>
      {parts.map(part => 
        <Part part={part} key={part.id}/>
      )}
    </>
  )
}

const Part = ({part}) => {
  return(
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({parts}) => {
  let total = parts.reduce(
    (total, object) => total + object.exercises, 0
  )

  return(
    <p><strong>Number of exercises {total}</strong></p>
  )
}
const Course = ({course}) => {
  return(
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course