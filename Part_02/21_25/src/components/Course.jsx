const Part = ({name,exercises}) => {
  return(
    <li>{name} {exercises}</li>
  )
}
const Total = ({parts}) => {
  return(
    <strong>
      total {parts.reduce((s,p) => s + p.exercises, 0)}
    </strong>
  )
}
const Course = ({course}) => {
  return(
  <div>
    <h1>{course.name}</h1>
    {course.parts.map(part => {
      return(
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )
    }
    )}
    <Total parts={course.parts} />
  </div>
)}

export default Course